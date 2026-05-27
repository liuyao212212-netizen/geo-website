<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MagicRings from '../components/MagicRings.vue'
import BlurText from '../components/BlurText.vue'
import GlassSurface from '../components/GlassSurface.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== Case Stats Data ==========
const caseStats = [
  { value: '82%', label: '品牌提及率', desc: '栖息地从0%提升至82%' },
  { value: '73%', label: '核心词首推率', desc: '超目标13%' },
  { value: '300%', label: '曝光量提升', desc: '得实打印机DeepSeek平台' },
  { value: '1:8.5', label: '项目ROI', desc: '栖息地项目商业回报比' },
  { value: '67%', label: '咨询量增长', desc: '栖息地品牌主动搜索量' },
  { value: '24h', label: '极速优化', desc: '得实关键词露出优化速度' }
]

// ========== Client Testimonials ==========
const testimonials = [
  {
    quote: '从"AI搜索隐形"到"AI主动首推"，耐特康赛的GEO策略让栖息地在AI平台上的品牌可见性实现了质的飞跃。核心场景首推率达到78%-85%，官网咨询量增长67%，这是我们在传统搜索时代难以想象的。',
    client: '栖息地智能新住宅',
    role: '品牌方',
    tag: '智能家居'
  },
  {
    quote: '24小时内完成关键词露出优化，连续30天稳定实现多品类打印机AI推荐位占领。在DeepSeek和豆包平台，得实品牌首推率超过80%，直接带动官网流量增长45%。',
    client: '得实集团（DASCOM）',
    role: '品牌方',
    tag: '打印设备'
  }
]

// ========== Client Logos ==========
const clientLogos = [
  '图层 14.png', '图层 15.png', '图层 16.png', '图层 17.png', '图层 18.png',
  '图层 19.png', '图层 20.png', '图层 21.png', '图层 22.png', '图层 23.png',
  '图层 24.png', '图层 25.png', '图层 26.png', '图层 27.png', '图层 28.png',
  '图层 29.png', '图层 30.png', '图层 31.png', '图层 32.png', '图层 33.png',
  '图层 34.png', '图层 35.png', '图层 36.png', '图层 37.png', '图层 38.png',
  '图层 39.png', '图层 40.png', '图层 41.png', '图层 42.png', '图层 43.png',
  '图层 45.png', '图层 46.png', '图层 47.png', '图层 48.png'
]

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
})

onUnmounted(() => {
  observerRef.value?.disconnect()
})
</script>

<template>
  <div class="cases-view">
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
            text="客户案例"
            :delay="100"
            animateBy="words"
            direction="top"
            className="page-hero-title"
            :stepDuration="0.5"
          />
        </div>
      </div>
    </section>

    <!-- ========== SECTION 1: 成效数据 ========== -->
    <section class="section stats-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="真实数据，验证GEO成效"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <p class="section-desc scroll-reveal">
            每一个数字背后，都是品牌在AI搜索时代的增长突破
          </p>
        </div>

        <div class="stats-grid scroll-reveal">
          <GlassSurface
            v-for="(stat, index) in caseStats"
            :key="index"
            class="stat-card"
          >
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-desc">{{ stat.desc }}</div>
          </GlassSurface>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 2: 客户评价 ========== -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="客户评价"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <p class="section-desc scroll-reveal">
            听听合作伙伴怎么说
          </p>
        </div>

        <div class="testimonials-grid scroll-reveal">
          <GlassSurface
            v-for="(item, index) in testimonials"
            :key="index"
            class="testimonial-card"
          >
            <div class="testimonial-quote">
              <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.633-2.917-1.179zM15.583 17.321C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C20.591 11.69 22 13.166 22 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.633-2.917-1.179z"/>
              </svg>
              <p>{{ item.quote }}</p>
            </div>
            <div class="testimonial-footer">
              <div class="testimonial-info">
                <div class="testimonial-name">{{ item.client }}</div>
                <div class="testimonial-role">{{ item.role }}</div>
              </div>
              <span class="testimonial-tag">{{ item.tag }}</span>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: 合作伙伴 ========== -->
    <section class="section partners-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="信赖我们的品牌"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <p class="section-desc scroll-reveal">
            服务覆盖消费电子、时尚服饰、白酒、乳业等多个行业头部品牌
          </p>
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

    <!-- ========== SECTION 4: CTA ========== -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content scroll-reveal">
          <BlurText
            text="让品牌在AI搜索中被看见"
            :delay="60"
            animateBy="words"
            direction="top"
            className="cta-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="与智优康赛一起，开启品牌AI搜索增长之旅"
            :delay="30"
            animateBy="words"
            direction="top"
            className="cta-subtitle"
            :stepDuration="0.3"
          />
          <div class="cta-buttons">
            <button class="cta-btn cta-btn--primary" @click="emit('openForm')">
              立即咨询
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

// ========== SECTION 1: Stats ==========
.stats-section {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-6;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  padding: $space-8;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-glow;
  }
}

.stat-value {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: $space-3;
}

.stat-label {
  font-size: $text-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $space-2;
}

.stat-desc {
  font-size: $text-sm;
  color: $text-tertiary;
  line-height: 1.5;
}

// ========== SECTION 2: Testimonials ==========
.testimonials-section {
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-6;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.testimonial-card {
  padding: $space-8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: $space-6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-glow;
  }
}

.testimonial-quote {
  position: relative;
  padding-left: $space-1;

  .quote-icon {
    width: 32px;
    height: 32px;
    color: $accent-purple;
    opacity: 0.4;
    margin-bottom: $space-4;
  }

  p {
    font-size: $text-base;
    color: $text-secondary;
    line-height: 1.8;
    letter-spacing: 0.01em;
  }
}

.testimonial-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: $space-4;
  border-top: 1px solid $border-subtle;
}

.testimonial-name {
  font-size: $text-base;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 2px;
}

.testimonial-role {
  font-size: $text-sm;
  color: $text-tertiary;
}

.testimonial-tag {
  font-size: $text-xs;
  color: $accent-purple;
  background: rgba(75, 51, 255, 0.1);
  border: 1px solid rgba(75, 51, 255, 0.2);
  padding: $space-1 $space-3;
  border-radius: $radius-pill;
  white-space: nowrap;
}

// ========== SECTION 3: Partners ==========
.partners-section {
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-4;
  border-radius: $radius-lg;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: $border-subtle;

    .client-logo-img {
      filter: brightness(1);
      opacity: 1;
    }
  }
}

.client-logo-img {
  max-width: 100%;
  max-height: 48px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: brightness(0.7);
  opacity: 0.6;
  transition: all 0.3s ease;
}

// ========== SECTION 4: CTA ==========
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
  padding: $space-16 0;

  @media (max-width: 768px) {
    padding: $space-10 0;
  }
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.2 !important;
  margin-bottom: $space-4;
}

.cta-subtitle {
  font-size: $text-lg !important;
  color: $text-secondary !important;
  max-width: 480px !important;
  margin: 0 auto $space-8;
  line-height: 1.6 !important;
}

.cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $space-3 $space-8;
  border-radius: $radius-md;
  font-size: $text-base;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: $space-3 $space-6;
    font-size: $text-sm;
    width: 100%;
    max-width: 280px;
  }
}

.cta-btn--primary {
  background: linear-gradient(135deg, $accent-purple 0%, $accent-blue 100%);
  color: #fff;
  border: 1px solid rgba(75, 51, 255, 0.5);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(75, 51, 255, 0.35);
    border-color: rgba(75, 51, 255, 0.7);
  }
}

.cta-btn--secondary {
  background: rgba(255, 255, 255, 0.05);
  color: $text-primary;
  border: 1px solid $border-medium;
  backdrop-filter: blur(12px);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: $border-strong;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
}
</style>
