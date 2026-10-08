// =======================
// 导航栏玻璃效果
// =======================
const navbar = document.getElementById("navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if(window.scrollY > 80){
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

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

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// =======================
// 场地测量标尺 — 滚动进度
// =======================
const railMarker = document.getElementById("railMarker");

if (railMarker) {
    const updateRail = () => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) : 0;
        railMarker.style.top = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
    };

    window.addEventListener("scroll", updateRail);
    window.addEventListener("resize", updateRail);
    updateRail();
}
