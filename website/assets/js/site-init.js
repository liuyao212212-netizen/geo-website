/* ============================================================
   site-init.js — 全站共用初始化
   ────────────────────────────────────────────────
   所有页面共用的 header/footer 行为:
   - footer 滚入视口时整体淡入(reveal data-animate 元素)
   - footer 右下角 "回到顶部" 按钮
   ============================================================ */

(function initSiteFooter() {
  function run() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;

    if (window.SiteCommon && typeof window.SiteCommon.revealOnView === 'function') {
      window.SiteCommon.revealOnView(footer);
    } else {
      footer.classList.add('is-visible');
    }

    var toTop = footer.querySelector('.footer-to-top');
    if (toTop) {
      toTop.addEventListener('click', function () {
        if (window.SiteCommon && typeof window.SiteCommon.scrollToTop === 'function') {
          window.SiteCommon.scrollToTop();
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();

(function initSiteBackgroundPreviews() {
  function safePlay(video) {
    if (!video || typeof video.play !== 'function') return;
    var promise = video.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(function () {});
    }
  }

  function getResponsiveSource(video) {
    if (!video) return '';
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 1023px)').matches;
    var source = isMobile && video.dataset.spSrc ? video.dataset.spSrc : video.dataset.pcSrc;
    if (source) return source;
    if (video.getAttribute('src')) return video.getAttribute('src');
    var sourceNode = video.querySelector('source');
    return sourceNode ? sourceNode.getAttribute('src') || '' : '';
  }

  function setVideoSource(video, source) {
    if (!video || !source || video.dataset.bgPreviewUser === 'true') return;
    if (video.dataset.activeBgSrc === source && video.getAttribute('src') === source) return;
    video.dataset.activeBgSrc = source;
    video.setAttribute('src', source);
    if (typeof video.load === 'function') video.load();
    safePlay(video);
  }

  function initResponsiveBackgroundVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll('[data-bg-preview-root] video[data-pc-src]'));
    if (!videos.length) return;

    var update = function () {
      videos.forEach(function (video) {
        if (video.dataset.bgPreviewUser === 'true') return;
        setVideoSource(video, getResponsiveSource(video));
      });
    };

    update();

    if (!window.matchMedia) return;
    var mq = window.matchMedia('(max-width: 1023px)');
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(update);
    }
  }

  function getBackgroundVideo(root) {
    var children = Array.prototype.slice.call(root.children || []);
    for (var i = 0; i < children.length; i += 1) {
      if (children[i].tagName === 'VIDEO' && !children[i].classList.contains('bg-preview-video')) {
        return children[i];
      }
    }

    var videos = Array.prototype.slice.call(root.querySelectorAll('video'));
    for (var j = 0; j < videos.length; j += 1) {
      if (!videos[j].classList.contains('bg-preview-video') && !videos[j].closest('.resource-loader')) {
        return videos[j];
      }
    }

    return null;
  }

  function run() {
    initResponsiveBackgroundVideos();

    var roots = Array.prototype.slice.call(document.querySelectorAll('[data-bg-preview-root]'));
    if (!roots.length) return;

    roots.forEach(function (root, index) {
      if (root.__bgPreviewBound || root.querySelector('[data-bg-preview-tools]') || root.querySelector('.resource-media-preview')) return;
      root.__bgPreviewBound = true;

      var inputId = 'site-bg-preview-file-' + (index + 1);
      var tools = document.createElement('div');
      tools.className = 'bg-preview-tools';
      tools.setAttribute('data-bg-preview-tools', '');
      tools.innerHTML =
        '<label class="bg-preview-upload lg-btn" for="' + inputId + '">' +
          '<svg class="bg-preview-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M12 3v12"></path><path d="m7 8 5-5 5 5"></path><path d="M5 15v4h14v-4"></path>' +
          '</svg>' +
          '<span>上传文件</span>' +
          '<input class="bg-preview-file" id="' + inputId + '" type="file" accept="image/*,video/*" data-bg-preview-input>' +
        '</label>' +
        '<button class="bg-preview-reset" type="button" data-bg-preview-reset hidden>还原</button>';

      var input = tools.querySelector('[data-bg-preview-input]');
      var reset = tools.querySelector('[data-bg-preview-reset]');
      var originalVideo = getBackgroundVideo(root);
      var createdVideo = null;
      var imageLayer = null;
      var objectUrl = '';

      function ensureImageLayer() {
        if (imageLayer) return imageLayer;
        imageLayer = document.createElement('div');
        imageLayer.className = 'bg-preview-image';
        imageLayer.setAttribute('aria-hidden', 'true');
        root.appendChild(imageLayer);
        return imageLayer;
      }

      function ensureVideo() {
        var video = originalVideo || createdVideo;
        if (video) {
          video.setAttribute('data-bg-preview-video', '');
          return video;
        }

        createdVideo = document.createElement('video');
        createdVideo.className = 'bg-preview-video';
        createdVideo.setAttribute('data-bg-preview-video', '');
        createdVideo.setAttribute('aria-hidden', 'true');
        createdVideo.muted = true;
        createdVideo.loop = true;
        createdVideo.playsInline = true;
        createdVideo.autoplay = true;
        createdVideo.setAttribute('playsinline', '');
        createdVideo.setAttribute('webkit-playsinline', '');
        root.appendChild(createdVideo);
        return createdVideo;
      }

      function clearObjectUrl() {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = '';
      }

      function resetPreview() {
        clearObjectUrl();
        root.removeAttribute('data-bg-preview');

        if (imageLayer) {
          imageLayer.style.backgroundImage = '';
        }

        if (createdVideo) {
          createdVideo.remove();
          createdVideo = null;
        }

        if (originalVideo) {
          delete originalVideo.dataset.bgPreviewUser;
          originalVideo.setAttribute('data-bg-preview-video', '');
          setVideoSource(originalVideo, getResponsiveSource(originalVideo));
        }

        if (input) input.value = '';
        if (reset) reset.hidden = true;
      }

      if (originalVideo) {
        originalVideo.setAttribute('data-bg-preview-video', '');
      }

      if (input) {
        input.addEventListener('change', function () {
          var file = input.files && input.files[0];
          if (!file) return;

          clearObjectUrl();
          objectUrl = URL.createObjectURL(file);

          if (file.type.indexOf('video/') === 0) {
            var video = ensureVideo();
            video.dataset.bgPreviewUser = 'true';
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.autoplay = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('src', objectUrl);
            if (typeof video.load === 'function') video.load();
            safePlay(video);
            root.setAttribute('data-bg-preview', 'video');
          } else {
            ensureImageLayer().style.backgroundImage = 'url("' + objectUrl + '")';
            root.setAttribute('data-bg-preview', 'image');
          }

          if (reset) reset.hidden = false;
        });
      }

      if (reset) {
        reset.addEventListener('click', resetPreview);
      }

      root.appendChild(tools);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
