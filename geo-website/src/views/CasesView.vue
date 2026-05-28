<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MagicRings from '../components/MagicRings.vue'
import BlurText from '../components/BlurText.vue'
import PageCTA from '../components/PageCTA.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== Case Stats Data (skill-bar) ==========
const caseStats = [
  { value: '82%', label: '品牌提及率', desc: '栖息地从0%提升至82%', percent: 82 },
  { value: '73%', label: '核心词首推率', desc: '超目标13%', percent: 73 },
  { value: '300%', label: '曝光量提升', desc: '得实打印机DeepSeek平台', percent: 100 },
  { value: '1:8.5', label: '项目ROI', desc: '栖息地项目商业回报比', percent: 85 },
  { value: '67%', label: '咨询量增长', desc: '栖息地品牌主动搜索量', percent: 67 },
  { value: '24h', label: '极速优化', desc: '得实关键词露出优化速度', percent: 92 }
]

// ========== Client Testimonials ==========
const testimonials = [
  {
    quote: '从"AI搜索隐形"到"AI主动首推"，耐特康赛的GEO策略让栖息地在AI平台上的品牌可见性实现了质的飞跃。核心场景首推率达到78%-85%，官网咨询量增长67%，这是我们在传统搜索时代难以想象的。',
    client: '栖息地智能新住宅',
    role: '品牌方',
    tag: '智能家居',
    avatar: '/images/avatars/avatar1.jpg'
  },
  {
    quote: '24小时内完成关键词露出优化，连续30天稳定实现多品类打印机AI推荐位占领。在DeepSeek和豆包平台，得实品牌首推率超过80%，直接带动官网流量增长45%。',
    client: '得实集团（DASCOM）',
    role: '品牌方',
    tag: '打印设备',
    avatar: '/images/avatars/avatar2.jpg'
  }
]

// ========== Testimonials Carousel ==========
const carouselRef = ref<HTMLDivElement | null>(null)
const currentIndex = ref(0)

const scrollToSlide = (index: number) => {
  if (!carouselRef.value) return
  const cards = carouselRef.value.querySelectorAll('.testimonial-slide')
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    currentIndex.value = index
  }
}

const onScroll = () => {
  if (!carouselRef.value) return
  const container = carouselRef.value
  const cards = container.querySelectorAll('.testimonial-slide')
  if (!cards.length) return
  const containerCenter = container.scrollLeft + container.clientWidth / 2
  let closest = 0
  let minDist = Infinity
  cards.forEach((card, i) => {
    const el = card as HTMLElement
    const center = el.offsetLeft + el.offsetWidth / 2
    const dist = Math.abs(containerCenter - center)
    if (dist < minDist) {
      minDist = dist
      closest = i
    }
  })
  currentIndex.value = closest
}

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
        <div class="uiverse-title-box scroll-reveal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 614 390" class="uiverse-title-svg">
            <g id="Frame">
              <g id="box">
                <path stroke-width="2" stroke="#4b33ff" fill-opacity="0.03" fill="#4b33ff" d="M587 20H28V306H587V20Z" />
                <path stroke-width="2" stroke="#4b33ff" fill="#03040a" d="M33 15H23V25H33V15Z" />
                <path stroke-width="2" stroke="#4b33ff" fill="#03040a" d="M33 301H23V311H33V301Z" />
                <path stroke-width="2" stroke="#4b33ff" fill="#03040a" d="M592 301H582V311H592V301Z" />
                <path stroke-width="2" stroke="#4b33ff" fill="#03040a" d="M592 15H582V25H592V15Z" />
              </g>
              <!-- 中文标题文字 -->
              <text
                x="307"
                y="170"
                text-anchor="middle"
                dominant-baseline="middle"
                font-family="Inter, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif"
                font-size="48"
                font-weight="700"
                fill="#ffffff"
                fill-opacity="0.9"
                letter-spacing="0.05em"
              >用数据验证成果</text>
              <g id="cursor">
                <path stroke-width="2" stroke="white" fill="#4b33ff" d="M453.383 343L448 317L471 331L459.745 333.5L453.383 343Z" />
                <path fill="#4b33ff" d="M587 343H469.932V376H587V343Z" />
                <text
                  x="528"
                  y="364"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-family="Inter, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif"
                  font-size="12"
                  font-weight="500"
                  fill="#ffffff"
                  fill-opacity="0.9"
                  letter-spacing="0.02em"
                >验证成果</text>
              </g>
            </g>
          </svg>
        </div>

        <div class="skill-bars scroll-reveal">
          <div
            v-for="(stat, index) in caseStats"
            :key="index"
            class="skill-box"
          >
            <span class="skill-title">{{ stat.label }}</span>
            <span class="skill-value">{{ stat.value }}</span>
            <div class="skill-bar">
              <span
                class="skill-per"
                :class="'skill-per-' + index"
                :style="{ '--target-width': stat.percent + '%' }"
              >
                <span class="tooltip">{{ stat.desc }}</span>
              </span>
            </div>
          </div>
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
        </div>

        <div
          ref="carouselRef"
          class="testimonials-carousel scroll-reveal"
          @scroll="onScroll"
        >
          <div
            v-for="(item, index) in testimonials"
            :key="index"
            class="testimonial-slide"
          >
            <div class="testimonial-card-v2">
              <div class="testimonial-avatar">
                <img :src="item.avatar" :alt="item.client" />
              </div>
              <div class="testimonial-body">
                <div class="testimonial-client">{{ item.client }}</div>
                <div class="testimonial-role">{{ item.role }}</div>
                <div class="testimonial-quote">
                  <p>{{ item.quote }}</p>
                </div>
              </div>
              <span class="testimonial-tag">{{ item.tag }}</span>
            </div>
          </div>
        </div>

        <div class="carousel-dots">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            class="carousel-dot"
            :class="{ 'is-active': currentIndex === index }"
            @click="scrollToSlide(index)"
            :aria-label="`切换到第${index + 1}条评价`"
          />
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

// ========== Uiverse Title Box ==========
.uiverse-title-box {
  display: flex;
  justify-content: center;
  margin-bottom: $space-16;

  @media (max-width: 768px) {
    margin-bottom: $space-10;
  }
}

.uiverse-title-svg {
  width: 100%;
  max-width: 614px;
  height: auto;

  @media (max-width: 768px) {
    max-width: 90vw;
  }
}

// ========== SECTION 1: Stats (Skill Bars by Uiverse/Juanes200122) ==========
.stats-section {
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

.skill-bars {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 768px) {
    gap: 22px;
  }
}

.skill-box {
  position: relative;
}

.skill-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.03em;
}

.skill-value {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 0.95rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4b33ff 0%, #4c75ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.02em;
}

.skill-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  margin-top: 10px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: 8px;
    margin-top: 8px;
  }
}

.skill-per {
  position: relative;
  display: block;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, #4b33ff 0%, #4c75ff 50%, #00d4ff 100%);
  width: 0;
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 12px rgba(75, 51, 255, 0.4);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    animation: skillShimmer 2.5s ease-in-out infinite;
  }
}

.is-visible .skill-per {
  width: var(--target-width, 0%) !important;
}

// Per-bar color variations
.skill-per-0 { --bar-c1: #4b33ff; --bar-c2: #7c5cff; }
.skill-per-1 { --bar-c1: #4c75ff; --bar-c2: #00d4ff; }
.skill-per-2 { --bar-c1: #00d4ff; --bar-c2: #4b33ff; background: linear-gradient(135deg, #00d4ff 0%, #4c75ff 50%, #4b33ff 100%); box-shadow: 0 0 12px rgba(0, 212, 255, 0.4); }
.skill-per-3 { --bar-c1: #7c5cff; --bar-c2: #4c75ff; }
.skill-per-4 { --bar-c1: #4b33ff; --bar-c2: #00d4ff; }
.skill-per-5 { --bar-c1: #00d4ff; --bar-c2: #4b33ff; background: linear-gradient(135deg, #00d4ff 0%, #7c5cff 100%); box-shadow: 0 0 12px rgba(0, 212, 255, 0.35); }

.tooltip {
  position: absolute;
  right: 0;
  top: -36px;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(75, 51, 255, 0.85);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: 12px;
    width: 8px;
    height: 8px;
    background: rgba(75, 51, 255, 0.85);
    transform: rotate(45deg);
  }
}

.skill-box:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
}

@keyframes skillShimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

// ========== SECTION 2: Testimonials ==========
.testimonials-section {
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

// ========== Testimonials Carousel ==========
.testimonials-carousel {
  display: flex;
  gap: $space-6;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: $space-4 $space-6;
  margin: 0 (-$space-6);

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  @media (max-width: 768px) {
    gap: $space-4;
    padding: $space-4 $space-4;
    margin: 0 (-$space-4);
  }
}

.testimonial-slide {
  flex: 0 0 520px;
  scroll-snap-align: center;

  @media (max-width: 768px) {
    flex: 0 0 85vw;
  }
}

.testimonial-card-v2 {
  position: relative;
  background: linear-gradient(145deg, rgba(75, 51, 255, 0.08) 0%, rgba(76, 117, 255, 0.05) 100%);
  border: 1px solid rgba(75, 51, 255, 0.15);
  border-radius: 20px;
  padding: $space-8;
  backdrop-filter: blur(20px);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: $space-6;
    border-radius: 16px;
  }
}

.testimonial-avatar {
  position: absolute;
  top: $space-6;
  right: $space-6;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(75, 51, 255, 0.3);
  box-shadow: 0 4px 16px rgba(75, 51, 255, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    top: $space-4;
    right: $space-4;
  }
}

.testimonial-body {
  padding-right: 72px;

  @media (max-width: 768px) {
    padding-right: 64px;
  }
}

.testimonial-client {
  font-size: $text-base;
  font-weight: 700;
  color: $accent-purple;
  margin-bottom: 2px;

  @media (max-width: 768px) {
    font-size: $text-sm;
  }
}

.testimonial-role {
  font-size: $text-sm;
  color: $text-tertiary;
  margin-bottom: $space-5;
}

.testimonial-quote {
  p {
    font-size: $text-base;
    color: $text-secondary;
    line-height: 1.8;
    letter-spacing: 0.01em;

    @media (max-width: 768px) {
      font-size: $text-sm;
      line-height: 1.7;
    }
  }
}

.testimonial-tag {
  position: absolute;
  bottom: $space-6;
  right: $space-6;
  font-size: $text-xs;
  color: $accent-purple;
  background: rgba(75, 51, 255, 0.1);
  border: 1px solid rgba(75, 51, 255, 0.2);
  padding: $space-1 $space-3;
  border-radius: $radius-pill;
  white-space: nowrap;

  @media (max-width: 768px) {
    bottom: $space-4;
    right: $space-4;
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: $space-8;

  @media (max-width: 768px) {
    margin-top: $space-6;
  }
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  transition: all 0.35s ease;
  padding: 0;

  &.is-active {
    width: 28px;
    border-radius: 4px;
    background: $accent-purple;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}

// ========== SECTION 3: Partners ==========
.partners-section {
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

</style>
