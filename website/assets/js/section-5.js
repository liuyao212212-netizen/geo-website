(function initSection5LogoMarquee() {
  const wall = document.querySelector('.section-5__logo-wall');
  if (!wall) return;

  const loop = wall.querySelector('.section-5__logo-loop');
  const grids = wall.querySelectorAll('.section-5__logo-grid');
  if (!loop || grids.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverDevice = window.matchMedia('(hover: hover)');

  let rafId = 0;
  let intervalId = 0;
  let offset = 0;
  let distance = 0;
  let lastTime = 0;
  let isInView = true;
  let isHoverPaused = false;
  let resizeTimer = 0;

  const speed = 28;
  const useRaf = typeof window.requestAnimationFrame === 'function';

  wall.dataset.marqueeReady = 'true';

  function isWallVisible() {
    const rect = wall.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function measure() {
    distance = grids[0].offsetHeight || 0;
    loop.dataset.marqueeDistance = String(Math.round(distance));
    if (distance > 0) offset %= distance;
    render();
  }

  function render() {
    loop.style.transform = `translate3d(0, -${offset}px, 0)`;
    loop.dataset.marqueeOffset = offset.toFixed(2);
  }

  function shouldRun() {
    return !reduceMotion.matches && isInView && !isHoverPaused && distance > 0;
  }

  function stop() {
    if (rafId) window.cancelAnimationFrame(rafId);
    if (intervalId) window.clearInterval(intervalId);
    rafId = 0;
    intervalId = 0;
  }

  function step(now) {
    if (!shouldRun()) {
      stop();
      return;
    }

    if (!lastTime) lastTime = now;
    const delta = Math.min(now - lastTime, 1000) / 1000;
    lastTime = now;
    offset = (offset + speed * delta) % distance;
    render();
  }

  function tick(now) {
    step(now);
    if (!shouldRun()) return;
    rafId = window.requestAnimationFrame(tick);
  }

  function start() {
    if (!isInView && isWallVisible()) isInView = true;
    if (rafId || intervalId || !shouldRun()) return;
    lastTime = 0;
    if (useRaf) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      intervalId = window.setInterval(() => step(Date.now()), 16);
    }
  }

  function refresh() {
    stop();
    isInView = isWallVisible();
    measure();
    start();
  }

  measure();
  start();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isInView = entry.isIntersecting;
        if (isInView) start();
        else stop();
      });
    }, { threshold: 0.1 });
    observer.observe(wall);
  }

  if (hoverDevice.matches) {
    wall.addEventListener('mouseenter', () => {
      isHoverPaused = true;
      stop();
    });

    wall.addEventListener('mouseleave', () => {
      isHoverPaused = false;
      start();
    });
  }

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refresh, 180);
  }, { passive: true });

  window.addEventListener('load', refresh, { once: true });
  window.setTimeout(refresh, 300);
  window.setTimeout(refresh, 1000);
})();
