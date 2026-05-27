<script setup lang="ts">
import { ref } from 'vue'
import GlassSurface from '../components/GlassSurface.vue'
import BlurText from '../components/BlurText.vue'
import BookCard from '../components/BookCard.vue'
import MagicRings from '../components/MagicRings.vue'
import TimelineSteps from '../components/TimelineSteps.vue'
import SplashCursor from '../components/SplashCursor.vue'

const emit = defineEmits<{
  openForm: []
}>()

// FAQ accordion state
const openFaqIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// Whitepapers
const whitepapers = [
  {
    title: 'GEO白皮书',
    image: '/images/whitepaper-1.png',
    desc: '生成式引擎优化（GEO）全面指南'
  },
  {
    title: 'GEO实战手册',
    image: '/images/whitepaper-2.png',
    desc: '品牌AI搜索优化的落地方法论'
  }
]

// CGIA Alliance benefits
const allianceBenefits = [
  {
    icon: '🏆',
    title: '证书授牌',
    desc: '获得中国GEO创新联盟官方认证证书，彰显行业权威地位'
  },
  {
    icon: '🔧',
    title: '技术工具',
    desc: '优先使用联盟GEO技术工具平台，提升优化效率'
  },
  {
    icon: '📢',
    title: '媒体传播',
    desc: '联盟媒体矩阵优先传播报道，扩大品牌声量'
  },
  {
    icon: '📊',
    title: 'GEO周报',
    desc: '每周获取行业GEO趋势洞察报告，把握最新动态'
  },
  {
    icon: '✍️',
    title: '专栏曝光',
    desc: '联盟官方专栏优先展示企业品牌内容'
  },
  {
    icon: '📖',
    title: '白皮书',
    desc: '优先参与联盟年度白皮书编撰，树立行业标杆'
  },
  {
    icon: '🤝',
    title: '私享会',
    desc: '定期参加联盟高端私享会，链接行业核心资源'
  }
]

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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              免费领取白皮书
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
          <SplashCursor class="cgia-fluid-bg" />
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
        <div class="alliance-layout">
          <!-- Left: Title + Description -->
          <div class="alliance-left">
            <div class="alliance-left-content">
              <BlurText
                text="核心权益"
                :delay="60"
                animateBy="words"
                direction="top"
                className="alliance-left-title"
                :stepDuration="0.4"
              />
            </div>
          </div>

          <!-- Right: Timeline Steps -->
          <div class="alliance-right">
            <TimelineSteps :steps="allianceBenefits" />
          </div>
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
            <!-- QR Code Glass Card -->
            <div class="qr-glass-card">
              <div class="qr-glass-inner">
                <img src="/images/qr-cgia-v2.png" alt="加入CGIA" class="qr-glass-img" />
                <span class="qr-glass-label">扫码加入 CGIA</span>
              </div>
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
  background-image: url('/images/3a4e44575b374bdd116393335e4fbdfd.png');
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
  gap: $space-3;
  padding: $space-3 $space-6;
  background: linear-gradient(135deg, $accent-purple 0%, #4c75ff 100%);
  color: #fff;
  font-size: $text-base;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: $space-6;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(75, 51, 255, 0.35);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
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

// ========== CGIA HEADER with SplashCursor fluid ==========
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

.cgia-fluid-bg {
  position: absolute !important;
  inset: 0;
  z-index: 0;
  pointer-events: auto;
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
  font-weight: 400 !important;
  color: rgba(255, 255, 255, 0.7) !important;
  letter-spacing: 0.05em !important;
  text-align: center !important;
}

// ========== ALLIANCE - Left Title + Right Timeline ==========
.alliance-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: $space-12;
  align-items: start;
  margin-bottom: $space-12;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
    margin-bottom: $space-8;
  }
}

.alliance-left {
  position: sticky;
  top: 120px;

  @media (max-width: 768px) {
    position: static;
    top: auto;
  }
}

.alliance-left-content {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.alliance-left-title {
  font-size: clamp(1.5rem, 3vw, 2rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.3 !important;
  letter-spacing: 0.02em !important;
}

.alliance-left-desc {
  font-size: $text-sm !important;
  color: $text-secondary !important;
  line-height: 1.7 !important;
}

.alliance-right {
  min-width: 0;
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
.qr-glass-card {
  position: relative;
  width: 220px;
  height: 280px;
  border-radius: $radius-lg;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  padding: $space-5;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(75, 51, 255, 0.08) 0%,
      rgba(76, 117, 255, 0.04) 50%,
      rgba(0, 212, 255, 0.06) 100%
    );
    border-radius: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 40%,
      rgba(255, 255, 255, 0.04) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    border-color: rgba(75, 51, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px rgba(75, 51, 255, 0.15);

    &::after {
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    height: auto;
    padding: $space-6;
  }
}

.qr-glass-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
}

.qr-glass-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: $radius-md;
  background: #fff;
  padding: 8px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
}

.qr-glass-label {
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;
  letter-spacing: 0.05em;
}

// ========== FAQ (Accordion) - Left Title + Right List ==========
.faq-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: $space-12;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.faq-left {
  position: sticky;
  top: 120px;

  @media (max-width: 768px) {
    position: static;
    top: auto;
  }
}

.faq-left-title {
  font-size: clamp(1.5rem, 3vw, 2rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.3 !important;
  letter-spacing: 0.02em !important;
}

.faq-right {
  min-width: 0;
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
