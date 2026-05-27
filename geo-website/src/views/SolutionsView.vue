<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MagicRings from '../components/MagicRings.vue'
import BlurText from '../components/BlurText.vue'
import GlassSurface from '../components/GlassSurface.vue'

const emit = defineEmits<{
  openForm: []
}>()

// ========== AI Platforms ==========
const aiPlatforms = [
  '豆包', '腾讯元宝', '通义千问', '文心一言', '智谱清言',
  'DeepSeek', 'Kimi', 'ChatGPT', 'Gemini', 'Google AI Overview',
  'Perplexity', 'Claude'
]

// ========== GEO 3-Step Strategy ==========
const geoStrategy = [
  {
    step: '01',
    title: '被找到',
    subtitle: '让品牌成为AI可信的信息源',
    desc: '通过结构化内容建设、信源优化和多平台占位，确保品牌信息融入AI生成的回答中，在用户获取信息的第一时间进入其视野。',
    highlights: ['高频场景覆盖', '权威数据植入', '跨平台内容复用']
  },
  {
    step: '02',
    subtitle: '主动影响AI，引导AI影响用户',
    title: '被采纳',
    desc: '主动管理品牌在AI平台中的信息质量与呈现方式，通过知识库建设、语义优化和内容策略，引导AI优先采用品牌内容作为回答依据。',
    highlights: ['知识库建设', '多模态内容适配', '竞品对比差异化']
  },
  {
    step: '03',
    title: '被认可',
    subtitle: '获得首推优先级与权威背书',
    desc: '通过持续优化品牌在AI眼中的EEAT评分（经验、专业、权威、可信），建立品牌在AI推荐生态中的领先地位，获得首推优先级。',
    highlights: ['EEAT评分提升', '首推率优化', '品牌壁垒构建']
  }
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

// ========== GEO Benefits ==========
const geoBenefits = [
  { value: '50%+', label: '全球用户使用AI搜索' },
  { value: '20%+', label: 'AI搜索年增速' },
  { value: '3472亿', label: '2029年AI搜索市场规模' },
  { value: '45%', label: '高净值人群依赖AI决策' }
]

// ========== 10 Core Services ==========
const servicesList = [
  {
    num: '01',
    title: 'GEO',
    subtitle: '（生成式引擎优化）',
    desc: '构建"洞察-生产-占位-演进"GEO闭环。通过多模态图谱向AI模型输入真实信源，管理品牌数字声誉并沉淀数据资产，助力实现全网信息同频与业务转化。'
  },
  {
    num: '02',
    title: '内容营销',
    subtitle: '',
    desc: '依托短视频平台、小红书与知乎等媒介，制定内容生产与分发策略。建立企业知识图谱与用户心智认知，驱动产品种草与商业转化。'
  },
  {
    num: '03',
    title: '效果营销',
    subtitle: '',
    desc: '提供搜索引擎优化(SEO)、APP推广与活动策划服务。建立数据分析模型，规划用户生命周期与增长路径，提升线索量与投入产出比(ROI)。'
  },
  {
    num: '04',
    title: '数字广告',
    subtitle: '',
    desc: '整合搜索竞价、信息流、短视频及富媒体等渠道网络。执行广告投放与植入操作，进行跨平台流量获取、人群定向与转化追踪。'
  },
  {
    num: '05',
    title: '品牌公关',
    subtitle: '',
    desc: '制定品牌公关策略与传播路径。搭建主流媒体矩阵与危机防御机制，管理企业品牌声誉，传递企业正向社会价值。'
  },
  {
    num: '06',
    title: '创意营销',
    subtitle: '',
    desc: '建立企业视觉资产。涵盖标志及VI视觉系统、IP形象塑造、平面与3D视觉制作及动画开发，建立统一的品牌对外视觉识别标准。'
  },
  {
    num: '07',
    title: '社交营销',
    subtitle: '',
    desc: '微信、微博等社交媒体矩阵及用户社群策划。社交平台活动策划与口碑管理，搭建品牌与用户的直接交互渠道及私域流量池。'
  },
  {
    num: '08',
    title: '出海营销',
    subtitle: '',
    desc: '协助中国企业搭建符合目标国当地市场的品牌传播与获客体系。部署海外营销系统，提供多语种建站、多语种SEO与海外数字广告投放服务。'
  },
  {
    num: '09',
    title: '智能营销',
    subtitle: '',
    desc: '部署营销技术基础设施。开发营销型网站，接入舆情监测、SCRM及营销自动化系统，实现线索培育与营销业务的数字化管理。'
  },
  {
    num: '10',
    title: '品牌战略与定位',
    subtitle: '',
    desc: '制定企业顶层品牌规划。开展市场洞察与竞品分析，确立核心价值与差异化定位。搭建品牌架构，指导全链路营销落地，实现用户心智占领与长期商业增长。'
  }
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

    <!-- ========== SECTION 1: 全方位GEO ========== -->
    <section class="section geo-overview-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="全方位GEO"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <p class="section-desc scroll-reveal">
            从SEO到GEO，18年搜索技术积累，构建品牌在AI时代的新竞争优势
          </p>
        </div>

        <div class="geo-benefits scroll-reveal">
          <GlassSurface
            v-for="(item, index) in geoBenefits"
            :key="index"
            class="benefit-card"
          >
            <div class="benefit-value">{{ item.value }}</div>
            <div class="benefit-label">{{ item.label }}</div>
          </GlassSurface>
        </div>

        <div class="geo-intro-text scroll-reveal">
          <p>生成式AI正以革命性力量重塑商业，品牌竞争主战场从"流量入口"转向"认知入口"。GEO（Generative Engine Optimization，生成式引擎优化）即针对生成式AI引擎的内容优化，其核心目标在于使品牌在AI生成的回答中实现"被提及""被引用""被推荐"的三重可见性。</p>
          <p>消费者依赖AI决策，催生GEO需求。企业只有开展GEO营销动作，才能在技术浪潮中构筑竞争优势。智优康赛依托耐特康赛18年搜索技术沉淀，帮助企业从"AI隐形"到"AI首推"。</p>
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
          <p class="section-desc scroll-reveal">
            覆盖国内外主流AI平台，全方位布局品牌AI可见性
          </p>
        </div>

        <div class="platforms-grid scroll-reveal">
          <div
            v-for="(platform, index) in aiPlatforms"
            :key="index"
            class="platform-chip"
          >
            <span class="platform-name">{{ platform }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 3: AI搜索优化策略 ========== -->
    <section class="section strategy-section">
      <div class="container">
        <div class="section-header scroll-reveal">
          <BlurText
            text="AI搜索优化策略"
            :delay="60"
            animateBy="words"
            direction="top"
            className="section-title"
            :stepDuration="0.4"
          />
          <p class="section-desc scroll-reveal">
            从收录到认可到推荐的三部曲
          </p>
        </div>

        <div class="strategy-steps scroll-reveal">
          <GlassSurface
            v-for="(item, index) in geoStrategy"
            :key="index"
            class="strategy-card"
            :class="{ 'strategy-card--reverse': index % 2 !== 0 }"
          >
            <div class="strategy-step-num">{{ item.step }}</div>
            <div class="strategy-content">
              <div class="strategy-title-row">
                <h3 class="strategy-title">{{ item.title }}</h3>
                <span class="strategy-subtitle">{{ item.subtitle }}</span>
              </div>
              <p class="strategy-desc">{{ item.desc }}</p>
              <div class="strategy-highlights">
                <span
                  v-for="(h, hi) in item.highlights"
                  :key="hi"
                  class="strategy-highlight"
                >
                  {{ h }}
                </span>
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 4: GEO法则 ========== -->
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
          <p class="section-desc scroll-reveal">
            耐特康赛独家GEO方法论，构建品牌在AI语料中的可信知识体与推荐优先级
          </p>
        </div>

        <div class="framework-grid scroll-reveal">
          <GlassSurface
            v-for="(item, index) in geo3C"
            :key="index"
            class="framework-card"
          >
            <div class="framework-step">{{ item.step }}</div>
            <div class="framework-icon" v-html="item.icon" />
            <h3 class="framework-title">{{ item.title }}</h3>
            <p class="framework-subtitle">{{ item.subtitle }}</p>
            <p class="framework-desc">{{ item.desc }}</p>
          </GlassSurface>
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
          <p class="section-desc scroll-reveal">
            品效合一，为企业提供从流量获取到商业转化的一站式解决方案
          </p>
        </div>

        <div class="services-list scroll-reveal">
          <GlassSurface
            v-for="(service, index) in servicesList"
            :key="index"
            class="service-card"
            :borderRadius="16"
            :backgroundOpacity="0.03"
            :blur="12"
            :saturation="1.2"
          >
            <div class="service-card-inner">
              <div class="service-card-left">
                <span class="service-num">{{ service.num }}</span>
                <div class="service-title-group">
                  <span class="service-title">{{ service.title }}</span>
                  <span v-if="service.subtitle" class="service-subtitle">{{ service.subtitle }}</span>
                </div>
              </div>
              <span class="service-divider" />
              <p class="service-desc">{{ service.desc }}</p>
            </div>
          </GlassSurface>
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
          <p class="section-desc scroll-reveal">
            通过GEO优化为品牌获取的实质性成果
          </p>
        </div>

        <div class="results-grid scroll-reveal">
          <GlassSurface class="result-card result-card--highlight">
            <div class="result-value">82%</div>
            <div class="result-label">品牌提及率</div>
            <div class="result-desc">栖息地智能住宅从0%提升至82%，核心场景首推率达78%-85%</div>
          </GlassSurface>
          <GlassSurface class="result-card">
            <div class="result-value">300%</div>
            <div class="result-label">曝光量提升</div>
            <div class="result-desc">得实打印机在DeepSeek平台曝光量提升300%</div>
          </GlassSurface>
          <GlassSurface class="result-card">
            <div class="result-value">1:8.5</div>
            <div class="result-label">ROI回报比</div>
            <div class="result-desc">栖息地项目投入约60万元，商业价值约510万元</div>
          </GlassSurface>
          <GlassSurface class="result-card">
            <div class="result-value">67%</div>
            <div class="result-label">搜索量增长</div>
            <div class="result-desc">栖息地品牌主动搜索量从800次增长至1500次/月</div>
          </GlassSurface>
        </div>
      </div>
    </section>

    <!-- ========== SECTION 7: CTA ========== -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content scroll-reveal">
          <BlurText
            text="开启品牌AI搜索增长"
            :delay="60"
            animateBy="words"
            direction="top"
            className="cta-title"
            :stepDuration="0.4"
          />
          <BlurText
            text="与智优康赛一起，在AI搜索时代构建品牌新壁垒"
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
            <router-link to="/cases" class="cta-btn cta-btn--secondary">
              查看客户案例
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

// ========== SECTION 1: GEO Overview ==========
.geo-overview-section {
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

.geo-benefits {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-6;
  margin-bottom: $space-16;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  padding: $space-8;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-glow;
  }
}

.benefit-value {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: $space-2;
}

.benefit-label {
  font-size: $text-sm;
  color: $text-secondary;
}

.geo-intro-text {
  max-width: 800px;
  margin: 0 auto;

  p {
    font-size: $text-base;
    color: $text-secondary;
    line-height: 1.8;
    margin-bottom: $space-4;

    &:last-child {
      margin-bottom: 0;
    }
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

.platforms-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $space-4;
  justify-content: center;
}

.platform-chip {
  display: inline-flex;
  align-items: center;
  padding: $space-3 $space-6;
  border-radius: $radius-pill;
  background: rgba(75, 51, 255, 0.06);
  border: 1px solid rgba(75, 51, 255, 0.15);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: rgba(75, 51, 255, 0.12);
    border-color: rgba(75, 51, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(75, 51, 255, 0.15);
  }
}

.platform-name {
  font-size: $text-sm;
  font-weight: 500;
  color: $text-primary;
  white-space: nowrap;
}

// ========== SECTION 3: Strategy ==========
.strategy-section {
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

.strategy-steps {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.strategy-card {
  padding: $space-8;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $space-8;
  align-items: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-glow;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-4;
  }
}

.strategy-step-num {
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: 700;
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.strategy-title-row {
  margin-bottom: $space-4;
}

.strategy-title {
  font-size: $text-xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $space-1;
}

.strategy-subtitle {
  font-size: $text-sm;
  color: $accent-purple;
}

.strategy-desc {
  font-size: $text-base;
  color: $text-secondary;
  line-height: 1.7;
  margin-bottom: $space-5;
}

.strategy-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

.strategy-highlight {
  font-size: $text-xs;
  color: $text-secondary;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $border-subtle;
  padding: $space-2 $space-4;
  border-radius: $radius-pill;
}

// ========== SECTION 4: Framework ==========
.framework-section {
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

.framework-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-6;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.framework-card {
  padding: $space-8;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-glow;
  }
}

.framework-step {
  font-size: $text-xs;
  font-weight: 700;
  color: $accent-purple;
  background: rgba(75, 51, 255, 0.1);
  border: 1px solid rgba(75, 51, 255, 0.2);
  padding: $space-1 $space-3;
  border-radius: $radius-pill;
  display: inline-block;
  margin-bottom: $space-5;
}

.framework-icon {
  width: 48px;
  height: 48px;
  color: $accent-purple;
  margin: 0 auto $space-4;
  opacity: 0.8;

  svg {
    width: 100%;
    height: 100%;
  }
}

.framework-title {
  font-size: $text-xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $space-2;
}

.framework-subtitle {
  font-size: $text-sm;
  color: $accent-cyan;
  margin-bottom: $space-4;
}

.framework-desc {
  font-size: $text-sm;
  color: $text-secondary;
  line-height: 1.7;
}

// ========== SECTION 5: Services ==========
.services-section {
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

.services-list {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  max-width: 1100px;
  margin: 0 auto;
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.service-card-inner {
  display: flex;
  align-items: center;
  gap: $space-6;
  padding: $space-6 $space-8;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: $space-4;
    padding: $space-5 $space-6;
  }
}

.service-card-left {
  display: flex;
  align-items: center;
  gap: $space-4;
  flex-shrink: 0;
  min-width: 260px;

  @media (max-width: 768px) {
    min-width: auto;
    gap: $space-3;
  }
}

.service-num {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: rgba(75, 51, 255, 0.25);
  line-height: 1;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
}

.service-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.service-title {
  font-size: $text-lg;
  font-weight: 700;
  color: $text-primary;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: $text-base;
  }
}

.service-subtitle {
  font-size: $text-xs;
  color: $text-tertiary;
  line-height: 1.3;
}

.service-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, transparent 0%, rgba(75, 51, 255, 0.3) 50%, transparent 100%);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(75, 51, 255, 0.3) 50%, transparent 100%);
  }
}

.service-desc {
  font-size: $text-sm;
  color: $text-secondary;
  line-height: 1.7;
  flex: 1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: $text-sm;
    line-height: 1.6;
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

.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-6;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.result-card {
  padding: $space-8;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-glow;
  }

  &--highlight {
    grid-column: 1 / -1;
    text-align: center;

    .result-value {
      font-size: clamp(3.5rem, 8vw, 5rem);
    }

    .result-desc {
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

.result-value {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: $space-3;
}

.result-label {
  font-size: $text-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $space-3;
}

.result-desc {
  font-size: $text-sm;
  color: $text-tertiary;
  line-height: 1.6;
}

// ========== SECTION 7: CTA ==========
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
