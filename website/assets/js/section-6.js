(() => {
  const initSection6 = () => {
    const form = document.querySelector('.section-6__form');
    if (!form) return;

    const chips = Array.from(form.querySelectorAll('.section-6__chip'));
    const modelsInput = form.querySelector('#ai-models');
    const dropdown = form.querySelector('.section-6__dropdown');
    const trigger = dropdown?.querySelector('.section-6__dropdown-trigger');
    const textEl = dropdown?.querySelector('.section-6__dropdown-text');
    const items = Array.from(dropdown?.querySelectorAll('.section-6__dropdown-item') || []);
    const toast = document.querySelector('.section-6__toast');

    const setChipSelected = (chip, isSelected) => {
      chip.setAttribute('data-selected', String(isSelected));
      chip.setAttribute('aria-pressed', String(isSelected));
    };

    const syncSelectedModels = () => {
      if (!modelsInput) return;
      modelsInput.value = chips
        .filter(chip => chip.getAttribute('data-selected') === 'true')
        .map(chip => chip.getAttribute('data-value') || chip.textContent.trim())
        .join(',');
    };

    chips.forEach(chip => {
      setChipSelected(chip, false);
      chip.addEventListener('click', event => {
        event.preventDefault();
        const isSelected = chip.getAttribute('data-selected') === 'true';
        setChipSelected(chip, !isSelected);
        syncSelectedModels();
      });
    });

    const closeDropdown = () => {
      if (!dropdown || !trigger) return;
      dropdown.setAttribute('data-open', 'false');
      trigger.setAttribute('aria-expanded', 'false');
    };

    if (dropdown && trigger && textEl) {
      trigger.addEventListener('click', () => {
        const isOpen = dropdown.getAttribute('data-open') === 'true';
        dropdown.setAttribute('data-open', String(!isOpen));
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });

      items.forEach(item => {
        item.addEventListener('click', () => {
          const value = item.getAttribute('data-value') || '';
          textEl.textContent = value;
          dropdown.setAttribute('data-selected', 'true');
          items.forEach(option => option.setAttribute('aria-selected', String(option === item)));
          closeDropdown();
        });
      });

      document.addEventListener('click', event => {
        if (!dropdown.contains(event.target)) closeDropdown();
      });

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeDropdown();
      });
    }

    form.addEventListener('submit', event => {
      event.preventDefault();

      const company = form.querySelector('#company');
      const email = form.querySelector('#email');
      const firstEmpty = !company.value.trim() ? company : (!email.value.trim() ? email : null);

      if (firstEmpty) {
        firstEmpty.focus();
        return;
      }

      form.setAttribute('data-loading', 'true');

      window.setTimeout(() => {
        form.setAttribute('data-loading', 'false');

        if (toast) {
          toast.setAttribute('data-show', 'true');
          toast.setAttribute('aria-hidden', 'false');

          window.setTimeout(() => {
            toast.setAttribute('data-show', 'false');
            toast.setAttribute('aria-hidden', 'true');
          }, 4000);
        }

        form.reset();
        chips.forEach(chip => {
          setChipSelected(chip, false);
        });
        syncSelectedModels();

        if (dropdown && textEl) {
          textEl.textContent = '请选择';
          dropdown.removeAttribute('data-selected');
          closeDropdown();
          items.forEach(item => item.setAttribute('aria-selected', 'false'));
        }
      }, 1500);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSection6);
  } else {
    initSection6();
  }
})();
