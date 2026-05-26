(function () {
  const stackEl = document.getElementById('case-testimonial-stack');
  if (!stackEl) return;

  const ICONS = {
    Users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    Calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    ThumbsUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7"/><path d="M7 10H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"/></svg>',
    ShieldCheck: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    Clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    Share: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>',
    Rocket: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    Zap: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
    Gem: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>'
  };

  const testimonialsData = [
    {
      id: 1,
      avatar: './assets/images/member_icon/male-1.webp',
      name: '林浩',
      role: '某新消费品牌 · 市场总监',
      quote: '六个月做到 AI 第一推荐位'
    },
    {
      id: 2,
      avatar: './assets/images/member_icon/male-2.webp',
      name: '周晨',
      role: '某电商集团 · CMO',
      quote: '客户问豆包，第一个跳出来的就是我们'
    },
    {
      id: 3,
      avatar: './assets/images/member_icon/male-3.webp',
      name: '王启明',
      role: '某 SaaS 服务商 · CEO',
      quote: 'AI 时代的获客方式被彻底改变'
    },
    {
      id: 4,
      avatar: './assets/images/member_icon/male-4.webp',
      name: '陈泽',
      role: '某金融科技 · 增长负责人',
      quote: 'ChatGPT、文心一言、Kimi 全平台覆盖'
    },
    {
      id: 5,
      avatar: './assets/images/member_icon/female.webp',
      name: '李婧',
      role: '某美妆品牌 · 数字营销总监',
      quote: 'AI 推荐位增长 320%，肉眼可见'
    },
    {
      id: 6,
      avatar: './assets/images/member_icon/male-1.webp',
      name: '张磊',
      role: '某医疗器械 · 品牌总监',
      quote: '终于不用担心 AI 给客户错误信息'
    },
    {
      id: 7,
      avatar: './assets/images/member_icon/male-2.webp',
      name: '高远',
      role: '某 B2B 制造 · 营销 VP',
      quote: '比传统 SEO 转化率高出 2 倍'
    },
    {
      id: 8,
      avatar: './assets/images/member_icon/male-3.webp',
      name: '黄子轩',
      role: '某工业设备 · 销售总监',
      quote: 'B2B 询盘量翻了 3 倍'
    },
    {
      id: 9,
      avatar: './assets/images/member_icon/male-4.webp',
      name: '吴俊',
      role: '某汽车后市场 · CMO',
      quote: '客户的 AI 提问回答里有我们了'
    },
    {
      id: 10,
      avatar: './assets/images/member_icon/female.webp',
      name: '杨柳',
      role: '某新零售品牌 · 战略总监',
      quote: 'AI 搜索时代真正的护城河'
    }
  ];

  const VISIBLE_BEHIND = 2;
  const totalCards = testimonialsData.length;
  let activeIndex = 0;
  let isDragging = false;
  let dragStart = 0;
  let dragOffset = 0;
  const cardEls = [];
  const dotEls = [];

  function tagClasses(type) {
    return type === 'featured'
      ? 'bg-primary/20 text-primary border border-primary/30'
      : 'bg-secondary text-secondary-foreground';
  }

  function computeStyle(displayOrder) {
    if (displayOrder === 0) {
      return {
        transform: `translateX(${dragOffset}px)`,
        opacity: 1,
        zIndex: totalCards
      };
    }

    if (displayOrder <= VISIBLE_BEHIND) {
      const scale = 1 - 0.05 * displayOrder;
      const translateY = -2 * displayOrder;
      return {
        transform: `scale(${scale}) translateY(${translateY}rem)`,
        opacity: 1 - 0.2 * displayOrder,
        zIndex: totalCards - displayOrder
      };
    }

    return { transform: 'scale(0)', opacity: 0, zIndex: 0 };
  }

  function updateStyles() {
    cardEls.forEach((card, index) => {
      const displayOrder = (index - activeIndex + totalCards) % totalCards;
      const style = computeStyle(displayOrder);
      card.style.transform = style.transform;
      card.style.opacity = style.opacity;
      card.style.zIndex = style.zIndex;
    });

    dotEls.forEach((dot, index) => {
      dot.classList.toggle('active', activeIndex === index);
    });
  }

  function navigate(newIndex) {
    activeIndex = (newIndex + totalCards) % totalCards;
    updateStyles();
  }

  function handleDragStart(event, index) {
    if (index !== activeIndex) return;
    isDragging = true;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    dragStart = clientX;
    cardEls[activeIndex].classList.add('is-dragging');
  }

  function handleDragMove(event) {
    if (!isDragging) return;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    dragOffset = clientX - dragStart;
    cardEls[activeIndex].style.transform = `translateX(${dragOffset}px)`;
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cardEls[activeIndex].classList.remove('is-dragging');

    if (Math.abs(dragOffset) > 50) {
      const direction = dragOffset < 0 ? 1 : -1;
      dragOffset = 0;
      navigate(activeIndex + direction);
      return;
    }

    dragOffset = 0;
    updateStyles();
  }

  function buildDOM() {
    stackEl.innerHTML = '';

    testimonialsData.forEach((testimonial, index) => {
      const card = document.createElement('div');
      card.className = 'testimonial-card glass-effect backdrop-blur-xl';
      card.dataset.index = index;

      card.innerHTML = `
        <div class="p-6 md:p-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-4">
              <img class="testimonial-avatar flex-shrink-0 w-11 h-11 rounded-xl" src="${testimonial.avatar}" alt="${testimonial.name}" loading="lazy">
              <div>
                <h3 class="text-card-foreground font-medium text-lg">${testimonial.name}</h3>
                <p class="text-sm text-muted-foreground mt-1">${testimonial.role}</p>
              </div>
            </div>
          </div>
          <blockquote class="text-card-foreground/90 leading-relaxed text-lg">"${testimonial.quote}"</blockquote>
        </div>
      `;

      card.addEventListener('mousedown', (event) => handleDragStart(event, index));
      card.addEventListener('touchstart', (event) => handleDragStart(event, index), { passive: true });

      stackEl.appendChild(card);
      cardEls.push(card);
    });

    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    testimonialsData.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'pagination-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => navigate(index));
      pagination.appendChild(dot);
      dotEls.push(dot);
    });
    stackEl.appendChild(pagination);
  }

  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('touchmove', handleDragMove, { passive: true });
  window.addEventListener('mouseup', handleDragEnd);
  window.addEventListener('touchend', handleDragEnd);

  buildDOM();
  updateStyles();
})();
