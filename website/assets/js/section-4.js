/* ============================================================
   Section-4 客户的声音 — Swiper Coverflow 凹面 3D 轮播
   ────────────────────────────────────────────────
   - 凹面（depth 负值）：中间凹进去，两侧凸出来
   - loop: true 首尾相连
   - followFinger 跟手拖动 + autoplay 拖动时暂停
   - hover 暂停 + 离开视口暂停 + 键盘 + 点击侧卡跳转
   ============================================================ */

(function initSection4Coverflow() {
  const root = document.querySelector('.section-4__swiper');
  if (!root) return;

  const start = () => {
    if (typeof window.Swiper !== 'function') {
      window.setTimeout(start, 60);
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const swiper = new window.Swiper(root, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,                    // 首尾相连
      loopAdditionalSlides: 3,       // 多复制几张避免边缘空白
      speed: 600,
      spaceBetween: 0,
      // 移除 observer：会跟 slideChange 形成反馈环导致闪屏疯狂切换
      // resize 已经被 Swiper 内部处理
      watchSlidesProgress: true,
      // 跟手相关
      followFinger: true,
      touchRatio: 1,
      touchAngle: 45,
      threshold: 5,                  // 移动 >5px 才算 swipe，避免误触
      resistanceRatio: 0.5,
      longSwipesRatio: 0.2,          // 短滑也能切换
      longSwipesMs: 250,
      shortSwipes: true,
      coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: -260,                 // 负值 = 凹面
        modifier: 1,
        scale: 0.85,
        slideShadows: false
      },
      breakpoints: {
        0: {
          coverflowEffect: { rotate: 32, stretch: -40, depth: -140, modifier: 1, scale: 0.82, slideShadows: false },
          spaceBetween: 0
        },
        600: {
          coverflowEffect: { rotate: 38, stretch: 0, depth: -200, modifier: 1, scale: 0.84, slideShadows: false },
          spaceBetween: 0
        },
        1024: {
          coverflowEffect: { rotate: 42, stretch: 0, depth: -280, modifier: 1, scale: 0.85, slideShadows: false },
          spaceBetween: 0
        }
      },
      autoplay: false,               // 用下面手写的 setInterval 控制
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: {
        enabled: true,
        prevSlideMessage: '上一条客户证言',
        nextSlideMessage: '下一条客户证言'
      },
      on: {
        init(s) {
          window.requestAnimationFrame(() => {
            s.update();
          });
        }
        // 不在 slideChangeTransitionEnd 里调 update()
        // 那会跟 loop 的 loopFix 互相触发导致疯狂闪屏切换
      }
    });

    // 字体加载完成后再校准
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        const idx = swiper.activeIndex;
        swiper.update();
        swiper.slideTo(idx, 0, false);
      });
    }

    // 点击非中央卡片：跳到该卡片（用 realIndex 兼容 loop）
    root.addEventListener('click', (event) => {
      // 如果是拖动结束后的 click（Swiper 内部已处理），跳过
      if (swiper.animating) return;
      const slide = event.target.closest('.swiper-slide');
      if (!slide || slide.classList.contains('swiper-slide-active')) return;
      const realIdx = Number.parseInt(slide.getAttribute('data-swiper-slide-index') || '-1', 10);
      if (Number.isInteger(realIdx) && realIdx >= 0) {
        swiper.slideToLoop(realIdx);
      }
    });

    // 手动自动播放（避开 Swiper.autoplay 模块和 coverflow 初始化冲突）
    let autoTimer = null;
    let isHovering = false;
    let isVisible = false;
    let isDragging = false;

    const advance = () => {
      if (isDragging || swiper.animating) return; // 拖动/切换中不打断
      swiper.slideNext();
    };
    const startAuto = () => {
      if (reduceMotion || autoTimer || isHovering || isDragging || !isVisible) return;
      autoTimer = window.setInterval(advance, 4000);
    };
    const stopAuto = () => {
      if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
    };

    // 拖动开始/结束时暂停/恢复 autoplay
    swiper.on('touchStart', () => {
      isDragging = true;
      stopAuto();
    });
    swiper.on('touchEnd', () => {
      isDragging = false;
      // 拖动结束后延迟重启 autoplay（让用户有时间看停下的卡片）
      window.setTimeout(() => startAuto(), 1500);
    });

    // hover 暂停（仅鼠标设备）
    if (window.matchMedia('(hover: hover)').matches) {
      root.addEventListener('mouseenter', () => { isHovering = true; stopAuto(); });
      root.addEventListener('mouseleave', () => { isHovering = false; startAuto(); });
    }

    // 进入视口才播
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            window.requestAnimationFrame(() => {
              swiper.update();
              startAuto();
            });
          } else {
            stopAuto();
          }
        });
      }, { threshold: 0.2 });
      io.observe(root);
    } else {
      isVisible = true;
      startAuto();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
