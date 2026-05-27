<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MagicRings from '../components/MagicRings.vue'
import BlurText from '../components/BlurText.vue'
import GlassSurface from '../components/GlassSurface.vue'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== Development History Data ==========
const historyData = [
  {
    year: '2026',
    events: [
      '智优康赛（北京智优康赛科技有限公司）正式成立，专注GEO生成式引擎优化赛道',
      '完成千万级别外部融资，成为AIIA首批GEO专项企业',
      '发布智优GEO引擎与智优AI内容工厂两大核心产品',
      '与豆包、腾讯元宝、通义千问、文心一言、智谱清言、DeepSeek、Kimi等主流AI平台建立战略合作'
    ]
  },
  {
    year: '2025',
    events: [
      '耐特康赛荣获虎啸奖年度综合服务商',
      '金鼠标数字营销大赛AI创新应用类金奖',
      '渠成获评中国传播年度人物、年度CEO人物',
      '团队GEO技术预研完成，确定独立孵化战略'
    ]
  },
  {
    year: '2022',
    events: [
      '获评国家高新技术企业',
      '获评省级专精特新中小企业',
      '搜索引擎优化大数据管理方法获国家发明专利',
      '服务客户突破500家，覆盖消费品、科技、金融等多行业'
    ]
  },
  {
    year: '2017',
    events: [
      '上市公司拓尔思（300229.SZ）战略入股耐特康赛',
      '渠成获评亚太最具活力企业家',
      '受邀在哈佛大学发表主题演讲',
      '团队规模突破200人，设立海外分公司'
    ]
  },
  {
    year: '2008',
    events: [
      '耐特康赛网络技术（北京）有限公司正式成立',
      '渠成创办公司，开创中国搜索营销行业先河',
      '推出首批SEO技术服务，服务早期互联网品牌',
      '建立搜索引擎晴雨表技术体系'
    ]
  }
]

const activeYear = ref('2026')

const selectYear = (year: string) => {
  activeYear.value = year
}

const currentYearData = computed(() => {
  return historyData.find(item => item.year === activeYear.value) || historyData[0]
})

// Reverse history data for scroll stack (oldest first → scroll to newest)
const reversedHistoryData = computed(() => [...historyData].reverse())

// ========== Client Logos ==========
const clientLogos = [
  '4a79f6385c4eefecd653e9cd98c8eb7e.png',
  '图层 14.png',
  '图层 15.png',
  '图层 16.png',
  '图层 17.png',
  '图层 18.png',
  '图层 19.png',
  '图层 20.png',
  '图层 21.png',
  '图层 22.png',
  '图层 23.png',
  '图层 24.png',
  '图层 25.png',
  '图层 26.png',
  '图层 27.png',
  '图层 28.png',
  '图层 29.png',
  '图层 30.png',
  '图层 31.png',
  '图层 32.png',
  '图层 33.png',
  '图层 34.png',
  '图层 35.png',
  '图层 36.png',
  '图层 37.png',
  '图层 38.png',
  '图层 39.png',
  '图层 40.png',
  '图层 41.png',
  '图层 42.png',
  '图层 43.png',
  '图层 45.png',
  '图层 46.png',
  '图层 47.png',
  '图层 48.png'
]

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
        <div class="intro-grid scroll-reveal">
          <div class="intro-left">
            <BlurText
              text="智优康赛 × 耐特康赛"
              :delay="60"
              animateBy="words"
              direction="top"
              className="intro-title"
              :stepDuration="0.4"
            />
            <BlurText
              text="AI搜索时代的品牌全球化战略伙伴"
              :delay="30"
              animateBy="words"
              direction="top"
              className="intro-subtitle"
              :stepDuration="0.3"
            />
          </div>
          <div class="intro-right">
            <p class="intro-text">
              智优康赛（北京智优康赛科技有限公司）成立于2026年3月，由中国搜索营销开创者耐特康赛网络技术（北京）有限公司100%出资孵化，专注于GEO（Generative Engine Optimization，生成式引擎优化）赛道。
            </p>
            <p class="intro-text">
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

        <div class="history-scroll-stack scroll-reveal">
          <ScrollStack
            className="history-stack-scroller"
            :itemDistance="80"
            :itemScale="0.025"
            :itemStackDistance="25"
            stackPosition="18%"
            scaleEndPosition="8%"
            :baseScale="0.88"
            :rotationAmount="0"
            :blurAmount="2"
          >
            <ScrollStackItem
              v-for="item in reversedHistoryData"
              :key="item.year"
              itemClassName="history-stack-card"
            >
              <div class="history-card-year">{{ item.year }}</div>
              <div class="history-card-events">
                <div
                  v-for="(event, idx) in item.events"
                  :key="idx"
                  class="history-card-event"
                >
                  <span class="history-card-dot" />
                  <span class="history-card-text">{{ event }}</span>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: 权威背书 - 渠成 ========== -->
    <section class="section founder-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="权威背书"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="founder-card scroll-reveal">
          <div class="founder-photo-wrap">
            <img src="/images/team/qu-cheng.png" alt="渠成" class="founder-photo" />
            <div class="founder-photo-glow" />
          </div>
          <div class="founder-info">
            <h2 class="founder-name">渠成</h2>
            <p class="founder-role">创始人 / 董事长兼CEO</p>
            <div class="founder-divider" />
            <div class="founder-bio">
              <p>北航互联网营销与管理专业研究生特聘教授，中国商务广告协会常务理事，苏秦会副会长兼执行委员，新西兰政府特聘顾问，百度特聘专家及钻石讲师。</p>
              <p>拥有搜索引擎晴雨表、搜索引擎优化大数据管理方法等多项国家专利；被多家权威机构评选为中国传播年度人物、年度CEO人物、年度数字营销影响力人物、十大品牌专家，荣获虎啸年度人物大奖、十年杰出商业领袖奖、亚太最具活力企业家等称号。</p>
              <p>曾多次作为演讲嘉宾出席中国、美国、英国、德国、日本、澳大利亚、新西兰等地的互联网营销大会，并曾受邀在哈佛大学、世界商业领袖会议中发表主题演讲。</p>
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
          <div class="profile-card">
            <button class="profile-mail-btn" @click="$router.push('/contact')" aria-label="联系我们">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </button>
            <div class="profile-avatar">
              <img src="/images/team/qu-cheng.png" alt="渠成" />
            </div>
            <div class="profile-info">
              <div class="profile-user">
                <div class="profile-mini-avatar">
                  <img src="/images/team/qu-cheng.png" alt="渠成" />
                </div>
                <div class="profile-user-text">
                  <span class="profile-handle">@qucheng</span>
                  <span class="profile-status">GEO先行者</span>
                </div>
              </div>
              <button class="profile-contact-btn" @click="emit('openForm')">了解更多</button>
            </div>
            <div class="profile-details">
              <h3>渠成</h3>
              <p>创始人 / 董事长兼CEO</p>
            </div>
          </div>

          <div class="team-highlights">
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
      </div>
    </section>

    <!-- ========== SECTION 5: 客户案例 ========== -->
    <section class="section clients-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="他们已经选择了我们"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="服务覆盖消费电子、时尚服饰、白酒、乳业、茶叶等多个行业头部品牌"
            :delay="30"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.3"
          />
        </div>

        <div class="clients-grid scroll-reveal">
          <div
            v-for="(logo, index) in clientLogos"
            :key="index"
            class="client-logo-item"
          >
            <img
              :src="`/images/clients/${logo}`"
              :alt="`客户品牌 ${index + 1}`"
              class="client-logo-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 6: CTA ========== -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content scroll-reveal">
          <BlurText
            text="开启您的GEO之旅"
            :delay="60"
            animateBy="words"
            direction="top"
            className="cta-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="与智优康赛一起，在AI搜索时代占据品牌黄金位置"
            :delay="30"
            animateBy="words"
            direction="top"
            className="cta-subtitle"
            :stepDuration="0.3"
          />
          <div class="cta-buttons">
            <button class="cta-btn cta-btn--primary" @click="emit('openForm')">
              联系我们
            </button>
            <router-link to="/solutions" class="cta-btn cta-btn--secondary">
              了解解决方案
            </router-link>
          </div>
        </div>
      </div>
    </section>
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

// ========== SECTION 1: INTRO ==========
.intro-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/3a4e44575b374bdd116393335e4fbdfd.png') no-repeat center center;
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

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-16;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

.intro-left {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  position: sticky;
  top: 120px;

  @media (max-width: 768px) {
    position: static;
  }
}

.intro-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em !important;
}

.intro-subtitle {
  font-size: $text-lg !important;
  color: $accent-cyan !important;
  font-weight: 500 !important;
  line-height: 1.5 !important;
}

.intro-right {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.intro-text {
  font-size: $text-base;
  color: $text-secondary;
  line-height: 1.8;
  letter-spacing: 0.01em;
}

// ========== SECTION 2: HISTORY ==========
.history-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/3a4e44575b374bdd116393335e4fbdfd.png') no-repeat center center;
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

// ========== ScrollStack History ==========
.history-scroll-stack {
  max-width: 800px;
  margin: 0 auto;
  height: 70vh;
  border-radius: $radius-xl;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid $border-subtle;

  @media (max-width: 768px) {
    height: 60vh;
    border-radius: $radius-lg;
  }
}

.history-stack-scroller {
  height: 100%;
}

.history-stack-card {
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.08) 0%, rgba(10, 11, 20, 0.9) 100%);
  border: 1px solid rgba(75, 51, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: $space-6 !important;
  }
}

.history-card-year {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: $text-primary;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: $space-6;
  background: linear-gradient(135deg, #fff 0%, #8b7cff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    margin-bottom: $space-4;
  }
}

.history-card-events {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.history-card-event {
  display: flex;
  align-items: flex-start;
  gap: $space-4;
  padding: $space-3 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    gap: $space-3;
    padding: $space-2 0;
  }
}

.history-card-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $accent-purple;
  flex-shrink: 0;
  margin-top: 8px;
  box-shadow: 0 0 8px rgba(75, 51, 255, 0.5);

  @media (max-width: 768px) {
    margin-top: 6px;
  }
}

.history-card-text {
  font-size: $text-base;
  color: $text-secondary;
  line-height: 1.7;
  letter-spacing: 0.01em;

  @media (max-width: 768px) {
    font-size: $text-sm;
    line-height: 1.6;
  }
}

// ========== SECTION 3: FOUNDER ==========
.founder-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/3a4e44575b374bdd116393335e4fbdfd.png') no-repeat center center;
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

.founder-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: $space-12;
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-8;
    text-align: center;
  }
}

.founder-photo-wrap {
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    max-width: 240px;
    margin: 0 auto;
  }
}

.founder-photo {
  width: 100%;
  height: auto;
  border-radius: $radius-xl;
  display: block;
  position: relative;
  z-index: 2;
}

.founder-photo-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, rgba(75, 51, 255, 0.25) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  filter: blur(20px);
}

.founder-info {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.founder-name {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: $text-primary;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.founder-role {
  font-size: $text-lg;
  color: $accent-cyan;
  font-weight: 500;
}

.founder-divider {
  width: 60px;
  height: 2px;
  background: $gradient-hero;
  border-radius: 2px;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
}

.founder-bio {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  p {
    font-size: $text-base;
    color: $text-secondary;
    line-height: 1.8;
    letter-spacing: 0.01em;
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
    background: url('/images/3a4e44575b374bdd116393335e4fbdfd.png') no-repeat center center;
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
  grid-template-columns: auto 1fr;
  gap: $space-16;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-10;
    justify-items: center;
  }
}

// ========== Profile Card (Uiverse Style) ==========
.profile-card {
  width: 280px;
  aspect-ratio: 0.72;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    145deg,
    rgba(75, 51, 255, 0.15) 0%,
    rgba(10, 10, 26, 0.95) 40%,
    rgba(0, 212, 255, 0.08) 100%
  );
  border: 1px solid rgba(75, 51, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(75, 51, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  justify-self: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.5),
      0 0 80px rgba(75, 51, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    border-color: rgba(75, 51, 255, 0.35);
  }

  @media (max-width: 768px) {
    width: 240px;
  }

  @media (max-width: 480px) {
    width: 220px;
  }
}

.profile-mail-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: rgba(75, 51, 255, 0.2);
    border-color: rgba(75, 51, 255, 0.4);
    color: #fff;
    transform: scale(1.05);
  }
}

.profile-avatar {
  width: 100%;
  flex: 1;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(to top, rgba(10, 10, 26, 0.98) 0%, transparent 100%);
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    filter: brightness(0.9) contrast(1.05);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    .profile-card:hover & {
      transform: scale(1.03);
    }
  }
}

.profile-info {
  position: relative;
  z-index: 2;
  margin-top: -48px;
  padding: 0 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(10, 10, 26, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 14px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.profile-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-mini-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(75, 51, 255, 0.3);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}

.profile-user-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.profile-handle {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1;
}

.profile-status {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.5);
  }
}

.profile-contact-btn {
  border: 1px solid rgba(75, 51, 255, 0.3);
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);
  background: rgba(75, 51, 255, 0.1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background: rgba(75, 51, 255, 0.25);
    border-color: rgba(75, 51, 255, 0.5);
    transform: translateY(-1px);
    color: #fff;
  }
}

.profile-details {
  text-align: center;
  padding: 8px 16px 20px;
  position: relative;
  z-index: 1;

  h3 {
    font-weight: 700;
    margin: 0;
    font-size: 1.4rem;
    background-image: linear-gradient(to bottom, #fff, #8b7cff);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    line-height: 1.3;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    margin: 4px 0 0;
    white-space: nowrap;
  }
}

.team-highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-6;

  @media (max-width: 768px) {
    gap: $space-4;
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
  color: $accent-purple;
  line-height: 1;
}

.highlight-label {
  font-size: $text-sm;
  color: $text-secondary;
  line-height: 1.4;
}

// ========== SECTION 5: CLIENTS ==========
.clients-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/3a4e44575b374bdd116393335e4fbdfd.png') no-repeat center center;
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

.clients-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: $space-6;
  align-items: center;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: $space-4;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.client-logo-item {
  width: 100%;
  aspect-ratio: 3/2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-4;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: $border-medium;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: $space-3;
  }
}

.client-logo-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.7;
  transition: opacity 0.3s ease;

  .client-logo-item:hover & {
    opacity: 1;
  }
}

// ========== SECTION 6: CTA ==========
.cta-section {
  background: $bg-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/3a4e44575b374bdd116393335e4fbdfd.png') no-repeat center center;
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

.cta-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-6;
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.2 !important;
}

.cta-subtitle {
  font-size: $text-lg !important;
  color: $text-secondary !important;
  max-width: 500px !important;
  line-height: 1.6 !important;
}

.cta-buttons {
  display: flex;
  gap: $space-4;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: $space-4;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $space-3 $space-8;
  font-size: $text-base;
  font-weight: 600;
  border-radius: $radius-md;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;

  @media (max-width: 768px) {
    padding: $space-3 $space-6;
    width: 100%;
    max-width: 280px;
  }
}

.cta-btn--primary {
  background: $gradient-hero;
  color: $text-primary;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    box-shadow: 0 4px 20px rgba(75, 51, 255, 0.4);
    transform: translateY(-1px);
  }
}

.cta-btn--secondary {
  background: transparent;
  color: $text-primary;
  border: 1px solid $border-medium;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: $border-strong;
    transform: translateY(-1px);
  }
}
</style>