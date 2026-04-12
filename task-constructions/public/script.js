/* ═══════════════════════════════════════════════════════
   TASK CONSTRUCTIONS — script.js
   ═══════════════════════════════════════════════════════ */

/* ── Navbar scroll behaviour ───────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ── Mobile hamburger menu ─────────────────────────── */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav-link click
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ── Smooth scroll for anchor links ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    const navH = document.getElementById('navbar').offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

/* ── Intersection Observer: reveal on scroll ────────── */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) { observer.observe(el); });
})();

/* ── Intersection Observer: location cards ──────────── */
(function () {
  const cards = document.querySelectorAll('.location-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  cards.forEach(function (card) { observer.observe(card); });
})();

/* ── Counter animation ──────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(eased * target);

      el.textContent = current + (progress === 1 ? suffix : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(function (counter) { observer.observe(counter); });
})();

/* ══════════════════════════════════════════════════════
   PART 2 — Attic cards, Feature cards, Gallery, Testimonials
══════════════════════════════════════════════════════ */

/* ── Staggered reveal for attic cards ──────────────── */
(function () {
  const atticCards = document.querySelectorAll('.attic-card');
  if (!atticCards.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.style.getPropertyValue('--card-delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  atticCards.forEach(function (card) { observer.observe(card); });
})();

/* ── Staggered reveal for feature cards ────────────── */
(function () {
  var featureCards = document.querySelectorAll('.feature-card');
  if (!featureCards.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.style.getPropertyValue('--card-delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  featureCards.forEach(function (card) { observer.observe(card); });
})();

/* ── Staggered reveal for testimonial cards ─────────── */
(function () {
  var testimonialCards = document.querySelectorAll('.testimonial-card');
  if (!testimonialCards.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.style.getPropertyValue('--card-delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
  );

  testimonialCards.forEach(function (card) { observer.observe(card); });
})();

/* ══════════════════════════════════════════════════════
   PART 3 — Loader, Active Nav, Back-to-Top, Form, Toast
══════════════════════════════════════════════════════ */

/* ── Page loader ────────────────────────────────────── */
(function () {
  var loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Hide after 1.5s (bar animation finishes at 1.3s)
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
      // Remove from DOM after transition so it doesn't block anything
      loader.addEventListener('transitionend', function () {
        loader.remove();
      }, { once: true });
    }, 1500);
  });
})();

/* ── Debounced scroll utility ───────────────────────── */
function debounce(fn, wait) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}

/* ── Replace navbar scroll handler with debounced version ── */
/* (Supplements Part 1 handler — both are passive, this adds debounce) */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  var debouncedScroll = debounce(function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 10);

  window.addEventListener('scroll', debouncedScroll, { passive: true });
})();

/* ── Active nav section highlighting ───────────────── */
(function () {
  var sections   = document.querySelectorAll('section[id]');
  var navLinks   = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  var navH = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-h') || '72', 10);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-' + (navH + 10) + 'px 0px -50% 0px',
      threshold: 0
    }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();

/* ── Back to top button ─────────────────────────────── */
(function () {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  var debouncedCheck = debounce(function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, 50);

  window.addEventListener('scroll', debouncedCheck, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Toast notification ─────────────────────────────── */
function showToast(message) {
  var container = document.getElementById('toastContainer');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML =
    '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">' +
    '<polyline points="20 6 9 17 4 12"/>' +
    '</svg>' +
    '<span>' + message + '</span>';

  container.appendChild(toast);

  // Auto-dismiss after 4 seconds
  setTimeout(function () {
    toast.classList.add('dismissing');
    toast.addEventListener('animationend', function () {
      toast.remove();
    }, { once: true });
  }, 4000);
}

/* ── Enquiry form submit ────────────────────────────── */
(function () {
  var form = document.getElementById('enquiryForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect required fields and validate manually
    var valid = true;
    var requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      if (!field.value.trim()) {
        valid = false;
        field.focus();
      }
    });

    // Phone pattern check
    var phone = form.querySelector('#phone');
    if (phone && phone.value.trim()) {
      var phonePattern = /^[+]?[0-9\s\-]{10,15}$/;
      if (!phonePattern.test(phone.value.trim())) {
        valid = false;
        phone.focus();
        phone.setCustomValidity('Please enter a valid phone number (10-15 digits).');
        phone.reportValidity();
        phone.setCustomValidity('');
        return;
      }
    }

    // Email pattern check (optional field)
    var email = form.querySelector('#email');
    if (email && email.value.trim()) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        valid = false;
        email.focus();
        email.setCustomValidity('Please enter a valid email address.');
        email.reportValidity();
        email.setCustomValidity('');
        return;
      }
    }

    if (!valid) {
      form.reportValidity();
      return;
    }

    // Success — show toast and reset
    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      var originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        showToast('Thank you! We\'ll contact you shortly.');
      }, 800); // brief simulated delay for UX feel
    }
  });

  // Clear custom validity on input so invalid state clears as user types
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      field.setCustomValidity('');
    });
  });
})();
