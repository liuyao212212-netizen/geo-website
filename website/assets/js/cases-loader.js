/* ============================================================
   cases-loader.js — 双集群粒子纠缠加载动画
   ────────────────────────────────────────────────
   左右两团粒子飞入中央,距离 < 阈值时连线,合屏后整体淡出。
   纯 Canvas 2D,无依赖。
   ============================================================ */

(function () {
  var loader = document.querySelector('[data-cases-loader]');
  if (!loader) return;

  var canvas = loader.querySelector('.cases-loader__canvas');
  if (!canvas) return;

  document.body.classList.add('cases-loader-active');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TOTAL_MS = 1800;
  var FADE_MS = 420;

  function replayHeroAnimations() {
    var hero = document.querySelector('.case-hero');
    if (!hero) return;

    // 重置 hero 内的 reveal 类(用 repeat 模式,IO 会在视口内重新加 is-in)
    var revealItems = hero.querySelectorAll('[data-reveal], [data-reveal-group]');
    revealItems.forEach(function (el) {
      el.classList.remove('is-in');
    });

    // 重置 countup 状态 + 数字归零
    var countNodes = hero.querySelectorAll('[data-countup]');
    countNodes.forEach(function (el) {
      el.removeAttribute('data-countup-done');
      var suffix = el.getAttribute('data-countup-suffix') || '';
      el.textContent = '0' + suffix;
    });

    // 触发一次 reflow,确保下一帧 transition 生效
    void hero.offsetWidth;

    // 让 reveal.js 全局重新初始化(必须传 document, 否则其他板块的 IO 会被断开)
    if (window.SiteReveal && typeof window.SiteReveal.refresh === 'function') {
      window.requestAnimationFrame(function () {
        window.SiteReveal.refresh(document);
      });
    }
  }

  function teardown() {
    loader.classList.add('is-fading');
    document.body.classList.remove('cases-loader-active');
    replayHeroAnimations();
    window.setTimeout(function () {
      loader.classList.add('is-gone');
    }, FADE_MS);
  }

  if (reduceMotion) {
    window.setTimeout(teardown, 600);
    return;
  }

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    window.setTimeout(teardown, TOTAL_MS);
    return;
  }

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;

  function resize() {
    var rect = loader.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // 粒子配置
  var COUNT_PER_SIDE = 30;
  var LINK_DIST = 110;
  var COLOR_LEFT = [56, 189, 248];   // #38BDF8 sky-400
  var COLOR_RIGHT = [255, 255, 255]; // #FFFFFF
  var COLOR_LINK = [125, 211, 252];  // #7DD3FC sky-300

  function rand(min, max) { return min + Math.random() * (max - min); }

  function makeParticle(side) {
    var fromLeft = side === 'left';
    var cx = width / 2;
    var cy = height / 2;
    var spread = Math.min(width, height) * 0.18;
    var targetX = cx + (fromLeft ? -rand(0, spread) : rand(0, spread));
    var targetY = cy + rand(-spread, spread);
    var startX = fromLeft ? -rand(40, width * 0.35) : width + rand(40, width * 0.35);
    var startY = rand(0, height);
    return {
      side: side,
      x: startX,
      y: startY,
      startX: startX,
      startY: startY,
      targetX: targetX,
      targetY: targetY,
      radius: rand(1.1, 2.6),
      delay: rand(0, 220),
      jitter: rand(2, 7),
      jitterSpeed: rand(0.6, 1.6)
    };
  }

  var particles = [];
  for (var i = 0; i < COUNT_PER_SIDE; i++) particles.push(makeParticle('left'));
  for (var j = 0; j < COUNT_PER_SIDE; j++) particles.push(makeParticle('right'));

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInCubic(t)  { return t * t * t; }

  var startTime = performance.now();
  var rafId = 0;
  var done = false;

  // 时间分段(ms)
  var ENTER_END = 900;    // 0   ~ 900   飞入
  var WEAVE_END = 1450;   // 900 ~ 1450  交织 + 抖动
  var DISPERSE_END = 1800;// 1450~ 1800  散开

  function frame(now) {
    var elapsed = now - startTime;
    ctx.clearRect(0, 0, width, height);

    // 算出每颗粒子当前位置
    var positions = new Array(particles.length);

    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      var localT = elapsed - p.delay;
      var x, y;

      if (localT < 0) {
        x = p.startX; y = p.startY;
      } else if (elapsed <= ENTER_END) {
        var enterT = Math.max(0, Math.min(1, localT / (ENTER_END - p.delay)));
        var e = easeOutCubic(enterT);
        x = p.startX + (p.targetX - p.startX) * e;
        y = p.startY + (p.targetY - p.startY) * e;
      } else if (elapsed <= WEAVE_END) {
        // 在 target 附近抖动
        var phase = (elapsed / 1000) * Math.PI * 2 * p.jitterSpeed;
        x = p.targetX + Math.cos(phase + p.delay) * p.jitter;
        y = p.targetY + Math.sin(phase + p.delay) * p.jitter;
      } else {
        // 散开:从 target 飞出
        var disperseT = Math.max(0, Math.min(1, (elapsed - WEAVE_END) / (DISPERSE_END - WEAVE_END)));
        var d = easeInCubic(disperseT);
        var cx = width / 2, cy = height / 2;
        var dirX = p.targetX - cx;
        var dirY = p.targetY - cy;
        var len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
        var push = 320 * d;
        x = p.targetX + (dirX / len) * push;
        y = p.targetY + (dirY / len) * push;
      }

      positions[k] = { x: x, y: y, p: p };
    }

    // 阶段不透明度
    var globalAlpha = 1;
    if (elapsed <= ENTER_END) {
      globalAlpha = Math.min(1, elapsed / 380);
    } else if (elapsed > WEAVE_END) {
      var fadeT = (elapsed - WEAVE_END) / (DISPERSE_END - WEAVE_END);
      globalAlpha = Math.max(0, 1 - fadeT);
    }

    // 画连线(仅在飞入完成后)
    if (elapsed > ENTER_END * 0.6) {
      var linkAlpha = globalAlpha * (elapsed > WEAVE_END ? 0.6 : 0.9);
      for (var a = 0; a < positions.length; a++) {
        for (var b = a + 1; b < positions.length; b++) {
          var pa = positions[a];
          var pb = positions[b];
          var dx = pa.x - pb.x;
          var dy = pa.y - pb.y;
          var dist2 = dx * dx + dy * dy;
          if (dist2 > LINK_DIST * LINK_DIST) continue;
          var dist = Math.sqrt(dist2);
          var alpha = (1 - dist / LINK_DIST) * linkAlpha * 0.55;
          if (alpha <= 0.02) continue;
          ctx.strokeStyle = 'rgba(' + COLOR_LINK[0] + ',' + COLOR_LINK[1] + ',' + COLOR_LINK[2] + ',' + alpha.toFixed(3) + ')';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }
    }

    // 画粒子
    for (var m = 0; m < positions.length; m++) {
      var pos = positions[m];
      var pp = pos.p;
      var color = pp.side === 'left' ? COLOR_LEFT : COLOR_RIGHT;
      var alphaP = globalAlpha;
      ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alphaP.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, pp.radius, 0, Math.PI * 2);
      ctx.fill();
      // glow
      ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (alphaP * 0.18).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, pp.radius * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 中心 ripple(在 WEAVE 阶段一次性扩散)
    if (elapsed > ENTER_END && elapsed < WEAVE_END) {
      var rippleT = (elapsed - ENTER_END) / (WEAVE_END - ENTER_END);
      var rippleR = 80 + rippleT * 220;
      var rippleA = (1 - rippleT) * 0.4;
      ctx.strokeStyle = 'rgba(255,255,255,' + rippleA.toFixed(3) + ')';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, rippleR, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (elapsed < DISPERSE_END) {
      rafId = window.requestAnimationFrame(frame);
    } else if (!done) {
      done = true;
      teardown();
    }
  }

  // 等下一帧再启动,避免首帧 lag
  rafId = window.requestAnimationFrame(frame);
})();
