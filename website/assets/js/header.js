(() => {
  const header = document.querySelector('.tec-header');
  const sectionOne = document.getElementById('section-1');
  const menuToggle = document.querySelector('.tec-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const initNavbarJelly = menu => {
    const jelly = menu.querySelector('.tec-jelly');
    const navItems = Array.from(menu.querySelectorAll(':scope > li:not(.tec-jelly)'));
    let hoveredItem = null;

    const scheduleFrame = callback => {
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(callback);
        if (typeof window.setTimeout === 'function') {
          window.setTimeout(callback, 120);
        }
        return;
      }
      if (typeof window.setTimeout === 'function') {
        window.setTimeout(callback, 16);
        return;
      }
      callback();
    };

    const getActiveLink = () => {
      const active = menu.querySelector('.active') || navItems[0];
      return active?.matches?.('a') ? active : active?.querySelector?.('a');
    };

    const getItemLink = item => {
      const directLink = Array.from(item?.children || []).find(child => child.matches?.('a'));
      return directLink || item?.querySelector?.('a');
    };
    const getHoveredLink = () => {
      if (hoveredItem && hoveredItem.matches?.(':hover')) return getItemLink(hoveredItem);
      const hovered = navItems.find(item => item.matches?.(':hover'));
      hoveredItem = hovered || null;
      return getItemLink(hoveredItem);
    };

    const moveJelly = (target, immediate = false) => {
      const link = target?.matches?.('a') ? target : target?.querySelector?.('a');
      if (!jelly || !link) return;

      const linkRect = link.getBoundingClientRect();
      const navRect = menu.getBoundingClientRect();
      const jellyWidth = linkRect.width;
      const linkLeft = linkRect.left - navRect.left;

      if (immediate) {
        jelly.style.transition = 'none';
      }
      jelly.style.width = `${jellyWidth}px`;
      jelly.style.transform = `translateX(${linkLeft}px)`;
      if (immediate) {
        void jelly.offsetWidth;
        jelly.style.transition = '';
      }
    };

    const moveActive = (immediate = false) => moveJelly(getActiveLink(), immediate);
    const moveCurrent = (immediate = false) => moveJelly(getHoveredLink() || getActiveLink(), immediate);

    scheduleFrame(() => moveActive(true));
    if (typeof window.setTimeout === 'function') {
      window.setTimeout(() => moveActive(true), 420);
    }
    navItems.forEach(item => {
      const moveToItem = () => {
        hoveredItem = item;
        moveJelly(getItemLink(item));
      };
      item.addEventListener('mouseenter', moveToItem);
      item.addEventListener('focusin', moveToItem);
    });
    menu.addEventListener('mouseleave', event => {
      const nextTarget = event.relatedTarget;
      if (nextTarget?.nodeType && menu.contains(nextTarget)) return;
      hoveredItem = null;
      moveActive();
    });
    window.addEventListener('resize', () => {
      moveCurrent();
    });
    header?.addEventListener('transitionend', event => {
      if (['height', 'width', 'font-size'].includes(event.propertyName)) moveCurrent();
    });
  };

  const syncHeader = () => {
    if (!header) return;
    // header 永远保持 floating 态（白磨砂背景 + 深色 logo），避免浅色背景下 logo 不可见的问题
    header.classList.add('header--floating');
  };

  document.querySelectorAll('.tec-menu').forEach(initNavbarJelly);

  if (header && menuToggle && mobileMenu) {
    let savedScroll = 0;
    let closeTimers = [];
    const mobileMenuMaxWidth = 1120;

    const clearCloseTimers = () => {
      closeTimers.forEach(timer => clearTimeout(timer));
      closeTimers = [];
    };

    const cleanupMenu = (restoreScroll = true) => {
      clearCloseTimers();
      header.classList.remove('is-menu-open', 'menu-open', 'menu-closing');
      mobileMenu.classList.remove('is-leaving');
      document.body.classList.remove('is-menu-open', 'menu-locked');
      document.documentElement.classList.remove('menu-locked');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      if (restoreScroll) window.scrollTo(0, savedScroll);
    };

    const openMenu = () => {
      clearCloseTimers();
      mobileMenu.classList.remove('is-leaving');
      header.classList.remove('menu-closing');

      if (!document.body.classList.contains('menu-locked')) {
        savedScroll = window.scrollY;
        document.body.classList.add('menu-locked');
        document.documentElement.classList.add('menu-locked');
      }

      header.classList.add('is-menu-open', 'menu-open');
      document.body.classList.add('is-menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    };

    const closeMenu = (immediate = false, restoreScroll = true, afterClose = null) => {
      const isOpen = header.classList.contains('is-menu-open') || header.classList.contains('menu-open') || header.classList.contains('menu-closing');
      if (!isOpen) return;

      clearCloseTimers();

      if (immediate) {
        cleanupMenu(restoreScroll);
        if (typeof afterClose === 'function') afterClose();
        return;
      }

      header.classList.remove('is-menu-open', 'menu-open');
      document.body.classList.remove('is-menu-open');
      header.classList.add('menu-closing');
      menuToggle.setAttribute('aria-expanded', 'false');

      closeTimers.push(setTimeout(() => {
        mobileMenu.classList.add('is-leaving');
      }, 320));

      closeTimers.push(setTimeout(() => {
        cleanupMenu(restoreScroll);
        if (typeof afterClose === 'function') afterClose();
      }, 1050));
    };

    menuToggle.addEventListener('click', () => {
      if (header.classList.contains('menu-closing')) {
        openMenu();
        return;
      }

      if (header.classList.contains('is-menu-open') || header.classList.contains('menu-open')) {
        closeMenu();
        return;
      }

      openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', event => {
        const linkUrl = new URL(link.href, window.location.href);
        const isSamePageHash = (
          linkUrl.hash &&
          linkUrl.origin === window.location.origin &&
          linkUrl.pathname === window.location.pathname
        );

        if (isSamePageHash) {
          const target = document.getElementById(decodeURIComponent(linkUrl.hash.slice(1)));
          if (target) {
            event.preventDefault();
            closeMenu(false, false, () => {
              if (window.location.hash !== linkUrl.hash) {
                window.history.pushState(null, '', linkUrl.hash);
              }
              if (window.SiteCommon?.smoothScrollTo) {
                window.SiteCommon.smoothScrollTo(target);
                return;
              }
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            return;
          }
        }

        closeMenu();
      });
    });

    // SP 二级菜单手风琴：点击父项切换 data-open；同时关掉其它已开的
    mobileMenu.querySelectorAll('.mobile-submenu-toggle').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        const parentLi = btn.closest('.has-submenu');
        if (!parentLi) return;
        const isOpen = parentLi.getAttribute('data-open') === 'true';
        mobileMenu.querySelectorAll('.has-submenu[data-open="true"]').forEach(li => {
          li.setAttribute('data-open', 'false');
          li.querySelector('.mobile-submenu-toggle')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          parentLi.setAttribute('data-open', 'true');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > mobileMenuMaxWidth) closeMenu(true);
    });
  }

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('resize', syncHeader);
  window.addEventListener('load', syncHeader);
  window.addEventListener('hashchange', syncHeader);
  window.setTimeout?.(syncHeader, 120);
  window.setTimeout?.(syncHeader, 420);

  if (sectionOne && 'IntersectionObserver' in window) {
    new IntersectionObserver(syncHeader, { threshold: 0 }).observe(sectionOne);
  }
})();
