// =======================
// 导航栏玻璃效果
// =======================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if(window.scrollY > 80){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// =======================
// 项目滚动进入动画
// =======================
const projects = document.querySelectorAll(".project");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

projects.forEach(project => {
    observer.observe(project);
});

// =======================
// 导航栏滚动高亮 (Scrollspy)
// =======================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".top-nav nav a");

window.addEventListener("scroll", () => {
    let current = "";

    // 遍历所有 section，判断当前滚动到了哪个版块
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) { // 150 是触发偏移量，可根据需要微调
            current = section.getAttribute("id");
        }
    });

    // 遍历导航链接，移除所有 active 类，并为当前匹配的链接添加 active
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});