(() => {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const state = {
    initialized: false,
    revealObserver: null,
    countupObserver: null,
    parallaxFrame: 0,
    parallaxItems: [],
    parallaxCleanup: null
  };

  const isReducedMotion = () => reducedMotionQuery.matches;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const easeOutExpo = t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const outsideHero = el => !el.closest('[data-hero]');

  const splitText = (root = document) => {
    root.querySelectorAll('[data-text]:not([data-text-split="true"])').forEach(el => {
      if (!outsideHero(el)) return;
      if (el.children.length) {
        el.setAttribute('data-text-split', 'true');
        return;
      }

      const fragment = document.createDocumentFragment();
      Array.from(el.textContent || '').forEach(char => {
        if (/\s/u.test(char)) {
          fragment.appendChild(document.createTextNode(char));
          return;
        }

        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char;
        fragment.appendChild(span);
      });

      el.textContent = '';
      el.appendChild(fragment);
      el.setAttribute('data-text-split', 'true');
    });
  };

  const getRevealTargets = (root = document) => {
    const targets = root.querySelectorAll('[data-reveal], [data-reveal-group], [data-text]');
    return Array.from(targets).filter(outsideHero);
  };

  const isRepeat = el => (
    el.getAttribute('data-reveal') === 'repeat' ||
    el.getAttribute('data-reveal-group') === 'repeat' ||
    el.getAttribute('data-text') === 'repeat'
  );

  const initReveal = (root = document) => {
    if (state.revealObserver) state.revealObserver.disconnect();

    const targets = getRevealTargets(root);
    if (!targets.length) return;

    if (isReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-in'));
      return;
    }

    state.revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.intersectionRatio >= 0.15) {
          el.classList.add('is-in');
          if (!isRepeat(el)) observer.unobserve(el);
          return;
        }

        if (entry.intersectionRatio <= 0 && isRepeat(el)) {
          el.classList.remove('is-in');
        }
      });
    }, {
      threshold: [0, 0.15],
      rootMargin: '0px 0px -10% 0px'
    });

    targets.forEach(el => state.revealObserver.observe(el));
  };

  const parseParallax = el => {
    const values = String(el.getAttribute('data-parallax') || '').split(',').map(value => Number(value.trim()));
    if (values.length !== 2 || values.some(value => Number.isNaN(value))) return null;
    return { el, from: values[0], to: values[1] };
  };

  const updateParallax = () => {
    state.parallaxFrame = 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    const viewportCenter = viewportHeight / 2;

    state.parallaxItems.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      if (Math.abs(distance) > viewportHeight * 1.5) return;

      const progress = clamp(.5 - distance / (viewportHeight * 2), 0, 1);
      const y = item.from + (item.to - item.from) * progress;
      item.el.style.transform = `translate3d(0, ${y.toFixed(3)}px, 0)`;
    });
  };

  const tickParallax = () => {
    if (state.parallaxFrame) return;
    state.parallaxFrame = requestAnimationFrame(updateParallax);
  };

  const teardownParallax = () => {
    if (state.parallaxCleanup) state.parallaxCleanup();
    state.parallaxCleanup = null;
    state.parallaxItems = [];
    if (state.parallaxFrame) {
      cancelAnimationFrame(state.parallaxFrame);
      state.parallaxFrame = 0;
    }
  };

  const initParallax = (root = document) => {
    teardownParallax();
    if (isReducedMotion()) return;

    state.parallaxItems = Array.from(root.querySelectorAll('[data-parallax]')).filter(outsideHero).map(parseParallax).filter(Boolean);
    if (!state.parallaxItems.length) return;

    const resizeHandler = () => tickParallax();
    window.addEventListener('resize', resizeHandler, { passive: true });

    if (window.SiteLenis && typeof window.SiteLenis.on === 'function') {
      window.SiteLenis.on('scroll', tickParallax);
      state.parallaxCleanup = () => {
        if (typeof window.SiteLenis.off === 'function') window.SiteLenis.off('scroll', tickParallax);
        window.removeEventListener('resize', resizeHandler);
      };
    } else {
      window.addEventListener('scroll', tickParallax, { passive: true });
      state.parallaxCleanup = () => {
        window.removeEventListener('scroll', tickParallax);
        window.removeEventListener('resize', resizeHandler);
      };
    }

    tickParallax();
  };

  const formatValue = (value, decimals) => value.toFixed(decimals);

  const setCountupValue = (el, value, suffix, decimals) => {
    el.textContent = `${formatValue(value, decimals)}${suffix}`;
  };

  const readCountup = el => {
    const target = Number(el.getAttribute('data-countup'));
    if (Number.isNaN(target)) return null;

    return {
      el,
      target,
      suffix: el.getAttribute('data-countup-suffix') || '',
      duration: Number(el.getAttribute('data-countup-duration')) || 1800,
      decimals: Number(el.getAttribute('data-countup-decimals')) || 0
    };
  };

  const playCountup = item => {
    if (item.el.getAttribute('data-countup-done') === 'true') return;
    item.el.setAttribute('data-countup-done', 'true');

    if (isReducedMotion()) {
      setCountupValue(item.el, item.target, item.suffix, item.decimals);
      return;
    }

    const start = performance.now();
    const step = now => {
      const progress = clamp((now - start) / item.duration, 0, 1);
      setCountupValue(item.el, item.target * easeOutExpo(progress), item.suffix, item.decimals);
      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }
      setCountupValue(item.el, item.target, item.suffix, item.decimals);
    };

    requestAnimationFrame(step);
  };

  const initCountup = (root = document) => {
    if (state.countupObserver) state.countupObserver.disconnect();

    const items = Array.from(root.querySelectorAll('[data-countup]')).filter(outsideHero).map(readCountup).filter(Boolean);
    if (!items.length) return;

    items.forEach(item => {
      if (item.el.getAttribute('data-countup-done') !== 'true') {
        setCountupValue(item.el, 0, item.suffix, item.decimals);
      }
    });

    if (isReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach(playCountup);
      return;
    }

    state.countupObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const item = items.find(current => current.el === entry.target);
        if (!item) return;
        playCountup(item);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    items.forEach(item => {
      if (item.el.getAttribute('data-countup-done') !== 'true') {
        state.countupObserver.observe(item.el);
      }
    });
  };

  const refresh = (root = document) => {
    splitText(root);
    initReveal(root);
    initParallax(root);
    initCountup(root);
  };

  const init = (root = document) => {
    refresh(root);
    state.initialized = true;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }

  window.SiteReveal = { init, refresh, splitText };
})();
