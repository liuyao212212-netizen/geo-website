/* ============================================================
   about-effects.js — 关于我们页面动效集合
   ────────────────────────────────────────────────
   8 个动效:
   1. Magnetic Buttons     - CTA 按钮磁吸鼠标
   2. Image Tilt 3D        - 卡片 hover 3D 倾斜
   3. Section Chapter      - 板块入场大字浮入
   4. Parallax Hero Layers - Hero 多层视差
   5. Letter Spring        - 标题文字弹簧浮动(纯 CSS 已配)
   6. Sticky Books Track   - 出版书籍水平 sticky 滚动
   7. Image Reveal Mask    - 证书图蒙版扫开
   8. Responsive Video     - PC/SP 背景视频源切换
   9. Background Preview   - 背景图片/视频临时替换
   ============================================================ */

(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var clamp = function (v, lo, hi) { return Math.min(Math.max(v, lo), hi); };

  // ============================================================
  // 1. Magnetic Buttons
  // ============================================================
  function initMagnetic() {
    if (reduce || isTouch) return;
    var els = document.querySelectorAll('.magnetic');
    els.forEach(function (el) {
      var rect = null;
      el.addEventListener('mouseenter', function () {
        rect = el.getBoundingClientRect();
      });
      el.addEventListener('mousemove', function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        // 0.55 强吸力, 用户能明显感觉到按钮跟手
        var dx = (e.clientX - cx) * 0.55;
        var dy = (e.clientY - cy) * 0.55;
        el.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'translate3d(0,0,0)';
        rect = null;
      });
    });
  }

  // ============================================================
  // 3. Image Tilt 3D
  // ============================================================
  function initTilt() {
    if (reduce || isTouch) return;
    var els = document.querySelectorAll('.tilt-3d');
    els.forEach(function (el) {
      var rect = null;
      el.addEventListener('mouseenter', function () {
        rect = el.getBoundingClientRect();
        el.style.willChange = 'transform';
      });
      el.addEventListener('mousemove', function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        // 加大角度 ±18deg + scale 1.03 强化感受
        var rx = (0.5 - py) * 18;
        var ry = (px - 0.5) * 22;
        el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale3d(1.03,1.03,1)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        el.style.willChange = 'auto';
        rect = null;
      });
    });
  }

  // ============================================================
  // 4. Section Chapter Reveal
  // ============================================================
  function initChapterReveal() {
    var chapters = document.querySelectorAll('[data-chapter]');
    if (!chapters.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= 0.2) {
          entry.target.classList.add('is-chapter-in');
        } else if (entry.intersectionRatio <= 0) {
          entry.target.classList.remove('is-chapter-in');
        }
      });
    }, { threshold: [0, 0.2] });

    chapters.forEach(function (el) {
      // 给每个 data-chapter 元素注入大字数字
      var num = el.getAttribute('data-chapter') || '';
      var label = el.getAttribute('data-chapter-label') || '';
      if (!el.querySelector('.about-chapter')) {
        var ch = document.createElement('div');
        ch.className = 'about-chapter';
        ch.setAttribute('aria-hidden', 'true');
        ch.innerHTML = '<span class="about-chapter__num">' + num + '</span><span class="about-chapter__label">' + label + '</span>';
        el.insertBefore(ch, el.firstChild);
      }
      io.observe(el);
    });
  }

  // ============================================================
  // 5. Parallax Hero Layers
  // ============================================================
  function initParallax() {
    if (reduce) return;
    var layers = document.querySelectorAll('[data-parallax-speed]');
    if (!layers.length) return;

    function update() {
      var sy = window.scrollY || document.documentElement.scrollTop;
      layers.forEach(function (el) {
        var s = parseFloat(el.getAttribute('data-parallax-speed')) || 0;
        var off = sy * s;
        el.style.transform = 'translate3d(0,' + off.toFixed(2) + 'px,0)';
      });
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }

    if (window.SiteLenis && typeof window.SiteLenis.on === 'function') {
      window.SiteLenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    update();
  }

  // ============================================================
  // 7. Sticky Books Horizontal Scroll
  // ============================================================
  function initStickyBooks() {
    if (reduce) return;
    var track = document.querySelector('[data-sticky-track]');
    if (!track) return;
    var stage = track.querySelector('[data-sticky-stage]');
    var content = track.querySelector('[data-sticky-content]');
    if (!stage || !content) return;

    var stageHeight = window.innerHeight;
    var trackHeight = 0;
    var horizontalDistance = 0;

    function measure() {
      stage.style.height = stageHeight + 'px';
      horizontalDistance = Math.max(0, content.scrollWidth - stage.clientWidth + 64);
      // 总滚动距离 = 一屏 + 横向距离
      trackHeight = stageHeight + horizontalDistance;
      track.style.height = trackHeight + 'px';
    }

    function update() {
      var rect = track.getBoundingClientRect();
      var scrolled = clamp(-rect.top, 0, horizontalDistance);
      content.style.transform = 'translate3d(-' + scrolled.toFixed(2) + 'px,0,0)';
      // 推进 progress 用来更新进度条
      var progress = horizontalDistance > 0 ? scrolled / horizontalDistance : 0;
      track.style.setProperty('--books-progress', progress.toFixed(3));
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }

    measure();
    update();

    if (window.SiteLenis && typeof window.SiteLenis.on === 'function') {
      window.SiteLenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', function () {
      stageHeight = window.innerHeight;
      measure();
      update();
    }, { passive: true });
  }

  // ============================================================
  // 8. Image Reveal Mask (clip-path scan)
  // ============================================================
  function initImageReveal() {
    if (reduce) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-image-reveal]'));
    if (!els.length) return;

    function reveal(el) {
      if (el.classList.contains('is-revealed')) return;
      el.classList.add('is-revealed');
      var frame = el.closest('[data-image-reveal-frame]');
      if (frame) frame.classList.add('is-revealed');
    }

    function checkAll() {
      var vh = window.innerHeight;
      els = els.filter(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.88 && rect.bottom > vh * 0.05) {
          reveal(el);
          return false;
        }
        return true;
      });
      if (!els.length) cleanup();
    }

    var cleanup = function () {};
    checkAll();

    if (window.SiteLenis && typeof window.SiteLenis.on === 'function') {
      window.SiteLenis.on('scroll', checkAll);
      cleanup = function () { window.SiteLenis.off && window.SiteLenis.off('scroll', checkAll); };
    } else {
      window.addEventListener('scroll', checkAll, { passive: true });
      cleanup = function () { window.removeEventListener('scroll', checkAll); };
    }
  }

  // ============================================================
  // 9. Authority Tabs
  // ============================================================
  function initAboutTabs() {
    var groups = document.querySelectorAll('[data-about-tabs]');
    if (!groups.length) return;

    groups.forEach(function (group) {
      var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));
      if (!tabs.length || !panels.length) return;

      function activate(tab) {
        var targetId = tab.getAttribute('aria-controls');
        tabs.forEach(function (item) {
          var selected = item === tab;
          item.classList.toggle('is-active', selected);
          item.setAttribute('aria-selected', selected ? 'true' : 'false');
          item.setAttribute('tabindex', selected ? '0' : '-1');
        });
        panels.forEach(function (panel) {
          var active = panel.id === targetId;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
          if (active) {
            panel.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(function (item) {
              item.classList.add('is-in');
            });
          }
        });
      }

      tabs.forEach(function (tab, index) {
        tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
        tab.addEventListener('click', function () { activate(tab); });
        tab.addEventListener('keydown', function (event) {
          var key = event.key;
          if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return;
          event.preventDefault();
          var nextIndex = index;
          if (key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
          if (key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (key === 'Home') nextIndex = 0;
          if (key === 'End') nextIndex = tabs.length - 1;
          tabs[nextIndex].focus();
          activate(tabs[nextIndex]);
        });
      });
    });
  }

  // ============================================================
  // 8. Responsive Background Videos
  // ============================================================
  function initResponsiveBackgroundVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll('[data-bg-preview-root] > video[data-pc-src]'));
    if (!videos.length) return;

    var media = window.matchMedia('(max-width: 1023px)');

    function applySources() {
      videos.forEach(function (video) {
        if (video.dataset.previewing === 'true') return;
        var nextSrc = media.matches ? video.dataset.spSrc : video.dataset.pcSrc;
        if (!nextSrc) return;
        var current = video.getAttribute('src') || '';
        if (current === nextSrc) return;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.src = nextSrc;
        video.load();
        video.play().catch(function () {});
      });
    }

    applySources();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', applySources);
    } else if (typeof media.addListener === 'function') {
      media.addListener(applySources);
    }
  }

  // ============================================================
  // 9. Background Preview Uploads
  // ============================================================
  function initBackgroundPreviews() {
    var roots = Array.prototype.slice.call(document.querySelectorAll('[data-bg-preview-root]'));
    if (!roots.length || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return;

    var media = window.matchMedia('(max-width: 1023px)');
    var objectUrls = [];

    function createTools(index) {
      var tools = document.createElement('div');
      var inputId = 'about-bg-preview-file-' + (index + 1);
      tools.className = 'bg-preview-tools';
      tools.setAttribute('data-bg-preview-tools', '');
      tools.innerHTML =
        '<label class="bg-preview-upload lg-btn" for="' + inputId + '">' +
          '<svg class="bg-preview-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M12 15V3"></path>' +
            '<path d="M7 8l5-5 5 5"></path>' +
            '<path d="M20 15v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"></path>' +
          '</svg>' +
          '<span>上传背景</span>' +
          '<input class="bg-preview-file" id="' + inputId + '" type="file" accept="image/*,video/*" data-bg-preview-input>' +
        '</label>' +
        '<button class="bg-preview-reset" type="button" data-bg-preview-reset hidden>还原</button>';
      return tools;
    }

    function getDirectBackgroundVideo(root) {
      return Array.prototype.slice.call(root.children).find(function (child) {
        return child.tagName === 'VIDEO' && !child.hasAttribute('data-bg-preview-video');
      }) || null;
    }

    function createPreviewVideo(root) {
      var video = document.createElement('video');
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
    }

    function restoreDefaultVideo(video) {
      if (!video) return;
      video.removeAttribute('data-previewing');
      var src = media.matches ? video.dataset.spSrc : video.dataset.pcSrc;
      if (!src) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.src = src;
      video.load();
      video.play().catch(function () {});
    }

    function prepareVideoForPreview(video, src) {
      video.setAttribute('data-bg-preview-video', '');
      video.setAttribute('data-previewing', 'true');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.src = src;
      video.load();
      video.play().catch(function () {});
    }

    roots.forEach(function (root, index) {
      if (root.__bgPreviewBound) return;
      root.__bgPreviewBound = true;

      var imageLayer = document.createElement('div');
      imageLayer.className = 'bg-preview-image';
      imageLayer.setAttribute('aria-hidden', 'true');
      root.insertBefore(imageLayer, root.firstChild);

      var existingVideo = getDirectBackgroundVideo(root);
      var video = existingVideo || createPreviewVideo(root);
      video.setAttribute('data-bg-preview-video', '');

      var tools = createTools(index);
      root.appendChild(tools);
      if (window.LiquidGlass && typeof window.LiquidGlass.init === 'function') {
        window.LiquidGlass.init(tools);
      }

      var input = tools.querySelector('[data-bg-preview-input]');
      var reset = tools.querySelector('[data-bg-preview-reset]');
      var objectUrl = '';

      function revokeObjectUrl() {
        if (!objectUrl) return;
        URL.revokeObjectURL(objectUrl);
        objectUrls = objectUrls.filter(function (url) { return url !== objectUrl; });
        objectUrl = '';
      }

      function clearPreviewVideo(shouldRestoreDefault) {
        if (video.dataset.previewing !== 'true') return;
        video.pause();
        video.removeAttribute('src');
        video.removeAttribute('data-previewing');
        video.load();
        if (shouldRestoreDefault && existingVideo) restoreDefaultVideo(video);
      }

      function resetPreview() {
        clearPreviewVideo(true);
        revokeObjectUrl();
        imageLayer.style.removeProperty('background-image');
        root.removeAttribute('data-bg-preview');
        reset.hidden = true;
        input.value = '';
      }

      input.addEventListener('change', function () {
        var file = input.files && input.files[0];
        if (!file) return;

        var isImage = file.type.indexOf('image/') === 0;
        var isVideo = file.type.indexOf('video/') === 0;
        if (!isImage && !isVideo) {
          input.value = '';
          return;
        }

        clearPreviewVideo(false);
        revokeObjectUrl();
        objectUrl = URL.createObjectURL(file);
        objectUrls.push(objectUrl);
        reset.hidden = false;

        if (isVideo) {
          imageLayer.style.removeProperty('background-image');
          prepareVideoForPreview(video, objectUrl);
          root.setAttribute('data-bg-preview', 'video');
          return;
        }

        imageLayer.style.backgroundImage = 'url("' + objectUrl + '")';
        root.setAttribute('data-bg-preview', 'image');
      });

      reset.addEventListener('click', resetPreview);
    });

    window.addEventListener('pagehide', function () {
      objectUrls.forEach(function (url) { URL.revokeObjectURL(url); });
      objectUrls = [];
    });
  }

  // ============================================================
  // Boot
  // ============================================================
  function boot() {
    initMagnetic();
    initTilt();
    initChapterReveal();
    initParallax();
    initImageReveal();
    initAboutTabs();
    initResponsiveBackgroundVideos();
    initBackgroundPreviews();
    // sticky books 等 lenis 准备好再启动
    if (window.SiteLenis) {
      initStickyBooks();
    } else {
      window.setTimeout(initStickyBooks, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
