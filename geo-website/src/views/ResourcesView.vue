<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GlassSurface from '../components/GlassSurface.vue'
import BlurText from '../components/BlurText.vue'
import { Motion } from 'motion-v'
import BookCard from '../components/BookCard.vue'
import MagicRings from '../components/MagicRings.vue'
import SoftAurora from '../components/SoftAurora.vue'
import PageCTA from '../components/PageCTA.vue'

const emit = defineEmits<{
  openForm: []
}>()

// Cyber Card 3D tilt
const cyberCardCanvas = ref<HTMLElement | null>(null)
const cyberCard = ref<HTMLElement | null>(null)

const onCyberCardMouseMove = (e: MouseEvent) => {
  const canvas = cyberCardCanvas.value
  const card = cyberCard.value
  if (!canvas || !card) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -15
  const rotateY = ((x - centerX) / centerX) * 15

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  // Update glare
  const glare = card.querySelector('.card-glare') as HTMLElement
  if (glare) {
    glare.style.background = `linear-gradient(${135 + rotateY * 3}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)`
    glare.style.opacity = '1'
    glare.style.left = `${x - rect.width}px`
    glare.style.top = `${y - rect.height}px`
  }
}

const onCyberCardMouseLeave = () => {
  const card = cyberCard.value
  if (!card) return
  card.style.transform = 'rotateX(0deg) rotateY(0deg)'
  card.style.transition = 'transform 0.5s ease'
  setTimeout(() => {
    if (card) card.style.transition = ''
  }, 500)

  const glare = card.querySelector('.card-glare') as HTMLElement
  if (glare) {
    glare.style.opacity = '0'
  }
}

// FAQ accordion state
const openFaqIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// Whitepapers
const whitepapers = [
  {
    title: 'GEO白皮书',
    image: '/images/whitepaper-1.webp',
    desc: '生成式引擎优化（GEO）全面指南'
  },
  {
    title: 'GEO实战手册',
    image: '/images/whitepaper-2.webp',
    desc: '品牌AI搜索优化的落地方法论'
  }
]

// CGIA Core Benefits (7 items from poster)
const cgiaBenefits = [
  '联盟证书/授牌',
  '品牌专栏曝光',
  '联合署名发布',
  '全媒体矩阵传播',
  'GEO全球周报',
  '专属线下私享会',
  '技术工具池',
]

const benefitVisibility = ref<boolean[]>(new Array(7).fill(false))
let benefitObserver: IntersectionObserver | null = null

onMounted(() => {
  benefitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = Number((entry.target as HTMLElement).dataset.index)
        if (!isNaN(idx) && entry.isIntersecting) {
          benefitVisibility.value[idx] = true
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  )

  setTimeout(() => {
    document.querySelectorAll('.benefit-pill').forEach((el) => {
      benefitObserver?.observe(el)
    })
  }, 200)
})

onBeforeUnmount(() => {
  benefitObserver?.disconnect()
})

// FAQ items
const faqItems = [
  {
    question: '什么是GEO？',
    answer: 'GEO（Generative Engine Optimization，生成式引擎优化）是指针对生成式AI搜索引擎（如ChatGPT、Kimi、DeepSeek、豆包等）的内容优化策略。其核心目标是让品牌在AI搜索结果中实现"被提及""被引用""被推荐"，从而在AI搜索时代获得竞争优势。'
  },
  {
    question: '为什么要做GEO？',
    answer: '随着生成式AI的普及，用户的搜索习惯正在从传统搜索引擎向AI搜索转移。品牌竞争的焦点已从流量入口转向认知入口——如果品牌在AI搜索中不可见，就等于在未来的数字世界中"不存在"。GEO帮助品牌抢占AI搜索的认知高地，确保在AI推荐中被优先提及。'
  },
  {
    question: 'GEO与SEO有什么区别？',
    answer: 'SEO（搜索引擎优化）针对的是传统搜索引擎（如Google、百度）的排名算法，核心是关键词排名和页面权重；而GEO针对的是AI大模型的生成逻辑，核心是让品牌成为AI回答中的"权威引用源"。简单来说，SEO是让网页排在搜索结果前列，GEO是让品牌成为AI回答的一部分。两者互补，但GEO是面向未来的优化方向。'
  }
]
</script>

<template>
  <div class="resources-view" id="resources">
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
            text="资源中心"
            :delay="100"
            animateBy="words"
            direction="top"
            className="page-hero-title"
            :stepDuration="0.5"
          />
        </div>
      </div>
    </section>

    <!-- ========== GEO WHITEPAPER ========== -->
    <section class="section resources-section">
      <div class="section-bg" />
      <div class="section-content">
        <div class="section-header-content container">
          <BlurText
            text="GEO白皮书"
            :delay="80"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="深度洞察生成式引擎优化方法论，助力品牌AI搜索增长"
            :delay="40"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.35"
          />
        </div>

        <div class="container">
          <div class="whitepaper-layout">
          <div class="whitepaper-content">
            <BlurText
              text="GEO权威指南"
              :delay="60"
              animateBy="words"
              direction="top"
              className="whitepaper-heading"
              :stepDuration="0.4"
            />
            <div class="whitepaper-highlights">
              <GlassSurface
                v-for="(item, idx) in ['GEO诊断评估体系', '7大AI平台优化策略', '品牌AI可见度提升路径', '行业案例与数据洞察']"
                :key="idx"
                :borderRadius="10"
                :backgroundOpacity="0.05"
                :blur="8"
                :saturation="1.1"
                class="highlight-glass"
              >
                <div class="highlight-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 10l3 3 7-7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ item }}</span>
                </div>
              </GlassSurface>
            </div>
            <button class="whitepaper-claim-btn" @click="emit('openForm')">
              <svg class="button__icon" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z" stroke="none"/>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
                <path d="M7 11l5 5l5 -5"/>
                <path d="M12 4l0 12"/>
              </svg>
              <span class="button__text">免费领取白皮书</span>
            </button>
          </div>

          <div class="whitepaper-covers">
            <div
              v-for="(wp, i) in whitepapers"
              :key="i"
              class="cover-card"
            >
              <BookCard
                :imageSrc="wp.image"
                :backText="wp.title"
                :backSubtext="wp.desc"
                :width="180"
                :height="240"
              />
              <div class="cover-meta">
                <span class="cover-title">{{ wp.title }}</span>
                <span class="cover-desc">{{ wp.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>

    <!-- ========== GEO ALLIANCE (CGIA) - Left Title + Right Timeline ========== -->
    <section class="section alliance-section">
      <div class="section-bg" />
      <div class="section-content">
        <div class="cgia-header">
          <SoftAurora
            class="cgia-aurora-bg"
            :speed="0.6"
            :scale="1.5"
            :brightness="1"
            :color1="'#4b33ff'"
            :color2="'#00d4ff'"
            :noise-frequency="2.5"
            :noise-amplitude="1"
            :band-height="0.5"
            :band-spread="1"
            :octave-decay="0.1"
            :layer-offset="0"
            :color-speed="1"
            :enable-mouse-interaction="true"
            :mouse-influence="0.25"
          />
          <div class="cgia-header-text">
            <h2 class="cgia-title">CGIA</h2>
            <BlurText
              text="深度共建 GEO 生态，赋能AI 营销时代"
              :delay="40"
              animateBy="words"
              direction="top"
              className="cgia-subtitle"
              :stepDuration="0.35"
            />
          </div>
        </div>

      <div class="container">
        <!-- CGIA Benefits Grid -->
        <div class="benefits-grid">
          <Motion
            v-for="(title, idx) in cgiaBenefits"
            :key="idx"
            :data-index="idx"
            tag="div"
            class="benefit-pill"
            :class="{ 'benefit-pill--alt': idx % 2 === 1 }"
            :initial="{ scale: 0.7, opacity: 0, y: 20 }"
            :animate="benefitVisibility[idx] ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.7, opacity: 0, y: 20 }"
            :transition="{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }"
          >
            <span class="benefit-dot"></span>
            <span class="benefit-title">{{ title }}</span>
          </Motion>
        </div>

        <!-- Flip Cards + QR Code -->
        <div class="alliance-join">
          <div class="join-cards-row">
            <!-- Flip Card 1 -->
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <span class="flip-card-label">创始会员单位</span>
                </div>
                <div class="flip-card-back">
                  <span class="flip-card-back-label">单位会员</span>
                  <p class="flip-card-back-desc">企业及机构均可申请加入，共享联盟资源</p>
                </div>
              </div>
            </div>
            <!-- Flip Card 2 -->
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <span class="flip-card-label">创始会员先锋</span>
                </div>
                <div class="flip-card-back">
                  <span class="flip-card-back-label">先锋会员</span>
                  <p class="flip-card-back-desc">行业领军企业专属，深度参与联盟治理与标准制定</p>
                </div>
              </div>
            </div>
            <!-- Cyber Card QR Code -->
            <div class="cyber-card-wrapper">
              <div class="cyber-card-canvas" ref="cyberCardCanvas" @mousemove="onCyberCardMouseMove" @mouseleave="onCyberCardMouseLeave">
                <div class="tracker tr-1"></div>
                <div class="tracker tr-2"></div>
                <div class="tracker tr-3"></div>
                <div class="tracker tr-4"></div>
                <div class="tracker tr-5"></div>
                <div class="tracker tr-6"></div>
                <div class="tracker tr-7"></div>
                <div class="tracker tr-8"></div>
                <div class="tracker tr-9"></div>
                <div class="cyber-card" ref="cyberCard">
                  <div class="card-content">
                    <div class="card-glare"></div>
                    <div class="cyber-lines">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <img src="/images/qr-cgia-v2.png" alt="加入CGIA" class="cyber-qr-img" />
                    <div class="title">CGIA<br />联盟</div>
                    <div class="glowing-elements">
                      <div class="glow-1"></div>
                      <div class="glow-2"></div>
                      <div class="glow-3"></div>
                    </div>
                    <div class="subtitle">
                      <span>扫码加入</span>
                      <span class="highlight">CGIA</span>
                    </div>
                    <div class="card-particles">
                      <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="corner-elements">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <div class="scan-line"></div>
                  </div>
                </div>
              </div>
              <span class="cyber-card-scan-text">扫码加入</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>

    <!-- ========== GEO FAQ (Accordion) - Left Title + Right List ========== -->
    <section class="section faq-section">
      <div class="section-bg" />
      <div class="section-content">
        <div class="section-header-content container">
          <BlurText
            text="GEO常见问题"
            :delay="80"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="关于GEO优化，你可能想了解这些"
            :delay="40"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.35"
          />
        </div>

      <div class="container">
        <div class="faq-layout">
          <!-- Right: Accordion List -->
          <div class="faq-right">
            <div class="faq-list">
              <div
                v-for="(item, i) in faqItems"
                :key="i"
                :class="['faq-item', { open: openFaqIndex === i }]"
              >
                <button class="faq-question" @click="toggleFaq(i)">
                  <BlurText
                    :text="item.question"
                    :delay="30"
                    animateBy="words"
                    direction="top"
                    className="faq-q-text"
                    :stepDuration="0.25"
                  />
                  <svg
                    :class="['faq-chevron', { rotated: openFaqIndex === i }]"
                    width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
                  >
                    <path d="M5 8l5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="faq-answer-wrapper">
                  <div class="faq-answer">
                    <BlurText
                      :text="item.answer"
                      :delay="15"
                      animateBy="words"
                      direction="bottom"
                      className="faq-a-text"
                      :stepDuration="0.2"
                      :threshold="0"
                    />
                  </div>
                </div>
              </div>
            </div>
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

// ========== PAGE HERO (MagicRings background) ==========
.page-hero {
  position: relative;
  overflow: hidden;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: 220px;
  }
}

.page-hero-rings {
  position: absolute !important;
  inset: 0;
  z-index: 0;
}

.page-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-hero-brand {
  display: flex;
  align-items: center;
  gap: $space-8;

  @media (max-width: 768px) {
    gap: $space-5;
  }
}

.page-hero-logo {
  height: 56px;
  width: auto;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 36px;
  }
}

.page-hero-divider {
  display: block;
  width: 1px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 32px;
  }
}

.page-hero-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  letter-spacing: 0.05em !important;
  line-height: 1.2 !important;
}

// ========== SECTION BACKGROUND (full section gradient image) ==========
.resources-section,
.alliance-section,
.faq-section {
  position: relative;
  overflow: hidden;
}

.section-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/section-bg-new.jpg');
  background-size: cover;
  background-position: center;
  // Gradient image (pink→purple→blue) — show colors subtly
  filter: brightness(0.55) contrast(1.1) saturate(0.85);

  // Light dark overlay to keep text readable
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(3, 4, 10, 0.35) 0%,
      rgba(3, 4, 10, 0.2) 50%,
      rgba(3, 4, 10, 0.4) 100%
    );
  }
}

.section-content {
  position: relative;
  z-index: 2;
}

.section-header-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  padding-top: $space-16;
  padding-bottom: $space-8;

  @media (max-width: 768px) {
    padding-top: $space-10;
    padding-bottom: $space-6;
  }
}

// ========== SECTION STYLES ==========
.resources-section,
.alliance-section,
.faq-section {
  padding-bottom: $space-16;

  @media (max-width: 768px) {
    padding-bottom: $space-10;
  }
}

// ========== WHITEPAPER ==========
.whitepaper-layout {
  display: flex;
  align-items: center;
  gap: $space-12;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: $space-8;
    align-items: stretch;
  }
}

.whitepaper-content {
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.whitepaper-heading {
  font-size: clamp(1.25rem, 3vw, 1.75rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  margin-bottom: $space-4 !important;
  background: $gradient-hero !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  line-height: 1.3 !important;
}

.whitepaper-desc {
  font-size: $text-base !important;
  color: $text-secondary !important;
  line-height: 1.75 !important;
  margin-bottom: $space-6 !important;
}

.whitepaper-highlights {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.highlight-glass {
  width: 100%;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: $space-3;
  font-size: $text-sm;
  color: $text-secondary;
  transition: color $transition-fast;
  padding: $space-3 $space-4;

  svg {
    color: $accent-cyan;
    flex-shrink: 0;
  }

  &:hover {
    color: $text-primary;
  }
}

.whitepaper-claim-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 28px;
  background: linear-gradient(135deg, $accent-purple 0%, $accent-blue 100%);
  border: 1px solid rgba(75, 51, 255, 0.5);
  border-radius: 12px;
  color: #fff;
  font-size: $text-base;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: $space-6;
  box-shadow: 0 4px 20px rgba(75, 51, 255, 0.25);

  .button__icon {
    width: 24px;
    height: 24px;
    color: #fff;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .button__text {
    letter-spacing: 0.5px;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(75, 51, 255, 0.7);
    box-shadow: 0 8px 32px rgba(75, 51, 255, 0.4);

    .button__icon {
      transform: translateY(2px);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
}

// Whitepaper covers - BookCard 3D flip
.whitepaper-covers {
  display: flex;
  gap: $space-8;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: $space-5;
  }
}

.cover-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  cursor: pointer;
}

.cover-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.cover-title {
  font-size: 13px;
  font-weight: 600;
  color: $text-primary;
}

.cover-desc {
  font-size: 11px;
  color: $text-tertiary;
  line-height: 1.4;
  max-width: 180px;
}

// ========== CGIA HEADER with SoftAurora ==========
.cgia-header {
  position: relative;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 200px;
  }
}

.cgia-aurora-bg {
  position: absolute !important;
  inset: 0;
  z-index: 0;
}

.cgia-header-text {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  pointer-events: none;
}

.cgia-title {
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.15em;
  line-height: 1;
  text-shadow: 0 0 40px rgba(75, 51, 255, 0.5), 0 0 80px rgba(75, 51, 255, 0.3);
  mix-blend-mode: normal;

  @media (max-width: 768px) {
    font-size: clamp(3rem, 15vw, 5rem);
  }
}

.cgia-subtitle {
  font-size: clamp(0.875rem, 2vw, 1.125rem) !important;
  font-weight: 500 !important;
  background: linear-gradient(135deg, #4b33ff 0%, #4c75ff 50%, #00d4ff 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  letter-spacing: 0.05em !important;
  text-align: center !important;
  filter: drop-shadow(0 0 8px rgba(75, 51, 255, 0.4));
}

// ========== CGIA Benefits Grid ==========
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-4;
  max-width: 720px;
  margin: 0 auto $space-12;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: $space-3;
    margin-bottom: $space-8;
  }
}

.benefit-pill {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-4 $space-5;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.85) 0%, rgba(76, 117, 255, 0.8) 50%, rgba(0, 212, 255, 0.75) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: default;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 32px rgba(75, 51, 255, 0.3);

    &::before {
      transform: translateX(100%);
    }
  }

  &--alt {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.75) 0%, rgba(76, 117, 255, 0.8) 50%, rgba(75, 51, 255, 0.85) 100%);
  }
}

.benefit-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

.benefit-title {
  font-size: $text-base;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
  line-height: 1.4;
}

// Join cards + QR row
.alliance-join {
  max-width: 900px;
  margin: 0 auto;
}

.join-cards-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-6;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: $space-5;
  }
}

// Flip Card (3D flip effect)
.flip-card {
  width: 220px;
  height: 140px;
  perspective: 1000px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    height: 120px;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;

  .flip-card:hover & {
    transform: rotateY(180deg);
  }
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: $radius-lg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  padding: $space-4;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.flip-card-front {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(75, 51, 255, 0.1) 0%,
      rgba(76, 117, 255, 0.05) 50%,
      rgba(0, 212, 255, 0.08) 100%
    );
  }
}

.flip-card-label {
  position: relative;
  z-index: 1;
  font-size: 1.1rem;
  font-weight: 600;
  color: $text-primary;
  letter-spacing: 0.05em;
  text-align: center;
}

.flip-card-back {
  background: rgba(75, 51, 255, 0.1);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  transform: rotateY(180deg);
  border-color: rgba(75, 51, 255, 0.25);
}

.flip-card-back-label {
  font-size: 1rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: 0.05em;
}

.flip-card-back-desc {
  font-size: $text-xs;
  color: $text-secondary;
  text-align: center;
  line-height: 1.5;
  margin: 0;
}

// QR Code Glass Card
// ========== Cyber Card QR (by 00Kubi, adapted) ==========
.cyber-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-3;
}

.cyber-card-canvas {
  position: relative;
  width: 220px;
  height: 300px;
  perspective: 800px;
  cursor: pointer;

  .tracker {
    position: absolute;
    z-index: 0;
    border-radius: 50%;
    pointer-events: none;
  }

  .tr-1 { width: 20px; height: 20px; top: -10px; left: -10px; }
  .tr-2 { width: 20px; height: 20px; top: -10px; right: -10px; }
  .tr-3 { width: 20px; height: 20px; bottom: -10px; left: -10px; }
  .tr-4 { width: 20px; height: 20px; bottom: -10px; right: -10px; }
  .tr-5 { width: 20px; height: 20px; top: 50%; left: -10px; transform: translateY(-50%); }
  .tr-6 { width: 20px; height: 20px; top: 50%; right: -10px; transform: translateY(-50%); }
  .tr-7 { width: 20px; height: 20px; top: -10px; left: 50%; transform: translateX(-50%); }
  .tr-8 { width: 20px; height: 20px; bottom: -10px; left: 50%; transform: translateX(-50%); }
  .tr-9 { width: 20px; height: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); }

  &:hover .tracker {
    box-shadow: 0 0 20px 5px rgba(75, 51, 255, 0.5);
    background: rgba(75, 51, 255, 0.3);
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 270px;
  }
}

.cyber-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.1s ease;
  transform-style: preserve-3d;

  .card-content {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #0d0d1a, #1a0a2e);
    border: 1px solid rgba(75, 51, 255, 0.3);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px 16px;
  }

  .card-glare {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
    filter: blur(20px);
  }

  .cyber-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;

    span {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(75, 51, 255, 0.15), transparent);
      height: 1px;
      width: 100%;

      &:nth-child(1) { top: 20%; animation: cyberLineMove 3s linear infinite; }
      &:nth-child(2) { top: 40%; animation: cyberLineMove 4s linear infinite 1s; }
      &:nth-child(3) { top: 60%; animation: cyberLineMove 3.5s linear infinite 0.5s; }
      &:nth-child(4) { top: 80%; animation: cyberLineMove 4.5s linear infinite 1.5s; }
    }
  }

  .cyber-qr-img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    border-radius: 8px;
    background: rgba(75, 51, 255, 0.12);
    padding: 6px;
    position: relative;
    z-index: 5;
    filter: invert(1) sepia(1) hue-rotate(220deg) saturate(2.5) brightness(0.85) contrast(1.1);
    transition: filter 0.3s ease;

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
    }
  }

  .cyber-card:hover .cyber-qr-img {
    filter: invert(1) sepia(1) hue-rotate(220deg) saturate(3.5) brightness(0.95) contrast(1.2);
  }

  .title {
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    color: #fff;
    letter-spacing: 3px;
    line-height: 1.3;
    position: relative;
    z-index: 5;
    background: linear-gradient(135deg, #a78bfa, #4c75ff, #00d4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    display: flex;
    gap: 8px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    position: relative;
    z-index: 5;

    .highlight {
      color: #a78bfa;
      font-weight: 700;
    }
  }

  .glowing-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .glow-1 {
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(75, 51, 255, 0.15);
      filter: blur(30px);
      top: -20px;
      right: -20px;
      animation: glowPulse 3s ease-in-out infinite;
    }

    .glow-2 {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(0, 212, 255, 0.1);
      filter: blur(25px);
      bottom: 20px;
      left: -10px;
      animation: glowPulse 4s ease-in-out infinite 1s;
    }

    .glow-3 {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(76, 117, 255, 0.1);
      filter: blur(20px);
      bottom: -10px;
      right: 30px;
      animation: glowPulse 3.5s ease-in-out infinite 0.5s;
    }
  }

  .card-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;

    span {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(167, 139, 250, 0.6);
      border-radius: 50%;
      animation: particleFloat 4s ease-in-out infinite;

      &:nth-child(1) { top: 15%; left: 20%; animation-delay: 0s; }
      &:nth-child(2) { top: 25%; left: 75%; animation-delay: 0.5s; }
      &:nth-child(3) { top: 55%; left: 15%; animation-delay: 1s; }
      &:nth-child(4) { top: 65%; left: 80%; animation-delay: 1.5s; }
      &:nth-child(5) { top: 80%; left: 40%; animation-delay: 2s; }
      &:nth-child(6) { top: 35%; left: 50%; animation-delay: 2.5s; }
    }
  }

  .corner-elements {
    position: absolute;
    inset: 8px;
    pointer-events: none;

    span {
      position: absolute;
      width: 12px;
      height: 12px;
      border-color: rgba(75, 51, 255, 0.4);

      &:nth-child(1) { top: 0; left: 0; border-top: 2px solid; border-left: 2px solid; }
      &:nth-child(2) { top: 0; right: 0; border-top: 2px solid; border-right: 2px solid; }
      &:nth-child(3) { bottom: 0; left: 0; border-bottom: 2px solid; border-left: 2px solid; }
      &:nth-child(4) { bottom: 0; right: 0; border-bottom: 2px solid; border-right: 2px solid; }
    }
  }

  .scan-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(75, 51, 255, 0.4), transparent);
    animation: scanLine 3s linear infinite;
    pointer-events: none;
    z-index: 6;
  }
}

.cyber-card-scan-text {
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;
  letter-spacing: 0.08em;
  text-align: center;
}

@keyframes cyberLineMove {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  25% { opacity: 1; }
  50% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
  75% { opacity: 0.3; }
}

@keyframes scanLine {
  0% { top: -2px; }
  100% { top: 100%; }
}

// ========== FAQ (Accordion) - Centered Single Column ==========
.faq-layout {
  display: block;
  max-width: 800px;
  margin: 0 auto;
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all $transition-normal;

  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  &.open {
    background: rgba(75, 51, 255, 0.04);
  }
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: $space-4;
  padding: $space-5 $space-4;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: $text-primary;
  font-family: inherit;
  font-size: $text-base;
  font-weight: 500;
  line-height: 1.5;
  transition: color $transition-fast;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    padding: $space-4 $space-3;
  }
}

.faq-q-text {
  flex: 1;
  min-width: 0;
  font-weight: 500 !important;
  color: $text-primary !important;
  font-size: $text-base !important;
  line-height: 1.5 !important;
}

.faq-chevron {
  flex-shrink: 0;
  color: $text-tertiary;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color $transition-fast;

  &.rotated {
    transform: rotate(180deg);
    color: $accent-purple;
  }
}

.faq-answer-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-item.open .faq-answer-wrapper {
  max-height: 600px;
}

.faq-answer {
  padding: 0 $space-4 $space-5;

  @media (max-width: 768px) {
    padding: 0 $space-3 $space-4;
  }
}

.faq-a-text {
  font-size: $text-sm !important;
  color: $text-secondary !important;
  line-height: 1.8 !important;
  padding-left: 0 !important;
}
</style>
