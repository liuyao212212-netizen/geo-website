(function initSyncCarousel() {
  const root = document.querySelector('[data-sync-carousel]');
  if (!root) return;

  const track = root.querySelector('.section-3p5__phone-track');
  const shots = root.querySelectorAll('.section-3p5__phone-shot');
  const dots = root.querySelectorAll('.section-3p5__dot');
  const captions = root.querySelectorAll('.section-3p5__caption');
  if (!track || !shots.length || !dots.length || !captions.length) return;

  let index = 0;
  let timer = null;
  let restartTimer = null;
  const interval = 3000;
  const total = shots.length;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  function setIndex(nextIndex) {
    index = (nextIndex + total) % total;
    track.style.transform = 'translate3d(0, 0, 0)';

    shots.forEach((el, itemIndex) => {
      el.classList.toggle('is-active', itemIndex === index);
    });

    dots.forEach((el, itemIndex) => {
      const isActive = itemIndex === index;
      el.classList.toggle('is-active', isActive);
      el.setAttribute('aria-selected', String(isActive));
    });

    captions.forEach((el, itemIndex) => {
      el.classList.toggle('is-active', itemIndex === index);
    });
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (reduceMotion) return;
    timer = setInterval(() => setIndex(index + 1), interval);
  }

  function restartLater() {
    stop();
    if (restartTimer) clearTimeout(restartTimer);
    restartTimer = setTimeout(start, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const nextIndex = Number.parseInt(dot.dataset.index || '0', 10);
      setIndex(Number.isNaN(nextIndex) ? 0 : nextIndex);
      restartLater();
    });
  });

  if (canHover) {
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) start();
        else stop();
      });
    }, { threshold: 0.2 });

    io.observe(root);
  } else {
    start();
  }

  let dragStartX = 0;
  let dragging = false;

  const onDragStart = clientX => {
    dragStartX = clientX;
    dragging = true;
  };
  const onDragEnd = clientX => {
    if (!dragging) return;
    dragging = false;
    const delta = clientX - dragStartX;
    if (Math.abs(delta) <= 40) return;
    setIndex(index + (delta < 0 ? 1 : -1));
    restartLater();
  };

  // Touch (mobile)
  root.addEventListener('touchstart', event => {
    onDragStart(event.changedTouches[0].clientX);
  }, { passive: true });
  root.addEventListener('touchend', event => {
    onDragEnd(event.changedTouches[0].clientX);
  }, { passive: true });

  // Mouse drag (desktop) — 限定手机区域避免抓 captions 文字
  const phoneEl = root.querySelector('.section-3p5__phone');
  if (phoneEl) {
    phoneEl.style.cursor = 'grab';
    phoneEl.addEventListener('mousedown', event => {
      if (event.button !== 0) return;
      event.preventDefault();
      phoneEl.style.cursor = 'grabbing';
      onDragStart(event.clientX);
    });
    window.addEventListener('mouseup', event => {
      if (!dragging) return;
      phoneEl.style.cursor = 'grab';
      onDragEnd(event.clientX);
    });
  }

  setIndex(0);
})();
