const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const hero = document.querySelector('.hero');

function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  document.body.classList.toggle('menu-open', open);
}

toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${current}`));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 720) setMenu(false);
});
updateHeader();

if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    hero.style.setProperty('--pointer-x', `${x * 8}px`);
    hero.style.setProperty('--pointer-y', `${y * 6}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--pointer-x', '0px');
    hero.style.setProperty('--pointer-y', '0px');
  });
}
