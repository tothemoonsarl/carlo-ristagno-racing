// Menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Header au scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.4)' : 'none';
});

// Lightbox galerie
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.shot').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    lbImg.src = item.getAttribute('href');
    lb.classList.add('open');
  });
});
lb.addEventListener('click', () => lb.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

// Reveal au défilement
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  // Cibles à animer : cartes, panneaux, items
  const targets = document.querySelectorAll(
    '.hl-card, .round, .ocard, .agenda-item, .pd-item, .split-content, .bigstat-inner, ' +
    '.section-head, .pilote-photo, .pilote-bio, .footer-brand, .footer-col, .closer-content, .contact-box'
  );
  targets.forEach(el => el.classList.add('reveal'));
  // Décalage en cascade par groupe de voisins
  document.querySelectorAll('.highlight-cards, .rounds, .other-races, .agenda-list, .partners-detail, .footer-top').forEach(group => {
    [...group.children].forEach((child, i) => child.setAttribute('data-d', (i % 3) + 1));
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));
}
