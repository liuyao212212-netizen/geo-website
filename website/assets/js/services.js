(function () {
  const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqMobile = window.matchMedia('(max-width: 1023px)');

  function safePlay(video) {
    if (!video || mqReduced.matches) return;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  function prepareVideo(video, src) {
    if (!src || video.dataset.currentSrc === src) return;

    video.dataset.currentSrc = src;
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.load();
    safePlay(video);
  }

  function getResponsiveVideoSrc(video) {
    const useMobileVideo = mqMobile.matches || window.innerWidth <= 1023;
    return useMobileVideo ? video.dataset.spSrc : video.dataset.pcSrc;
  }

  function initVideos() {
    const videos = Array.from(document.querySelectorAll('[data-resource-video]'));
    if (!videos.length) return;

    const setVideoSource = () => {
      videos.forEach(video => {
        const nextSrc = getResponsiveVideoSrc(video);
        prepareVideo(video, nextSrc);
      });
    };

    setVideoSource();

    if (typeof mqMobile.addEventListener === 'function') {
      mqMobile.addEventListener('change', setVideoSource);
    } else if (typeof mqMobile.addListener === 'function') {
      mqMobile.addListener(setVideoSource);
    }
  }

  function initMediaPreviews() {
    const roots = Array.from(document.querySelectorAll('[data-bg-preview-root]'));
    if (!roots.length) return;

    roots.forEach((root, index) => {
      if (root.__bgPreviewBound || root.querySelector('[data-bg-preview-tools]') || root.querySelector('.resource-media-preview')) return;

      const control = document.createElement('div');
      control.className = 'resource-media-preview';
      control.innerHTML = `
        <label class="resource-media-preview__button">
          <span>替换媒体</span>
          <input class="resource-media-preview__input" type="file" accept="image/*,video/*">
        </label>
        <button class="resource-media-preview__reset" type="button">还原</button>
      `;

      const input = control.querySelector('input');
      const reset = control.querySelector('button');
      let preview = null;
      let objectUrl = '';

      const clearPreview = () => {
        if (preview) preview.remove();
        preview = null;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = '';
        root.removeAttribute('data-has-upload-preview');
        if (input) input.value = '';
      };

      input?.addEventListener('change', () => {
        const file = input.files && input.files[0];
        if (!file) return;

        clearPreview();
        objectUrl = URL.createObjectURL(file);

        const isVideo = file.type.startsWith('video/');
        preview = document.createElement(isVideo ? 'video' : 'img');
        preview.className = 'resource-upload-preview';
        preview.src = objectUrl;
        preview.dataset.previewIndex = String(index);

        if (isVideo) {
          preview.muted = true;
          preview.loop = true;
          preview.playsInline = true;
          preview.autoplay = true;
          preview.setAttribute('playsinline', '');
          preview.setAttribute('webkit-playsinline', '');
          preview.addEventListener('loadeddata', () => safePlay(preview));
        } else {
          preview.alt = '上传预览';
        }

        root.appendChild(preview);
        root.setAttribute('data-has-upload-preview', 'true');
      });

      reset?.addEventListener('click', clearPreview);
      root.appendChild(control);
    });
  }

  function initAllianceOrb() {
    const canvas = document.querySelector('[data-alliance-orb]');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const visual = canvas.closest('.resource-alliance__visual') || canvas.parentElement;
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let rafId = 0;
    let isVisible = true;

    const seeded = index => {
      const value = Math.sin(index * 97.123) * 10000;
      return value - Math.floor(value);
    };

    const createParticles = () => {
      const count = window.innerWidth <= 640 ? 34 : 58;
      const radius = Math.min(width, height) * 0.39;
      particles = Array.from({ length: count }, (_, index) => {
        const angle = seeded(index + 1) * Math.PI * 2;
        const distance = Math.sqrt(seeded(index + 11)) * radius;
        return {
          x: width / 2 + Math.cos(angle) * distance,
          y: height / 2 + Math.sin(angle) * distance,
          vx: (seeded(index + 21) - 0.5) * 0.32,
          vy: (seeded(index + 31) - 0.5) * 0.32,
          phase: seeded(index + 41) * Math.PI * 2,
          size: 1.2 + seeded(index + 51) * 2.2
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.7);
      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const makeBlobPath = time => {
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.43;
      const steps = 72;

      ctx.beginPath();
      for (let index = 0; index <= steps; index++) {
        const angle = (index / steps) * Math.PI * 2;
        const wave =
          Math.sin(angle * 3 + time * 0.0007) * 0.04 +
          Math.cos(angle * 5 - time * 0.00045) * 0.026;
        const radius = baseRadius * (1 + wave);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const updateParticles = time => {
      const cx = width / 2;
      const cy = height / 2;
      const limit = Math.min(width, height) * 0.39;

      particles.forEach((particle, index) => {
        particle.vx += Math.sin(time * 0.00055 + particle.phase) * 0.006;
        particle.vy += Math.cos(time * 0.00048 + particle.phase) * 0.006;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < limit * 0.88) {
            const force = (1 - distance / (limit * 0.88)) * 0.028;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.986;
        particle.vy *= 0.986;

        const dx = particle.x - cx;
        const dy = particle.y - cy;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance > limit) {
          const angle = Math.atan2(dy, dx);
          particle.x = cx + Math.cos(angle) * limit;
          particle.y = cy + Math.sin(angle) * limit;
          particle.vx -= Math.cos(angle) * 0.34;
          particle.vy -= Math.sin(angle) * 0.34;
        }

        particle.phase += 0.004 + index * 0.00003;
      });
    };

    const draw = time => {
      resize();
      ctx.clearRect(0, 0, width, height);

      makeBlobPath(time);
      ctx.save();
      ctx.clip();

      const fill = ctx.createRadialGradient(width * 0.28, height * 0.2, 0, width * 0.56, height * 0.54, width * 0.68);
      fill.addColorStop(0, 'rgba(255, 255, 255, 0.34)');
      fill.addColorStop(0.34, 'rgba(80, 177, 219, 0.16)');
      fill.addColorStop(0.72, 'rgba(24, 45, 83, 0.34)');
      fill.addColorStop(1, 'rgba(8, 14, 32, 0.72)');
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, width, height);

      const halo = ctx.createRadialGradient(width * 0.64, height * 0.64, 0, width * 0.64, height * 0.64, width * 0.44);
      halo.addColorStop(0, 'rgba(56, 213, 255, 0.18)');
      halo.addColorStop(1, 'rgba(56, 213, 255, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      updateParticles(time);

      const maxDistance = window.innerWidth <= 640 ? 68 : 92;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > maxDistance) continue;
          const alpha = (1 - distance / maxDistance) * 0.24;
          ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      particles.forEach(particle => {
        const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 5.8);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.86)');
        glow.addColorStop(0.26, 'rgba(125, 211, 252, 0.58)');
        glow.addColorStop(1, 'rgba(125, 211, 252, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 5.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      makeBlobPath(time);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const gloss = ctx.createLinearGradient(width * 0.18, height * 0.08, width * 0.5, height * 0.46);
      gloss.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      gloss.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gloss;
      ctx.beginPath();
      ctx.ellipse(width * 0.34, height * 0.25, width * 0.18, height * 0.09, -0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = time => {
      rafId = 0;
      draw(time);
      if (!mqReduced.matches && isVisible) {
        rafId = window.requestAnimationFrame(frame);
      }
    };

    const start = () => {
      if (!rafId && !mqReduced.matches) {
        rafId = window.requestAnimationFrame(frame);
      }
    };

    const stop = () => {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    if (visual) {
      visual.addEventListener('pointermove', event => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.active = true;
      }, { passive: true });

      visual.addEventListener('pointerleave', () => {
        pointer.active = false;
      }, { passive: true });
    }

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        resize();
        if (mqReduced.matches) draw(performance.now());
      });
      observer.observe(canvas);
    } else {
      window.addEventListener('resize', resize, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        isVisible = Boolean(entry && entry.isIntersecting);
        if (isVisible) start();
        else stop();
      }, { rootMargin: '260px 0px' });
      observer.observe(canvas);
    }

    resize();
    draw(performance.now());
    start();
  }

  function initAllianceTimeline() {
    const timeline = document.querySelector('[data-alliance-timeline]');
    if (!timeline) return;

    const entries = Array.from(timeline.querySelectorAll('[data-alliance-entry]'));
    const sentinels = entries.map(entry => entry.querySelector('.sentinel'));
    if (!entries.length) return;

    let activeIndex = 0;
    let frameId = 0;
    let isVisible = true;

    const setActive = index => {
      activeIndex = index;
      entries.forEach((entry, entryIndex) => {
        entry.classList.toggle('active', entryIndex === activeIndex);
      });
    };

    const tick = () => {
      frameId = 0;
      const centerY = (window.innerHeight || document.documentElement.clientHeight || 1) / 3;
      let bestIndex = 0;
      let bestDistance = Infinity;

      sentinels.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const distance = Math.abs(mid - centerY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      if (bestIndex !== activeIndex) {
        setActive(bestIndex);
      }

      if (isVisible && !mqReduced.matches) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const start = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    setActive(0);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        isVisible = Boolean(entry && entry.isIntersecting);
        if (isVisible) start();
        else stop();
      }, { rootMargin: '240px 0px' });
      observer.observe(timeline);
    }

    start();
  }

  function initResourceFaq() {
    const faqRoots = document.querySelectorAll('[data-resource-faq]');
    faqRoots.forEach(root => {
      const items = Array.from(root.querySelectorAll('.resource-faq__item'));
      items.forEach(item => {
        item.addEventListener('toggle', () => {
          if (!item.open) return;
          items.forEach(other => {
            if (other !== item) {
              other.open = false;
            }
          });
        });
      });
    });
  }

  function initWhitepaperSection() {
    const section = document.querySelector('[data-whitepaper-section]');
    if (!section) return;

    const revealSection = () => {
      section.classList.add('is-visible');
    };

    if ('IntersectionObserver' in window && !mqReduced.matches) {
      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          revealSection();
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px'
      });

      sectionObserver.observe(section);
    } else {
      revealSection();
    }

    initWhitepaperStack(section);
  }

  function initWhitepaperStack(section) {
    const stack = section.querySelector('[data-whitepaper-stack]');
    const cards = stack ? Array.from(stack.querySelectorAll('[data-whitepaper-stack-card]')) : [];
    const end = stack ? stack.querySelector('[data-whitepaper-stack-end]') : null;
    if (!stack || !cards.length || !end) return;

    let ticking = false;
    let lastTouchY = 0;
    let stackTouchY = 0;
    let targetScrollTop = 0;
    let lastStackRouteAt = 0;
    let scrollAnimationId = 0;
    let stackLenis = null;
    let stackLenisFrame = 0;
    const lastTransforms = new Map();

    const calculateProgress = (scrollTop, start, endPoint) => {
      if (scrollTop < start) return 0;
      if (scrollTop > endPoint) return 1;
      return (scrollTop - start) / (endPoint - start || 1);
    };

    const updateCardTransforms = () => {
      ticking = false;

      if (mqReduced.matches) {
        cards.forEach(card => {
          card.style.transform = '';
          card.style.filter = '';
        });
        return;
      }

      const scrollTop = stack.scrollTop;
      const containerHeight = stack.clientHeight;
      const stackPosition = containerHeight * 0.16;
      const scaleEndPosition = containerHeight * 0.05;
      const itemStackDistance = window.innerWidth <= 640 ? 18 : 26;
      const baseScale = window.innerWidth <= 640 ? 0.9 : 0.86;
      const itemScale = 0.028;
      const endTop = end.offsetTop;
      const pinEnd = endTop - containerHeight * 0.52;

      cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const triggerStart = cardTop - stackPosition - itemStackDistance * index;
        const triggerEnd = cardTop - scaleEndPosition;
        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        const targetScale = Math.min(baseScale + index * itemScale, 0.98);
        const scale = 1 - scaleProgress * (1 - targetScale);

        let translateY = 0;
        if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPosition + itemStackDistance * index;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPosition + itemStackDistance * index;
        }

        const transformState = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000
        };
        const last = lastTransforms.get(index);

        if (!last || Math.abs(last.translateY - transformState.translateY) > 0.1 || Math.abs(last.scale - transformState.scale) > 0.001) {
          card.style.transform = `translate3d(0, ${transformState.translateY}px, 0) scale(${transformState.scale})`;
          card.style.zIndex = String(index + 1);
          lastTransforms.set(index, transformState);
        }
      });
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateCardTransforms);
    };

    const getHeaderBottom = () => {
      const header = document.querySelector('.tec-header, .site-header');
      return header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    };

    const getHeroLockState = () => {
      const hero = document.querySelector('.resource-hero');
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const lockLine = getHeaderBottom();
      const heroLockOffset = heroRect ? heroRect.height * 0.5 : 0;
      return {
        heroRect,
        lockPoint: lockLine + heroLockOffset
      };
    };

    const isSectionActive = deltaY => {
      const sectionRect = section.getBoundingClientRect();
      const { heroRect, lockPoint } = getHeroLockState();
      const enteringFromHero = deltaY >= 0;
      const heroReachedLockPoint = !heroRect || (
        enteringFromHero
          ? heroRect.bottom <= lockPoint + 1
          : heroRect.bottom >= lockPoint - 1
      );
      const sectionIsReadingFrame = sectionRect.top <= lockPoint + 4 && sectionRect.bottom >= lockPoint + 80;
      return heroReachedLockPoint && sectionIsReadingFrame;
    };

    const getStackCompleteScrollTop = () => {
      const containerHeight = stack.clientHeight;
      const scaleEndPosition = containerHeight * 0.05;
      const lastCard = cards[cards.length - 1];
      const nativeMaxScroll = Math.max(stack.scrollHeight - stack.clientHeight, 0);
      const completeScrollTop = lastCard.offsetTop - scaleEndPosition + 24;
      return Math.min(Math.max(completeScrollTop, 0), nativeMaxScroll);
    };

    const canRouteStackScroll = deltaY => {
      if (!isSectionActive(deltaY)) return false;
      const completeScrollTop = getStackCompleteScrollTop();
      if (deltaY > 0) return stack.scrollTop < completeScrollTop - 1;
      if (deltaY < 0) return stack.scrollTop > 1;
      return false;
    };

    const routePageScroll = deltaY => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      const nextY = currentY + deltaY;
      if (window.SiteLenis && typeof window.SiteLenis.scrollTo === 'function') {
        window.SiteLenis.scrollTo(nextY, { duration: 0.55 });
        return;
      }
      window.scrollBy({ top: deltaY, left: 0, behavior: 'auto' });
    };

    const clampPageAtHeroLockPoint = deltaY => {
      if (!deltaY) return false;
      if (deltaY > 0 && stack.scrollTop >= getStackCompleteScrollTop() - 1) return false;
      if (deltaY < 0 && stack.scrollTop <= 1) return false;

      const { heroRect, lockPoint } = getHeroLockState();
      if (!heroRect) return false;

      const remainingToLockPoint = deltaY > 0
        ? heroRect.bottom - lockPoint
        : lockPoint - heroRect.bottom;

      if (remainingToLockPoint <= 1) return false;
      if (remainingToLockPoint > Math.max(Math.abs(deltaY), 48)) return false;
      routePageScroll(deltaY > 0 ? remainingToLockPoint : -remainingToLockPoint);
      return true;
    };

    const setupStackLenis = () => {
      if (!window.Lenis || mqReduced.matches) return;
      const content = stack.querySelector('.whitepaper-scrollstack__inner');
      if (!content) return;

      stackLenis = new Lenis({
        wrapper: stack,
        content,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        touchInertiaMultiplier: 35,
        touchInertia: 0.6
      });

      stackLenis.on('scroll', requestUpdate);

      const raf = time => {
        stackLenis.raf(time);
        stackLenisFrame = window.requestAnimationFrame(raf);
      };
      stackLenisFrame = window.requestAnimationFrame(raf);
    };

    const animateStackScroll = () => {
      const diff = targetScrollTop - stack.scrollTop;
      if (Math.abs(diff) < 0.5) {
        stack.scrollTop = targetScrollTop;
        scrollAnimationId = 0;
        requestUpdate();
        return;
      }

      stack.scrollTop += diff * 0.22;
      requestUpdate();
      scrollAnimationId = window.requestAnimationFrame(animateStackScroll);
    };

    const routeStackScroll = deltaY => {
      const completeScrollTop = getStackCompleteScrollTop();
      const now = typeof performance !== 'undefined' && typeof performance.now === 'function' ? performance.now() : Date.now();
      if (stackLenis) {
        if (now - lastStackRouteAt > 180) {
          targetScrollTop = stack.scrollTop;
        }
        lastStackRouteAt = now;
      } else if (!scrollAnimationId) {
        targetScrollTop = stack.scrollTop;
      }
      const maxTargetScrollTop = deltaY < 0 ? Math.max(completeScrollTop, stack.scrollTop) : completeScrollTop;
      targetScrollTop = Math.min(Math.max(targetScrollTop + deltaY, 0), maxTargetScrollTop);
      if (stackLenis && typeof stackLenis.scrollTo === 'function') {
        stackLenis.scrollTo(targetScrollTop);
        requestUpdate();
        return;
      }
      if (!scrollAnimationId) {
        scrollAnimationId = window.requestAnimationFrame(animateStackScroll);
      }
    };

    window.addEventListener('wheel', event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (clampPageAtHeroLockPoint(event.deltaY)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (!canRouteStackScroll(event.deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      routeStackScroll(event.deltaY);
    }, { capture: true, passive: false });

    stack.addEventListener('wheel', event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (clampPageAtHeroLockPoint(event.deltaY)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (isSectionActive(event.deltaY) && canRouteStackScroll(event.deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      routePageScroll(event.deltaY);
    }, { capture: true, passive: false });

    window.addEventListener('touchstart', event => {
      if (!event.touches || event.touches.length !== 1) return;
      lastTouchY = event.touches[0].clientY;
    }, { passive: true });

    stack.addEventListener('touchstart', event => {
      if (!event.touches || event.touches.length !== 1) return;
      stackTouchY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', event => {
      if (!event.touches || event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      if (!canRouteStackScroll(deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      routeStackScroll(deltaY);
    }, { capture: true, passive: false });

    stack.addEventListener('touchmove', event => {
      if (!event.touches || event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      const deltaY = stackTouchY - currentY;
      stackTouchY = currentY;
      if (isSectionActive(deltaY) && canRouteStackScroll(deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      routePageScroll(deltaY);
    }, { capture: true, passive: false });

    stack.addEventListener('scroll', () => {
      if (!stackLenis && !scrollAnimationId) {
        targetScrollTop = stack.scrollTop;
      }
      requestUpdate();
    }, { passive: true });
    window.addEventListener('resize', requestUpdate);
    setupStackLenis();
    requestUpdate();
  }

  function resetScrollPosition() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }

  function setLoaderTargets(loader) {
    resetScrollPosition();
    document.body.classList.add('is-measuring-header');

    const hero = document.querySelector('.resource-hero');
    const headerLogo = document.querySelector('.tec-logo img') || document.querySelector('.tec-logo');
    const heroRect = hero ? hero.getBoundingClientRect() : {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
    const logoRect = headerLogo ? headerLogo.getBoundingClientRect() : {
      left: 48,
      top: 18,
      width: 220,
      height: 42
    };

    loader.style.setProperty('--loader-hero-x', `${Math.round(heroRect.left)}px`);
    loader.style.setProperty('--loader-hero-y', `${Math.round(heroRect.top)}px`);
    loader.style.setProperty('--loader-hero-w', `${Math.round(heroRect.width)}px`);
    loader.style.setProperty('--loader-hero-h', `${Math.round(heroRect.height)}px`);
    loader.style.setProperty('--loader-logo-x', `${Math.round(logoRect.left)}px`);
    loader.style.setProperty('--loader-logo-y', `${Math.round(logoRect.top)}px`);
    loader.style.setProperty('--loader-logo-w', `${Math.max(Math.round(logoRect.width), 1)}px`);
    document.body.classList.remove('is-measuring-header');
  }

  function syncHeroVideoToLoader() {
    const loaderVideo = document.querySelector('[data-resource-loader-video]');
    const heroVideo = document.querySelector('[data-resource-hero-video]');
    if (!loaderVideo || !heroVideo) return;

    const nextSrc = getResponsiveVideoSrc(heroVideo);
    prepareVideo(heroVideo, nextSrc);

    if (loaderVideo.currentSrc === heroVideo.currentSrc && Number.isFinite(loaderVideo.currentTime)) {
      try {
        heroVideo.currentTime = loaderVideo.currentTime;
      } catch (error) {
        // Some mobile browsers reject currentTime while metadata is still settling.
      }
    }

    safePlay(heroVideo);
  }

  function initLoader() {
    const loader = document.querySelector('[data-resource-loader]');
    const logo = document.querySelector('[data-loader-logo]');

    resetScrollPosition();

    const revealPage = () => {
      document.body.classList.add('resource-ready');
    };

    const finishWithoutMotion = () => {
      document.body.classList.remove('resource-loading');
      revealPage();
      if (loader) loader.classList.add('is-hidden');
      window.setTimeout(() => {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 0);
    };

    const startExit = () => {
      if (!loader) return;

      setLoaderTargets(loader);
      window.requestAnimationFrame(() => {
        loader.classList.add('is-exiting');
      });

      window.setTimeout(() => {
        document.body.classList.remove('resource-loading');
        syncHeroVideoToLoader();
        revealPage();
        loader.classList.add('is-hidden');
      }, 1380);

      window.setTimeout(() => {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 1900);
    };

    if (!loader) {
      finishWithoutMotion();
      return;
    }

    if (mqReduced.matches) {
      if (logo) logo.classList.add('is-visible');
      window.setTimeout(finishWithoutMotion, 320);
      return;
    }

    if (logo) {
      window.setTimeout(() => {
        logo.classList.add('is-visible');
      }, 460);
    }

    window.setTimeout(startExit, 2200);
  }

  function init() {
    initVideos();
    initMediaPreviews();
    initAllianceTimeline();
    initResourceFaq();
    initWhitepaperSection();
    initLoader();

    if (window.LiquidGlass && typeof window.LiquidGlass.init === 'function') {
      window.LiquidGlass.init(document);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
