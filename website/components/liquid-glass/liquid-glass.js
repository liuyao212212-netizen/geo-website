/* ============================================================
   Liquid Glass — 鼠标位置追踪
   ------------------------------------------------------------
   把鼠标在元素内的位置写到 CSS 变量 --mx / --my
   配合 CSS 里的 radial-gradient(at var(--mx) var(--my)) 形成液态填充
   ============================================================ */

(function () {
  const SELECTOR = ".lg-btn, .lg-tag, .lg-card, .lg-logo-card";

  function bind(el) {
    if (el.__lgBound) return;
    el.__lgBound = true;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", x + "%");
      el.style.setProperty("--my", y + "%");
    };

    const onLeave = () => {
      // 离开时让填充收回到中心
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
  }

  function init(root = document) {
    root.querySelectorAll(SELECTOR).forEach(bind);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }

  // 暴露给动态插入的元素调用
  window.LiquidGlass = { init, bind };
})();
