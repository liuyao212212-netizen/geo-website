(() => {
  if (!window.Lenis) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: t => 1 - Math.pow(1 - t, 3),
    smooth: true,
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: false
  });

  window.SiteLenis = lenis;

  const syncHtmlClass = () => {
    document.documentElement.classList.remove('has-');
    document.documentElement.classList.add('has-lenis');
  };

  const nextFrame = window.requestAnimationFrame
    || (window.setTimeout ? (callback => window.setTimeout(() => callback(Date.now()), 16)) : (callback => callback(Date.now())));

  syncHtmlClass();

  const raf = time => {
    lenis.raf(time);
    syncHtmlClass();
    nextFrame(raf);
  };

  nextFrame(raf);

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    let target = null;
    try {
      target = document.querySelector(href);
    } catch (error) {
      return;
    }

    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: 0 });
  });

  document.addEventListener('click', event => {
    const trigger = event.target.closest('.footer-to-top');
    if (!trigger) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    lenis.scrollTo(0, { offset: 0 });
  }, true);
})();
