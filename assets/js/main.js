const page = document.body.dataset.page;
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
const yearTargets = document.querySelectorAll('#year');
const navLinks = document.querySelectorAll('.site-nav a');
const reveals = document.querySelectorAll('.reveal');

if (page === 'home' && window.location.pathname.endsWith('/index.html')) {
  window.history.replaceState({}, '', window.location.pathname.replace(/index\.html$/, ''));
}

for (const target of yearTargets) {
  target.textContent = new Date().getFullYear();
}

for (const link of navLinks) {
  const href = link.getAttribute('href');
  if (
    (page === 'home' && (href === './' || href === '/' || href === 'index.html')) ||
    (page !== 'home' && href === `${page}.html`)
  ) {
    link.classList.add('is-active');
  }

  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  for (const reveal of reveals) {
    observer.observe(reveal);
  }
} else {
  for (const reveal of reveals) {
    reveal.classList.add('is-visible');
  }
}
