(function () {
  'use strict';

  /* ── Respect prefers-reduced-motion ── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Equalizer bar generator ── */
  var eq = document.getElementById('mm-equalizer');
  if (eq && !reducedMotion) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 90; i++) {
      var bar = document.createElement('div');
      bar.className = 'mm-eq-bar';
      bar.style.setProperty('--min-h', (4  + Math.random() * 13)  + 'px');
      bar.style.setProperty('--max-h', (30 + Math.random() * 109) + 'px');
      bar.style.setProperty('--d',     (0.5 + Math.random())      + 's');
      bar.style.setProperty('--delay', (Math.random() * 1.5)      + 's');
      frag.appendChild(bar);
    }
    eq.appendChild(frag);
  }

  /* ── Scroll reveal (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('mm-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.mm-reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: make everything visible immediately */
    document.querySelectorAll('.mm-reveal').forEach(function (el) {
      el.classList.add('mm-visible');
    });
  }

  /* ── Nav border on scroll ── */
  var nav = document.getElementById('mm-nav');
  if (nav) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          nav.style.borderBottomColor = window.scrollY > 40
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(255,255,255,0.06)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();
