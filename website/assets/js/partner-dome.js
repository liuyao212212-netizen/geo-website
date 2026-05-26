(function () {
  const mount = document.getElementById('partner-dome');
  if (!mount) return;

  const LOGO_FILES = [
    '20260517-105002.png',
    '20260517-105011.png',
    '20260517-105024.png',
    '20260517-105032.png',
    '20260517-105039.png',
    '20260517-105046.png',
    '20260517-105055.png',
    '20260517-105101.png',
    '20260517-105109.png',
    '20260517-105116.png',
    '20260517-105124.png',
    '20260517-105130.png',
    '20260517-105138.png',
    '20260517-105146.png',
    '20260517-105152.png',
    '20260517-105158.png',
    '20260517-105204.png',
    '20260517-105212.png',
    '20260517-105218.png',
    '20260517-105224.png',
    '20260517-105230.png',
    '20260517-105238.png',
    '20260517-105244.png',
    '20260517-105250.png',
    '20260517-105257.png',
    '20260517-105303.png',
    '20260517-105311.png',
    '20260517-105317.png',
    '20260517-105322.png',
    '20260517-105330.png',
    '20260517-105337.png',
    '20260517-105344.png',
    '20260517-105351.png',
    '20260517-105358.png',
    '20260517-105404.png',
    '20260517-105413.png',
    '20260517-105419.png',
    '20260517-105528.png',
    '20260517-105536.png',
    '20260517-105543.png',
    '20260517-105551.png',
    '20260517-105559.png',
    '20260517-105604.png',
    '20260517-105612.png',
    '20260517-105618.png',
    '20260517-105626.png',
    '20260517-105633.png',
    '20260517-105640.png',
    '20260517-105649.png',
    '20260517-105656.png',
    '20260517-105703.png',
    '20260517-105709.png',
    '20260517-105715.png',
    '20260517-105725.png',
    '20260517-105732.png',
    '20260517-105738.png',
    '20260517-105745.png',
    '20260517-105751.png',
    '20260517-105757.png',
    '20260517-105806.png',
    '20260517-105812.png',
    '20260517-105820.png',
    '20260517-105827.png',
    '20260517-105834.png',
    '20260517-105841.png',
    '20260517-105849.png',
    '20260517-105856.png',
    '20260517-105902.png',
    '20260517-105912.png',
    '20260517-105920.png',
    '20260517-105929.png',
    '20260517-105938.png',
    '20260517-105948.png',
    '20260517-105956.png',
    '20260517-110002.png',
    '20260517-110009.png',
    '20260517-110015.png',
    'WPS图片(1).jpeg',
    '客户合作 logo.png'
  ];

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const normalizeAngle = (degrees) => ((degrees % 360) + 360) % 360;
  const wrapAngleSigned = (degrees) => {
    const angle = (((degrees + 180) % 360) + 360) % 360;
    return angle - 180;
  };

  function buildItems(images, segments) {
    const xCols = Array.from({ length: segments }, (_, index) => -37 + index * 2);
    const evenYs = [-4, -2, 0, 2, 4];
    const oddYs = [-3, -1, 1, 3, 5];
    const coords = xCols.flatMap((x, column) => {
      const ys = column % 2 === 0 ? evenYs : oddYs;
      return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
    });

    return coords.map((coord, index) => ({
      ...coord,
      ...images[index % images.length]
    }));
  }

  class PartnerDome {
    constructor(root, options) {
      this.root = root;
      this.opts = Object.assign({
        images: [],
        fit: 0.95,
        fitBasis: 'min',
        minRadius: 400,
        maxRadius: Infinity,
        padFactor: 0.05,
        maxVerticalRotationDeg: 0,
        dragSensitivity: 20,
        enlargeTransitionMs: 300,
        segments: 35,
        dragDampening: 0.6
      }, options);

      this.rotation = { x: 0, y: 0 };
      this.drag = {
        active: false,
        moved: false,
        startX: 0,
        startY: 0,
        startRotX: 0,
        startRotY: 0,
        pointerId: null,
        history: []
      };
      this.inertiaId = null;
      this.focusedTile = null;
      this.opening = false;
      this.originalTilePos = null;
      this.openStartedAt = 0;
      this.lastDragEndAt = 0;

      this.buildDOM();
      this.buildTiles();
      this.setupResize();
      this.setupDrag();
      this.setupClose();
      this.applyTransform();
    }

    buildDOM() {
      this.root.classList.add('partner-dome-root');
      this.root.style.setProperty('--segments-x', this.opts.segments);
      this.root.style.setProperty('--segments-y', this.opts.segments);
      this.root.innerHTML = [
        '<main class="sphere-main">',
        '<div class="stage"><div class="sphere"></div></div>',
        '<div class="viewer"><div class="scrim"></div><div class="frame"></div></div>',
        '</main>'
      ].join('');

      this.main = this.root.querySelector('.sphere-main');
      this.sphere = this.root.querySelector('.sphere');
      this.viewer = this.root.querySelector('.viewer');
      this.scrim = this.root.querySelector('.scrim');
      this.frame = this.root.querySelector('.frame');
    }

    buildTiles() {
      const items = buildItems(this.opts.images, this.opts.segments);
      const fragment = document.createDocumentFragment();

      items.forEach((item) => {
        const tile = document.createElement('div');
        tile.className = 'item';
        tile.dataset.src = item.src;
        tile.dataset.offsetX = item.x;
        tile.dataset.offsetY = item.y;
        tile.dataset.sizeX = item.sizeX;
        tile.dataset.sizeY = item.sizeY;
        tile.style.setProperty('--offset-x', item.x);
        tile.style.setProperty('--offset-y', item.y);
        tile.style.setProperty('--item-size-x', item.sizeX);
        tile.style.setProperty('--item-size-y', item.sizeY);

        const inner = document.createElement('div');
        inner.className = 'item__image';
        inner.setAttribute('role', 'button');
        inner.setAttribute('tabindex', '0');
        inner.setAttribute('aria-label', item.alt || '打开 logo');

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || '';
        img.draggable = false;
        inner.appendChild(img);

        inner.addEventListener('click', (event) => this.onTileClick(event));
        inner.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.openTile(event.currentTarget);
          }
        });

        tile.appendChild(inner);
        fragment.appendChild(tile);
      });

      this.sphere.appendChild(fragment);
    }

    setupResize() {
      const resizeObserver = new ResizeObserver((entries) => {
        const contentRect = entries[0].contentRect;
        const width = Math.max(1, contentRect.width);
        const height = Math.max(1, contentRect.height);
        const minDim = Math.min(width, height);
        const maxDim = Math.max(width, height);
        const aspect = width / height;

        let basis = minDim;
        if (this.opts.fitBasis === 'max') basis = maxDim;
        if (this.opts.fitBasis === 'width') basis = width;
        if (this.opts.fitBasis === 'height') basis = height;
        if (this.opts.fitBasis === 'auto') basis = aspect >= 1.3 ? width : minDim;

        let radius = basis * this.opts.fit;
        radius = Math.min(radius, height * 1.35);
        radius = clamp(radius, this.opts.minRadius, this.opts.maxRadius);

        const viewerPad = Math.max(8, Math.round(minDim * this.opts.padFactor));
        this.root.style.setProperty('--radius', `${Math.round(radius)}px`);
        this.root.style.setProperty('--viewer-pad', `${viewerPad}px`);
        this.applyTransform();
      });
      resizeObserver.observe(this.root);
    }

    applyTransform() {
      this.sphere.style.transform =
        `translateZ(calc(var(--radius) * -1)) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg)`;
    }

    setupDrag() {
      this.main.addEventListener('pointerdown', (event) => {
        if (this.focusedTile) return;
        this.stopInertia();

        this.drag.active = true;
        this.drag.moved = false;
        this.drag.startX = event.clientX;
        this.drag.startY = event.clientY;
        this.drag.startRotX = this.rotation.x;
        this.drag.startRotY = this.rotation.y;
        this.drag.pointerId = event.pointerId;
        this.drag.history = [{ t: performance.now(), x: event.clientX, y: event.clientY }];

        try {
          this.main.setPointerCapture(event.pointerId);
        } catch {}
        this.main.classList.add('is-dragging');
      });

      this.main.addEventListener('pointermove', (event) => {
        if (!this.drag.active) return;

        const dx = event.clientX - this.drag.startX;
        const dy = event.clientY - this.drag.startY;
        if (!this.drag.moved && (dx * dx + dy * dy) > 16) this.drag.moved = true;

        this.rotation.x = clamp(
          this.drag.startRotX - dy / this.opts.dragSensitivity,
          -this.opts.maxVerticalRotationDeg,
          this.opts.maxVerticalRotationDeg
        );
        this.rotation.y = wrapAngleSigned(this.drag.startRotY + dx / this.opts.dragSensitivity);
        this.applyTransform();

        const now = performance.now();
        this.drag.history.push({ t: now, x: event.clientX, y: event.clientY });
        while (this.drag.history.length > 1 && this.drag.history[0].t < now - 100) {
          this.drag.history.shift();
        }
      });

      const endDrag = () => {
        if (!this.drag.active) return;

        this.drag.active = false;
        this.main.classList.remove('is-dragging');
        try {
          this.main.releasePointerCapture(this.drag.pointerId);
        } catch {}

        if (this.drag.history.length >= 2) {
          const first = this.drag.history[0];
          const last = this.drag.history[this.drag.history.length - 1];
          const dt = last.t - first.t;
          if (dt > 8) {
            const vx = (last.x - first.x) / dt;
            const vy = (last.y - first.y) / dt;
            if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) this.startInertia(vx, vy);
          }
        }

        if (this.drag.moved) this.lastDragEndAt = performance.now();
        window.setTimeout(() => {
          this.drag.moved = false;
        }, 50);
      };

      this.main.addEventListener('pointerup', endDrag);
      this.main.addEventListener('pointercancel', endDrag);
    }

    startInertia(vx, vy) {
      const maxV = 1.4;
      let velocityX = clamp(vx, -maxV, maxV) * 80;
      let velocityY = clamp(vy, -maxV, maxV) * 80;
      let frames = 0;
      const dampening = clamp(this.opts.dragDampening, 0, 1);
      const friction = 0.94 + 0.055 * dampening;
      const stopThreshold = 0.015 - 0.01 * dampening;
      const maxFrames = Math.round(90 + 270 * dampening);

      const step = () => {
        velocityX *= friction;
        velocityY *= friction;
        if (Math.abs(velocityX) < stopThreshold && Math.abs(velocityY) < stopThreshold) {
          this.inertiaId = null;
          return;
        }
        if (++frames > maxFrames) {
          this.inertiaId = null;
          return;
        }

        this.rotation.x = clamp(
          this.rotation.x - velocityY / 200,
          -this.opts.maxVerticalRotationDeg,
          this.opts.maxVerticalRotationDeg
        );
        this.rotation.y = wrapAngleSigned(this.rotation.y + velocityX / 200);
        this.applyTransform();
        this.inertiaId = requestAnimationFrame(step);
      };

      this.stopInertia();
      this.inertiaId = requestAnimationFrame(step);
    }

    stopInertia() {
      if (!this.inertiaId) return;
      cancelAnimationFrame(this.inertiaId);
      this.inertiaId = null;
    }

    onTileClick(event) {
      if (this.drag.active || this.drag.moved) return;
      if (performance.now() - this.lastDragEndAt < 80) return;
      if (this.opening) return;
      this.openTile(event.currentTarget);
    }

    openTile(element) {
      if (this.opening) return;

      this.opening = true;
      this.openStartedAt = performance.now();
      document.body.classList.add('dg-scroll-lock');

      const parent = element.parentElement;
      this.focusedTile = element;
      element.setAttribute('data-focused', 'true');

      const offsetX = parseFloat(parent.dataset.offsetX) || 0;
      const offsetY = parseFloat(parent.dataset.offsetY) || 0;
      const sizeX = parseFloat(parent.dataset.sizeX) || 2;
      const sizeY = parseFloat(parent.dataset.sizeY) || 2;
      const unit = 360 / this.opts.segments / 2;
      const baseRotY = unit * (offsetX + (sizeX - 1) / 2);
      const baseRotX = unit * (offsetY - (sizeY - 1) / 2);
      const parentY = normalizeAngle(baseRotY);
      const globalY = normalizeAngle(this.rotation.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;

      parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
      parent.style.setProperty('--rot-x-delta', `${-baseRotX - this.rotation.x}deg`);

      const ref = document.createElement('div');
      ref.className = 'item__image item__image--reference';
      ref.style.opacity = '0';
      ref.style.transform = `rotateX(${-baseRotX}deg) rotateY(${-baseRotY}deg)`;
      parent.appendChild(ref);
      void ref.offsetHeight;

      const tileRect = ref.getBoundingClientRect();
      const mainRect = this.main.getBoundingClientRect();
      const frameRect = this.frame.getBoundingClientRect();
      if (tileRect.width <= 0 || tileRect.height <= 0) {
        this.opening = false;
        this.focusedTile = null;
        ref.remove();
        document.body.classList.remove('dg-scroll-lock');
        return;
      }

      this.originalTilePos = {
        left: tileRect.left,
        top: tileRect.top,
        width: tileRect.width,
        height: tileRect.height
      };
      element.style.visibility = 'hidden';
      element.style.zIndex = '0';

      const overlay = document.createElement('div');
      overlay.className = 'enlarge';
      overlay.style.left = `${frameRect.left - mainRect.left}px`;
      overlay.style.top = `${frameRect.top - mainRect.top}px`;
      overlay.style.width = `${frameRect.width}px`;
      overlay.style.height = `${frameRect.height}px`;
      overlay.style.opacity = '0';
      overlay.style.willChange = 'transform, opacity';
      overlay.style.transition =
        `transform ${this.opts.enlargeTransitionMs}ms ease, opacity ${this.opts.enlargeTransitionMs}ms ease`;

      const img = document.createElement('img');
      img.src = parent.dataset.src;
      img.alt = '';
      overlay.appendChild(img);
      this.viewer.appendChild(overlay);

      const tx = tileRect.left - frameRect.left;
      const ty = tileRect.top - frameRect.top;
      const sx = tileRect.width / frameRect.width || 1;
      const sy = tileRect.height / frameRect.height || 1;
      overlay.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;

      window.setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = '1';
        overlay.style.transform = 'translate(0, 0) scale(1, 1)';
        this.root.setAttribute('data-enlarging', 'true');
      }, 16);
    }

    setupClose() {
      const close = () => {
        if (performance.now() - this.openStartedAt < 250) return;
        const element = this.focusedTile;
        if (!element) return;

        const parent = element.parentElement;
        const overlay = this.viewer.querySelector('.enlarge');
        const ref = parent.querySelector('.item__image--reference');
        if (!overlay || !this.originalTilePos) return;

        const currentRect = overlay.getBoundingClientRect();
        const rootRect = this.root.getBoundingClientRect();
        const closing = document.createElement('div');
        closing.className = 'enlarge-closing';
        closing.style.cssText = [
          'position:absolute',
          `left:${currentRect.left - rootRect.left}px`,
          `top:${currentRect.top - rootRect.top}px`,
          `width:${currentRect.width}px`,
          `height:${currentRect.height}px`,
          'z-index:9999',
          'border-radius:var(--enlarge-radius)',
          'overflow:hidden',
          'box-shadow:0 10px 30px rgba(0,0,0,.35)',
          `transition:all ${this.opts.enlargeTransitionMs}ms ease-out`,
          'pointer-events:none',
          'margin:0',
          'transform:none'
        ].join(';');

        const originalImg = overlay.querySelector('img');
        if (originalImg) closing.appendChild(originalImg.cloneNode());
        overlay.remove();
        this.root.appendChild(closing);
        void closing.getBoundingClientRect();

        requestAnimationFrame(() => {
          closing.style.left = `${this.originalTilePos.left - rootRect.left}px`;
          closing.style.top = `${this.originalTilePos.top - rootRect.top}px`;
          closing.style.width = `${this.originalTilePos.width}px`;
          closing.style.height = `${this.originalTilePos.height}px`;
          closing.style.opacity = '0';
        });

        closing.addEventListener('transitionend', () => {
          closing.remove();
          if (ref) ref.remove();
          this.originalTilePos = null;
          this.restoreTile(parent, element);
        }, { once: true });
      };

      this.scrim.addEventListener('click', close);
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
      });
    }

    restoreTile(parent, element) {
      parent.style.transition = 'none';
      element.style.transition = 'none';
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');

      requestAnimationFrame(() => {
        element.style.visibility = '';
        element.style.opacity = '0';
        element.style.zIndex = '0';
        this.focusedTile = null;
        this.root.removeAttribute('data-enlarging');
        requestAnimationFrame(() => {
          parent.style.transition = '';
          element.style.transition = 'opacity 300ms ease-out';
          requestAnimationFrame(() => {
            element.style.opacity = '1';
            window.setTimeout(() => {
              element.style.transition = '';
              element.style.opacity = '';
              this.opening = false;
              if (!this.drag.active && this.root.getAttribute('data-enlarging') !== 'true') {
                document.body.classList.remove('dg-scroll-lock');
              }
            }, 300);
          });
        });
      });
    }
  }

  const images = LOGO_FILES.map((file) => ({
    src: `./assets/images/client-logos/dome/${file}`,
    alt: file.replace(/\.[^.]+$/, '')
  }));

  new PartnerDome(mount, {
    images,
    fit: 0.95,
    fitBasis: 'min',
    minRadius: 400,
    padFactor: 0.05,
    maxVerticalRotationDeg: 0
  });
})();
