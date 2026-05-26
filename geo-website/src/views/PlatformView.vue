<script setup lang="ts">
import { } from 'vue'
import GlassSurface from '../components/GlassSurface.vue'
import BlurText from '../components/BlurText.vue'
import MagicRings from '../components/MagicRings.vue'
import TimelineSteps from '../components/TimelineSteps.vue'
import GeoWorkflow from '../components/GeoWorkflow.vue'
import CircularGallery from '../components/CircularGallery.vue'

// ========== Section 2: 核心功能 - Timeline Steps ==========
const coreFunctions = [
  { icon: '📡', title: 'AI可见度监测' },
  { icon: '🧬', title: '语义结构优化' },
  { icon: '🎯', title: '精准内容训练' },
  { icon: '🔄', title: '实时策略迭代' },
  { icon: '📋', title: 'GEO诊断报告' }
]

// ========== Section 3: 系统优势 - 数据卡片 ==========
const advantages = [
  {
    number: '7',
    unit: '大AI平台',
    label: '全覆盖监测'
  },
  {
    number: '50+',
    unit: '优化维度',
    label: '全方位诊断'
  },
  {
    number: '24/7',
    unit: '实时监控',
    label: '不间断追踪'
  },
  {
    number: '3×',
    unit: '效果提升',
    label: '显著增长'
  }
]

// ========== Section 4: 系统赋能 - Circular Gallery ==========
const galleryItems = [
  { image: 'https://picsum.photos/seed/enterprise/800/600', text: '企业品牌' },
  { image: 'https://picsum.photos/seed/ecommerce/800/600', text: '电商零售' },
  { image: 'https://picsum.photos/seed/b2bservice/800/600', text: 'B2B服务' },
  { image: 'https://picsum.photos/seed/healthcare/800/600', text: '医疗健康' },
  { image: 'https://picsum.photos/seed/edutech/800/600', text: '教育科技' },
  { image: 'https://picsum.photos/seed/finance/800/600', text: '金融服务' }
]
</script>

<template>
  <div class="platform-view" id="platform">
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
            text="智优平台"
            :delay="100"
            animateBy="words"
            direction="top"
            className="page-hero-title"
            :stepDuration="0.5"
          />
        </div>
      </div>
    </section>

    <!-- ========== SECTION 1: 智优系统 - Workflow Demo ========== -->
    <section class="section system-section">
      <div class="section-bg" />
      <div class="section-content">
        <!-- Auto-playing GEO Workflow Demo -->
        <GeoWorkflow />
      </div>
    </section>

    <!-- ========== SECTION 2: 核心功能 - Left Title + Right Timeline ========== -->
    <section class="section functions-section">
      <div class="section-bg" />
      <div class="section-content">
        <div class="section-header-content container">
          <BlurText
            text="核心功能"
            :delay="80"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="五大核心能力，驱动品牌GEO持续增长"
            :delay="40"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.35"
          />
        </div>

        <div class="container">
          <div class="functions-layout">
            <!-- Left: Title -->
            <div class="functions-left">
              <div class="functions-left-content">
                <BlurText
                  text="功能全景"
                  :delay="60"
                  animateBy="words"
                  direction="top"
                  className="functions-left-title"
                  :stepDuration="0.4"
                />
              </div>
            </div>

            <!-- Right: Timeline Steps -->
            <div class="functions-right">
              <TimelineSteps :steps="coreFunctions" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: 系统优势 - Data Cards ========== -->
    <section class="section advantages-section">
      <div class="section-bg" />
      <div class="section-content">
        <div class="section-header-content container">
          <BlurText
            text="系统优势"
            :delay="80"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="数据驱动的GEO优化，效果可量化、可追踪、可持续"
            :delay="40"
            animateBy="words"
            direction="top"
            className="section-subtitle"
            :stepDuration="0.35"
          />
        </div>

        <div class="container">
          <div class="advantages-grid">
            <GlassSurface
              v-for="(adv, idx) in advantages"
              :key="idx"
              :borderRadius="16"
              :backgroundOpacity="0.05"
              :blur="12"
              :saturation="1.3"
              class="advantage-card"
            >
              <div class="advantage-inner">
                <div class="advantage-number-row">
                  <span class="advantage-number">{{ adv.number }}</span>
                  <span class="advantage-unit">{{ adv.unit }}</span>
                </div>
                <BlurText
                  :text="adv.label"
                  :delay="40"
                  animateBy="words"
                  direction="top"
                  className="advantage-label"
                  :stepDuration="0.3"
                />
              </div>
            </GlassSurface>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 4: 系统赋能 - Circular Gallery ========== -->
    <section class="section empower-section">
      <div class="section-bg" />
      <div class="section-content">
        <div class="section-header-content container">
          <BlurText
            text="系统赋能"
            :delay="80"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
        </div>

        <div class="gallery-container">
          <CircularGallery
            :items="galleryItems"
            :bend="3"
            textColor="#ffffff"
            :borderRadius="0.05"
            font="bold 28px Inter"
            :scrollSpeed="2"
            :scrollEase="0.05"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use '../styles/variables' as *;

// ========== PAGE HERO (MagicRings background) ==========
.platform-view {
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
}

// ========== SECTION BACKGROUND ==========
.system-section,
.functions-section,
.advantages-section,
.empower-section {
  position: relative;
  overflow: hidden;
  padding-bottom: $space-16;

  @media (max-width: 768px) {
    padding-bottom: $space-10;
  }
}

.section-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/resources-bg.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.55) contrast(1.1) saturate(0.85);

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

.section-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  letter-spacing: 0.02em !important;
  line-height: 1.2 !important;
  background: $gradient-hero !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

.section-subtitle {
  font-size: $text-lg !important;
  color: $text-secondary !important;
  max-width: 600px !important;
  line-height: 1.6 !important;
}

// ========== SECTION 2: 核心功能 - Left Title + Right Timeline ==========
.functions-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: $space-12;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.functions-left {
  position: sticky;
  top: 120px;

  @media (max-width: 768px) {
    position: static;
    top: auto;
  }
}

.functions-left-content {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.functions-left-title {
  font-size: clamp(1.5rem, 3vw, 2rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.3 !important;
  letter-spacing: 0.02em !important;
}

.functions-right {
  min-width: 0;
}

// ========== SECTION 3: 系统优势 - Data Cards ==========
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-6;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-4;
  }
}

.advantage-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 48px rgba(75, 51, 255, 0.2);
  }
}

.advantage-inner {
  padding: $space-8 $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-3;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: $space-6 $space-5;
  }
}

.advantage-number-row {
  display: flex;
  align-items: baseline;
  gap: $space-2;
  margin-bottom: $space-2;
}

.advantage-number {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1;
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.advantage-unit {
  font-size: $text-sm;
  font-weight: 600;
  color: $accent-cyan;
  letter-spacing: 0.05em;
}

.advantage-label {
  font-size: $text-lg !important;
  font-weight: 600 !important;
  color: $text-primary !important;
  line-height: 1.3 !important;
}

// ========== SECTION 4: 系统赋能 - Circular Gallery ==========
.gallery-container {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 350px;
  }
}
</style>
