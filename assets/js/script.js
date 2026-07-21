// ============================================================
// Jolly Smoke Shop — shared behavior
// ============================================================

// Age gate — verified once per browser session, applies across every page
(function ageGate() {
  const gate = document.getElementById('ageGate');
  if (!gate) return;

  if (sessionStorage.getItem('jolly_age_verified') === 'yes') {
    gate.classList.add('gone');
    return;
  }

  const yesBtn = document.getElementById('ageYes');
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      sessionStorage.setItem('jolly_age_verified', 'yes');
      gate.classList.add('gone');
    });
  }
})();

// Mobile nav
(function mobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const scrim = document.getElementById('navScrim');
  if (!hamburger || !mobileNav) return;

  function closeMenu() {
    mobileNav.classList.remove('open');
    scrim && scrim.classList.remove('open');
  }
  function toggleMenu() {
    mobileNav.classList.toggle('open');
    scrim && scrim.classList.toggle('open');
  }

  hamburger.addEventListener('click', toggleMenu);
  scrim && scrim.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();

// Highlight current page in nav
(function activeNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Scroll reveal
(function reveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // Safety net: guarantee content is never permanently hidden (fast flings,
  // anchor jumps, or an observer that never fires for any reason).
  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('in-view'));
  }, 2500);
})();
