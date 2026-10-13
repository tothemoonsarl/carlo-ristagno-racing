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
    '.hl-card, .round, .ocard, .ev, .pd-item, .split-panel, .bigstat-inner, ' +
    '.section-head, .subhead, .pilote-photo, .pilote-bio, .table-note, .filmstrip, .strip-hint, ' +
    '.marquee, .footer-brand, .footer-col, .closer-content, .contact-box'
  );
  targets.forEach(el => el.classList.add('reveal'));
  // Décalage en cascade par groupe de voisins
  document.querySelectorAll('.highlight-cards, .rounds, .other-races, .agenda-grid, .partners-detail, .footer-top, .split').forEach(group => {
    [...group.children].forEach((child, i) => child.setAttribute('data-d', (i % 3) + 1));
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      // Rejoue à chaque entrée/sortie du viewport pour un effet dynamique
      if (e.isIntersecting) {
        e.target.classList.add('in');
      } else {
        e.target.classList.remove('in');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(el => io.observe(el));
}
