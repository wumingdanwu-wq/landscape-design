// Native anchor links remain usable without JavaScript.
const chapterNav = document.querySelector('.chapter-nav');
const chapterTabs = [...document.querySelectorAll('.chapter-tab')];
const chapterSections = chapterTabs.map(tab => document.querySelector(tab.getAttribute('href')));
let updatePending = false;

function updateChapterNavigation() {
  updatePending = false;
  const triggerLine = Math.min(window.innerHeight * 0.3, 220);
  let currentIndex = 0;
  chapterSections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top <= triggerLine) currentIndex = index;
  });
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollRange > 0 && window.scrollY >= scrollRange - 3) currentIndex = chapterTabs.length - 1;
  chapterTabs.forEach((tab, index) => {
    if (index === currentIndex) tab.setAttribute('aria-current', 'location');
    else tab.removeAttribute('aria-current');
  });
  chapterNav.style.setProperty('--active-color', chapterTabs[currentIndex].style.getPropertyValue('--chapter-color'));
  chapterNav.style.setProperty('--reading-progress', scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0);
}
function scheduleChapterUpdate() {
  if (!updatePending) {
    updatePending = true;
    requestAnimationFrame(updateChapterNavigation);
  }
}
window.addEventListener('scroll', scheduleChapterUpdate, { passive: true });
window.addEventListener('resize', scheduleChapterUpdate);
window.addEventListener('pageshow', scheduleChapterUpdate);
window.addEventListener('load', scheduleChapterUpdate);
updateChapterNavigation();

// Close the WeChat or research panel on Escape, returning focus to its control.
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('details[open]').forEach(function (panel) {
      panel.open = false;
      panel.querySelector('summary').focus();
    });
  }
});

document.querySelectorAll('[data-social]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.social-status').textContent = button.dataset.social + ' 账号链接待设置';
  });
});
