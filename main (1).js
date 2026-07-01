/* =========================================
   MAIN.JS - Core Interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Loading Screen ----
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 1400);
  }

  // ---- Sticky Header ----
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) link.classList.add('active');
  });

  // ---- Back to Top ----
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Animated Counters ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // ---- Skill Bars ----
  const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (skillBars.length) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(b => barObserver.observe(b));
  }

  // ---- AOS-like Animations ----
  const animEls = document.querySelectorAll('[data-anim]');
  if (animEls.length) {
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          }, delay);
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    animEls.forEach(el => {
      const anim = el.dataset.anim;
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      el.style.opacity = '0';
      if (anim === 'up') el.style.transform = 'translateY(30px)';
      else if (anim === 'left') el.style.transform = 'translateX(-30px)';
      else if (anim === 'right') el.style.transform = 'translateX(30px)';
      else if (anim === 'fade') el.style.transform = 'scale(.97)';
      animObserver.observe(el);
    });
  }

  // ---- Copy Code Buttons ----
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block')?.querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText.trim()).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
      });
    });
  });

  // ---- Endpoint Accordion ----
  document.querySelectorAll('.endpoint-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.endpoint-card');
      card.classList.toggle('open');
    });
  });

  // ---- Sidebar active highlight ----
  const sidebarLinks = document.querySelectorAll('.sidebar-link[href]');
  if (sidebarLinks.length) {
    sidebarLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // ---- Mobile Sidebar Toggle ----
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const docSidebar = document.getElementById('doc-sidebar');
  if (sidebarToggle && docSidebar) {
    sidebarToggle.addEventListener('click', () => {
      docSidebar.classList.toggle('mobile-open');
    });
  }

  // ---- Smooth Typewriter effect for hero ----
  const typeEl = document.querySelector('[data-typewriter]');
  if (typeEl) {
    const words = JSON.parse(typeEl.dataset.typewriter || '[]');
    if (words.length) {
      let wIdx = 0, cIdx = 0, deleting = false;
      function type() {
        const word = words[wIdx];
        if (deleting) {
          typeEl.textContent = word.slice(0, --cIdx);
        } else {
          typeEl.textContent = word.slice(0, ++cIdx);
        }
        let speed = deleting ? 50 : 100;
        if (!deleting && cIdx === word.length) { speed = 1800; deleting = true; }
        else if (deleting && cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; speed = 300; }
        setTimeout(type, speed);
      }
      type();
    }
  }

  // ---- Contact Form ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'var(--success)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1600);
    });
  }

  // ---- Tabs ----
  document.querySelectorAll('[data-tab-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const group = trigger.dataset.tabGroup;
      const target = trigger.dataset.tabTrigger;
      document.querySelectorAll(`[data-tab-group="${group}"]`).forEach(t => t.classList.remove('active'));
      document.querySelectorAll(`[data-tab-panel="${group}"]`).forEach(p => {
        p.style.display = p.dataset.tabTarget === target ? 'block' : 'none';
      });
      trigger.classList.add('active');
    });
  });
  // init tabs
  document.querySelectorAll('[data-tab-trigger]').forEach(trigger => {
    const group = trigger.dataset.tabGroup;
    const panels = document.querySelectorAll(`[data-tab-panel="${group}"]`);
    if (!document.querySelector(`[data-tab-group="${group}"].active`)) {
      if (trigger === document.querySelector(`[data-tab-group="${group}"]`)) {
        trigger.classList.add('active');
        const t = trigger.dataset.tabTrigger;
        panels.forEach(p => { p.style.display = p.dataset.tabTarget === t ? 'block' : 'none'; });
      }
    }
  });

  console.log('%c Technical Writer Portfolio ', 'background:#1565c0;color:#f4a924;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:4px;');
});
