<script setup lang="ts">
import { } from 'vue'
import GlassSurface from '../components/GlassSurface.vue'
import BlurText from '../components/BlurText.vue'
import MagicRings from '../components/MagicRings.vue'
import GeoWorkflow from '../components/GeoWorkflow.vue'
import BentoGrid from '../components/BentoGrid.vue'
import PageCTA from '../components/PageCTA.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== Section 2: 核心功能 - Message Cards ==========
const coreFunctions = [
  { icon: '📡', title: 'AI可见度监测', desc: '7大AI平台实时监测，追踪品牌被引用的频次与场景', tag: '监测' },
  { icon: '🧬', title: '语义结构优化', desc: '优化品牌语义关联，提升AI对品牌的理解深度', tag: '优化' },
  { icon: '🎯', title: '精准内容训练', desc: 'AI内容工厂批量生产，精准投喂训练素材', tag: '训练' },
  { icon: '🔄', title: '实时策略迭代', desc: '动态监测AI推荐变化，快速调整占位策略', tag: '迭代' },
  { icon: '📋', title: 'GEO诊断报告', desc: '360°全方位诊断，输出可执行的优化方案', tag: '诊断' }
]

// ========== Section 3: 系统优势 - Dashboard Cards ==========
const dashboardCards = [
  {
    id: 'platforms',
    title: 'AI 平台监测',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    accent: '#6366f1',
    accent2: '#a855f7',
    live: true,
    metrics: [
      { label: '覆盖平台', value: '7', change: '+12.3%', positive: true },
      { label: '监测准确率', value: '99.8%', change: '+2.1%', positive: true }
    ],
    bars: [60, 45, 80, 55, 90, 70, 85],
    footer: '全平台实时监测中'
  },
  {
    id: 'dimensions',
    title: '优化维度',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    accent: '#3b82f6',
    accent2: '#06b6d4',
    live: true,
    metrics: [
      { label: '优化维度', value: '50+', change: '+8.1%', positive: true },
      { label: '诊断项', value: '360°', change: '+15', positive: true }
    ],
    bars: [40, 65, 50, 75, 60, 85, 70],
    footer: '全方位智能诊断'
  },
  {
    id: 'realtime',
    title: '实时监控',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    accent: '#22c55e',
    accent2: '#10b981',
    live: true,
    metrics: [
      { label: '监控频率', value: '24/7', change: '+15.2%', positive: true },
      { label: '响应延迟', value: '<100ms', change: '-32%', positive: true }
    ],
    bars: [85, 70, 90, 65, 80, 75, 95],
    footer: '全天候不间断追踪'
  },
  {
    id: 'effect',
    title: '效果提升',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    accent: '#ec4899',
    accent2: '#f43f5e',
    live: true,
    metrics: [
      { label: 'ROI 提升', value: '3×', change: '+32%', positive: true },
      { label: '品牌可见', value: '+45%', change: '+18%', positive: true }
    ],
    bars: [50, 60, 70, 55, 80, 75, 90],
    footer: '数据驱动持续增长'
  }
]

// ========== Section 4: 系统赋能 - BentoGrid ==========
const bentoCards = [
  { color: '#1e1b4b', title: '企业品牌', description: 'GEO全面覆盖', label: 'Brand' },
  { color: '#1e1b4b', title: '电商零售', description: 'AI推荐优化', label: 'E-Commerce' },
  { color: '#1e1b4b', title: 'B2B服务', description: '语义占位策略', label: 'B2B' },
  { color: '#1e1b4b', title: '医疗健康', description: '权威内容训练', label: 'Healthcare' },
  { color: '#1e1b4b', title: '教育科技', description: '知识图谱构建', label: 'EdTech' },
  { color: '#1e1b4b', title: '金融服务', description: '合规语义优化', label: 'Finance' }
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

            <!-- Right: Message Cards -->
            <div class="functions-right">
              <div class="message-cards">
                <div
                  v-for="(func, i) in coreFunctions"
                  :key="i"
                  class="message-card"
                >
                  <div class="message-icon">{{ func.icon }}</div>
                  <div class="message-body">
                    <div class="message-header">
                      <div class="message-title">{{ func.title }}</div>
                      <div class="message-tag">{{ func.tag }}</div>
                    </div>
                    <div class="message-desc">{{ func.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: 系统优势 - Dashboard Cards ========== -->
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
          <div class="dashboard-grid">
            <div
              v-for="(card, idx) in dashboardCards"
              :key="idx"
              class="dashboard-card"
              :style="{ '--accent': card.accent, '--accent2': card.accent2 }"
            >
              <!-- 渐变发光背景层 -->
              <div class="dashboard-card-glow" />
              <!-- 内层背景 -->
              <div class="dashboard-card-inner-bg" />

              <!-- 内容区 -->
              <div class="dashboard-card-content">
                <!-- 头部：图标 + 标题 + Live -->
                <div class="dashboard-header">
                  <div class="dashboard-header-left">
                    <div class="dashboard-icon" :style="{ background: `linear-gradient(135deg, ${card.accent}, ${card.accent2})` }">
                      <div class="dashboard-icon-svg" v-html="card.icon" />
                    </div>
                    <h3 class="dashboard-title">{{ card.title }}</h3>
                  </div>
                  <span v-if="card.live" class="dashboard-live">
                    <span class="dashboard-live-dot" />
                    Live
                  </span>
                </div>

                <!-- 数据指标 -->
                <div class="dashboard-metrics">
                  <div
                    v-for="(metric, mi) in card.metrics"
                    :key="mi"
                    class="dashboard-metric"
                  >
                    <p class="dashboard-metric-label">{{ metric.label }}</p>
                    <p class="dashboard-metric-value">{{ metric.value }}</p>
                    <span class="dashboard-metric-change" :class="{ 'is-positive': metric.positive }">
                      {{ metric.change }}
                    </span>
                  </div>
                </div>

                <!-- 迷你柱状图 -->
                <div class="dashboard-chart">
                  <div class="dashboard-chart-inner">
                    <div
                      v-for="(bar, bi) in card.bars"
                      :key="bi"
                      class="dashboard-bar"
                      :style="{ height: bar + '%', '--bar-accent': card.accent }"
                    />
                  </div>
                </div>

                <!-- 底部 -->
                <div class="dashboard-footer">
                  <span class="dashboard-footer-text">{{ card.footer }}</span>
                  <button class="dashboard-footer-btn" :style="{ background: `linear-gradient(135deg, ${card.accent}, ${card.accent2})` }">
                    查看详情
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 4: 系统赋能 - BentoGrid ========== -->
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

        <BentoGrid
          :cards="bentoCards"
          :enable-stars="true"
          :enable-spotlight="true"
          :enable-border-glow="true"
          :enable-tilt="false"
          :click-effect="true"
          :enable-magnetism="true"
          :text-auto-hide="true"
          glow-color="75, 51, 255"
        />
      </div>
    </section>

    <PageCTA @openForm="emit('openForm')" />
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
  background-image: url('/images/section-bg-new.jpg');
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

// ========== Message Cards (Uiverse style) ==========
.message-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;

  &:hover {
    background: rgba(75, 51, 255, 0.06);
    border-color: rgba(75, 51, 255, 0.2);
    transform: translateX(6px);
    box-shadow: 0 4px 24px rgba(75, 51, 255, 0.08);

    .message-icon {
      transform: scale(1.1);
      background: rgba(75, 51, 255, 0.2);
    }
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    gap: 12px;
  }
}

.message-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(75, 51, 255, 0.1);
  border: 1px solid rgba(75, 51, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
    border-radius: 10px;
  }
}

.message-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.message-title {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
}

.message-tag {
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(75, 51, 255, 0.85);
  background: rgba(75, 51, 255, 0.1);
  border: 1px solid rgba(75, 51, 255, 0.15);
  padding: 3px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.message-desc {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
}

// ========== SECTION 3: 系统优势 - Dashboard Cards ==========
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

// 数据看板卡片
.dashboard-card {
  position: relative;
  border-radius: 16px;
  padding: 1px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;

  &:hover {
    transform: scale(1.015);

    .dashboard-card-glow {
      opacity: 0.4;
    }

    .dashboard-bar {
      animation: barPulse 1.5s ease-in-out infinite;
    }
  }
}

.dashboard-card-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  opacity: 0.18;
  filter: blur(8px);
  transition: opacity 0.4s ease;
  z-index: 0;
}

.dashboard-card-inner-bg {
  position: absolute;
  inset: 1px;
  border-radius: 15px;
  background: rgba(10, 10, 18, 0.95);
  z-index: 1;
}

.dashboard-card-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 头部
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dashboard-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dashboard-icon-svg {
  width: 16px;
  height: 16px;
  color: #fff;

  svg {
    width: 100%;
    height: 100%;
  }
}

.dashboard-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.dashboard-live {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  padding: 3px 8px;
  border-radius: 20px;
  flex-shrink: 0;
}

.dashboard-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #22c55e;
  animation: livePulse 2s ease-in-out infinite;
}

@keyframes livePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

// 数据指标
.dashboard-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.dashboard-metric {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.04);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}

.dashboard-metric-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 6px;
}

.dashboard-metric-value {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
  line-height: 1.2;
}

.dashboard-metric-change {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.25);

  &.is-positive {
    color: #22c55e;
  }
}

// 柱状图
.dashboard-chart {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  height: 80px;
}

.dashboard-chart-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px;
  height: 100%;
  padding: 0 2px;
}

.dashboard-bar {
  flex: 1;
  max-width: 18px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--bar-accent, var(--accent)) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

@keyframes barPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

// 底部
.dashboard-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}

.dashboard-footer-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}

.dashboard-footer-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.15);
  }

  svg {
    width: 10px;
    height: 10px;
  }
}

// 移动端适配
@media (max-width: 480px) {
  .dashboard-card-content {
    padding: 16px;
    gap: 12px;
  }

  .dashboard-metrics {
    gap: 8px;
  }

  .dashboard-metric {
    padding: 10px;
  }

  .dashboard-metric-value {
    font-size: 17px;
  }

  .dashboard-chart {
    height: 64px;
  }
}

// ========== SECTION 4: 系统赋能 - BentoGrid ==========
.empower-section {
  overflow: visible !important;
}

.empower-section .section-content {
  background: transparent;
  min-height: 400px;
}
</style>
