<script setup lang="ts">
import AuroraBackground from '../components/AuroraBackground.vue'
import BlurText from '../components/BlurText.vue'
</script>

<template>
  <div class="about-view">
    <div class="page-hero">
      <AuroraBackground
        :colorStops="['#4b33ff', '#0a0b14', '#00d4ff']"
        :amplitude="0.7"
        :blend="0.5"
        :speed="0.7"
        :intensity="0.6"
      />
      <div class="page-hero-content container">
        <BlurText
          text="关于我们"
          :delay="80"
          animateBy="words"
          direction="top"
          className="page-title"
          :stepDuration="0.4"
        />
        <BlurText
          text="智优康赛，生成式引擎优化领域的先行者与战略服务商"
          :delay="40"
          animateBy="words"
          direction="top"
          className="page-subtitle"
          :stepDuration="0.35"
        />
      </div>
    </div>

    <div class="container page-body">
      <div class="coming-soon">
        <BlurText
          text="页面建设中，敬请期待"
          :delay="50"
          animateBy="words"
          direction="bottom"
          className="coming-text"
          :stepDuration="0.3"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

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
  gap: $space-4;
}

.page-title {
  font-size: clamp(2rem, 6vw, 3.5rem) !important;
  font-weight: 700 !important;
  color: $text-primary !important;
  line-height: 1.1 !important;
  background: $gradient-hero !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

.page-subtitle {
  font-size: $text-lg !important;
  color: $text-secondary !important;
  max-width: 600px !important;
  line-height: 1.6 !important;
}

.page-body {
  padding: $space-16 0;

  @media (max-width: 768px) {
    padding: $space-10 0;
  }
}

.coming-soon {
  text-align: center;
  padding: $space-20 0;
}

.coming-text {
  font-size: $text-xl !important;
  color: $text-tertiary !important;
  font-weight: 500 !important;
}
</style>
