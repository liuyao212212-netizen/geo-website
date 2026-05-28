<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MagicRings from '../components/MagicRings.vue'
import BlurText from '../components/BlurText.vue'
import GlassSurface from '../components/GlassSurface.vue'
import PageCTA from '../components/PageCTA.vue'
import Particles from '../components/Particles.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== Development History Data ==========
const historyData = [
  {
    year: '2026',
    category: '战略升级',
    title: 'GEO赛道的开创者',
    desc: '智优康赛正式成立，专注生成式引擎优化。完成千万级融资，与7大主流AI平台建立战略合作，发布智优GEO引擎与AI内容工厂。',
    events: [
      '智优康赛（北京智优康赛科技有限公司）正式成立，专注GEO生成式引擎优化赛道',
      '完成千万级别外部融资，成为AIIA首批GEO专项企业',
      '发布智优GEO引擎与智优AI内容工厂两大核心产品',
      '与豆包、腾讯元宝、通义千问、文心一言、智谱清言、DeepSeek、Kimi等主流AI平台建立战略合作'
    ]
  },
  {
    year: '2025',
    category: '技术积淀',
    title: 'AI时代的先行者',
    desc: '耐特康赛在AI应用领域斩获多项大奖，渠成获评年度人物。团队完成GEO技术预研，确定独立孵化智优康赛的战略方向。',
    events: [
      '耐特康赛荣获虎啸奖年度综合服务商',
      '金鼠标数字营销大赛AI创新应用类金奖',
      '渠成获评中国传播年度人物、年度CEO人物',
      '团队GEO技术预研完成，确定独立孵化战略'
    ]
  },
  {
    year: '2022',
    category: '高速成长',
    title: '技术驱动的增长引擎',
    desc: '获评国家高新技术企业与省级专精特新企业，搜索引擎优化大数据管理方法获国家发明专利，服务客户突破500家。',
    events: [
      '获评国家高新技术企业',
      '获评省级专精特新中小企业',
      '搜索引擎优化大数据管理方法获国家发明专利',
      '服务客户突破500家，覆盖消费品、科技、金融等多行业'
    ]
  },
  {
    year: '2017',
    category: '资本助力',
    title: '走向国际的舞台',
    desc: '上市公司拓尔思战略入股，渠成受邀在哈佛大学发表主题演讲，获评亚太最具活力企业家，团队规模突破200人。',
    events: [
      '上市公司拓尔思（300229.SZ）战略入股耐特康赛',
      '渠成获评亚太最具活力企业家',
      '受邀在哈佛大学发表主题演讲',
      '团队规模突破200人，设立海外分公司'
    ]
  },
  {
    year: '2008',
    category: '奠基立业',
    title: '搜索营销的开创者',
    desc: '耐特康赛正式成立，渠成开创中国搜索营销行业先河，推出首批SEO技术服务，建立搜索引擎晴雨表技术体系。',
    events: [
      '耐特康赛网络技术（北京）有限公司正式成立',
      '渠成创办公司，开创中国搜索营销行业先河',
      '推出首批SEO技术服务，服务早期互联网品牌',
      '建立搜索引擎晴雨表技术体系'
    ]
  }
]

// Reverse history data for timeline (oldest first → newest)
const reversedHistoryData = computed(() => [...historyData].reverse())

// ========== Snake Timeline ==========
const timelineRef = ref<HTMLElement | null>(null)
const visibleNodes = ref<boolean[]>([false, false, false, false, false])

onMounted(() => {
  // Get all glow & extra paths (desktop + mobile)
  const glowPaths = document.querySelectorAll<SVGPathElement>('.winding-path-glow')
  const extraPaths = document.querySelectorAll<SVGPathElement>('.winding-path-extra')

  // Store lengths and set initial hidden state
  glowPaths.forEach((el) => {
    const len = el.getTotalLength()
    el.dataset.length = String(len)
    el.style.strokeDasharray = `${len}`
    el.style.strokeDashoffset = `${len}`
  })
  extraPaths.forEach((el) => {
    const len = el.getTotalLength()
    el.dataset.length = String(len)
    el.style.strokeDasharray = `${len}`
    el.style.strokeDashoffset = `${len}`
  })

  // Scroll-driven path draw + node glow
  const onScroll = () => {
    if (!timelineRef.value) return
    const rect = timelineRef.value.getBoundingClientRect()
    const viewH = window.innerHeight
    // How far the timeline has scrolled into view (0 = just entering, 1 = fully past)
    const progress = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH * 0.3)))

    // Draw all paths based on scroll progress
    glowPaths.forEach((el) => {
      const len = parseFloat(el.dataset.length!)
      el.style.strokeDashoffset = `${len * (1 - progress)}`
    })
    extraPaths.forEach((el) => {
      const len = parseFloat(el.dataset.length!)
      el.style.strokeDashoffset = `${len * (1 - progress)}`
    })

    // Light up nodes based on scroll progress
    const nodeCount = 5
    for (let i = 0; i < nodeCount; i++) {
      const nodeProgress = (i + 1) / (nodeCount + 1)
      if (progress >= nodeProgress - 0.08) {
        visibleNodes.value[i] = true
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // Initial check

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})

// ========== Team Data ==========
const flippedIndex = ref(-1)

const teamMembers = [
  {
    name: '渠成',
    role: '创始人 / 董事长兼CEO',
    photo: '/images/team/qu-cheng.png',
    bio: [
      '北航互联网营销与管理专业研究生特聘教授，中国商务广告协会常务理事，苏秦会副会长兼执行委员，新西兰政府特聘顾问，百度特聘专家及钻石讲师。',
      '拥有搜索引擎晴雨表、搜索引擎优化大数据管理方法等多项国家专利；被多家权威机构评选为中国传播年度人物、年度CEO人物、年度数字营销影响力人物、十大品牌专家，荣获虎啸年度人物大奖、十年杰出商业领袖奖、亚太最具活力企业家等称号。',
      '曾多次作为演讲嘉宾出席中国、美国、英国、德国、日本、澳大利亚、新西兰等地的互联网营销大会，并曾受邀在哈佛大学、世界商业领袖会议中发表主题演讲。'
    ]
  },
  {
    name: '马小婷',
    role: '总裁',
    photo: '/images/team/ma-xiaoting.png',
    bio: [
      '荣获哥伦比亚大学首席营销官认证；中国商务广告协会"数字营销资深实战专家"；2023第七届DMAA国际数字营销奖终审评委；2022中国智媒营销大会·金理奖专家指导委员。',
      '2009年加入耐特康赛Netconcepts，参与早期公司组建以及全国各分公司创立。推动公司整体品牌营销战略，推出首款智能营销机器人；15年来深耕效果营销、品牌营销及出海营销领域，指导团队为品牌进行整合营销服务，获得客户信赖与好评，同时率领团队为百余家知名企业做品牌设计服务，获得多项国内外大奖。'
    ]
  },
  {
    name: '郭庄',
    role: 'CTO兼首席咨询师',
    photo: '/images/team/guo-zhuang.png',
    bio: [
      '2009年加入耐特康赛Netconcepts，10余年间不断带领公司专业服务团队，为近千家大型客户提供数字营销与数字化转型咨询服务，涉及包括汽车、快消、金融、医药、电商、出海、B2B、教育和旅游等行业的头部品牌客户。',
      '作为北航互联网营销与管理研究生专业的特聘副教授，一直致力于互联网营销人才的教育与培养，为行业人才规范化与标准化的研究与实践贡献一份专业力量。'
    ]
  }
]

// ========== Credentials Data ==========
const credentials = [
  { image: '/images/credentials/ga-advanced.png', text: 'Google Analytics 高级课程' },
  { image: '/images/credentials/ga-basics.png', text: 'Google Analytics 入门知识' },
  { image: '/images/credentials/google-datastudio.png', text: 'Google Data Studio' },
  { image: '/images/credentials/semrush-backlink.png', text: 'SEMrush Backlink' },
  { image: '/images/credentials/semrush-keyword.png', text: 'SEMrush Keyword' },
  { image: '/images/credentials/semrush-mobile-seo.png', text: 'SEMrush Mobile SEO' },
  { image: '/images/credentials/semrush-toolkit.png', text: 'SEMrush SEO Toolkit' },
  { image: '/images/credentials/semrush-audit.png', text: 'SEMrush Site Audit' },
  { image: '/images/credentials/semrush-social.png', text: 'SEMrush Social' },
  { image: '/images/credentials/semrush-youtube.png', text: 'SEMrush YouTube' },
  { image: '/images/credentials/semrush-ads.png', text: 'SEMrush Ads' },
  { image: '/images/credentials/semrush-growth.png', text: 'SEMrush Growth' },
  { image: '/images/credentials/book-seo-marketing.png', text: '全网营销与SEO' },
  { image: '/images/credentials/book-traffic-secrets.png', text: '流量的秘密' },
  { image: '/images/credentials/book-brand-mgmt.png', text: '品牌管理' },
  { image: '/images/credentials/book-b2b-marketing.png', text: 'B2B营销' },
  { image: '/images/credentials/semrush-partner.png', text: 'SEMrush Agency' },
  { image: '/images/credentials/google-partner.png', text: 'Google Partner' }
]

// ========== Cooperation Process ==========
const cooperationSteps = [
  { label: '企业营销需求确认', position: 'down', icon: 'check' },
  { label: '需求目标沟通', position: 'up', icon: 'chat' },
  { label: '最终目标确认', position: 'down', icon: 'target' },
  { label: '合同确认', position: 'up', icon: 'contract' },
  { label: '项目执行', position: 'down', icon: 'execute' },
  { label: '工作期间\n数据监测及汇报', position: 'up', icon: 'chart' },
  { label: '复盘总结', position: 'down', icon: 'summary' },
  { label: '下年度营销规划', position: 'up', icon: 'plan' }
]

// ========== Global Cities ==========
const globalCities = [
  { name: 'Beijing', x: 20, y: 18, isHQ: true },
  { name: 'Shanghai', x: 48, y: 8 },
  { name: 'Manila', x: 76, y: 16 },
  { name: 'Shenzhen', x: 38, y: 34 },
  { name: 'Guangzhou', x: 34, y: 55 },
  { name: 'Sydney', x: 80, y: 48 }
]

// Grid lines removed — replaced by rotating CSS globe

// ========== Scroll Animation ==========
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el)
  })
}

onMounted(() => {
  observeElements()
})
</script>

<template>
  <div class="about-view">
    <!-- ========== PAGE HERO: Logo + Title ========== -->
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
            text="关于我们"
            :delay="100"
            animateBy="words"
            direction="top"
            className="page-hero-title"
            :stepDuration="0.5"
          />
        </div>
      </div>
    </section>

    <!-- ========== SECTION 1: 公司介绍 ========== -->
    <section class="section intro-section">
      <div class="container">
        <div class="intro-cards scroll-reveal">
          <div class="intro-card">
            <div class="intro-card-circle">
              <span>01</span>
            </div>
            <div class="intro-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 class="intro-card-title">智优康赛</h2>
            <p class="intro-card-desc">
              智优康赛（北京智优康赛科技有限公司）成立于2026年3月，由中国搜索营销开创者耐特康赛网络技术（北京）有限公司100%出资孵化，专注于GEO（Generative Engine Optimization，生成式引擎优化）赛道。
            </p>
          </div>

          <div class="intro-card">
            <div class="intro-card-circle">
              <span>02</span>
            </div>
            <div class="intro-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h2 class="intro-card-title">战略协同</h2>
            <p class="intro-card-desc">
              作为耐特康赛GEO业务的独立运营载体，于2026年同步完成千万级别外部融资，标志着资本市场对团队与业务的双重认可。两家公司协同发展：耐特康赛提供18年搜索技术沉淀与品牌背书，智优康赛承担GEO业务的全球化战略落地，共同服务企业客户在AI搜索时代的品牌增长需求。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 2: 发展历程 ========== -->
    <section class="section history-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="发展历程"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <!-- Winding Timeline -->
        <div ref="timelineRef" class="winding-timeline scroll-reveal">
          <!-- SVG Winding Curve (Desktop) -->
          <svg class="winding-svg winding-svg--desktop" viewBox="0 0 800 1800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="windGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4b33ff" />
                <stop offset="40%" stop-color="#8b5cf6" />
                <stop offset="70%" stop-color="#6b4fff" />
                <stop offset="100%" stop-color="#00d4ff" />
              </linearGradient>
            </defs>
            <!-- Base faint path -->
            <path
              class="winding-path-base"
              d="M 120,60 C 350,60 350,340 600,340 C 850,340 850,560 600,560 C 350,560 350,880 120,880 C -130,880 -130,1060 120,1060 C 370,1060 370,1300 600,1300 C 830,1300 830,1500 600,1500 C 370,1500 370,1700 120,1700"
            />
            <!-- Glow path (scroll-drawn) -->
            <path
              class="winding-path-glow"
              d="M 120,60 C 350,60 350,340 600,340 C 850,340 850,560 600,560 C 350,560 350,880 120,880 C -130,880 -130,1060 120,1060 C 370,1060 370,1300 600,1300 C 830,1300 830,1500 600,1500 C 370,1500 370,1700 120,1700"
            />
            <!-- Extra bright glow layer -->
            <path
              class="winding-path-extra"
              d="M 120,60 C 350,60 350,340 600,340 C 850,340 850,560 600,560 C 350,560 350,880 120,880 C -130,880 -130,1060 120,1060 C 370,1060 370,1300 600,1300 C 830,1300 830,1500 600,1500 C 370,1500 370,1700 120,1700"
            />
          </svg>

          <!-- SVG Winding Curve (Mobile) -->
          <svg class="winding-svg winding-svg--mobile" viewBox="0 0 100 1800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="windGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4b33ff" />
                <stop offset="40%" stop-color="#8b5cf6" />
                <stop offset="70%" stop-color="#6b4fff" />
                <stop offset="100%" stop-color="#00d4ff" />
              </linearGradient>
            </defs>
            <!-- Base faint path -->
            <path
              class="winding-path-base"
              d="M 50,60 C 82,130 18,200 50,200 C 82,350 18,500 50,500 C 82,650 18,800 50,800 C 82,950 18,1100 50,1100 C 82,1250 18,1400 50,1400 C 82,1550 18,1720 50,1750"
            />
            <!-- Glow path (scroll-drawn) -->
            <path
              class="winding-path-glow winding-path--mobile"
              d="M 50,60 C 82,130 18,200 50,200 C 82,350 18,500 50,500 C 82,650 18,800 50,800 C 82,950 18,1100 50,1100 C 82,1250 18,1400 50,1400 C 82,1550 18,1720 50,1750"
            />
            <!-- Extra bright glow layer -->
            <path
              class="winding-path-extra winding-path--mobile"
              d="M 50,60 C 82,130 18,200 50,200 C 82,350 18,500 50,500 C 82,650 18,800 50,800 C 82,950 18,1100 50,1100 C 82,1250 18,1400 50,1400 C 82,1550 18,1720 50,1750"
            />
          </svg>

          <!-- Timeline Nodes -->
          <div
            v-for="(item, index) in reversedHistoryData"
            :key="item.year"
            :class="['winding-node', `winding-node--${index + 1}`, { 'is-visible': visibleNodes[index] }]"
            :data-index="index"
          >
            <div class="winding-node-dot">
              <span class="winding-node-year">{{ item.year }}</span>
              <div class="winding-node-ring"></div>
            </div>
            <div class="winding-node-content">
              <span class="winding-node-cat">{{ item.category }}</span>
              <h3 class="winding-node-title">{{ item.title }}</h3>
              <p class="winding-node-desc">{{ item.desc }}</p>
              <div class="winding-node-events">
                <div
                  v-for="(event, idx) in item.events"
                  :key="idx"
                  class="winding-event-item"
                >
                  <span class="winding-event-dot"></span>
                  <span class="winding-event-text">{{ event }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: 行业资质背书 ========== -->
    <section class="section credentials-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="行业资质背书"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="专业认证 · 权威合作 · 持续深耕"
            :delay="30"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.3"
          />
        </div>

        <div class="credentials-grid scroll-reveal">
          <div
            v-for="(item, index) in credentials"
            :key="index"
            class="credential-card"
          >
            <div class="credential-img-wrap">
              <img :src="item.image" :alt="item.text" loading="lazy" />
            </div>
            <p class="credential-label">{{ item.text }}</p>
          </div>
        </div>

        <div class="partner-badges scroll-reveal">
          <div class="partner-badge">
            <div class="partner-badge-img">
              <img src="/images/credentials/semrush-partner.png" alt="SEMrush中国唯一代理商" loading="lazy" />
            </div>
            <div class="partner-badge-info">
              <h3>SEMrush 中国唯一代理商</h3>
              <p>官方授权，专业认证</p>
            </div>
          </div>
          <div class="partner-badge">
            <div class="partner-badge-img">
              <img src="/images/credentials/google-partner.png" alt="Google双重合作伙伴" loading="lazy" />
            </div>
            <div class="partner-badge-info">
              <h3>Google 双重合作伙伴</h3>
              <p>深度合作，官方认可</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 4: 团队展示 ========== -->
    <section class="section team-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="核心团队"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="18年搜索经验，穿越周期"
            :delay="30"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.3"
          />
        </div>

        <div class="team-grid scroll-reveal">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="flip-card"
            :class="{ flipped: flippedIndex === index }"
            @click="flippedIndex = flippedIndex === index ? -1 : index"
          >
            <div class="flip-card-inner">
              <!-- Front -->
              <div class="flip-card-front">
                <div class="flip-card-photo">
                  <img :src="member.photo" :alt="member.name" loading="lazy" />
                </div>
                <div class="flip-card-info">
                  <h3 class="flip-card-name">{{ member.name }}</h3>
                  <p class="flip-card-role">{{ member.role }}</p>
                  <span class="flip-card-hint">点击查看介绍</span>
                </div>
              </div>
              <!-- Back -->
              <div class="flip-card-back">
                <div class="flip-card-back-header">
                  <h3 class="flip-card-name">{{ member.name }}</h3>
                  <p class="flip-card-role">{{ member.role }}</p>
                </div>
                <div class="flip-card-bio">
                  <p v-for="(para, pIdx) in member.bio" :key="pIdx">{{ para }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="team-highlights scroll-reveal">
          <div class="highlight-item">
            <span class="highlight-number">18</span>
            <span class="highlight-label">年搜索营销经验</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">3</span>
            <span class="highlight-label">项核心发明专利</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">20+</span>
            <span class="highlight-label">年海外专家团队</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">AIIA</span>
            <span class="highlight-label">首批GEO专项企业</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 5: 合作流程 ========== -->
    <section class="section cooperation-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="合作流程"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="cooperation-flow scroll-reveal">
          <!-- Wave SVG -->
          <svg class="cooperation-wave" viewBox="0 0 1400 200" preserveAspectRatio="none">
            <path
              d="M 0,140 Q 100,20 200,60 Q 300,180 400,140 Q 500,20 600,60 Q 700,180 800,140 Q 900,20 1000,60 Q 1100,180 1200,140 Q 1300,20 1400,60"
              fill="none"
              stroke="rgba(75, 51, 255, 0.35)"
              stroke-width="2"
              stroke-dasharray="6,6"
            />
          </svg>

          <!-- Nodes -->
          <div class="cooperation-nodes">
            <div
              v-for="(step, index) in cooperationSteps"
              :key="index"
              :class="['cooperation-node', `cooperation-node--${step.position}`]"
            >
              <div class="cooperation-icon">
                <!-- check -->
                <svg v-if="step.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12l2.5 2.5L16 9"/>
                </svg>
                <!-- chat -->
                <svg v-else-if="step.icon === 'chat'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <!-- target -->
                <svg v-else-if="step.icon === 'target'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                <!-- contract -->
                <svg v-else-if="step.icon === 'contract'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <path d="M9 13h6"/>
                  <path d="M9 17h3"/>
                  <circle cx="17" cy="17" r="2.5"/>
                </svg>
                <!-- execute -->
                <svg v-else-if="step.icon === 'execute'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <!-- chart -->
                <svg v-else-if="step.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2"/>
                  <path d="M18 20V10"/>
                  <path d="M12 20V4"/>
                  <path d="M6 20v-6"/>
                </svg>
                <!-- summary -->
                <svg v-else-if="step.icon === 'summary'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <path d="M9 14l2 2 4-4"/>
                </svg>
                <!-- plan -->
                <svg v-else-if="step.icon === 'plan'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="8" y1="13" x2="16" y2="13"/>
                  <line x1="8" y1="17" x2="13" y2="17"/>
                </svg>
              </div>
              <span class="cooperation-label">{{ step.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 6: 全球布局 ========== -->
    <section class="section global-section">
      <!-- Particles Background -->
      <Particles
        class="global-particles"
        :particleCount="300"
        :particleSpread="10"
        :speed="0.15"
        :particleColors="['#4b33ff', '#6b4fff', '#8b5cf6', '#a78bfa', '#4c75ff', '#00d4ff']"
        :alphaParticles="true"
        :particleBaseSize="80"
        :sizeRandomness="1.2"
        :cameraDistance="20"
        :disableRotation="false"
        :moveParticlesOnHover="true"
        :particleHoverFactor="0.8"
      />

      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="全球布局"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="profound-globe scroll-reveal">
          <!-- Rotating Earth Sphere -->
          <div class="globe-body">
            <div class="globe-texture"></div>
          </div>

          <!-- Cities around the globe -->
          <div class="globe-cities">
            <div
              v-for="city in globalCities"
              :key="city.name"
              class="globe-city"
              :class="{ 'globe-city--hq': city.isHQ }"
              :style="{ left: city.x + '%', top: city.y + '%' }"
            >
              <span class="city-name">
                {{ city.name }}
                <span v-if="city.isHQ" class="city-hq-badge">HQ</span>
              </span>
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

// ========== Scroll Reveal Animation ==========
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// ========== PAGE HERO ==========
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

.page-hero-rings {
  position: absolute;
  inset: 0;
  z-index: 0;
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

// ========== SECTIONS COMMON ==========
.section {
  padding: $space-24 0;

  @media (max-width: 768px) {
    padding: $space-16 0;
  }
}

.section-header {
  text-align: center;
  margin-bottom: $space-16;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;

  @media (max-width: 768px) {
    margin-bottom: $space-10;
  }
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em !important;
}

.section-subtitle {
  font-size: $text-lg !important;
  color: $text-secondary !important;
  max-width: 600px !important;
  line-height: 1.6 !important;
}

// ========== SECTION 1: INTRO (Uiverse Cards) ==========
.intro-section {
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

.intro-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-10;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.intro-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(75, 51, 255, 0.12);
  border-radius: 18px;
  padding: 40px 36px 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(75, 51, 255, 0.28);
    transform: translateY(-4px);
    box-shadow:
      0 16px 48px rgba(75, 51, 255, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 32px 24px 28px;
    gap: 14px;
  }
}

// Purple circle with number (top-right)
.intro-card-circle {
  position: absolute;
  top: -12px;
  right: -16px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4b33ff, #6b4fff);
  opacity: 0.85;
  transition: opacity 0.4s ease;

  span {
    position: absolute;
    bottom: 22px;
    left: 28px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
  }

  .intro-card:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 72px;
    height: 72px;
    top: -10px;
    right: -10px;

    span {
      bottom: 16px;
      left: 20px;
      font-size: 1.2rem;
    }
  }
}

.intro-card-icon {
  width: 48px;
  height: 48px;
  color: #a49aff;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
}

.intro-card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: $text-primary;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
}

.intro-card-desc {
  font-size: 0.9rem;
  color: $text-secondary;
  line-height: 1.75;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.7;
  }
}

// ========== SECTION 2: HISTORY ==========
.history-section {
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

// ========== Winding Timeline ==========
.winding-timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 768px) {
    margin-left: -16px; // offset container padding
    padding-left: 64px;
    padding-right: 16px;
  }
}

.winding-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: visible;
  pointer-events: none;
}

.winding-svg--desktop {
  @media (max-width: 768px) {
    display: none;
  }
}

.winding-svg--mobile {
  display: none;
  width: 75px;
  left: 0;

  @media (max-width: 768px) {
    display: block;
  }
}

.winding-path-base {
  fill: none;
  stroke: rgba(75, 51, 255, 0.08);
  stroke-width: 3;
  stroke-linecap: round;
}

.winding-path-glow {
  fill: none;
  stroke: url(#windGrad);
  stroke-width: 3;
  stroke-linecap: round;
  filter: drop-shadow(0 0 6px rgba(75, 51, 255, 0.5)) drop-shadow(0 0 12px rgba(75, 51, 255, 0.25));

  &.winding-path--mobile {
    stroke: url(#windGradMobile);
    filter: drop-shadow(0 0 4px rgba(75, 51, 255, 0.5)) drop-shadow(0 0 8px rgba(75, 51, 255, 0.25));
  }
}

.winding-path-extra {
  fill: none;
  stroke: url(#windGrad);
  stroke-width: 6;
  stroke-linecap: round;
  opacity: 0.15;
  filter: blur(4px);

  &.winding-path--mobile {
    stroke: url(#windGradMobile);
  }
}

// Timeline Nodes - alternating left/right
.winding-node {
  position: relative;
  display: flex;
  gap: 32px;
  padding: 48px 0;
  opacity: 0.2;
  transition: opacity 0.8s ease;
  z-index: 1;

  &.is-visible {
    opacity: 1;
  }

  // Alternating left/right layout
  &:nth-child(odd) {
    flex-direction: row;
    padding-left: 4%;

    .winding-node-content {
      align-items: flex-start;
      text-align: left;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    padding-right: 4%;

    .winding-node-content {
      align-items: flex-end;
      text-align: right;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    gap: 16px;

    .winding-node-content {
      align-items: flex-start !important;
      text-align: left !important;
    }
  }
}

// Node dot (year circle)
.winding-node-dot {
  position: relative;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.15), rgba(0, 212, 255, 0.08));
  border: 2px solid rgba(75, 51, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s ease;

  .winding-node.is-visible & {
    background: linear-gradient(135deg, #4b33ff, #6b4fff);
    border-color: rgba(139, 92, 246, 0.8);
    box-shadow:
      0 0 24px rgba(75, 51, 255, 0.6),
      0 0 48px rgba(75, 51, 255, 0.3),
      0 0 72px rgba(75, 51, 255, 0.12),
      inset 0 0 14px rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    position: absolute;
    left: -45px;
    top: 0;

    .winding-node.is-visible & {
      box-shadow:
        0 0 16px rgba(75, 51, 255, 0.6),
        0 0 32px rgba(75, 51, 255, 0.3);
    }
  }
}

.winding-node-year {
  font-size: 15px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.02em;
  transition: color 0.6s ease;

  .winding-node.is-visible & {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

.winding-node-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  opacity: 0;
  transition: opacity 0.5s ease;

  .winding-node.is-visible & {
    opacity: 1;
    border-color: rgba(75, 51, 255, 0.35);
    animation: wind-ring-pulse 2.5s ease-in-out infinite;
  }
}

@keyframes wind-ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 0; }
}

// Node content
.winding-node-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 340px;
  transform: translateY(12px);
  opacity: 0;
  transition: all 0.7s ease 0.15s;

  .winding-node.is-visible & {
    transform: translateY(0);
    opacity: 1;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    transform: translateX(-8px);

    .winding-node.is-visible & {
      transform: translateX(0);
    }
  }
}

.winding-node-cat {
  font-size: 11px;
  font-weight: 600;
  color: $accent-purple;
  padding: 2px 10px;
  background: rgba(75, 51, 255, 0.1);
  border: 1px solid rgba(75, 51, 255, 0.2);
  border-radius: 100px;
  letter-spacing: 0.08em;
  display: inline-block;
  width: fit-content;

  @media (max-width: 768px) {
    font-size: 10px;
  }
}

.winding-node-title {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 700;
  color: $text-primary;
  line-height: 1.3;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
}

.winding-node-desc {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.65;

  @media (max-width: 768px) {
    font-size: 12.5px;
    line-height: 1.55;
  }
}

.winding-node-events {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.winding-event-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.winding-event-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: $accent-purple;
  flex-shrink: 0;
  margin-top: 7px;
  box-shadow: 0 0 6px rgba(75, 51, 255, 0.4);

  @media (max-width: 768px) {
    margin-top: 6px;
  }
}

.winding-event-text {
  font-size: 12.5px;
  color: $text-tertiary;
  line-height: 1.55;

  @media (max-width: 768px) {
    font-size: 11.5px;
    line-height: 1.45;
  }
}

// Mobile vertical timeline line
@media (max-width: 768px) {
  .winding-timeline {
    &::before {
      content: '';
      position: absolute;
      left: 24px;
      top: 40px;
      bottom: 40px;
      width: 2px;
      background: linear-gradient(180deg,
        transparent 0%,
        rgba(75, 51, 255, 0.25) 5%,
        rgba(75, 51, 255, 0.25) 95%,
        transparent 100%
      );
      z-index: 0;
    }
  }
}

// ========== SECTION 3: CREDENTIALS ==========
.credentials-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/section-bg-new.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.12;
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

.credentials-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

.credential-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: cert-float 4s ease-in-out infinite;

  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.6s; }
  &:nth-child(4) { animation-delay: 0.9s; }
  &:nth-child(5) { animation-delay: 1.2s; }
  &:nth-child(6) { animation-delay: 1.5s; }
  &:nth-child(7) { animation-delay: 1.8s; }
  &:nth-child(8) { animation-delay: 2.1s; }
  &:nth-child(9) { animation-delay: 2.4s; }
  &:nth-child(10) { animation-delay: 2.7s; }
  &:nth-child(11) { animation-delay: 3.0s; }
  &:nth-child(12) { animation-delay: 3.3s; }
  &:nth-child(13) { animation-delay: 0.15s; }
  &:nth-child(14) { animation-delay: 0.45s; }
  &:nth-child(15) { animation-delay: 0.75s; }
  &:nth-child(16) { animation-delay: 1.05s; }
  &:nth-child(17) { animation-delay: 1.35s; }
  &:nth-child(18) { animation-delay: 1.65s; }

  &:hover {
    .credential-img-wrap img {
      transform: scale(1.04);
      filter: brightness(1.08);
    }
  }
}

@keyframes cert-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.credential-img-wrap {
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 8px;
    transition: transform 0.4s ease, filter 0.4s ease;
  }
}

.credential-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.partner-badges {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-8;
  max-width: 900px;
  margin: $space-16 auto 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
    margin-top: $space-10;
  }
}

.partner-badge {
  display: flex;
  align-items: center;
  gap: $space-6;
  padding: $space-6;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(75, 51, 255, 0.1);
  border-radius: $radius-lg;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(75, 51, 255, 0.04);
    border-color: rgba(75, 51, 255, 0.25);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(75, 51, 255, 0.08);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: $space-4;
  }
}

.partner-badge-img {
  flex-shrink: 0;
  width: 160px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: $radius-md;
  overflow: hidden;
  padding: $space-2;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
}

.partner-badge-info {
  display: flex;
  flex-direction: column;
  gap: $space-1;

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
    line-height: 1.3;
  }

  p {
    font-size: $text-sm;
    color: $text-tertiary;
    margin: 0;
    line-height: 1.5;
  }
}

// ========== SECTION 4: TEAM ==========
.team-section {
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-8;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: $space-6;
  }

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-6;
  }
}

// ========== Flip Card ==========
.flip-card {
  perspective: 1000px;
  cursor: pointer;
  height: 460px;

  @media (max-width: 640px) {
    height: 400px;
    width: 100%;
    max-width: 360px;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 20px;
  overflow: hidden;
  transition: opacity 0.35s ease;
}

.flip-card.flipped .flip-card-front {
  opacity: 0;
  pointer-events: none;
}

.flip-card:not(.flipped) .flip-card-back {
  opacity: 0;
  pointer-events: none;
}

.flip-card-front {
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(75, 51, 255, 0.08) 0%,
    rgba(3, 4, 10, 0.6) 100%
  );
  border: 1px solid rgba(75, 51, 255, 0.15);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(75, 51, 255, 0.35);
  }
}

.flip-card-photo {
  flex: 1;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    filter: brightness(0.95) contrast(1.02);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    .flip-card:hover & {
      transform: scale(1.04);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 55%;
    background: linear-gradient(to top, rgba(3, 4, 10, 0.95) 0%, transparent 100%);
    pointer-events: none;
  }
}

.flip-card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 20px 20px;
  z-index: 2;
}

.flip-card-name {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.flip-card-role {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 5px 0 0;
  font-weight: 500;
  line-height: 1.4;
}

.flip-card-hint {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.68rem;
  color: rgba(75, 51, 255, 0.85);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.3s ease;

  .flip-card:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    opacity: 0.7;
    transform: translateY(0);
  }
}

.flip-card-back {
  transform: rotateY(180deg);
  background: linear-gradient(
    145deg,
    rgba(75, 51, 255, 0.1) 0%,
    rgba(3, 4, 10, 0.98) 50%,
    rgba(0, 212, 255, 0.05) 100%
  );
  border: 1px solid rgba(75, 51, 255, 0.2);
  display: flex;
  flex-direction: column;
  padding: 28px 24px;

  @media (max-width: 640px) {
    padding: 22px 18px;
  }
}

.flip-card-back-header {
  flex-shrink: 0;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(75, 51, 255, 0.15);

  .flip-card-name {
    background-image: linear-gradient(to bottom, #fff, #8b7cff);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }

  .flip-card-role {
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4px;
  }
}

.flip-card-bio {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  p {
    font-size: 0.82rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(75, 51, 255, 0.3);
    border-radius: 3px;
  }
}

.team-highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-6;
  max-width: 1100px;
  margin: $space-16 auto 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: $space-4;
    margin-top: $space-10;
  }
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  padding: $space-6;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: $border-medium;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: $space-4;
  }
}

.highlight-number {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #4b33ff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.highlight-label {
  font-size: $text-sm;
  color: $text-secondary;
  line-height: 1.4;
}

// ========== SECTION 5: COOPERATION FLOW ==========
.cooperation-section {
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

.cooperation-flow {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
}

.cooperation-wave {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 200px;
  z-index: 0;
  overflow: visible;

  path {
    vector-effect: non-scaling-stroke;
  }
}

.cooperation-nodes {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 280px;
  padding: 0 8px;
}

.cooperation-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  flex: 1;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);

    .cooperation-icon {
      border-color: rgba(75, 51, 255, 0.6);
      box-shadow:
        0 0 24px rgba(75, 51, 255, 0.35),
        0 0 48px rgba(75, 51, 255, 0.15),
        inset 0 0 12px rgba(255, 255, 255, 0.08);
    }
  }

  &--up {
    margin-bottom: 100px;
  }

  &--down {
    margin-top: 100px;
  }
}

.cooperation-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.18), rgba(0, 212, 255, 0.08));
  border: 2px solid rgba(75, 51, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 16px rgba(75, 51, 255, 0.15),
    inset 0 0 8px rgba(255, 255, 255, 0.04);
  transition: all 0.4s ease;
  flex-shrink: 0;

  svg {
    width: 26px;
    height: 26px;
    color: #a49aff;
    flex-shrink: 0;
  }
}

.cooperation-label {
  font-size: 13px;
  color: $text-primary;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
  max-width: 110px;
  opacity: 0.9;
}

// Tablet
@media (max-width: 1024px) {
  .cooperation-flow {
    padding: 30px 0;
  }

  .cooperation-nodes {
    min-height: 240px;
  }

  .cooperation-node {
    &--up {
      margin-bottom: 70px;
    }

    &--down {
      margin-top: 70px;
    }
  }

  .cooperation-icon {
    width: 52px;
    height: 52px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  .cooperation-label {
    font-size: 11.5px;
    max-width: 90px;
  }
}

// Mobile
@media (max-width: 768px) {
  .cooperation-flow {
    padding: 20px 0;
  }

  .cooperation-wave {
    display: none;
  }

  .cooperation-nodes {
    flex-direction: column;
    gap: 0;
    min-height: auto;
    padding: 0;
    align-items: flex-start;
    max-width: 400px;
    margin: 0 auto;
  }

  .cooperation-node {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 14px 0;
    position: relative;

    &--up,
    &--down {
      margin: 0;
    }

    // Vertical connecting line
    &::before {
      content: '';
      position: absolute;
      left: 29px;
      top: 74px;
      bottom: -14px;
      width: 2px;
      background: linear-gradient(180deg, rgba(75, 51, 255, 0.35), rgba(0, 212, 255, 0.1));
      z-index: 0;
    }

    &:last-child::before {
      display: none;
    }
  }

  .cooperation-icon {
    width: 48px;
    height: 48px;
    z-index: 1;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .cooperation-label {
    text-align: left;
    font-size: 14px;
    max-width: none;
    white-space: pre-line;
  }
}

// ========== SECTION TRANSITIONS: Smooth color blending ==========
.intro-section,
.history-section,
.credentials-section,
.team-section,
.cooperation-section {
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      $bg-primary 0%,
      transparent 80px,
      transparent calc(100% - 80px),
      $bg-primary 100%
    );
  }

  > .container {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    &::after {
      background: linear-gradient(
        to bottom,
        $bg-primary 0%,
        transparent 40px,
        transparent calc(100% - 40px),
        $bg-primary 100%
      );
    }
  }
}

// ========== SECTION 6: GLOBAL LAYOUT (PROFOUND STYLE) ==========
.global-section {
  position: relative;
  overflow: hidden;

  .global-particles {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}

.profound-globe {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  @media (max-width: 768px) {
    height: 420px;
  }
}

// ========== Rotating Earth Sphere ==========
.globe-body {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  position: relative;
  background:
    radial-gradient(circle at 35% 35%, rgba(75, 51, 255, 0.18), transparent 50%),
    radial-gradient(circle at center, #0d0d1a 0%, #050508 100%);
  box-shadow:
    inset -50px -25px 70px rgba(0, 0, 0, 0.85),
    inset 25px 12px 50px rgba(75, 51, 255, 0.1),
    0 0 80px rgba(75, 51, 255, 0.12),
    0 0 160px rgba(75, 51, 255, 0.05);
  z-index: 2;
  overflow: hidden;

  // Surface shine
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse 45% 45% at 30% 22%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 55%
    );
    z-index: 3;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }
}

// Rotating lat/long texture
.globe-texture {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 38px,
      rgba(75, 51, 255, 0.06) 39px,
      rgba(75, 51, 255, 0.06) 40px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 38px,
      rgba(75, 51, 255, 0.06) 39px,
      rgba(75, 51, 255, 0.06) 40px
    );
  border-radius: 50%;
  animation: globeRotate 25s linear infinite;
  transform: rotateX(70deg) rotateY(0deg);

  @media (max-width: 768px) {
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 26px,
        rgba(75, 51, 255, 0.06) 27px,
        rgba(75, 51, 255, 0.06) 28px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 26px,
        rgba(75, 51, 255, 0.06) 27px,
        rgba(75, 51, 255, 0.06) 28px
      );
  }
}

@keyframes globeRotate {
  0% { transform: rotateX(70deg) rotateY(0deg); }
  100% { transform: rotateX(70deg) rotateY(360deg); }
}

// ========== Cities ==========
.globe-cities {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.globe-city {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.city-name {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
  white-space: nowrap;
  text-shadow: 0 0 16px rgba(75, 51, 255, 0.4), 0 0 32px rgba(75, 51, 255, 0.15);

  .globe-city--hq & {
    background: linear-gradient(135deg, #c4b5fd 0%, #fff 40%, #fff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.city-hq-badge {
  font-size: 11px;
  font-weight: 700;
  color: rgba(196, 181, 253, 0.95);
  background: rgba(107, 79, 255, 0.2);
  border: 1px solid rgba(196, 181, 253, 0.4);
  border-radius: 4px;
  padding: 1px 6px;
  line-height: 16px;
  letter-spacing: 0.05em;
  -webkit-text-fill-color: rgba(196, 181, 253, 0.95);
  margin-left: 6px;
}

// Tablet
@media (max-width: 1024px) {
  .profound-globe {
    height: 480px;
  }

  .globe-body {
    width: 340px;
    height: 340px;
  }

  .city-name {
    font-size: 15px;
  }

  .city-hq-badge {
    font-size: 10px;
    padding: 1px 5px;
  }
}

// Mobile
@media (max-width: 768px) {
  .profound-globe {
    height: 400px;
  }

  .globe-body {
    width: 240px;
    height: 240px;
  }

  .city-name {
    font-size: 13px;
  }

  .city-hq-badge {
    font-size: 9px;
    padding: 0 4px;
  }
}

</style>