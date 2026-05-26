(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const smoothScrollTo = target => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const observeElements = (targets, onEntry, options = {}) => {
    const list = Array.from(targets || []).filter(Boolean);
    if (!list.length) return null;
    if (!('IntersectionObserver' in window)) {
      list.forEach(target => onEntry({ target, isIntersecting: true }));
      return null;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(onEntry), options);
    list.forEach(target => observer.observe(target));
    return observer;
  };

  const revealOnView = root => {
    if (!root) return;
    root.querySelectorAll('[data-animate]').forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.05}s`;
    });
    observeElements([root], entry => {
      if (entry.isIntersecting) root.classList.add('is-visible');
    }, { threshold: 0.2 });
  };

  window.SiteCommon = { smoothScrollTo, scrollToTop, observeElements, revealOnView };
})();
