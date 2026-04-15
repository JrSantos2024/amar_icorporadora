/* ============================================================
   PRELOADER
============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    pre.classList.add('gone');
    setTimeout(() => pre.remove(), 700);
  }, 2100);
});

/* ============================================================
   NAVBAR SCROLL
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 70);
}, { passive: true });

/* ============================================================
   MOBILE MENU
============================================================ */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.m-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ============================================================
   HERO SLIDER
============================================================ */
const slides  = document.querySelectorAll('.slide');
const dots    = document.querySelectorAll('.dot');
let current   = 0;
let timer;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startSlider() {
  timer = setInterval(() => goTo(current + 1), 6000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(timer);
    goTo(i);
    startSlider();
  });
});

startSlider();

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
============================================================ */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.aosDelay || 0);
    setTimeout(() => entry.target.classList.add('aos-on'), delay);
    aosObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

aosElements.forEach(el => aosObserver.observe(el));

/* ============================================================
   SMOOTH SCROLL
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ============================================================
   WHATSAPP FLOAT BUTTON
============================================================ */
const waFloat = document.getElementById('waFloat');

window.addEventListener('scroll', () => {
  waFloat.classList.toggle('visible', window.scrollY > 350);
}, { passive: true });

/* ============================================================
   COUNTER ANIMATION (stats)
============================================================ */
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const start    = performance.now();
  const from     = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const value    = Math.round(from + (target - from) * ease);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const numEl = entry.target;
    const raw   = numEl.textContent.trim();
    const num   = parseInt(raw.replace(/\D/g, ''), 10);
    const suffix = raw.replace(/[0-9]/g, '');
    animateCounter(numEl, num, suffix);
    statsObserver.unobserve(numEl);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

/* ============================================================
   PARALLAX — hero overlay subtle depth
============================================================ */
const heroOverlay = document.querySelector('.hero-overlay');

window.addEventListener('scroll', () => {
  if (!heroOverlay) return;
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroOverlay.style.transform = `translateY(${y * 0.15}px)`;
  }
}, { passive: true });
