/* ================================================================
   HERO SCATTER — GSAP ScrollTrigger
   Decisions from user:
     • Hero PINNED (option A) — sticks for 40vh of scroll
     • RISHIKESH → up | R → down | bio → left | socials → right
     • Portrait → down + scale away from center
     • Statement → surfaces from behind (scale 0.93→1, y 65→0)
     • Speed: fast (pin end = +=40%)
     • After scatter: normal scroll, no pause
================================================================ */

(function () {
  /* Guard: GSAP must be loaded and reduced-motion must be off */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    /* Fallback: immediately show statement elements */
    document.querySelectorAll('.statement-text, .focus-list').forEach(function(el) {
      el.style.opacity    = '1';
      el.style.transform  = '';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── Scatter + Surface timeline ──────────────────────────── */
  var scatter = gsap.timeline({ defaults: { ease: 'power2.inOut', duration: 1 } });

  scatter
    /* Hero elements scatter OUT — explicit fromTo ensures correct reverse */
    .fromTo('.hero-fname',    { y: 0, opacity: 1 }, { y: '-110vh', opacity: 0 }, 0)
    .fromTo('.hero-lname',    { y: 0, opacity: 1 }, { y: '-110vh', opacity: 0 }, 0)
    .fromTo('.hero-bio',      { x: 0, opacity: 1 }, { x: '-95vw',  opacity: 0 }, 0)
    .fromTo('.hero-socials',  { x: 0, opacity: 1 }, { x: '95vw',   opacity: 0 }, 0)
    .fromTo('#portraitStage', { y: 0, scale: 1, opacity: 1 }, { y: '280px', scale: 0.55, opacity: 0 }, 0)

    /* Statement elements emerge IN from center */
    .to('.statement-text', { scale: 1, opacity: 1, ease: 'power2.out' }, 0.4)
    .fromTo('.statement .bg-word-inner', { x: '10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.4)
    .to('.focus-list',     { scale: 1, opacity: 1, ease: 'power2.out' }, 0.6);

  /* Pin the wrapper stack on desktop only; allow natural scroll on mobile */
  ScrollTrigger.matchMedia({
    "(min-width: 861px)": function() {
      ScrollTrigger.create({
        animation:     scatter,
        trigger:       '.hero-statement-stack',
        start:         'top top',
        end:           '+=120%',
        pin:           true,
        scrub:         1.5,
        invalidateOnRefresh: true,
      });
    },
    "(max-width: 860px)": function() {
      ScrollTrigger.create({
        animation:     scatter,
        trigger:       '.hero-statement-stack',
        start:         'top top',
        end:           'bottom top',
        pin:           false,
        scrub:         1,
        invalidateOnRefresh: true,
      });
    }
  });

  /* ── 2. Background Words Scroll Reveals ──────────────────── */
  /* WORK: Slide in from left */
  gsap.from('.bg-word-work', {
    scrollTrigger: {
      trigger: '.work',
      start: 'top 90%',
      end: 'top 40%',
      scrub: 2
    },
    x: '-60vw',
    ease: 'none'
  });

  /* SERVICES: Slide in from right */
  gsap.from('.bg-word-services', {
    scrollTrigger: {
      trigger: '.services',
      start: 'top 90%',
      end: 'top 40%',
      scrub: 2
    },
    x: '60vw',
    ease: 'none'
  });

  /* BUILT: Slide in from left */
  gsap.from('.bg-word-built', {
    scrollTrigger: {
      trigger: '.what-built',
      start: 'top 90%',
      end: 'top 40%',
      scrub: 2
    },
    x: '-60vw',
    ease: 'none'
  });

  /* CONTACT: Slide in from bottom — triggers reliably when section enters viewport */
  gsap.from('.bg-word-contact', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 85%',
      end: 'bottom 85%',
      scrub: 1.5
    },
    y: '50vh',
    ease: 'none'
  });

  /* ── Scroll position save/restore ───────────────────────────
     Problem: browser scroll-restore races with GSAP pin math.
     Fix: take manual control.
       1. Disable browser auto-restore (history.scrollRestoration).
       2. Save position to sessionStorage on unload.
       3. GSAP inits cleanly from scroll=0 (pin spacer correct).
       4. After two rAF cycles, scroll to saved position so GSAP
          scrubs to the right state — and reverse works perfectly.
  ────────────────────────────────────────────────────────── */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('gsap_scroll', window.scrollY);
  });

  var savedY = parseInt(sessionStorage.getItem('gsap_scroll') || '0', 10);
  sessionStorage.removeItem('gsap_scroll');

  if (savedY > 0) {
    /* Two rAF cycles: first lets GSAP finish registering all
       triggers and insert pin spacers; second lets the browser
       paint before we move the scroll pointer. */
    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
      requestAnimationFrame(function () {
        window.scrollTo({ top: savedY, behavior: 'instant' });
      });
    });
  }

})();

(function () {
  'use strict';


  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------
     SCROLL-TRIGGERED REVEAL
     Uses IntersectionObserver. Elements start hidden (opacity 0,
     translateY, blur) via CSS class .reveal, then get .in added
     when they enter the viewport. Hero elements already have .in.
  ---------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal:not(.in)');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -6% 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    /* reduced motion or no IO support — show everything immediately */
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ----------------------------------------------------------------
     GENTLE PARALLAX ON BACKGROUND WORDS
     Runs on rAF, passive scroll listener. Each bg-word moves at a
     slightly different speed based on its index.
  ---------------------------------------------------------------- */
  if (!reduceMotion) {
    var bgWords = document.querySelectorAll('.bg-word');
    var ticking  = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          bgWords.forEach(function (w, i) {
            var speed = 0.04 + (i % 3) * 0.015;
            /* Preserve any existing non-translateY transforms (rotate, etc.) */
            var existing = w.style.transform || '';
            var base = existing.replace(/translateY\([^)]*\)\s*/g, '');
            w.style.transform = 'translateY(' + (y * speed * 0.15) + 'px) ' + base;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     NAV — solidify pill on scroll
  ---------------------------------------------------------------- */
  var navPill = document.getElementById('navPill');

  window.addEventListener('scroll', function () {
    navPill.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ----------------------------------------------------------------
     ACCORDION
     Single-open: closing the previous item when another opens.
  ---------------------------------------------------------------- */
  function openPanel(item) {
    var panel  = item.querySelector('.accordion-panel');
    var header = item.querySelector('.accordion-header');
    item.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  function closePanel(item) {
    var panel  = item.querySelector('.accordion-panel');
    var header = item.querySelector('.accordion-header');
    item.classList.remove('open');
    header.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = null;
  }

  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var header = item.querySelector('.accordion-header');
    var panel  = item.querySelector('.accordion-panel');

    /* Set initial height for the pre-opened item (waits for layout) */
    if (item.classList.contains('open')) {
      window.requestAnimationFrame(function () {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    }

    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      /* Close all other open items first */
      document.querySelectorAll('.accordion-item.open').forEach(function (other) {
        if (other !== item) { closePanel(other); }
      });

      /* Toggle clicked item */
      if (isOpen) {
        closePanel(item);
      } else {
        openPanel(item);
      }
    });
  });

  /* Recalculate heights on window resize */
  window.addEventListener('resize', function () {
    document.querySelectorAll('.accordion-item.open .accordion-panel').forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  }, { passive: true });

  /* ----------------------------------------------------------------
     MOBILE MENU
  ---------------------------------------------------------------- */
  var burger  = document.getElementById('navBurger');
  var overlay = document.getElementById('menuOverlay');
  var closeBtn = document.getElementById('menuClose');

  function openMenu() {
    overlay.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  /* Close on any nav link click */
  overlay.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  /* ----------------------------------------------------------------
     SCROLL CUE — hide once user has scrolled past hero
  ---------------------------------------------------------------- */
  var scrollCue = document.querySelector('.scroll-cue');
  if (scrollCue) {
    window.addEventListener('scroll', function () {
      scrollCue.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     PORTRAIT — Fluid dynamic color reveal
     Technique: BW image (z:2) sits atop color image (z:1).
     A CSS radial-gradient mask cuts a "spotlight" hole in the BW
     layer at the cursor position, revealing color beneath.
     
     Dynamics:
       • Radius grows with cursor speed (velocity) up to MAX_R
       • When cursor stops, radius decays back to BASE_R
       • On mouseleave, radius lerps to 0 (spotlight closes)
       • Gradient has 3 soft stops so color bleeds naturally
       • 3D tilt applied simultaneously
  ---------------------------------------------------------------- */
  (function () {
    var stage = document.getElementById('portraitStage');
    var bw    = document.getElementById('photoBW');
    if (!stage || !bw || reduceMotion) return;

    /* — state — */
    var mx = 50, my = 50;      /* cursor % position on stage */
    var r  = 0;                /* current rendered radius */
    var BASE_R  = 160;         /* resting radius */
    var MAX_R   = 360;         /* max radius at full speed */
    var vel     = 0;           /* cursor speed (px/frame) */
    var hovering = false;
    var raf;

    /* Previous raw cursor coords for velocity calc */
    var prevCX = 0, prevCY = 0;

    /* Soft 3-stop radial mask — color bleeds into grey at edges */
    function applyMask() {
      if (r < 1) {
        bw.style.webkitMaskImage = '';
        bw.style.maskImage       = '';
        return;
      }
      var inner = (r * 0.42).toFixed(1);   /* fully transparent core */
      var mid   = (r * 0.72).toFixed(1);   /* soft colour bleed zone */
      var outer = r.toFixed(1);             /* fully opaque edge */
      var m = 'radial-gradient(circle ' + outer + 'px at ' + mx + '% ' + my + '%, '
              + 'transparent 0%, '
              + 'transparent ' + inner + 'px, '
              + 'rgba(0,0,0,0.55) ' + mid + 'px, '
              + 'black ' + outer + 'px)';
      bw.style.webkitMaskImage = m;
      bw.style.maskImage       = m;
    }

    function tick() {
      /* Velocity decays each frame */
      vel *= 0.82;

      /* Dynamic target: base + velocity boost */
      var dynTarget = hovering ? BASE_R + vel : 0;

      /* Lerp radius toward dynamic target */
      r += (dynTarget - r) * 0.13;
      if (Math.abs(r - dynTarget) < 0.4) r = dynTarget;

      applyMask();

      /* Keep ticking while there's meaningful motion */
      if (Math.abs(r - dynTarget) > 0.3 || vel > 0.5) {
        raf = requestAnimationFrame(tick);
      }
    }

    /* — Mouse events — */
    stage.addEventListener('mousemove', function (e) {
      var rect = stage.getBoundingClientRect();

      /* Velocity from raw cursor distance since last event */
      var dxPx = e.clientX - prevCX;
      var dyPx = e.clientY - prevCY;
      vel = Math.min(Math.sqrt(dxPx * dxPx + dyPx * dyPx) * 5, MAX_R - BASE_R);
      prevCX = e.clientX;
      prevCY = e.clientY;

      /* Position as % of container */
      mx = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2);
      my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2);

      hovering = true;

      /* Immediately apply new position (no lag on tracking) */
      applyMask();

      /* Kick off decay tick if not already running */
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }, { passive: true });

    stage.addEventListener('mouseenter', function (e) {
      prevCX = e.clientX;
      prevCY = e.clientY;
      hovering = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    });

    stage.addEventListener('mouseleave', function () {
      hovering = false;
      vel = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
      /* Restore tilt */
      stage.style.transition = 'transform 0.8s cubic-bezier(0.22,1,0.36,1), box-shadow 0.7s var(--ease)';
      stage.style.transform  = '';
    });

    /* — Subtle 3D tilt — runs on every mousemove — */
    stage.addEventListener('mousemove', function (e) {
      var rect = stage.getBoundingClientRect();
      var cx   = (e.clientX - rect.left) / rect.width  - 0.5;
      var cy   = (e.clientY - rect.top)  / rect.height - 0.5;
      stage.style.transition = 'box-shadow 0.7s var(--ease)';
      stage.style.transform  =
        'perspective(700px) rotateX(' + (cy * -7).toFixed(2) + 'deg)' +
        ' rotateY(' + (cx *  7).toFixed(2) + 'deg) scale(1.018)';
    }, { passive: true });

    /* — Touch events for mobile — */
    var touchTimeout;
    function handleTouch(e) {
      if (!e.touches || !e.touches[0]) return;
      var t = e.touches[0];
      var rect = stage.getBoundingClientRect();
      mx = ((t.clientX - rect.left) / rect.width  * 100).toFixed(2);
      my = ((t.clientY - rect.top)  / rect.height * 100).toFixed(2);
      vel = MAX_R - BASE_R;
      hovering = true;
      applyMask();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(function() {
        hovering = false;
        vel = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }, 2500);
    }
    stage.addEventListener('touchstart', handleTouch, { passive: true });
    stage.addEventListener('touchmove',  handleTouch, { passive: true });
  })();

})();

/* ================================================================
   WORK CARD CAROUSELS — inline multi-instance controller
   Handles all four carousels by ID (1–4).
================================================================ */
(function () {
  [1, 2, 3, 4].forEach(function (id) {
    var track   = document.getElementById('wc-track-' + id);
    var dotsEl  = document.getElementById('wc-dots-' + id);
    var prevBtn = document.querySelector('[data-wc-prev="' + id + '"]');
    var nextBtn = document.querySelector('[data-wc-next="' + id + '"]');

    if (!track || !dotsEl) return;

    var slides    = Array.from(track.querySelectorAll('.wc-slide'));
    var total     = slides.length;
    var current   = 0;
    var animating = false;

    slides[0].classList.add('is-current');

    slides.forEach(function (_, i) {
      var btn = document.createElement('button');
      btn.className = 'wc-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      var bar = document.createElement('span');
      bar.className = 'wc-bar';
      btn.appendChild(bar);
      btn.addEventListener('click', function (e) { e.stopPropagation(); goTo(i); });
      dotsEl.appendChild(btn);
    });
    var dots = Array.from(dotsEl.children);

    function updateDots() {
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    function goTo(target) {
      if (animating || target === current) return;
      var dir = target > current ? 1 : -1;
      animating = true;

      var out = slides[current];
      var inc = slides[target];

      inc.style.transform = dir === 1 ? 'translateX(100%)' : 'translateX(-100%)';
      inc.style.zIndex = 3;
      out.style.zIndex = 2;
      void inc.offsetWidth;

      out.classList.add('transitioning');
      inc.classList.add('transitioning');

      requestAnimationFrame(function () {
        out.style.transform = dir === 1 ? 'translateX(-85%)' : 'translateX(85%)';
        inc.style.transform = 'translateX(0%)';
      });

      function cleanup() {
        out.classList.remove('transitioning', 'is-current');
        inc.classList.remove('transitioning');
        inc.classList.add('is-current');
        out.style.transform = dir === 1 ? 'translateX(-100%)' : 'translateX(100%)';
        out.style.zIndex = 1;
        inc.style.zIndex = 3;
        current = target;
        animating = false;
        updateDots();
        out.removeEventListener('transitionend', cleanup);
      }
      out.addEventListener('transitionend', cleanup);
      setTimeout(function () { if (animating) cleanup(); }, 600);
    }

    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo((current + 1) % total); });
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo((current - 1 + total) % total); });

    var touchX = null, touchY = null;
    track.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (touchX === null || touchY === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      var dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        goTo(dx < 0 ? (current + 1) % total : (current - 1 + total) % total);
      }
      touchX = null;
      touchY = null;
    }, { passive: true });
  });
})();
