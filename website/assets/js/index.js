(() => {
  (function setupResponsiveVideo() {
    const videos = Array.from(document.querySelectorAll('video[data-pc-src][data-sp-src]'));
    if (!videos.length) return;

    const media = window.matchMedia('(max-width: 1023px)');

    const applySrc = (video) => {
      if (video.dataset.previewing === 'true') return;
      const isMobile = media.matches;
      const want = isMobile ? video.dataset.spSrc : video.dataset.pcSrc;
      if (!want) return;

      const wantUrl = new URL(want, window.location.href).href;
      if (video.currentSrc === wantUrl || video.src === wantUrl) return;

      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.src = want;
      video.load();
      video.play().catch(() => {});
    };

    const eager = videos.filter(v => !v.hasAttribute('data-lazy'));
    const lazy = videos.filter(v => v.hasAttribute('data-lazy'));

    eager.forEach(applySrc);

    if (lazy.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const v = entry.target;
          if (entry.isIntersecting) {
            applySrc(v);
            if (v.paused) v.play().catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { rootMargin: '600px 0px', threshold: 0 });
      lazy.forEach(v => io.observe(v));
    } else {
      lazy.forEach(applySrc);
    }

    const onMediaChange = () => {
      eager.forEach(applySrc);
      lazy.forEach(v => { if (v.src) applySrc(v); });
    };
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onMediaChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onMediaChange);
    }
  })();

  (function initSpotlight() {
    const container = document.querySelector('[data-spotlight]');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.section-2__platform'));
    if (!items.length) return;

    let index = 0;
    let timer = null;
    const interval = 1400;
    const spotFilter = 'grayscale(0) drop-shadow(0 8px 24px rgba(10,20,40,.15))';
    const getSpotScale = () => (window.matchMedia('(max-width: 767px)').matches ? 'scale(1.25) translateZ(0)' : 'scale(1.4) translateZ(0)');

    const setSpot = current => {
      items.forEach((el, idx) => {
        const active = idx === current;
        el.classList.toggle('is-spot', active);
        if (active) {
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('filter', spotFilter, 'important');
          el.style.setProperty('transform', getSpotScale(), 'important');
          el.style.removeProperty('box-shadow');
          el.style.removeProperty('background');
          el.style.removeProperty('backdrop-filter');
          el.style.removeProperty('border');
          el.style.removeProperty('border-radius');
          el.style.removeProperty('padding');
          return;
        }
        el.style.removeProperty('opacity');
        el.style.removeProperty('filter');
        el.style.removeProperty('box-shadow');
        el.style.removeProperty('background');
        el.style.removeProperty('backdrop-filter');
        el.style.removeProperty('border');
        el.style.removeProperty('border-radius');
        el.style.removeProperty('padding');
        el.style.removeProperty('transform');
      });
    };

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        index = (index + 1) % items.length;
        setSpot(index);
      }, interval);
    };

    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    setSpot(index);
    start();

    const section = document.querySelector('#section-2');
    if (section && 'IntersectionObserver' in window) {
      stop();
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            start();
            return;
          }
          stop();
        });
      }, { threshold: 0.2 });
      io.observe(section);
    }
  })();

  (function initBackgroundPreviews() {
    const roots = Array.from(document.querySelectorAll('[data-bg-preview-root]'));
    if (!roots.length || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return;

    const media = window.matchMedia('(max-width: 1023px)');
    const objectUrls = new Set();

    const createTools = index => {
      const tools = document.createElement('div');
      const inputId = `bg-preview-file-${index + 1}`;
      tools.className = 'bg-preview-tools';
      tools.setAttribute('data-bg-preview-tools', '');
      tools.innerHTML = `
        <label class="bg-preview-upload lg-btn" for="${inputId}">
          <svg class="bg-preview-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 15V3"></path>
            <path d="M7 8l5-5 5 5"></path>
            <path d="M20 15v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"></path>
          </svg>
          <span>上传背景</span>
          <input class="bg-preview-file" id="${inputId}" type="file" accept="image/*,video/*" data-bg-preview-input>
        </label>
        <button class="bg-preview-reset" type="button" data-bg-preview-reset hidden>还原</button>
      `;
      return tools;
    };

    const getDirectBackgroundVideo = root => {
      if (root.matches('#section-1')) return root.querySelector('.hero-bg-video');
      return Array.from(root.children).find(child => child.matches?.('video[class*="bg-video"]')) || null;
    };

    const createPreviewVideo = root => {
      const video = document.createElement('video');
      video.className = 'bg-preview-video';
      video.setAttribute('data-bg-preview-video', '');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.preload = 'metadata';
      root.insertBefore(video, root.firstChild);
      return video;
    };

    const restoreDefaultVideo = video => {
      if (!video) return;
      video.removeAttribute('data-previewing');
      if (!video.dataset.pcSrc || !video.dataset.spSrc) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        return;
      }

      const want = media.matches ? video.dataset.spSrc : video.dataset.pcSrc;
      if (!want) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.src = want;
      video.load();
      video.play().catch(() => {});
    };

    const prepareVideoForPreview = (video, src) => {
      video.setAttribute('data-bg-preview-video', '');
      video.setAttribute('data-previewing', 'true');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.src = src;
      video.load();
      video.play().catch(() => {});
    };

    roots.forEach((root, index) => {
      if (root.__bgPreviewBound) return;
      root.__bgPreviewBound = true;

      const imageLayer = document.createElement('div');
      imageLayer.className = 'bg-preview-image';
      imageLayer.setAttribute('aria-hidden', 'true');
      root.insertBefore(imageLayer, root.firstChild);

      const existingVideo = getDirectBackgroundVideo(root);
      const video = existingVideo || createPreviewVideo(root);
      video.setAttribute('data-bg-preview-video', '');

      const tools = createTools(index);
      root.appendChild(tools);
      window.LiquidGlass?.init?.(tools);

      const input = tools.querySelector('[data-bg-preview-input]');
      const reset = tools.querySelector('[data-bg-preview-reset]');
      let objectUrl = '';

      const revokeObjectUrl = () => {
        if (!objectUrl) return;
        URL.revokeObjectURL(objectUrl);
        objectUrls.delete(objectUrl);
        objectUrl = '';
      };

      const clearPreviewVideo = shouldRestoreDefault => {
        if (video.dataset.previewing !== 'true') return;
        video.pause();
        video.removeAttribute('src');
        video.removeAttribute('data-previewing');
        video.load();
        if (shouldRestoreDefault && existingVideo) restoreDefaultVideo(video);
      };

      const resetPreview = () => {
        clearPreviewVideo(true);
        revokeObjectUrl();
        imageLayer.style.removeProperty('background-image');
        root.removeAttribute('data-bg-preview');
        reset.hidden = true;
        input.value = '';
      };

      input.addEventListener('change', () => {
        const file = input.files?.[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        if (!isImage && !isVideo) {
          input.value = '';
          return;
        }

        clearPreviewVideo(false);
        revokeObjectUrl();
        objectUrl = URL.createObjectURL(file);
        objectUrls.add(objectUrl);
        reset.hidden = false;

        if (isVideo) {
          imageLayer.style.removeProperty('background-image');
          prepareVideoForPreview(video, objectUrl);
          root.setAttribute('data-bg-preview', 'video');
          return;
        }

        imageLayer.style.backgroundImage = `url("${objectUrl}")`;
        root.setAttribute('data-bg-preview', 'image');
      });

      reset.addEventListener('click', resetPreview);
    });

    window.addEventListener('pagehide', () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
      objectUrls.clear();
    });
  })();

  document.querySelector('.footer-to-top')?.addEventListener('click', () => window.SiteCommon?.scrollToTop());
  window.SiteCommon?.revealOnView(document.querySelector('.site-footer'));
})();
