/* ============================================================
   react-bits-effects.js — react-bits 组件移植 (vanilla JS)
   ────────────────────────────────────────────────
   1. DecryptedText - 字符解密效果(Hero 标题)
   2. TextType      - 打字机循环(Hero 副标题)
   3. ScrollStack   - 滚动卡片堆叠(核心业务)
   4. CircularGallery - 圆形画廊(出版书籍)
   5. Aurora        - Canvas 2D 极光背景(Hero)
   ============================================================ */

(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // 1. DecryptedText
  // ============================================================
  function initDecryptedText() {
    var nodes = document.querySelectorAll('[data-decrypted]');
    if (!nodes.length) return;
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>{}[]/\\';

    nodes.forEach(function (el) {
      var original = el.getAttribute('data-decrypted') || el.textContent.trim();
      var duration = parseInt(el.getAttribute('data-decrypted-duration') || '1600', 10);
      var speed = parseInt(el.getAttribute('data-decrypted-speed') || '40', 10);

      // 拆字保留 children — 我们 wrap 每个 char 到 span
      var chars = Array.from(original);
      el.innerHTML = '';
      var spans = chars.map(function (c) {
        var s = document.createElement('span');
        s.className = 'rb-decrypted__char';
        s.textContent = c === ' ' ? ' ' : c;
        el.appendChild(s);
        return s;
      });

      if (reduce) return; // 不动画,直接显示

      function shuffleOnce(progress) {
        // progress 0 → 1, 揭示从左到右
        var revealCount = Math.floor(progress * chars.length);
        chars.forEach(function (c, i) {
          if (c === ' ') { spans[i].textContent = ' '; return; }
          if (i < revealCount) {
            spans[i].textContent = c;
            spans[i].classList.add('rb-decrypted__char--done');
          } else {
            spans[i].textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            spans[i].classList.remove('rb-decrypted__char--done');
          }
        });
      }

      // 初始扰乱
      shuffleOnce(0);

      var started = false;
      function start() {
        if (started) return;
        started = true;
        var t0 = performance.now();
        var lastShuffle = t0;
        function tick(now) {
          var elapsed = now - t0;
          var progress = Math.min(1, elapsed / duration);
          if (now - lastShuffle >= speed) {
            shuffleOnce(progress);
            lastShuffle = now;
          }
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            // 最终态:全部 reveal
            chars.forEach(function (c, i) {
              spans[i].textContent = c === ' ' ? ' ' : c;
              spans[i].classList.add('rb-decrypted__char--done');
            });
          }
        }
        requestAnimationFrame(tick);
      }

      // IO 触发
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              start();
              io.unobserve(el);
            }
          });
        }, { threshold: 0.2 });
        io.observe(el);
        // 兜底:1s 内还没 fire 直接启动
        setTimeout(function () { if (!started) start(); }, 1000);
      } else {
        start();
      }
    });
  }

  // ============================================================
  // 2. TextType
  // ============================================================
  function initTextType() {
    var nodes = document.querySelectorAll('[data-text-type]');
    if (!nodes.length) return;

    nodes.forEach(function (el) {
      var raw = el.getAttribute('data-text-type');
      var texts;
      try { texts = JSON.parse(raw); } catch (e) { texts = [raw]; }
      if (!Array.isArray(texts) || !texts.length) return;

      var typeSpeed = parseInt(el.getAttribute('data-type-speed') || '55', 10);
      var deleteSpeed = parseInt(el.getAttribute('data-delete-speed') || '28', 10);
      var pause = parseInt(el.getAttribute('data-type-pause') || '1600', 10);

      el.innerHTML = '<span class="rb-typetype__text"></span><span class="rb-typetype__cursor" aria-hidden="true">|</span>';
      var content = el.querySelector('.rb-typetype__text');

      if (reduce) {
        content.textContent = texts[0];
        return;
      }

      var ti = 0, ci = 0, deleting = false;

      function tick() {
        var current = texts[ti];
        if (!deleting) {
          if (ci < current.length) {
            ci++;
            content.textContent = current.slice(0, ci);
            setTimeout(tick, typeSpeed);
          } else {
            setTimeout(function () { deleting = true; tick(); }, pause);
          }
        } else {
          if (ci > 0) {
            ci--;
            content.textContent = current.slice(0, ci);
            setTimeout(tick, deleteSpeed);
          } else {
            deleting = false;
            ti = (ti + 1) % texts.length;
            setTimeout(tick, 220);
          }
        }
      }
      tick();
    });
  }

  // ============================================================
  // 3. ScrollStack
  // ============================================================
  function initScrollStack() {
    var scroller = document.querySelector('[data-scroll-stack]');
    if (!scroller || reduce) return;
    var cards = scroller.querySelectorAll('.scroll-stack-card');
    if (!cards.length) return;

    var itemDistance = 80;
    var itemStackDistance = 22;
    var itemScale = 0.04;
    var baseScale = 0.88;
    var stackPosition = 0.18; // 距视口顶部 18%

    cards.forEach(function (card, i) {
      if (i < cards.length - 1) card.style.marginBottom = itemDistance + 'px';
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
    });

    var endEl = scroller.querySelector('.scroll-stack-end');

    function getOffsetTop(el) {
      return el.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop);
    }

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var vh = window.innerHeight;
      var stackPx = vh * stackPosition;
      var endTop = endEl ? getOffsetTop(endEl) : 0;

      cards.forEach(function (card, i) {
        var cardTop = getOffsetTop(card);
        var triggerStart = cardTop - stackPx - itemStackDistance * i;
        var triggerEnd = cardTop - vh * 0.1;
        var pinStart = triggerStart;
        var pinEnd = endTop - vh / 2;

        var p = 0;
        if (scrollTop >= triggerStart) {
          p = Math.min(1, (scrollTop - triggerStart) / Math.max(1, triggerEnd - triggerStart));
        }
        var targetScale = baseScale + i * itemScale;
        var scale = 1 - p * (1 - targetScale);

        var translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
        }

        // 计算栈顶卡 index 用于 blur
        var topCardIndex = 0;
        for (var j = 0; j < cards.length; j++) {
          var jTop = getOffsetTop(cards[j]);
          var jTrig = jTop - stackPx - itemStackDistance * j;
          if (scrollTop >= jTrig) topCardIndex = j;
        }
        var blur = (i < topCardIndex) ? Math.max(0, (topCardIndex - i) * 2.4) : 0;

        card.style.transform = 'translate3d(0,' + translateY.toFixed(2) + 'px,0) scale(' + scale.toFixed(3) + ')';
        card.style.filter = blur > 0 ? 'blur(' + blur.toFixed(2) + 'px)' : '';
      });
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }

    update();
    if (window.SiteLenis && typeof window.SiteLenis.on === 'function') {
      window.SiteLenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onScroll, { passive: true });
  }

  // ============================================================
  // 4. CircularGallery (CSS 3D rotate,纯 vanilla)
  // ============================================================
  function initCircularGallery() {
    var galleries = document.querySelectorAll('[data-circular-gallery]');
    if (!galleries.length || reduce) return;

    galleries.forEach(function (gallery) {
      var items = gallery.querySelectorAll('.rb-circ__item');
      if (!items.length) return;
      var radius = parseInt(gallery.getAttribute('data-radius') || '420', 10);
      var autoSpeed = parseFloat(gallery.getAttribute('data-auto-speed') || '0.08'); // 度/frame

      var rotation = 0;
      var targetRotation = 0;
      var isDragging = false;
      var dragStart = 0;
      var dragRotStart = 0;

      // 排列每张到圆周
      items.forEach(function (item, i) {
        var angle = (360 / items.length) * i;
        item.style.setProperty('--angle', angle + 'deg');
        item.style.setProperty('--radius', radius + 'px');
      });

      function apply() {
        gallery.style.setProperty('--rotation', rotation.toFixed(3) + 'deg');
      }

      function tick() {
        if (!isDragging) {
          targetRotation += autoSpeed;
        }
        rotation += (targetRotation - rotation) * 0.08;
        apply();
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      // 拖拽控制
      function onStart(x) { isDragging = true; dragStart = x; dragRotStart = targetRotation; gallery.style.cursor = 'grabbing'; }
      function onMove(x) {
        if (!isDragging) return;
        var dx = x - dragStart;
        targetRotation = dragRotStart + dx * 0.3;
      }
      function onEnd() { isDragging = false; gallery.style.cursor = 'grab'; }

      gallery.addEventListener('mousedown', function (e) { onStart(e.clientX); e.preventDefault(); });
      window.addEventListener('mousemove', function (e) { onMove(e.clientX); });
      window.addEventListener('mouseup', onEnd);
      gallery.addEventListener('touchstart', function (e) { onStart(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('touchmove', function (e) { onMove(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('touchend', onEnd);
      gallery.style.cursor = 'grab';

      // 滚轮加速旋转
      gallery.addEventListener('wheel', function (e) {
        targetRotation += e.deltaY * 0.1;
        e.preventDefault();
      }, { passive: false });
    });
  }

  // ============================================================
  // 5. Aurora (Canvas 2D 简化版极光)
  // ============================================================
  function initAurora() {
    var hosts = document.querySelectorAll('[data-aurora]');
    if (!hosts.length || reduce) return;

    hosts.forEach(function (host) {
      var canvas = document.createElement('canvas');
      canvas.className = 'rb-aurora__canvas';
      host.appendChild(canvas);
      var ctx = canvas.getContext('2d');
      var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

      var colorsAttr = host.getAttribute('data-aurora-colors') || '#38BDF8,#A78BFA,#22D3EE';
      var colors = colorsAttr.split(',').map(function (c) { return c.trim(); });
      var amplitude = parseFloat(host.getAttribute('data-aurora-amplitude') || '1.2');
      var speed = parseFloat(host.getAttribute('data-aurora-speed') || '0.5');

      function resize() {
        var rect = host.getBoundingClientRect();
        w = rect.width; h = rect.height;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      // 简单的 Perlin-ish: 用多个 sine 叠加
      function noise(x, t) {
        return (
          Math.sin(x * 1.5 + t * 0.8) * 0.5 +
          Math.sin(x * 3.2 + t * 1.3) * 0.3 +
          Math.sin(x * 5.7 + t * 0.5) * 0.2
        );
      }

      var t0 = performance.now();
      function frame(now) {
        var t = (now - t0) / 1000 * speed;
        ctx.clearRect(0, 0, w, h);

        // 多条极光带叠加
        var bands = 3;
        for (var b = 0; b < bands; b++) {
          var color = colors[b % colors.length];
          ctx.beginPath();
          var yBase = h * (0.35 + b * 0.08);
          for (var x = 0; x <= w; x += 4) {
            var n = noise(x / w * 4 + b * 1.7, t + b * 2.3);
            var y = yBase + n * h * 0.22 * amplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.closePath();

          var grad = ctx.createLinearGradient(0, yBase - h * 0.2, 0, h);
          grad.addColorStop(0, color + '00');
          grad.addColorStop(0.3, color + '55');
          grad.addColorStop(0.7, color + '22');
          grad.addColorStop(1, color + '00');
          ctx.fillStyle = grad;
          ctx.globalCompositeOperation = 'lighter';
          ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  // ============================================================
  // Boot
  // ============================================================
  function boot() {
    initDecryptedText();
    initTextType();
    initScrollStack();
    initCircularGallery();
    initAurora();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
