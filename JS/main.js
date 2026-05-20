// ── Cursor ──────────────────────────────────
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cur && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  (function loop() {
    rx += (mx - rx) * .09;
    ry += (my - ry) * .09;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

// ── Floating pill — show after 100px scroll ──
const nav = document.getElementById('nav');
function updateNav() {
  nav.classList.toggle('visible', window.scrollY > 100);
}
window.addEventListener('scroll', updateNav, { passive: true });
// show on load if already scrolled
updateNav();
// also show after short delay on page load for better UX
setTimeout(() => nav.classList.add('visible'), 800);

// ── Mobile menu ─────────────────────────────
const ham      = document.getElementById('hamburger');
const mob      = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');

function openMob() {
  mob.classList.add('open');
  mob.removeAttribute('hidden');
  ham.classList.add('open');
  ham.setAttribute('aria-expanded', 'true');
  document.body.classList.add('mob-open');
  setTimeout(() => mobClose?.focus(), 50);
}

function closeMob() {
  mob.classList.remove('open');
  ham.classList.remove('open');
  ham.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('mob-open');
  setTimeout(() => {
    if (!mob.classList.contains('open')) mob.setAttribute('hidden', '');
  }, 400);
}

ham?.addEventListener('click', () =>
  mob.classList.contains('open') ? closeMob() : openMob()
);
mobClose?.addEventListener('click', closeMob);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mob.classList.contains('open')) closeMob();
});
mob?.querySelectorAll('.mob-link').forEach(a =>
  a.addEventListener('click', closeMob)
);

// ── Scroll reveal ───────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const d = parseInt(e.target.style.getPropertyValue('--ri') || '0') * 130;
    setTimeout(() => e.target.classList.add('in'), d);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Back to top ─────────────────────────────
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  btt.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
btt.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── Smooth anchor scroll ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    closeMob();
    t.scrollIntoView({ behavior: 'smooth' });
  });
});
