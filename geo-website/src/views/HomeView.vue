<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Motion } from 'motion-v'
import GlassSurface from '../components/GlassSurface.vue'
import OrbBackground from '../components/OrbBackground.vue'
import BorderGlow from '../components/BorderGlow.vue'
import NotificationCard from '../components/NotificationCard.vue'

const emit = defineEmits<{
  openForm: []
}>()

const searchFocused = ref(false)

// AI platforms
const platforms = [
  { name: '豆包', logo: '/images/ai-logos/豆包.png' },
  { name: '腾讯元宝', logo: '/images/ai-logos/腾讯元宝.png' },
  { name: 'Kimi', logo: '/images/ai-logos/Kimi.png' },
  { name: 'DeepSeek', logo: '/images/ai-logos/DeepSeek.png' },
  { name: '通义千问', logo: '/images/ai-logos/通义千问.png' },
  { name: '文心一言', logo: '/images/ai-logos/文心一言.png' },
  { name: '智谱清言', logo: '/images/ai-logos/智谱清言.png' }
]

// Crisis cards with alert severity levels
const crisisCards = [
  {
    title: '品牌在AI中无露出',
    items: ['搜索结果零曝光', '用户无法获取品牌信息', '错失潜在客户触达', '品牌认知度持续下降'],
    level: 'warning'
  },
  {
    title: '品牌在AI中结果有误',
    items: ['品牌描述存在错误', '信息严重过时失真', '负面偏差影响信任', '专业形象受损'],
    level: 'info'
  },
  {
    title: '品牌在AI推荐中落后',
    items: ['竞品占据推荐位', '品牌被持续边缘化', '错失首次接触机会', '高意向客户流失'],
    level: 'info'
  },
  {
    title: 'AI传播品牌黑料',
    items: ['负面信息被放大', '缺乏正面内容制衡', '持续传播难消除', '品牌声誉受威胁'],
    level: 'warning'
  }
]

// Why us features
const features = [
  { title: 'GEO现状评分', desc: '多维度量化品牌在AI搜索中的综合表现，精准定位优化切入点。' },
  { title: '全主流AI平台覆盖', desc: '一站式监测与优化豆包、Kimi、DeepSeek等7大主流AI平台。' },
  { title: '灵活可定制的监测频率', desc: '支持实时、每日、每周多种监测周期，按需灵活配置。' },
  { title: '深度竞品对比分析', desc: '全方位对比品牌在AI中的呈现与核心竞品，找出差距与机会。' },
  { title: '结构化词包分组管理', desc: '科学分类管理品牌词、行业词、竞品词，实现精细化运营。' },
  { title: '智能化GEO优化建议', desc: '基于AI分析自动生成可落地的内容优化策略与执行方案。' }
]

// 5 steps as terminal workflow
const workflowSteps = [
  {
    num: '01',
    title: '痛点诊断',
    desc: '全面扫描品牌在7大AI平台的露出现状',
    cmd: 'geo scan --platforms 7 --brand <brand_name>',
    output: '> GEO现状报告 ✓ 已生成'
  },
  {
    num: '02',
    title: '策略定制',
    desc: '基于诊断结果制定针对性GEO优化策略',
    cmd: 'geo strategy --input diagnosis.json --output plan',
    output: '> GEO优化策略书 ✓ 已生成'
  },
  {
    num: '03',
    title: '内容生产',
    desc: '创作高质量AI友好的品牌内容资产',
    cmd: 'geo content --type ai-friendly --scale full',
    output: '> AI友好内容库 ✓ 已构建'
  },
  {
    num: '04',
    title: 'AI占位',
    desc: '通过结构化数据布局让AI优先推荐品牌',
    cmd: 'geo deploy --channels authority --mode occupy',
    output: '> AI推荐占位 ✓ 已完成'
  },
  {
    num: '05',
    title: '动态更迭',
    desc: '持续监测AI反馈迭代优化内容策略',
    cmd: 'geo iterate --monitor realtime --loop optimize',
    output: '> 持续优化迭代 ✓ 运行中'
  }
]

// Stats with count-up animation
const stats = [
  { industry: '快消品行业', target: 2, suffix: '亿', prefix: '', metric: '次新品上市曝光增长' },
  { industry: '大健康行业', target: 40, suffix: '%', prefix: '', metric: '用户信任度提升' },
  { industry: '汽车行业', target: 50, suffix: '%', prefix: '', metric: '用户咨询量增长' },
  { industry: '教育行业', target: 1, suffix: '', prefix: 'TOP', metric: 'AI直接访问成主要流量来源' },
  { industry: '企业服务', target: 88, suffix: '%', prefix: '', metric: '全搜索场景覆盖率提升' },
  { industry: 'B2B获客', target: 388.9, suffix: '%', prefix: '', metric: '精准线索增长', decimals: 1 },
  { industry: '新品牌冷启动', target: 78, suffix: '%', prefix: '', metric: '品牌信息覆盖率提升' },
  { industry: '制造业', target: 124.3, suffix: '%', prefix: '', metric: '采购线索增长', decimals: 1 }
]

const animatedStats = ref<Record<number, string>>({})

const animateValue = (index: number, target: number, duration: number = 2000, decimals: number = 0, prefix: string = '', suffix: string = '') => {
  const start = 0
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = start + (target - start) * eased

    if (decimals > 0) {
      animatedStats.value[index] = `${prefix}${current.toFixed(decimals)}${suffix}`
    } else {
      animatedStats.value[index] = `${prefix}${Math.round(current)}${suffix}`
    }

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Testimonials
const testimonials = [
  {
    name: '陈默',
    role: '某企业服务平台 市场总监',
    avatar: '/images/avatars/avatar1.jpg',
    quote: '和智优康赛合作后，精准线索量增长近4倍，高价值企业咨询占比超90%，彻底重构了我们的获客体系。'
  },
  {
    name: '赵建国',
    role: '某工业自动化公司 销售总经理',
    avatar: '/images/avatars/avatar2.jpg',
    quote: '智优康赛帮我们打通了AI搜索获客链路，政务与企业采购咨询量翻倍，核心行业词稳居搜索前列。'
  },
  {
    name: '林晓',
    role: '某快消品牌 数字营销负责人',
    avatar: '/images/avatars/avatar3.jpg',
    quote: '智优康赛的AI适配优化效果显著，新品上市首月自然曝光突破2亿，远超我们的预期目标。'
  },
  {
    name: '周婷',
    role: '某大健康科技公司 品牌总监',
    avatar: '/images/avatars/avatar4.jpg',
    quote: '智优康赛兼顾合规性与转化效果，品牌信息覆盖率提升80%，用户信任度和咨询转化率同步上涨。'
  },
  {
    name: '苏航',
    role: '某在线教育平台 增长负责人',
    avatar: '/images/avatars/avatar5.jpg',
    quote: '智优康赛帮我们抢占了AI教育问答流量，自然搜索咨询量增长260%，获客成本降低35%。'
  },
  {
    name: '吴涛',
    role: '某新能源汽车品牌 数字营销经理',
    avatar: '/images/avatars/avatar6.jpg',
    quote: '和智优康赛合作后，车型相关AI搜索推荐率提升70%，线上试驾预约量翻倍。'
  },
  {
    name: '郑雨',
    role: '某金融科技公司 运营总监',
    avatar: '/images/avatars/avatar7.jpg',
    quote: '智优康赛的合规化GEO方案很专业，精准线索增长180%，高净值客户占比达65%。'
  },
  {
    name: '孙哲',
    role: '某SaaS软件公司 市场VP',
    avatar: '/images/avatars/avatar8.jpg',
    quote: '智优康赛重构了我们的搜索内容矩阵，自然流量占比从15%提升至42%，ROI达1:9。'
  },
  {
    name: '李悦',
    role: '某跨境电商品牌 海外营销总监',
    avatar: '/images/avatars/avatar1.jpg',
    quote: '智优康赛帮我们打通了多语言AI搜索链路，海外精准流量增长320%，订单转化率提升28%。'
  },
  {
    name: '王凯',
    role: '某家居品牌 电商负责人',
    avatar: '/images/avatars/avatar2.jpg',
    quote: '智优康赛的AI内容适配效果突出，家居场景词搜索排名全面提升，大促期间自然订单增长150%。'
  }
]

// Client logos
const clientLogos = ref<string[]>([])

// Testimonial stack navigation
const carouselRef = ref<HTMLElement | null>(null)
const activeTestimonial = ref(0)

const goToTestimonial = (index: number) => {
  const slides = carouselRef.value?.querySelectorAll('.testimonial-slide')
  if (slides && slides[index]) {
    slides[index].scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }
}


onMounted(() => {
  clientLogos.value = [
    '/images/clients/4a79f6385c4eefecd653e9cd98c8eb7e.png',
    '/images/clients/图层 14.png',
    '/images/clients/图层 15.png',
    '/images/clients/图层 16.png',
    '/images/clients/图层 17.png',
    '/images/clients/图层 18.png',
    '/images/clients/图层 19.png',
    '/images/clients/图层 20.png',
    '/images/clients/图层 21.png',
    '/images/clients/图层 22.png',
    '/images/clients/图层 23.png',
    '/images/clients/图层 24.png',
    '/images/clients/图层 25.png',
    '/images/clients/图层 26.png',
    '/images/clients/图层 27.png',
    '/images/clients/图层 28.png',
    '/images/clients/图层 29.png',
    '/images/clients/图层 30.png',
    '/images/clients/图层 31.png',
    '/images/clients/图层 32.png',
    '/images/clients/图层 33.png',
    '/images/clients/图层 34.png',
    '/images/clients/图层 35.png',
    '/images/clients/图层 36.png',
    '/images/clients/图层 37.png',
    '/images/clients/图层 38.png',
    '/images/clients/图层 39.png',
    '/images/clients/图层 40.png',
    '/images/clients/图层 41.png',
    '/images/clients/图层 42.png',
    '/images/clients/图层 43.png',
    '/images/clients/图层 45.png',
    '/images/clients/图层 46.png',
    '/images/clients/图层 47.png',
    '/images/clients/图层 48.png'
  ]

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

  // Stats count-up animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Number((entry.target as HTMLElement).dataset.index)
        const stat = stats[idx]
        if (stat && !animatedStats.value[idx]) {
          animateValue(
            idx,
            stat.target,
            2000,
            stat.decimals || 0,
            stat.prefix || '',
            stat.suffix || ''
          )
        }
        statsObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })

  document.querySelectorAll('.stat-counter').forEach(el => statsObserver.observe(el))

  // Testimonial carousel: track active slide via intersection
  const slides = carouselRef.value?.querySelectorAll('.testimonial-slide')
  if (slides) {
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          activeTestimonial.value = idx
        }
      })
    }, { threshold: 0.5, root: carouselRef.value })

    slides.forEach(slide => carouselObserver.observe(slide))
  }
})
</script>

<template>
  <div class="home">
    <!-- ========== HERO ========== -->
    <section class="hero-section">
      <!-- Hero Background: Orb (ogl WebGL) -->
      <OrbBackground
        class="hero-orb-bg"
        :hue="0"
        :hoverIntensity="0.5"
        :rotateOnHover="true"
        :forceHoverState="true"
      />
      <div class="hero-bg-overlay"></div>
      <div class="container">
        <div class="hero-inner">
          <div class="hero-content">
            <Motion
              :initial="{ opacity: 0, y: 40 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
              tag="h1"
              class="hero-title"
            >
              <span class="hero-title-line">让<span class="ai-highlight">AI</span>赋能</span>
              <span class="hero-title-line">品牌全球增长</span>
            </Motion>
            <Motion
              :initial="{ opacity: 0, y: 30 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }"
              tag="p"
              class="hero-subtitle"
            >
              AI搜索时代的品牌全球化战略伙伴
            </Motion>

            <!-- AI Search Bar -->
            <Motion
              :initial="{ opacity: 0, y: 24 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }"
              class="ai-search"
            >
              <div class="ai-search__grid"></div>
              <div class="ai-search__container">
                <div class="ai-search__glow"></div>
                <div class="ai-search__darkBorder"></div>
                <div class="ai-search__darkBorder"></div>
                <div class="ai-search__darkBorder"></div>
                <div class="ai-search__white"></div>
                <div class="ai-search__border"></div>
                <div class="ai-search__main">
                  <input
                    placeholder="搜索您的品牌在AI中的表现..."
                    type="text"
                    class="ai-search__input"
                    @focus="searchFocused = true"
                    @blur="searchFocused = false"
                  />
                  <div class="ai-search__mask"></div>
                  <div class="ai-search__pink-mask"></div>
                  <div class="ai-search__filterBorder"></div>
                  <div class="ai-search__filter-icon">
                    <svg width="20" height="20" viewBox="4.8 4.56 14.832 15.408" fill="none">
                      <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#b6a9b7" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="ai-search__search-icon" @click="emit('openForm')">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle stroke="url(#searchGrad)" r="8" cy="11" cx="11"/>
                      <line stroke="url(#searchLineGrad)" y2="16.65" y1="22" x2="16.65" x1="22"/>
                      <defs>
                        <linearGradient id="searchGrad" gradientTransform="rotate(50)">
                          <stop stop-color="#e0d0ff" offset="0%"/>
                          <stop stop-color="#b6a9b7" offset="50%"/>
                        </linearGradient>
                        <linearGradient id="searchLineGrad">
                          <stop stop-color="#b6a9b7" offset="0%"/>
                          <stop stop-color="#837484" offset="50%"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }"
              class="hero-actions"
            >
              <button class="btn-cta" @click="emit('openForm')">预约诊断</button>
              <button class="btn-cta btn-cta--outline" @click="emit('openForm')">联系我们</button>
            </Motion>
          </div>
          <div class="hero-visual reveal">
            <div class="system-loader">
              <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="loader-svg">
                <defs>
                  <!-- Glow Filters -->
                  <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <!-- Gradients -->
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#7c3aed" stop-opacity="1"/>
                    <stop offset="50%" stop-color="#a78bfa" stop-opacity="1"/>
                    <stop offset="100%" stop-color="#818cf8" stop-opacity="0.8"/>
                  </linearGradient>

                  <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#7c3aed" stop-opacity="0"/>
                    <stop offset="50%" stop-color="#a78bfa" stop-opacity="1"/>
                    <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
                  </linearGradient>

                  <linearGradient id="panelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(75,51,255,0.22)"/>
                    <stop offset="100%" stop-color="rgba(75,51,255,0.08)"/>
                  </linearGradient>

                  <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#7c3aed"/>
                    <stop offset="100%" stop-color="#a78bfa"/>
                  </linearGradient>

                  <!-- Scanline Mask -->
                  <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="white" stop-opacity="0"/>
                    <stop offset="50%" stop-color="white" stop-opacity="0.15"/>
                    <stop offset="100%" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                </defs>

                <!-- Background Grid -->
                <g id="grid">
                  <line v-for="i in 10" :key="'v'+i" :x1="i*90" y1="0" :x2="i*90" y2="600" class="grid-line"/>
                  <line v-for="i in 7" :key="'h'+i" x1="0" :y1="i*85" x2="900" :y2="i*85" class="grid-line"/>
                </g>

                <!-- Connection Nodes (pulse) - bigger & brighter -->
                <g id="nodes">
                  <circle cx="120" cy="180" r="7" class="pulse-node"/>
                  <circle cx="780" cy="140" r="7" class="pulse-node" style="animation-delay: 0.4s"/>
                  <circle cx="180" cy="420" r="7" class="pulse-node" style="animation-delay: 0.8s"/>
                  <circle cx="720" cy="460" r="7" class="pulse-node" style="animation-delay: 1.2s"/>
                  <circle cx="450" cy="80" r="8" class="pulse-node" style="animation-delay: 1.6s"/>
                </g>

                <!-- Data Flow Lines - wider -->
                <g id="data-flows">
                  <path d="M120 180 H230 V120" class="data-flow"/>
                  <path d="M780 140 H670 V120" class="data-flow" style="animation-delay: 0.5s"/>
                  <path d="M180 420 H230 V350" class="data-flow" style="animation-delay: 1s"/>
                  <path d="M720 460 H670 V350" class="data-flow" style="animation-delay: 1.5s"/>
                  <path d="M450 80 V120" class="data-flow" style="animation-delay: 0.3s"/>
                </g>

                <!-- Central GEO Dashboard Panel - WIDER & TALLER -->
                <g id="geo-panel">
                  <!-- Panel Frame -->
                  <rect x="230" y="120" width="440" height="280" rx="14" class="panel-frame"/>
                  <rect x="230" y="120" width="440" height="40" rx="14" class="panel-header"/>
                  <rect x="230" y="148" width="440" height="12" class="panel-header-base"/>

                  <!-- Status Dot -->
                  <circle cx="255" cy="140" r="5" class="status-dot"/>
                  <text x="270" y="145" class="panel-title">GEO Intelligence Engine</text>

                  <!-- Metrics Bars - bigger -->
                  <rect x="255" y="175" width="160" height="14" rx="7" class="metric-bg"/>
                  <rect x="255" y="175" width="120" height="14" rx="7" class="metric-bar" style="animation-delay: 0s"/>
                  <text x="425" y="186" class="metric-label">语义覆盖 92%</text>

                  <rect x="255" y="200" width="160" height="14" rx="7" class="metric-bg"/>
                  <rect x="255" y="200" width="140" height="14" rx="7" class="metric-bar" style="animation-delay: 0.3s"/>
                  <text x="425" y="211" class="metric-label">AI引用率 87%</text>

                  <rect x="255" y="225" width="160" height="14" rx="7" class="metric-bg"/>
                  <rect x="255" y="225" width="100" height="14" rx="7" class="metric-bar" style="animation-delay: 0.6s"/>
                  <text x="425" y="236" class="metric-label">品牌信任 78%</text>

                  <!-- Activity Blocks - bigger -->
                  <rect x="255" y="255" width="95" height="60" rx="8" class="activity-block" style="animation-delay: 0s"/>
                  <rect x="360" y="255" width="95" height="60" rx="8" class="activity-block" style="animation-delay: 0.2s"/>
                  <rect x="465" y="255" width="95" height="60" rx="8" class="activity-block" style="animation-delay: 0.4s"/>
                  <rect x="570" y="255" width="80" height="60" rx="8" class="activity-block" style="animation-delay: 0.6s"/>

                  <!-- Scan Line -->
                  <rect x="230" y="120" width="440" height="50" rx="14" fill="url(#scanGradient)" class="scan-line"/>
                </g>

                <!-- Side Data Cards - bigger -->
                <g id="side-cards">
                  <rect x="30" y="200" width="180" height="110" rx="10" class="side-card"/>
                  <text x="55" y="232" class="side-card-title">AI Platform</text>
                  <text x="55" y="265" class="side-card-value">7+</text>
                  <text x="55" y="292" class="side-card-sub">Models Monitored</text>

                  <rect x="690" y="200" width="180" height="110" rx="10" class="side-card"/>
                  <text x="715" y="232" class="side-card-title">Keywords</text>
                  <text x="715" y="265" class="side-card-value">2.4K</text>
                  <text x="715" y="292" class="side-card-sub">Tracked Daily</text>
                </g>

                <!-- Bottom Status Bar - wider -->
                <g id="status-bar">
                  <rect x="150" y="430" width="600" height="40" rx="20" class="status-bar-bg"/>
                  <text x="185" y="456" class="status-text">System Status:</text>
                  <text x="310" y="456" class="status-active">OPTIMIZING</text>
                  <circle cx="445" cy="450" r="4" class="status-blink"/>
                  <text x="462" y="456" class="status-detail">Real-time GEO analysis running...</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- AI Platforms Marquee -->
        <div class="platforms-marquee reveal">
          <div class="marquee-track">
            <div class="marquee-content">
              <div
                v-for="p in [...platforms, ...platforms, ...platforms]"
                :key="p.name + Math.random()"
                class="marquee-item"
              >
                <img :src="p.logo" :alt="p.name" class="marquee-logo" />
                <span class="marquee-name">{{ p.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CRISIS - Alert Style ========== -->
    <section class="section crisis-section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">AI平台中的品牌危机</h2>
        </div>
        <div class="crisis-alerts">
          <NotificationCard
            v-for="(card, i) in crisisCards"
            :key="i"
            :level="card.level"
            :title="card.title"
            :tags="card.items"
            class="reveal"
            :style="{ animationDelay: `${i * 0.1}s` }"
          />
        </div>
      </div>
    </section>

    <!-- ========== WHY US ========== -->
    <section class="section features-section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">为什么选择智优康赛</h2>
        </div>
        <div class="features-grid">
          <GlassSurface
            v-for="(f, i) in features"
            :key="i"
            class="feature-card reveal"
            width="100%"
            height="100%"
            :borderRadius="16"
            :backgroundOpacity="0.15"
            :brightness="80"
            :opacity="0.6"
            :blur="10"
            :distortionScale="-180"
            :borderWidth="0.06"
            :style="{ animationDelay: `${i * 0.08}s` }"
          >
            <div class="feature-card__inner">
              <div class="feature-num">0{{ i + 1 }}</div>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>

    <!-- ========== WORKFLOW - Terminal Style ========== -->
    <section class="section workflow-section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">GEO优化五步法</h2>
        </div>
        <div class="workflow-terminals">
          <div
            v-for="(step, i) in workflowSteps"
            :key="i"
            class="terminal-card reveal"
            :style="{ animationDelay: `${i * 0.12}s` }"
          >
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="terminal-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/>
                </svg>
                Step {{ step.num }} — {{ step.title }}
              </span>
            </div>
            <div class="terminal-body">
              <div class="terminal-step-desc">{{ step.desc }}</div>
              <pre class="terminal-code"><code class="code-prompt">$ </code><code class="code-cmd">{{ step.cmd }}</code></pre>
              <div class="terminal-output">{{ step.output }}</div>
            </div>
            <!-- Connector arrow -->
            <div v-if="i < workflowSteps.length - 1" class="terminal-connector">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M10 4v12M10 16l-4-4M10 16l4-4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== STATS + LOGOS ========== -->
    <section class="section stats-section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">客户增长数据</h2>
        </div>

        <div class="stats-grid">
          <GlassSurface
            v-for="(stat, i) in stats"
            :key="i"
            :borderRadius="16"
            :backgroundOpacity="0.08"
            :blur="16"
            :saturation="1.2"
            class="stat-card reveal"
            :style="{ animationDelay: `${i * 0.06}s` }"
          >
            <div class="stat-card__content">
              <span class="stat-industry">{{ stat.industry }}</span>
              <span class="stat-value stat-counter" :data-index="i">
                {{ animatedStats[i] || '0' }}
              </span>
              <span class="stat-metric">{{ stat.metric }}</span>
            </div>
          </GlassSurface>
        </div>

        <!-- Client Logos -->
        <div class="client-logos reveal">
          <p class="logos-label">值得信赖的合作伙伴</p>
          <div class="logos-scroll">
            <div class="logos-track">
              <img
                v-for="(logo, idx) in [...clientLogos, ...clientLogos]"
                :key="`logo-${idx}`"
                :src="encodeURI(logo)"
                alt="客户Logo"
                class="client-logo"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== TESTIMONIALS - Carousel ========== -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">他们选择了智优康赛</h2>
        </div>

        <div class="testimonials-carousel-wrapper reveal">
          <div ref="carouselRef" class="testimonials-carousel">
            <div
              v-for="(t, i) in testimonials"
              :key="i"
              class="testimonial-slide"
              :data-index="i"
            >
              <div class="testimonial-card">
                <img :src="t.avatar" :alt="t.name" class="testimonial-avatar" />
                <div class="testimonial-header">
                  <span class="testimonial-name">{{ t.name }}</span>
                  <span class="testimonial-role">{{ t.role }}</span>
                </div>
                <p class="testimonial-text">{{ t.quote }}</p>
              </div>
            </div>
          </div>

          <div class="carousel-nav">
            <div class="carousel-nav__dots">
              <span
                v-for="(_t, i) in testimonials"
                :key="i"
                :class="['carousel-nav__dot', { active: activeTestimonial === i }]"
                @click="goToTestimonial(i)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-inner reveal">
          <div class="cta-glow"></div>
          <GlassSurface
            :borderRadius="20"
            :backgroundOpacity="0.1"
            :blur="18"
            :saturation="1.3"
            class="cta-panel"
          >
            <div class="cta-layout">
              <div class="cta-content">
                <h2 class="cta-title">开启GEO优化之旅</h2>
                <p class="cta-subtitle">
                  让AI成为品牌增长的新引擎，现在就开始行动
                </p>
                <div class="cta-actions">
                  <button class="btn-cta" @click="emit('openForm')">预约诊断</button>
                  <button class="btn-cta btn-cta--outline" @click="emit('openForm')">联系我们</button>
                </div>
              </div>
              <!-- Phone Mockup -->
              <div class="phone-wrapper">
                <div class="phone-outer">
                  <div class="phone-device group">
                    <div class="phone-screen">
                      <div class="phone-glow-orb phone-glow-1"></div>
                      <div class="phone-glow-orb phone-glow-2"></div>
                      <div class="phone-text-group">
                        <span class="phone-hello-text">你好</span>
                        <span class="phone-ai-text">AI</span>
                      </div>
                      <div class="phone-unlock">
                        <span>Touch to unlock</span>
                        <svg width="14" height="14" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M33.9,46V29.9a16.1,16.1,0,0,1,32.2,0M50,62v8.1m-24.1,16H74.1a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H25.9a8,8,0,0,0-8,8V78.1A8,8,0,0,0,25.9,86.1Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">

// ========== Hero Orb Background (ogl WebGL) ==========
.hero-orb-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: auto;
  overflow: hidden;
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(
      ellipse 80% 70% at 50% 45%,
      transparent 0%,
      transparent 30%,
      rgba(3, 4, 10, 0.25) 70%,
      rgba(3, 4, 10, 0.6) 100%
    ),
    linear-gradient(
      180deg,
      rgba(3, 4, 10, 0.05) 0%,
      transparent 15%,
      transparent 80%,
      rgba(3, 4, 10, 0.55) 100%
    );
  pointer-events: none;
}

// ========== HERO ==========
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0 40px;
  overflow: hidden;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-10;
  position: relative;
  z-index: 1;

  @media (min-width: 1024px) {
    flex-direction: row;
    text-align: left;
    align-items: center;
    gap: $space-16;
  }
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: $text-primary;
  margin-bottom: $space-6;
  letter-spacing: -0.05em;

  .hero-title-line {
    display: block;
    white-space: nowrap;
  }

  .ai-highlight {
    display: inline-block;
    font-size: 1.35em;
    background: linear-gradient(135deg, #00d4ff 0%, #4c75ff 40%, #7b61ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
    position: relative;
    text-shadow: none;
    filter: drop-shadow(0 0 28px rgba(0, 212, 255, 0.65)) drop-shadow(0 0 8px rgba(123, 97, 255, 0.4));
    letter-spacing: 0.02em;
    vertical-align: baseline;
  }
}

.hero-subtitle {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: $text-secondary;
  line-height: 1.5;
  margin-bottom: $space-8;
  max-width: 600px;

  @media (min-width: 1024px) {
    margin-left: 0;
  }
}

// ========== AI SEARCH BAR ==========
.ai-search {
  position: relative;
  margin-bottom: $space-8;
  width: 100%;
  max-width: 560px;

  @media (min-width: 1024px) {
    max-width: 480px;
  }
}

.ai-search__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}

.ai-search:hover .ai-search__grid {
  opacity: 1;
}

.ai-search__container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 20px;
}

.ai-search__glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.4), rgba(76, 117, 255, 0.2), rgba(0, 224, 255, 0.3));
  border-radius: 22px;
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.ai-search:hover .ai-search__glow,
.ai-search:focus-within .ai-search__glow {
  opacity: 0.6;
}

.ai-search__darkBorder {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.04);
  z-index: 1;
  pointer-events: none;
}

.ai-search__white {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  z-index: 2;
  pointer-events: none;
}

.ai-search__border {
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(75, 51, 255, 0.35) 0%,
    rgba(75, 51, 255, 0.05) 35%,
    rgba(76, 117, 255, 0.05) 65%,
    rgba(0, 224, 255, 0.25) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 3;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.4s ease;
}

.ai-search:hover .ai-search__border,
.ai-search:focus-within .ai-search__border {
  opacity: 1;
}

.ai-search__main {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: rgba(3, 4, 10, 0.9);
  border-radius: 18px;
  padding: 4px;
  z-index: 4;
}

.ai-search__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 15px;
  padding: 14px 16px;
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.3s ease;
  }

  &:focus::placeholder {
    color: rgba(255, 255, 255, 0.15);
  }
}

.ai-search__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 100%;
  background: linear-gradient(90deg, rgba(3,4,10,0.9) 0%, transparent 100%);
  pointer-events: none;
  border-radius: 18px 0 0 18px;
  z-index: 1;
  opacity: 0.5;
}

.ai-search__pink-mask {
  position: absolute;
  top: 0;
  right: 120px;
  width: 40px;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(75, 51, 255, 0.05) 100%);
  pointer-events: none;
  z-index: 1;
}

.ai-search__filterBorder {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.03);
  pointer-events: none;
  z-index: 2;
}

.ai-search__filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 4px;
  flex-shrink: 0;

  &:hover {
    background: rgba(75, 51, 255, 0.1);
    border-color: rgba(75, 51, 255, 0.3);
  }
}

.ai-search__search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.3), rgba(76, 117, 255, 0.2));
  border: 1px solid rgba(75, 51, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: linear-gradient(135deg, rgba(75, 51, 255, 0.5), rgba(76, 117, 255, 0.35));
    border-color: rgba(75, 51, 255, 0.5);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(75, 51, 255, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  margin-bottom: $space-8;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: stretch;
  }
}

// ========== CTA Button (cssbuttons-io style) ==========
.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4b33ff, #4c75ff);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;
  box-shadow: 0 2px 12px rgba(75, 51, 255, 0.25);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(75, 51, 255, 0.4);

    &::after {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }

  // Outline variant
  &.btn-cta--outline {
    background: transparent;
    border: 1.5px solid rgba(75, 51, 255, 0.4);
    box-shadow: none;

    &::after {
      background: linear-gradient(90deg, transparent, rgba(75, 51, 255, 0.08), transparent);
    }

    &:hover {
      background: rgba(75, 51, 255, 0.08);
      border-color: rgba(75, 51, 255, 0.6);
      box-shadow: 0 4px 20px rgba(75, 51, 255, 0.15);
    }
  }
}

.hero-visual {
  flex: 1;
  width: 100%;
  max-width: 560px;

  @media (min-width: 1024px) {
    max-width: none;
  }
}

// ========== SYSTEM LOADER SVG - GEO Intelligence Dashboard ==========
.system-loader {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  border-radius: $radius-xl;
  overflow: hidden;
  background: rgba(15, 10, 40, 0.75);
  border: 1px solid rgba(139, 92, 246, 0.35);
  padding: $space-6;
  transform: perspective(1000px) rotateY(-3deg) rotateX(2deg);
  transition: transform 0.6s ease, box-shadow 0.6s ease;
  box-shadow:
    0 0 50px rgba(75, 51, 255, 0.2),
    0 0 100px rgba(75, 51, 255, 0.1),
    0 0 200px rgba(139, 92, 246, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  &:hover {
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
    box-shadow:
      0 0 80px rgba(75, 51, 255, 0.35),
      0 0 160px rgba(75, 51, 255, 0.15),
      0 0 300px rgba(139, 92, 246, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    border-color: rgba(139, 92, 246, 0.55);
  }

  @media (min-width: 1024px) {
    padding: $space-8;
  }
}

.loader-svg {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.25));

  // Grid
  .grid-line {
    stroke: rgba(139, 92, 246, 0.18);
    stroke-width: 1;
  }

  // Pulse Nodes
  .pulse-node {
    fill: #a78bfa;
    filter: url(#glow-purple);
    animation: nodePulse 2s ease-in-out infinite;
  }

  // Data Flow Lines
  .data-flow {
    fill: none;
    stroke: url(#purpleGradient);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: dataFlow 2.5s linear infinite;
    filter: url(#glow-purple);
  }

  // Panel
  .panel-frame {
    fill: url(#panelGradient);
    stroke: rgba(167, 139, 250, 0.4);
    stroke-width: 2;
    filter: url(#glow-purple);
  }

  .panel-header {
    fill: rgba(75, 51, 255, 0.35);
  }

  .panel-header-base {
    fill: rgba(75, 51, 255, 0.18);
  }

  .panel-title {
    fill: rgba(255, 255, 255, 0.95);
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  // Status Dot
  .status-dot {
    fill: #22d3ee;
    filter: url(#glow-cyan);
    animation: statusBlink 1.5s ease-in-out infinite;
  }

  // Metrics
  .metric-bg {
    fill: rgba(75, 51, 255, 0.15);
  }

  .metric-bar {
    fill: url(#barGradient);
    animation: metricGrow 2s ease-out infinite alternate;
  }

  .metric-label {
    fill: rgba(255, 255, 255, 0.75);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
  }

  // Activity Blocks
  .activity-block {
    fill: rgba(139, 92, 246, 0.22);
    stroke: rgba(167, 139, 250, 0.35);
    stroke-width: 1;
    animation: activityPulse 2s ease-in-out infinite;
  }

  // Scan Line
  .scan-line {
    animation: scanMove 3s linear infinite;
  }

  // Side Cards
  .side-card {
    fill: rgba(75, 51, 255, 0.12);
    stroke: rgba(167, 139, 250, 0.3);
    stroke-width: 1;
  }

  .side-card-title {
    fill: rgba(255, 255, 255, 0.6);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .side-card-value {
    fill: #c4b5fd;
    font-family: 'Inter', sans-serif;
    font-size: 32px;
    font-weight: 700;
    filter: url(#glow-purple);
  }

  .side-card-sub {
    fill: rgba(255, 255, 255, 0.5);
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 400;
  }

  // Status Bar
  .status-bar-bg {
    fill: rgba(75, 51, 255, 0.15);
    stroke: rgba(167, 139, 250, 0.3);
    stroke-width: 1;
  }

  .status-text {
    fill: rgba(255, 255, 255, 0.6);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
  }

  .status-active {
    fill: #22d3ee;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    filter: url(#glow-cyan);
    animation: statusGlow 2s ease-in-out infinite;
  }

  .status-blink {
    fill: #22d3ee;
    animation: statusBlink 1s ease-in-out infinite;
  }

  .status-detail {
    fill: rgba(255, 255, 255, 0.45);
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 400;
  }
}

// ========== GEO Dashboard Animations ==========
@keyframes nodePulse {
  0%, 100% {
    r: 5;
    opacity: 0.6;
  }
  50% {
    r: 10;
    opacity: 1;
  }
}

@keyframes dataFlow {
  0% {
    stroke-dashoffset: 300;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

@keyframes metricGrow {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

@keyframes activityPulse {
  0%, 100% {
    fill-opacity: 0.15;
    stroke-opacity: 0.25;
  }
  50% {
    fill-opacity: 0.35;
    stroke-opacity: 0.5;
  }
}

@keyframes scanMove {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(200px);
    opacity: 0;
  }
}

@keyframes statusBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes statusGlow {
  0%, 100% {
    fill: #22d3ee;
    opacity: 0.8;
  }
  50% {
    fill: #67e8f9;
    opacity: 1;
  }
}

// ========== PLATFORMS MARQUEE ==========
.platforms-marquee {
  margin-top: $space-12;
  position: relative;
  z-index: 1;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
}

.marquee-track {
  overflow: hidden;
}

.marquee-content {
  display: flex;
  gap: $space-8;
  animation: marqueeScroll 25s linear infinite;
  width: max-content;
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: $space-3;
  flex-shrink: 0;
  padding: $space-3 $space-5;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: $radius-pill;
  transition: all $transition-normal;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba($accent-purple, 0.2);
  }
}

.marquee-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.marquee-name {
  font-size: $text-sm;
  color: $text-secondary;
  white-space: nowrap;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}

.hide-mobile {
  display: none;
  @media (min-width: 640px) {
    display: inline;
  }
}

// ========== SECTION COMMON ==========
.section {
  padding: 80px 0;
  position: relative;
  background:
    linear-gradient(rgba(3, 4, 10, 0.55), rgba(3, 4, 10, 0.65)),
    url('/images/section-bg-new.jpg') center center / cover no-repeat;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 120px 0;
  }

  > .container {
    position: relative;
    z-index: 2;
  }
}

.section-header {
  text-align: center;
  margin-bottom: $space-12;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $space-4;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: $text-secondary;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

// ========== CRISIS - ALERT STYLE ==========
.crisis-alerts {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  max-width: 760px;
  margin: 0 auto;
}

.crisis-alert {
  display: flex;
  align-items: flex-start;
  gap: $space-4;
  padding: $space-5 $space-6;
  border-left: 4px solid transparent;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;

  &--warning {
    background: rgba(234, 179, 8, 0.06);
    border-left-color: rgba(234, 179, 8, 0.7);

    .crisis-alert__icon {
      color: #eab308;
      background: rgba(234, 179, 8, 0.1);
    }

    &:hover {
      background: rgba(234, 179, 8, 0.1);
      transform: translateX(4px);
    }
  }

  &--error {
    background: rgba(239, 68, 68, 0.06);
    border-left-color: rgba(239, 68, 68, 0.7);

    .crisis-alert__icon {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    &:hover {
      background: rgba(239, 68, 68, 0.1);
      transform: translateX(4px);
    }
  }

  &--info {
    background: rgba(59, 130, 246, 0.06);
    border-left-color: rgba(59, 130, 246, 0.7);

    .crisis-alert__icon {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }

    &:hover {
      background: rgba(59, 130, 246, 0.1);
      transform: translateX(4px);
    }
  }

  &--success {
    background: rgba(34, 197, 94, 0.06);
    border-left-color: rgba(34, 197, 94, 0.7);

    .crisis-alert__icon {
      color: #22c55e;
      background: rgba(34, 197, 94, 0.1);
    }

    &:hover {
      background: rgba(34, 197, 94, 0.1);
      transform: translateX(4px);
    }
  }
}

.crisis-alert__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  flex-shrink: 0;
  margin-top: 2px;
}

.crisis-alert__body {
  flex: 1;
  min-width: 0;
}

.crisis-alert__title {
  font-size: $text-base;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $space-1;
}

.crisis-alert__desc {
  font-size: $text-sm;
  color: $text-tertiary;
  line-height: 1.6;
  margin-bottom: $space-3;
}

.crisis-alert__tags {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}

.crisis-alert__tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: $text-secondary;
  transition: all 0.2s ease;

  .crisis-alert--warning & {
    border-color: rgba(234, 179, 8, 0.15);
    background: rgba(234, 179, 8, 0.04);
    color: rgba(234, 179, 8, 0.8);
  }

  .crisis-alert--error & {
    border-color: rgba(239, 68, 68, 0.15);
    background: rgba(239, 68, 68, 0.04);
    color: rgba(239, 68, 68, 0.8);
  }

  .crisis-alert--info & {
    border-color: rgba(59, 130, 246, 0.15);
    background: rgba(59, 130, 246, 0.04);
    color: rgba(59, 130, 246, 0.8);
  }
}

// ========== FEATURES ==========
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  min-height: 200px;
  transition: transform $transition-fast;

  &:hover {
    transform: translateY(-4px);
  }

  :deep(.glass-surface) {
    width: 100% !important;
    height: 100% !important;
  }

  &__inner {
    padding: $space-6;
    width: 100%;
    text-align: left;
  }
}

.feature-num {
  font-size: $text-3xl;
  font-weight: 700;
  color: rgba($accent-purple, 0.3);
  margin-bottom: $space-3;
  line-height: 1;
}

.feature-title {
  font-size: $text-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $space-2;
}

.feature-desc {
  font-size: $text-sm;
  color: $text-tertiary;
  line-height: 1.6;
}

// ========== WORKFLOW - Terminal Style ==========
.workflow-section {
  // Background handled by .section
}

.workflow-terminals {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.terminal-card {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: $radius-lg;
  transition: all $transition-normal;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(75, 51, 255, 0.15);
  }
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-4;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.terminal-dots {
  display: flex;
  gap: 6px;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .dot-red { background: #ff5f57; }
  .dot-yellow { background: #febc2e; }
  .dot-green { background: #28c840; }
}

.terminal-title {
  display: flex;
  align-items: center;
  gap: $space-2;
  font-size: $text-xs;
  color: $text-tertiary;
  font-family: $font-mono;

  svg {
    opacity: 0.5;
  }
}

.terminal-body {
  padding: $space-4;
}

.terminal-step-desc {
  font-size: $text-sm;
  color: $text-secondary;
  margin-bottom: $space-3;
}

.terminal-code {
  font-family: $font-mono;
  font-size: 13px;
  line-height: 1.6;
  padding: $space-3 $space-4;
  background: rgba(0, 0, 0, 0.3);
  border-radius: $radius-md;
  margin-bottom: $space-3;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.code-prompt {
  color: rgba($accent-cyan, 0.8);
}

.code-cmd {
  color: rgba($accent-purple, 0.9);
}

.terminal-output {
  font-family: $font-mono;
  font-size: 12px;
  color: rgba(#28c840, 0.7);
}

.terminal-connector {
  display: flex;
  justify-content: center;
  padding: $space-3 0;
  color: rgba($accent-purple, 0.35);
  animation: arrowBounce 2s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%, 100% { transform: translateY(0); opacity: 0.35; }
  50% { transform: translateY(4px); opacity: 0.6; }
}

// ========== STATS ==========
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-4;
  margin-bottom: $space-16;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: $space-8 $space-6;
  text-align: center;
  cursor: default;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-6px);

    .stat-value {
      filter: drop-shadow(0 0 16px rgba(0, 212, 255, 0.5));
    }
  }
}

.stat-card__content {
  position: relative;
  z-index: 1;
}

.stat-industry {
  display: block;
  font-size: $text-xs;
  color: $text-tertiary;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: $space-3;
}

.stat-value {
  display: block;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: $space-2;
  line-height: 1.1;
  transition: filter 0.4s ease;
}

.stat-metric {
  display: block;
  font-size: $text-sm;
  color: $text-secondary;
  line-height: 1.4;
}

// Client Logos
.client-logos {
  margin-bottom: $space-16;
}

.logos-label {
  text-align: center;
  font-size: $text-sm;
  color: $text-tertiary;
  margin-bottom: $space-6;
}

.logos-scroll {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}

.logos-track {
  display: flex;
  gap: $space-10;
  animation: scrollLogos 50s linear infinite;
  width: max-content;
}

@keyframes scrollLogos {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.client-logo {
  height: 36px;
  width: auto;
  opacity: 0.5;
  filter: grayscale(100%) brightness(2);
  transition: opacity $transition-fast;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
}

// ========== TESTIMONIALS - Carousel ==========
.testimonials-carousel-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.testimonials-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 24px 0 8px;
  // Hide scrollbar
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.testimonial-slide {
  flex: 0 0 85%;
  scroll-snap-align: center;
  padding: 0 8px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 8px);
    padding: 0;
  }
}

.testimonial-card {
  position: relative;
  background: linear-gradient(160deg, rgba(75, 51, 255, 0.1) 0%, rgba(76, 117, 255, 0.04) 50%, rgba(3, 4, 10, 0.6) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 48px 36px 40px;
  min-height: 280px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 56px 48px 48px;
    min-height: 260px;
  }
}

.testimonial-avatar {
  position: absolute;
  top: -24px;
  right: 36px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(75, 51, 255, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  background: rgba(3, 4, 10, 0.8);
}

.testimonial-header {
  margin-bottom: 32px;
}

.testimonial-name {
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 4px;
}

.testimonial-role {
  display: block;
  font-size: 0.875rem;
  color: $text-tertiary;
}

.testimonial-text {
  font-size: $text-base;
  line-height: 1.8;
  color: $text-secondary;
  margin: 0;

  &::before {
    content: '"';
    font-size: 2rem;
    line-height: 1;
    color: rgba(75, 51, 255, 0.5);
    margin-right: 4px;
    vertical-align: -6px;
  }
}

// Carousel navigation
.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  margin-top: $space-8;
}

.carousel-nav__btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $text-secondary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all $transition-normal;

  &:hover:not(:disabled) {
    background: rgba($accent-purple, 0.1);
    border-color: rgba($accent-purple, 0.3);
    color: $text-primary;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.carousel-nav__dots {
  display: flex;
  gap: $space-2;
}

.carousel-nav__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all $transition-normal;

  &.active {
    background: $accent-purple;
    width: 24px;
    border-radius: 4px;
  }
}

// ========== CTA ==========
.cta-section {
  padding-bottom: 0;
}

.cta-inner {
  position: relative;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba($accent-purple, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.cta-panel {
  position: relative;
  padding: clamp(40px, 6vw, 80px) clamp(24px, 4vw, 64px);

  .glass-surface__content {
    padding: 0;
  }
}

.cta-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-12;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: $space-8;
  }
}

.cta-content {
  text-align: center;
  flex: 1;

  @media (min-width: 769px) {
    text-align: left;
  }
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $space-4;
}

.cta-subtitle {
  font-size: $text-lg;
  color: $text-secondary;
  margin-bottom: $space-8;
  max-width: 480px;

  @media (min-width: 769px) {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  justify-content: center;

  @media (min-width: 769px) {
    justify-content: flex-start;
  }

  @media (min-width: 640px) {
    flex-direction: row;
  }
}

// ========== PHONE MOCKUP ==========
// ========== PHONE MOCKUP (Uiverse style) ==========
.phone-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-outer {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.35), rgba(76, 117, 255, 0.2));
  padding: 3px;
  box-shadow: 0 4px 30px rgba(75, 51, 255, 0.2);
}

.phone-device {
  position: relative;
  width: 160px;
  height: 320px;
  background: #0a0a0f;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.03);

  &:hover {
    transform: rotate(8deg);

    .phone-glow-1 {
      transform: translate(40px, -40px);
    }
    .phone-glow-2 {
      transform: translate(40px, 56px);
    }
    .phone-ai-text {
      filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.7));
    }
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 260px;
    border-radius: 18px;
  }
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 1;
}

.phone-glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  z-index: -1;
  transition: transform 0.5s ease;

  &.phone-glow-1 {
    width: 60px;
    height: 60px;
    background: rgba(75, 51, 255, 0.5);
    top: 50px;
    right: 20px;
  }

  &.phone-glow-2 {
    width: 48px;
    height: 48px;
    background: rgba(255, 140, 50, 0.45);
    bottom: 80px;
    right: 30px;
  }
}

.phone-text-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  line-height: 1;
  gap: 2px;
}

.phone-hello-text {
  font-size: 36px;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 28px;
  }
}

.phone-ai-text {
  font-size: 48px;
  background: linear-gradient(135deg, #00d4ff, #4c75ff, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
  filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.45));
  transition: filter 0.5s ease;

  @media (max-width: 768px) {
    font-size: 36px;
  }
}

.phone-unlock {
  position: absolute;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    bottom: 28px;
    font-size: 10px;
  }
}

// ========== ANIMATIONS ==========
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  &.revealed {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
