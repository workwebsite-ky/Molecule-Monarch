// =============================================
// MOLECULE MONARCH — script.js
// =============================================

/* === LOADER === */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1600);
});

/* === NAVBAR === */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
  toggleBackToTop();
  revealOnScroll();
});

// Active nav link based on scroll
function updateActiveNav() {
  const sections = ['home', 'services', 'packages', 'about', 'contact'];
  let current = '';
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - 120) current = id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// Smooth scroll nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});

/* === HAMBURGER MENU === */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksEl.classList.toggle('open');
});

/* === REVEAL ON SCROLL === */
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
// Run on load too
revealOnScroll();
window.addEventListener('load', revealOnScroll);

/* === ANIMATED COUNTERS === */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* === FAQ ACCORDION === */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-q.open').forEach(openBtn => {
      openBtn.classList.remove('open');
      openBtn.parentElement.querySelector('.faq-a').classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

/* === BACK TO TOP === */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 500) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* === CONTACT FORM === */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email) return;

  // Build mailto link as fallback
  const subject = encodeURIComponent(form.subject.value || 'Chemical Inquiry');
  const body = encodeURIComponent(`Name: ${name}\nCompany: ${form.company.value}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:contactglanders@gmail.com?subject=${subject}&body=${body}`;

  formSuccess.classList.add('visible');
  form.reset();
  setTimeout(() => formSuccess.classList.remove('visible'), 6000);
});

/* === PARTICLE FIELD (subtle hex dots in hero) === */
(function createParticles() {
  const field = document.getElementById('particles');
  if (!field) return;
  const count = 24;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? 'rgba(0,212,255,0.4)' : 'rgba(240,180,41,0.3)'};
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: floatDot ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite alternate;
    `;
    field.appendChild(dot);
  }

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatDot {
      from { transform: translate(0, 0) scale(1); opacity: 0.3; }
      to { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random()*30+10)}px, -${Math.floor(Math.random()*40+20)}px) scale(1.5); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
})();

/* === NAVBAR ACTIVE ON LOAD === */
updateActiveNav();
