<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MagicRings from '../components/MagicRings.vue'
import BlurText from '../components/BlurText.vue'
import GlassSurface from '../components/GlassSurface.vue'
import PageCTA from '../components/PageCTA.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== AI Platforms ==========
const aiPlatforms = [
  { name: '豆包', logo: '/images/ai-logos/豆包.png', size: 'lg' },
  { name: '腾讯元宝', logo: '/images/ai-logos/腾讯元宝.png', size: 'md' },
  { name: '通义千问', logo: '/images/ai-logos/通义千问.png', size: 'xl' },
  { name: '文心一言', logo: '/images/ai-logos/文心一言.png', size: 'sm' },
  { name: '智谱清言', logo: '/images/ai-logos/智谱清言.png', size: 'md' },
  { name: 'DeepSeek', logo: '/images/ai-logos/DeepSeek.png', size: 'lg' },
  { name: 'Kimi', logo: '/images/ai-logos/Kimi.png', size: 'sm' },
  { name: 'ChatGPT', logo: '/images/ai-logos/ChatGPT.jpg', size: 'md' },
  { name: 'Gemini', logo: '/images/ai-logos/Gemini.jpg', size: 'sm' },
  { name: 'Google AI Overview', logo: '/images/ai-logos/GoogleAI.png', size: 'xl' },
  { name: 'Perplexity', logo: '/images/ai-logos/Perplexity.png', size: 'md' },
  { name: 'Claude', logo: '/images/ai-logos/Claude.jpg', size: 'sm' }
]

// ========== GEO 3C Framework ==========
const geo3C = [
  {
    step: 'C1',
    title: '理解',
    subtitle: '构建可信知识体',
    desc: '全球首个"AI语义聚合+意图预测"双引擎系统，18年积累超10亿条搜索行为数据，构建行业最全的"用户意图图谱"。',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="18"/><path d="M24 12v6m0 12v6m-12-12h6m12 0h6"/><circle cx="24" cy="24" r="4"/></svg>`
  },
  {
    step: 'C2',
    title: '信任',
    subtitle: '强化权威与共识',
    desc: '联合第三方检测机构发布白皮书报告，构建品牌权威数据背书，增强AI对品牌信息的信任权重。',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 4l5.5 11.2L42 17l-9 8.8 2.1 12.2L24 32.8 12.9 38 15 25.8 6 17l12.5-1.8z"/></svg>`
  },
  {
    step: 'C3',
    title: '推荐',
    subtitle: '获得首推优先级',
    desc: '通过持续的GEO优化策略，让品牌在AI搜索结果中获得优先推荐位，构建可持续的竞争优势。',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 4v8m0 24v8M4 24h8m24 0h8"/><path d="M10 10l5.7 5.7M32.3 32.3L38 38M38 10l-5.7 5.7M15.7 32.3L10 38"/></svg>`
  }
]

// ========== GEO Profound-style Features ==========
const geoFeatures = [
  {
    id: 'track',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    title: '追踪你的在线状态',
    desc: '看看你的品牌在AI答案中出现的频率',
    terminalTitle: '品牌AI可见性监测',
    terminalLines: [
      { type: 'command', text: 'geo monitor --brand "智优康赛" --platforms all' },
      { type: 'output', text: '正在监测 12 个AI平台的品牌提及情况...' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'success', text: '✓ 豆包        品牌提及率 68%  (较前月 +12%)' },
      { type: 'success', text: '✓ 通义千问     品牌提及率 45%  (较前月 +8%)' },
      { type: 'success', text: '✓ 文心一言     品牌提及率 52%  (较前月 +15%)' },
      { type: 'success', text: '✓ DeepSeek   品牌提及率 71%  (较前月 +23%)' },
      { type: 'success', text: '✓ Kimi        品牌提及率 39%  (较前月 +5%)' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: '监测完成！平均品牌提及率 55%，月度增长 +12.6%' },
      { type: 'command', text: '' }
    ]
  },
  {
    id: 'analyze',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    title: '分析AI响应',
    desc: '了解AI对你的品牌和话题的看法',
    terminalTitle: 'AI响应语义分析',
    terminalLines: [
      { type: 'command', text: 'geo analyze --topic "GEO优化" --sentiment' },
      { type: 'output', text: '正在分析AI对品牌话题的响应语义...' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: '情感倾向分析:' },
      { type: 'success', text: '  正面 72% | 中性 21% | 负面 7%' },
      { type: 'info', text: '关键词提及频次 TOP 5:' },
      { type: 'success', text: '  1. "GEO专家"      — 提及 234 次' },
      { type: 'success', text: '  2. "AI搜索优化"   — 提及 189 次' },
      { type: 'success', text: '  3. "品牌可见性"   — 提及 156 次' },
      { type: 'success', text: '  4. "智优康赛"     — 提及 142 次' },
      { type: 'success', text: '  5. "生成式引擎"   — 提及 98 次' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: '分析完成！品牌语义健康度: 优秀 (92/100)' },
      { type: 'command', text: '' }
    ]
  },
  {
    id: 'citations',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    title: '发现引用',
    desc: '找出哪些网站会向AI提供关于你的答案',
    terminalTitle: '信源引用追踪',
    terminalLines: [
      { type: 'command', text: 'geo citations --brand "智优康赛" --top 10' },
      { type: 'output', text: '正在追踪向AI提供品牌信息的网站来源...' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: 'TOP 信源网站:' },
      { type: 'success', text: '  1. 智优康赛官网     引用权重 35%' },
      { type: 'success', text: '  2. 36氪           引用权重 18%' },
      { type: 'success', text: '  3. 知乎            引用权重 14%' },
      { type: 'success', text: '  4. 百度百科        引用权重 11%' },
      { type: 'success', text: '  5. 微信公众号       引用权重 9%' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: '新增优质信源: 3 个 | 信源质量评分: A+ (权威度 87%)' },
      { type: 'info', text: '引用追踪完成！总计 47 个有效信源' },
      { type: 'command', text: '' }
    ]
  },
  {
    id: 'act',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: '采取行动',
    desc: '提升排名，增加曝光度',
    terminalTitle: 'GEO优化执行',
    terminalLines: [
      { type: 'command', text: 'geo optimize --strategy "全面增强" --auto' },
      { type: 'output', text: '正在执行 GEO 全面优化策略...' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: '优化任务队列:' },
      { type: 'success', text: '  ✓ 结构化数据标记优化    — 完成' },
      { type: 'success', text: '  ✓ 知识图谱条目创建      — 完成' },
      { type: 'success', text: '  ✓ 多平台内容同步更新    — 完成' },
      { type: 'success', text: '  ✓ 权威背书内容发布      — 完成' },
      { type: 'info', text: '  ○ 竞品监测报告生成      — 进行中...' },
      { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', text: '预估效果: 品牌提及率 +45% | 首推率 +32%' },
      { type: 'command', text: '' }
    ]
  }
]
const activeFeature = ref(0)

// ========== GEO Benefits ==========
const geoBenefits = [
  { value: '50%+', label: '全球用户使用AI搜索' },
  { value: '20%+', label: 'AI搜索年增速' },
  { value: '3472亿', label: '2029年AI搜索市场规模' },
  { value: '45%', label: '高净值人群依赖AI决策' }
]

// ========== 10 Core Services (Accordion) ==========
const servicesList = [
  {
    num: '01',
    title: 'GEO',
    subtitle: '生成式引擎优化',
    color: '#4b33ff',
    desc: '构建"洞察-生产-占位-演进"GEO闭环。通过多模态图谱向AI模型输入真实信源，管理品牌数字声誉并沉淀数据资产，助力实现全网信息同频与业务转化。'
  },
  {
    num: '02',
    title: '内容营销',
    color: '#6c5ce7',
    desc: '依托短视频平台、小红书与知乎等媒介，制定内容生产与分发策略。建立企业知识图谱与用户心智认知，驱动产品种草与商业转化。'
  },
  {
    num: '03',
    title: '效果营销',
    color: '#4c75ff',
    desc: '提供搜索引擎优化(SEO)、APP推广与活动策划服务。建立数据分析模型，规划用户生命周期与增长路径，提升线索量与投入产出比(ROI)。'
  },
  {
    num: '04',
    title: '数字广告',
    color: '#00b4d8',
    desc: '整合搜索竞价、信息流、短视频及富媒体等渠道网络。执行广告投放与植入操作，进行跨平台流量获取、人群定向与转化追踪。'
  },
  {
    num: '05',
    title: '品牌公关',
    color: '#22c55e',
    desc: '制定品牌公关策略与传播路径。搭建主流媒体矩阵与危机防御机制，管理企业品牌声誉，传递企业正向社会价值。'
  },
  {
    num: '06',
    title: '创意营销',
    color: '#f59e0b',
    desc: '建立企业视觉资产。涵盖标志及VI视觉系统、IP形象塑造、平面与3D视觉制作及动画开发，建立统一的品牌对外视觉识别标准。'
  },
  {
    num: '07',
    title: '社交营销',
    color: '#ec4899',
    desc: '微信、微博等社交媒体矩阵及用户社群策划。社交平台活动策划与口碑管理，搭建品牌与用户的直接交互渠道及私域流量池。'
  },
  {
    num: '08',
    title: '出海营销',
    color: '#06b6d4',
    desc: '协助中国企业搭建符合目标国当地市场的品牌传播与获客体系。部署海外营销系统，提供多语种建站、多语种SEO与海外数字广告投放服务。'
  },
  {
    num: '09',
    title: '智能营销',
    color: '#8b5cf6',
    desc: '部署营销技术基础设施。开发营销型网站，接入舆情监测、SCRM及营销自动化系统，实现线索培育与营销业务的数字化管理。'
  },
  {
    num: '10',
    title: '品牌战略与定位',
    color: '#ef4444',
    desc: '制定企业顶层品牌规划。开展市场洞察与竞品分析，确立核心价值与差异化定位。搭建品牌架构，指导全链路营销落地，实现用户心智占领与长期商业增长。'
  }
]
const expandedService = ref<number | null>(null)

const toggleService = (index: number) => {
  expandedService.value = expandedService.value === index ? null : index
}

// ========== GEO Results Dual Phone Carousel ==========
const geoResults = [
  '/images/geo-result-1.png',
  '/images/geo-result-2.png',
  '/images/geo-result-3.png',
  '/images/geo-result-4.png'
]
const currentSlideLeft = ref(0)
const currentSlideRight = ref(2) // 右侧手机偏移2张，与左侧错开
const carouselIntervalLeft = ref<ReturnType<typeof setInterval> | null>(null)
const carouselIntervalRight = ref<ReturnType<typeof setInterval> | null>(null)
const touchStartX = ref(0)

const startCarousel = () => {
  carouselIntervalLeft.value = setInterval(() => {
    currentSlideLeft.value = (currentSlideLeft.value + 1) % geoResults.length
  }, 3500)
  carouselIntervalRight.value = setInterval(() => {
    currentSlideRight.value = (currentSlideRight.value + 1) % geoResults.length
  }, 3500)
}

const stopCarousel = () => {
  if (carouselIntervalLeft.value) {
    clearInterval(carouselIntervalLeft.value)
    carouselIntervalLeft.value = null
  }
  if (carouselIntervalRight.value) {
    clearInterval(carouselIntervalRight.value)
    carouselIntervalRight.value = null
  }
}

const goToSlide = (phone: 'left' | 'right', index: number) => {
  if (phone === 'left') {
    currentSlideLeft.value = index
  } else {
    currentSlideRight.value = index
  }
}

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const onTouchEnd = (e: TouchEvent, phone: 'left' | 'right') => {
  const diff = touchStartX.value - e.changedTouches[0].clientX
  const current = phone === 'left' ? currentSlideLeft.value : currentSlideRight.value
  if (Math.abs(diff) > 50) {
    const next = diff > 0
      ? (current + 1) % geoResults.length
      : (current - 1 + geoResults.length) % geoResults.length
    if (phone === 'left') {
      currentSlideLeft.value = next
    } else {
      currentSlideRight.value = next
    }
  }
}

// ========== Scroll Animation ==========
const observerRef = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observerRef.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observerRef.value?.observe(el)
  })

  startCarousel()
})

onUnmounted(() => {
  observerRef.value?.disconnect()
  stopCarousel()
})
</script>

<template>
  <div class="solutions-view">
    <!-- ========== PAGE HERO ========== -->
    <section class="page-hero">
      <MagicRings
        class="page-hero-rings"
        color="#4b33ff"
        colorTwo="#00d4ff"
        :speed="0.6"
        :ringCount="5"
        :attenuation="8"
        :lineThickness="1.5"
        :baseRadius="0.3"
        :radiusStep="0.08"
        :scaleRate="0.08"
        :opacity="0.7"
        :noiseAmount="0.05"
        :rotation="15"
        :ringGap="1.4"
        :followMouse="true"
        :mouseInfluence="0.15"
        :hoverScale="1.1"
        :parallax="0.03"
      />
      <div class="page-hero-content container">
        <div class="page-hero-brand">
          <img src="/images/logo-white.svg" alt="智优康赛" class="page-hero-logo" />
          <span class="page-hero-divider" />
          <BlurText
            text="解决方案"
            :delay="100"
            animateBy="words"
            direction="top"
            className="page-hero-title"
            :stepDuration="0.5"
          />
        </div>
      </div>
    </section>

    <!-- ========== SECTION 1: GEO Profound Style ========== -->
    <section class="section geo-overview-section">
      <div class="container">
        <div class="geo-profound scroll-reveal">
          <!-- 左侧内容区 -->
          <div class="geo-profound-left">
            <div class="geo-profound-header">
              <span class="geo-profound-tag">AI 搜索监测</span>
              <h2 class="geo-profound-title">了解AI如何<br/>谈论您的品牌</h2>
              <p class="geo-profound-desc">追踪您的 AI 可见性，了解 AI 在何处以及如何提及您的品牌，并挖掘洞察以增强您的影响力。</p>
              <div class="geo-profound-buttons">
                <button class="geo-profound-btn geo-profound-btn--primary" @click="emit('openForm')">获取演示</button>
                <button class="geo-profound-btn geo-profound-btn--secondary" @click="emit('openForm')">开始使用</button>
              </div>
            </div>

            <!-- 功能导航 -->
            <div class="geo-profound-tabs">
              <div
                v-for="(feature, index) in geoFeatures"
                :key="feature.id"
                class="geo-profound-tab"
                :class="{ 'is-active': activeFeature === index }"
                @click="activeFeature = index"
              >
                <div class="geo-profound-tab-icon" v-html="feature.icon" />
                <div class="geo-profound-tab-title">{{ feature.title }}</div>
                <div class="geo-profound-tab-desc">{{ feature.desc }}</div>
              </div>
            </div>
          </div>

          <!-- 右侧终端演示区 -->
          <div class="geo-profound-right">
            <div class="geo-terminal">
              <div class="geo-terminal-header">
                <div class="geo-terminal-dots">
                  <span class="geo-terminal-dot geo-terminal-dot--red" />
                  <span class="geo-terminal-dot geo-terminal-dot--yellow" />
                  <span class="geo-terminal-dot geo-terminal-dot--green" />
                </div>
                <span class="geo-terminal-title">{{ geoFeatures[activeFeature].terminalTitle }}</span>
              </div>
              <div class="geo-terminal-body" :key="activeFeature">
                <div
                  v-for="(line, li) in geoFeatures[activeFeature].terminalLines"
                  :key="li"
                  class="geo-terminal-line"
                  :class="`geo-terminal-line--${line.type}`"
                >
                  <span v-if="line.type === 'command'" class="geo-terminal-prompt">$ </span>
                  <span>{{ line.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 2: 主流平台优化 ========== -->
    <section class="section platforms-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="主流AI搜索平台"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="platforms-showcase scroll-reveal">
          <!-- 渐变竖线 -->
          <div class="platforms-line">
            <div class="platforms-line-glow"></div>
            <div class="platforms-line-dots">
              <span v-for="i in 12" :key="'dot-'+i" class="line-dot" :style="{ animationDelay: (i * 0.15) + 's' }"></span>
            </div>
          </div>

          <!-- 浮动圆形图标 -->
          <div class="platforms-orbit">
            <div
              v-for="(platform, index) in aiPlatforms"
              :key="index"
              class="platform-orb"
              :class="'orb-' + platform.size"
              :style="{ animationDelay: (index * 0.3) + 's' }"
            >
              <div class="orb-inner">
                <img
                  v-if="platform.logo"
                  :src="platform.logo"
                  :alt="platform.name"
                  class="orb-logo"
                />
                <span v-else class="orb-text">{{ platform.name }}</span>
              </div>
              <span class="orb-label">{{ platform.name }}</span>
            </div>
          </div>
        </div>

        <!-- 补充标签 -->
        <div class="platforms-tags scroll-reveal">
          <span class="platform-tag">12大平台</span>
          <span class="platform-tag">全域覆盖</span>
          <span class="platform-tag">实时监测</span>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: GEO法则 ========== -->
    <section class="section framework-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="GEO 3C 指导法则"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="geo-3c-orbit scroll-reveal">
          <!-- SVG 连接线 -->
          <svg class="geo-3c-svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lineGrad1" x1="300" y1="200" x2="120" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#4b33ff" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#00d4ff" stop-opacity="0.2" />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="300" y1="200" x2="480" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#4b33ff" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#00d4ff" stop-opacity="0.2" />
              </linearGradient>
              <linearGradient id="lineGrad3" x1="300" y1="200" x2="300" y2="350" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#4b33ff" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#00d4ff" stop-opacity="0.2" />
              </linearGradient>
            </defs>
            <line class="geo-3c-line" x1="300" y1="200" x2="120" y2="70" stroke="url(#lineGrad1)" />
            <line class="geo-3c-line" x1="300" y1="200" x2="480" y2="70" stroke="url(#lineGrad2)" />
            <line class="geo-3c-line" x1="300" y1="200" x2="300" y2="350" stroke="url(#lineGrad3)" />
          </svg>

          <!-- 中心 GEO Loader -->
          <div class="geo-3c-center">
            <div class="geo-loader-letters">
              <span class="geo-l">G</span>
              <span class="geo-l">E</span>
              <span class="geo-l">O</span>
            </div>
            <div class="geo-loader-orb">
              <div class="geo-loader-orb-core"></div>
              <div class="geo-loader-orb-ring"></div>
              <div class="geo-loader-orb-ring geo-loader-orb-ring--2"></div>
            </div>
          </div>

          <!-- 环绕词 -->
          <div class="geo-3c-node geo-3c-node--1">
            <div class="geo-3c-dot"></div>
            <span class="geo-3c-label">理解</span>
          </div>
          <div class="geo-3c-node geo-3c-node--2">
            <div class="geo-3c-dot"></div>
            <span class="geo-3c-label">信任</span>
          </div>
          <div class="geo-3c-node geo-3c-node--3">
            <div class="geo-3c-dot"></div>
            <span class="geo-3c-label">推荐</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 5: 全栈服务能力 ========== -->
    <section class="section services-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="全栈服务能力"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="services-accordion scroll-reveal">
          <div
            v-for="(service, index) in servicesList"
            :key="index"
            class="svc-card"
            :class="{ 'is-expanded': expandedService === index }"
            @click="toggleService(index)"
          >
            <div class="svc-card-header">
              <div class="svc-card-indicator" :style="{ background: service.color }" />
              <span class="svc-card-num">{{ service.num }}</span>
              <div class="svc-card-titles">
                <span class="svc-card-heading">{{ service.title }}</span>
                <span v-if="service.subtitle" class="svc-card-sub">{{ service.subtitle }}</span>
              </div>
              <div class="svc-card-arrow" :class="{ 'is-open': expandedService === index }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="svc-card-body">
              <div class="svc-card-body-inner">
                <p class="svc-card-desc">{{ service.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 6: GEO成效 ========== -->
    <section class="section results-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="GEO成效"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="dual-phone-carousel scroll-reveal">
          <!-- 左侧手机 -->
          <div
            class="phone-frame-wrapper phone-left"
            @mouseenter="stopCarousel"
            @mouseleave="startCarousel"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd($event, 'left')"
          >
            <img src="/images/phone-frame.png" alt="手机" class="phone-frame-img" />
            <div class="phone-screen">
              <img
                v-for="(img, index) in geoResults"
                :key="'l-' + index"
                :src="img"
                :alt="`GEO成效展示 ${index + 1}`"
                class="phone-screen-img"
                :class="{ 'is-active': currentSlideLeft === index }"
              />
            </div>
            <div class="carousel-dots carousel-dots--inner">
              <button
                v-for="(_, index) in geoResults"
                :key="'ld-' + index"
                class="carousel-dot"
                :class="{ 'is-active': currentSlideLeft === index }"
                @click.stop="goToSlide('left', index)"
                :aria-label="`左侧手机第${index + 1}张`"
              />
            </div>
          </div>

          <!-- 右侧手机 -->
          <div
            class="phone-frame-wrapper phone-right"
            @mouseenter="stopCarousel"
            @mouseleave="startCarousel"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd($event, 'right')"
          >
            <img src="/images/phone-frame.png" alt="手机" class="phone-frame-img" />
            <div class="phone-screen">
              <img
                v-for="(img, index) in geoResults"
                :key="'r-' + index"
                :src="img"
                :alt="`GEO成效展示 ${index + 1}`"
                class="phone-screen-img"
                :class="{ 'is-active': currentSlideRight === index }"
              />
            </div>
            <div class="carousel-dots carousel-dots--inner">
              <button
                v-for="(_, index) in geoResults"
                :key="'rd-' + index"
                class="carousel-dot"
                :class="{ 'is-active': currentSlideRight === index }"
                @click.stop="goToSlide('right', index)"
                :aria-label="`右侧手机第${index + 1}张`"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <PageCTA @openForm="emit('openForm')" />
  </div>
</template>

<style lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

// ========== Page Hero ==========
.page-hero {
  position: relative;
  overflow: hidden;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: 240px;
  }
}

.page-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-hero-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: $space-3;
  }
}

.page-hero-logo {
  height: 48px;
  width: auto;
  opacity: 0.9;

  @media (max-width: 768px) {
    height: 36px;
  }
}

.page-hero-divider {
  width: 1px;
  height: 40px;
  background: $border-medium;

  @media (max-width: 768px) {
    height: 30px;
  }
}

.page-hero-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  letter-spacing: 0.05em !important;
  line-height: 1.2 !important;
}

.page-hero-rings {
  position: absolute;
  inset: 0;
  z-index: 0;
}

// ========== Section Common ==========
.section {
  @include section-padding;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: $space-16;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;

  .blur-text {
    justify-content: center;
  }

  @media (max-width: 768px) {
    margin-bottom: $space-10;
  }
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.2 !important;
  margin-bottom: $space-4;
}

.section-desc {
  font-size: $text-lg;
  color: $text-secondary;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

// ========== Scroll Reveal ==========
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// ========== SECTION 1: GEO Profound Style ==========
.geo-overview-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/section-bg-new.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

.geo-profound {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

// 左侧内容区
.geo-profound-left {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.geo-profound-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.geo-profound-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #22c55e;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  }
}

.geo-profound-title {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 700;
  color: $text-primary;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.geo-profound-desc {
  font-size: $text-base;
  color: $text-secondary;
  line-height: 1.7;
  max-width: 440px;
}

.geo-profound-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.geo-profound-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: $radius-md;
  font-size: $text-sm;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;

  &--primary {
    background: #22c55e;
    color: #03040a;

    &:hover {
      background: #16a34a;
      transform: translateY(-1px);
    }
  }

  &--secondary {
    background: rgba(255, 255, 255, 0.06);
    color: $text-primary;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.18);
    }
  }
}

// 功能导航标签
.geo-profound-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.geo-profound-tab {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.25s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &.is-active {
    background: rgba(34, 197, 94, 0.06);
    border-color: rgba(34, 197, 94, 0.2);

    &::before {
      background: #22c55e;
    }

    .geo-profound-tab-icon {
      color: #22c55e;
    }

    .geo-profound-tab-title {
      color: $text-primary;
    }
  }
}

.geo-profound-tab-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 10px;
  transition: color 0.25s ease;

  svg {
    width: 100%;
    height: 100%;
  }
}

.geo-profound-tab-title {
  font-size: $text-sm;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
  transition: color 0.25s ease;
}

.geo-profound-tab-desc {
  font-size: 12px;
  color: $text-tertiary;
  line-height: 1.5;
}

// 右侧终端演示区
.geo-profound-right {
  position: sticky;
  top: 100px;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
  }
}

.geo-terminal {
  background: #0a0a0f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(34, 197, 94, 0.05),
    0 24px 64px rgba(0, 0, 0, 0.5);
}

.geo-terminal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.geo-terminal-dots {
  display: flex;
  gap: 6px;
}

.geo-terminal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &--red { background: #ef4444; }
  &--yellow { background: #eab308; }
  &--green { background: #22c55e; }
}

.geo-terminal-title {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
}

.geo-terminal-body {
  padding: 20px 18px;
  font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.8;
  min-height: 340px;
}

.geo-terminal-line {
  &--command {
    color: #22c55e;
  }

  &--output {
    color: rgba(255, 255, 255, 0.45);
  }

  &--success {
    color: rgba(255, 255, 255, 0.75);
  }

  &--info {
    color: rgba(255, 255, 255, 0.55);
  }
}

.geo-terminal-prompt {
  color: #22c55e;
  margin-right: 2px;
}

// 移动端适配
@media (max-width: 768px) {
  .geo-profound-title {
    font-size: 1.75rem;
  }

  .geo-profound-desc {
    font-size: $text-sm;
  }

  .geo-profound-btn {
    padding: 10px 20px;
    font-size: 13px;
  }

  .geo-terminal-body {
    font-size: 12px;
    padding: 16px 14px;
    min-height: 280px;
  }
}

// ========== SECTION 2: Platforms ==========
.platforms-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/section-bg-new.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

.platforms-showcase {
  position: relative;
  max-width: 900px;
  height: 420px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 渐变竖线
.platforms-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
  z-index: 1;
}

.platforms-line-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(75, 51, 255, 0.5), rgba(76, 117, 255, 0.4), transparent);
}

// 竖线上的流动粒子
.platforms-line-dots {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
}

.line-dot {
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: dot-flow 2.5s ease-in-out infinite;

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.2}s;
    }
  }
}

@keyframes dot-flow {
  0% {
    top: -5%;
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    top: 105%;
    opacity: 0;
  }
}

// 浮动圆形图标轨道
.platforms-orbit {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.platform-orb {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: orb-float 4s ease-in-out infinite;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.12) !important;
    z-index: 10;
  }

  // 大小变体
  &.orb-sm .orb-inner { width: 48px; height: 48px; }
  &.orb-md .orb-inner { width: 64px; height: 64px; }
  &.orb-lg .orb-inner { width: 80px; height: 80px; }
  &.orb-xl .orb-inner { width: 96px; height: 96px; }

  // 12个图标位置分布（左右交错排列）
  &:nth-child(1) { left: 5%; top: 5%; }
  &:nth-child(2) { right: 8%; top: 2%; }
  &:nth-child(3) { left: 18%; top: 30%; }
  &:nth-child(4) { right: 5%; top: 25%; }
  &:nth-child(5) { left: 2%; top: 55%; }
  &:nth-child(6) { right: 15%; top: 52%; }
  &:nth-child(7) { left: 25%; top: 75%; }
  &:nth-child(8) { right: 3%; top: 72%; }
  &:nth-child(9) { left: 8%; top: 88%; }
  &:nth-child(10) { right: 20%; top: 88%; }
  &:nth-child(11) { left: 42%; top: 10%; animation-delay: 1s; }
  &:nth-child(12) { right: 38%; top: 42%; animation-delay: 2s; }
}

@keyframes orb-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.orb-inner {
  border-radius: 50%;
  background: rgba(75, 51, 255, 0.08);
  border: 1px solid rgba(75, 51, 255, 0.15);
  box-shadow:
    0 0 8px rgba(255, 255, 255, 0.15) inset,
    0 16px 24px -12px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(75, 51, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;

  .platform-orb:hover & {
    background: rgba(75, 51, 255, 0.15);
    border-color: rgba(75, 51, 255, 0.35);
    box-shadow:
      0 0 12px rgba(255, 255, 255, 0.2) inset,
      0 16px 24px -12px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(75, 51, 255, 0.25);
  }
}

.orb-logo {
  width: 55%;
  height: 55%;
  object-fit: contain;
  filter: brightness(1.1);
}

.orb-text {
  font-size: 11px;
  font-weight: 600;
  color: $text-primary;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 1.2;
  padding: 4px;
}

.orb-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.3s ease;

  .platform-orb:hover & {
    opacity: 1;
    transform: translateY(0);
    color: rgba(255, 255, 255, 0.8);
  }
}

// 底部补充标签
.platforms-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: -20px;
}

.platform-tag {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  padding: 4px 14px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  letter-spacing: 1px;
}

// 移动端适配
@media (max-width: 768px) {
  .platforms-showcase {
    height: 500px;
    max-width: 100%;
  }

  .platform-orb {
    &.orb-sm .orb-inner { width: 40px; height: 40px; }
    &.orb-md .orb-inner { width: 52px; height: 52px; }
    &.orb-lg .orb-inner { width: 64px; height: 64px; }
    &.orb-xl .orb-inner { width: 76px; height: 76px; }

    &:nth-child(1) { left: 2%; top: 3%; }
    &:nth-child(2) { right: 2%; top: 1%; }
    &:nth-child(3) { left: 8%; top: 20%; }
    &:nth-child(4) { right: 0; top: 18%; }
    &:nth-child(5) { left: 0; top: 38%; }
    &:nth-child(6) { right: 5%; top: 36%; }
    &:nth-child(7) { left: 10%; top: 55%; }
    &:nth-child(8) { right: 0; top: 53%; }
    &:nth-child(9) { left: 2%; top: 72%; }
    &:nth-child(10) { right: 5%; top: 70%; }
    &:nth-child(11) { left: 30%; top: 85%; }
    &:nth-child(12) { right: 25%; top: 87%; }
  }

  .orb-label {
    font-size: 9px;
    opacity: 0.6;
    transform: none;
    color: rgba(255, 255, 255, 0.4);
  }

  .platforms-tags {
    gap: 8px;
    margin-top: 24px;
  }

  .platform-tag {
    font-size: 10px;
    padding: 3px 10px;
  }
}

// ========== SECTION 3: Framework Orbit ==========
.framework-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/section-bg-new.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

.geo-3c-orbit {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 420px;
  margin: 0 auto;
}

.geo-3c-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.geo-3c-line {
  stroke-width: 1.2;
  stroke-dasharray: 5 4;
  animation: line-flow 2s linear infinite;
  opacity: 0.7;
}

@keyframes line-flow {
  to { stroke-dashoffset: -18; }
}

// 中心 GEO Loader
.geo-3c-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.geo-loader-letters {
  display: flex;
  gap: 3px;
}

.geo-l {
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
  opacity: 0;
  animation: letter-pop 3s ease-in-out infinite;
}

.geo-l:nth-child(1) { animation-delay: 0s; }
.geo-l:nth-child(2) { animation-delay: 0.3s; }
.geo-l:nth-child(3) { animation-delay: 0.6s; }

@keyframes letter-pop {
  0%, 15% { opacity: 0; transform: translateY(10px); filter: blur(6px); }
  35%, 75% { opacity: 1; transform: translateY(0); filter: blur(0); }
  100% { opacity: 0; transform: translateY(-6px); filter: blur(3px); }
}

// 球体
.geo-loader-orb {
  position: relative;
  width: 90px;
  height: 90px;
}

.geo-loader-orb-core {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #9b7bff, #6b4fff 45%, #3a1fbf 100%);
  box-shadow:
    0 0 24px rgba(107, 79, 255, 0.6),
    0 0 48px rgba(75, 51, 255, 0.35),
    0 0 80px rgba(75, 51, 255, 0.15),
    inset 0 0 24px rgba(255, 255, 255, 0.12);
  animation: orb-pulse 3s ease-in-out infinite;
}

.geo-loader-orb-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid transparent;
  border-top-color: rgba(75, 51, 255, 0.7);
  border-right-color: rgba(0, 212, 255, 0.35);
  animation: orb-spin 4s linear infinite;
}

.geo-loader-orb-ring--2 {
  inset: 5px;
  border-top-color: rgba(0, 212, 255, 0.45);
  border-right-color: rgba(75, 51, 255, 0.25);
  animation: orb-spin 3s linear infinite reverse;
}

@keyframes orb-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.06); opacity: 0.92; }
}

@keyframes orb-spin {
  to { transform: rotate(360deg); }
}

// 环绕词
.geo-3c-node {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.geo-3c-node--1 {
  left: 50%;
  top: 8px;
  transform: translateX(-50%) translateX(-190px);
}

.geo-3c-node--2 {
  left: 50%;
  top: 8px;
  transform: translateX(-50%) translateX(190px);
}

.geo-3c-node--3 {
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
}

.geo-3c-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4b33ff, #00d4ff);
  box-shadow:
    0 0 14px rgba(75, 51, 255, 0.7),
    0 0 28px rgba(75, 51, 255, 0.35);
  animation: dot-pulse 2.5s ease-in-out infinite;
}

.geo-3c-label {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 4px;
  text-shadow: 0 0 24px rgba(75, 51, 255, 0.5);
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.85; }
}

// 移动端
@media (max-width: 768px) {
  .geo-3c-orbit {
    height: 340px;
    max-width: 380px;
  }

  .geo-3c-node--1 {
    transform: translateX(-50%) translateX(-120px);
  }

  .geo-3c-node--2 {
    transform: translateX(-50%) translateX(120px);
  }

  .geo-loader-orb {
    width: 70px;
    height: 70px;
  }

  .geo-loader-orb-core {
    inset: 8px;
  }

  .geo-l {
    font-size: 15px;
  }

  .geo-3c-label {
    font-size: 17px;
    letter-spacing: 2px;
  }

  .geo-3c-dot {
    width: 9px;
    height: 9px;
  }
}

// ========== SECTION 5: Services Accordion ==========
.services-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/section-bg-new.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

.services-accordion {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.svc-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &.is-expanded {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);

    .svc-card-header {
      padding-bottom: 12px;
    }

    .svc-card-body {
      max-height: 200px;
      opacity: 1;
      transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.3s ease 0.05s;
    }

    .svc-card-body-inner {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.svc-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  transition: padding 0.3s ease;
}

.svc-card-indicator {
  width: 4px;
  height: 28px;
  border-radius: 2px;
  flex-shrink: 0;
  transition: height 0.3s ease;

  .is-expanded & {
    height: 36px;
    box-shadow: 0 0 12px currentColor;
  }
}

.svc-card-num {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.2);
  font-family: 'Inter', monospace;
  letter-spacing: 0.05em;
  min-width: 22px;
}

.svc-card-titles {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.svc-card-heading {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;

  .is-expanded & {
    color: #fff;
  }
}

.svc-card-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.svc-card-arrow {
  color: rgba(255, 255, 255, 0.25);
  transition: transform 0.3s ease, color 0.3s ease;
  flex-shrink: 0;

  &.is-open {
    transform: rotate(180deg);
    color: rgba(255, 255, 255, 0.5);
  }
}

.svc-card-body {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.2s ease;
}

.svc-card-body-inner {
  padding: 0 20px 18px 62px;
  transform: translateY(-8px);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
              opacity 0.3s ease 0.05s;
}

.svc-card-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.75;
  margin: 0;
}

// 移动端适配
@media (max-width: 768px) {
  .svc-card-header {
    padding: 14px 16px;
    gap: 12px;
  }

  .svc-card-indicator {
    height: 24px;

    .is-expanded & {
      height: 30px;
    }
  }

  .svc-card-heading {
    font-size: 15px;
  }

  .svc-card-sub {
    font-size: 11px;
    display: none;
  }

  .svc-card-body-inner {
    padding: 0 16px 14px 52px;
  }

  .svc-card-desc {
    font-size: 13px;
    line-height: 1.7;
  }
}

@media (max-width: 480px) {
  .svc-card-num {
    display: none;
  }

  .svc-card-body-inner {
    padding-left: 32px;
  }
}

// ========== SECTION 6: Results ==========
.results-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/section-bg-new.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

// ========== Dual Phone Carousel ==========
.dual-phone-carousel {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  perspective: 1200px;
}

.phone-frame-wrapper {
  position: relative;
  width: 280px;
  cursor: grab;
  user-select: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &:active {
    cursor: grabbing;
  }
}

.phone-left {
  transform: rotateY(6deg) translateZ(0);

  &:hover {
    transform: rotateY(0deg) scale(1.03);
  }
}

.phone-right {
  transform: rotateY(-6deg) translateZ(0);

  &:hover {
    transform: rotateY(0deg) scale(1.03);
  }
}

.phone-frame-img {
  width: 100%;
  height: auto;
  display: block;
}

.phone-screen {
  position: absolute;
  top: 1.2%;
  left: 2.5%;
  width: 95%;
  height: 97.6%;
  overflow: hidden;
  border-radius: 32px;
  background: #000;
}

.phone-screen-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }
}

.carousel-dots {
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
}

.carousel-dots--inner {
  position: absolute;
  bottom: 3.5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.35s ease;
  padding: 0;

  &.is-active {
    width: 20px;
    border-radius: 3px;
    background: $accent-purple;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}

// 移动端：两手机缩小并排
@media (max-width: 768px) {
  .dual-phone-carousel {
    gap: 20px;
  }

  .phone-frame-wrapper {
    width: 160px;
  }

  .phone-left,
  .phone-right {
    transform: none;

    &:hover {
      transform: scale(1.02);
    }
  }

  .carousel-dots--inner {
    bottom: 4%;
  }

  .carousel-dot {
    width: 5px;
    height: 5px;

    &.is-active {
      width: 16px;
    }
  }
}

// 小屏手机：竖排
@media (max-width: 400px) {
  .dual-phone-carousel {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .phone-frame-wrapper {
    width: 200px;
  }
}

</style>
