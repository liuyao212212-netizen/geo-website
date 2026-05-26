(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;

  var title = hero.querySelector('[data-hero-title]');
  var video = hero.querySelector('.hero-video');

  function activateTitle() {
    if (!title) return;
    if (title.classList) {
      title.classList.add('is-active');
      return;
    }
    if (title.className.indexOf('is-active') === -1) {
      title.className += ' is-active';
    }
  }

  if (title && title.classList) {
    title.classList.remove('is-active');
    title.offsetWidth;
  }

  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(activateTitle);
    if (typeof window.setTimeout === 'function') {
      window.setTimeout(activateTitle, 120);
    }
  } else if (typeof window.setTimeout === 'function') {
    window.setTimeout(activateTitle, 16);
  } else {
    activateTitle();
  }

  if (title && title.classList && typeof window.setTimeout === 'function') {
    window.setTimeout(function () {
      title.classList.add('is-settled');
    }, 1500);
  }

  if (video && typeof video.play === 'function') {
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {});
    }
  }

  // AI 平台 logo 轮播（blur 淡入淡出）
  var platformsWrap = hero.querySelector('[data-hero-platforms]');
  if (platformsWrap) {
    var items = Array.prototype.slice.call(platformsWrap.querySelectorAll('.hero-platform'));
    if (items.length > 1) {
      var idx = 0;
      var interval = 2200;
      var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        if (window.__heroPlatformsTimer) {
          window.clearInterval(window.__heroPlatformsTimer);
        }
        window.__heroPlatformsTimer = window.setInterval(function () {
          items[idx].classList.remove('is-active');
          idx = (idx + 1) % items.length;
          items[idx].classList.add('is-active');
        }, interval);
      }
    }
  }
})();
