/* ============================================
   System Demo Carousel — 笔记本电脑轮播
   ────────────────────────────────────────────
   - Swiper.js 驱动整台电脑 slide 切换
   - 自定义箭头按钮 + 自定义长条形分页器
   - caption 标题/描述跟 slideChange 同步
   - 手写 autoplay（避开 Swiper.autoplay 与 init 的竞态）
   - hover / 拖动 / 离开视口 都会暂停 autoplay
   ============================================ */

(function initSystemDemo() {
  const root = document.querySelector('[data-system-demo]');
  if (!root) return;

  const swiperEl = root.querySelector('.system-demo__swiper');
  if (!swiperEl) return;

  const prevBtn = root.querySelector('.system-demo__nav--prev');
  const nextBtn = root.querySelector('.system-demo__nav--next');
  const paginationEl = root.querySelector('.system-demo__pagination');
  const captionTitleEl = root.querySelector('[data-system-caption-title]');
  const captionDescEl = root.querySelector('[data-system-caption-desc]');

  const start = () => {
    if (typeof window.Swiper !== 'function') {
      window.setTimeout(start, 60);
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slides = Array.from(swiperEl.querySelectorAll('.swiper-slide'));
    const total = slides.length;

    // 生成自定义长条分页器
    if (paginationEl && total > 0) {
      paginationEl.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'system-demo__pagination-bullet';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', `第 ${i + 1} 张演示`);
        b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        b.dataset.index = String(i);
        paginationEl.appendChild(b);
      }
    }

    // caption 更新（简化：直接换文字，不做单独过渡 - 避免 transitionend 冒泡干扰 Swiper）
    const updateCaption = (realIdx) => {
      const slide = slides[realIdx];
      if (!slide) return;
      if (captionTitleEl) captionTitleEl.textContent = slide.dataset.title || '';
      if (captionDescEl) captionDescEl.textContent = slide.dataset.desc || '';
    };

    // 分页器选中态同步
    const updatePagination = (realIdx) => {
      if (!paginationEl) return;
      paginationEl.querySelectorAll('.system-demo__pagination-bullet').forEach((b, i) => {
        b.setAttribute('aria-selected', i === realIdx ? 'true' : 'false');
      });
    };

    const swiper = new window.Swiper(swiperEl, {
      effect: 'slide',
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      loop: false,
      rewind: true,
      grabCursor: true,
      followFinger: true,
      touchRatio: 1,
      threshold: 5,
      shortSwipes: true,
      longSwipesRatio: 0.2,
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: { enabled: true, prevSlideMessage: '上一张演示', nextSlideMessage: '下一张演示' },
      autoplay: false, // 手写控制
      on: {
        init(s) {
          window.requestAnimationFrame(() => s.update());
        },
        slideChange(s) {
          updatePagination(s.realIndex);
          updateCaption(s.realIndex);
        }
        // ❌ 不在 slideChangeTransitionEnd 调 update()：会和 loopFix 形成反馈环
      }
    });

    // 字体加载完毕后校准
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        const idx = swiper.activeIndex;
        swiper.update();
        swiper.slideTo(idx, 0, false);
      });
    }

    // 自定义箭头按钮
    prevBtn?.addEventListener('click', () => swiper.slidePrev());
    nextBtn?.addEventListener('click', () => swiper.slideNext());

    // 自定义分页器点击
    paginationEl?.addEventListener('click', (e) => {
      const b = e.target.closest('.system-demo__pagination-bullet');
      if (!b) return;
      const idx = Number.parseInt(b.dataset.index, 10);
      if (Number.isInteger(idx)) swiper.slideTo(idx);
    });

    // ---------- 手写 autoplay ----------
    const AUTOPLAY_MS = 3000;
    let autoTimer = null;
    let isHovering = false;
    let isVisible = false;
    let isDragging = false;

    const advance = () => {
      if (isDragging || swiper.animating) return;
      swiper.slideNext();
    };
    const startAuto = () => {
      if (reduceMotion || autoTimer || isHovering || isDragging || !isVisible) return;
      autoTimer = window.setInterval(advance, AUTOPLAY_MS);
    };
    const stopAuto = () => {
      if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
    };

    // 拖动时暂停 autoplay
    swiper.on('touchStart', () => { isDragging = true; stopAuto(); });
    swiper.on('touchEnd', () => {
      isDragging = false;
      window.setTimeout(startAuto, 1500);
    });

    // hover 暂停
    if (window.matchMedia('(hover: hover)').matches) {
      root.addEventListener('mouseenter', () => { isHovering = true; stopAuto(); });
      root.addEventListener('mouseleave', () => { isHovering = false; startAuto(); });
    }

    // 用户点箭头/分页后重启 autoplay 间隔
    [prevBtn, nextBtn, paginationEl].forEach(el => {
      el?.addEventListener('click', () => {
        stopAuto();
        window.setTimeout(startAuto, 2000);
      });
    });

    // 进入视口才播
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            window.requestAnimationFrame(() => { swiper.update(); startAuto(); });
          } else {
            stopAuto();
          }
        });
      }, { threshold: 0.2 });
      io.observe(swiperEl);
    } else {
      isVisible = true;
      startAuto();
    }

    // 初始化首个 caption（如果 init 时 slideChange 没触发）
    updateCaption(0);
    updatePagination(0);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
