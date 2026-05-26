<script setup lang="ts">
import { ref } from 'vue'
import BlurText from './BlurText.vue'

interface Step {
  icon: string
  title: string
  desc: string
}

interface Props {
  steps: Step[]
  lineColor?: string
  dotColor?: string
  dotTextColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  lineColor: 'rgba(75, 51, 255, 0.3)',
  dotColor: 'rgba(75, 51, 255, 0.15)',
  dotTextColor: 'rgba(75, 51, 255, 0.9)'
})

const hoveredIndex = ref<number | null>(null)
</script>

<template>
  <div class="timeline-steps">
    <div
      v-for="(step, i) in steps"
      :key="i"
      :class="['timeline-step', { hovered: hoveredIndex === i }]"
      @mouseenter="hoveredIndex = i"
      @mouseleave="hoveredIndex = null"
    >
      <!-- Number dot -->
      <div class="timeline-dot-wrapper">
        <div class="timeline-dot">{{ i + 1 }}</div>
        <!-- Connecting line (not for last item) -->
        <div
          v-if="i < steps.length - 1"
          class="timeline-line"
          :style="{ background: lineColor }"
        />
      </div>

      <!-- Content card -->
      <div class="timeline-card">
        <div class="timeline-icon">{{ step.icon }}</div>
        <BlurText
          :text="step.title"
          :delay="40"
          animateBy="words"
          direction="top"
          className="timeline-title"
          :stepDuration="0.3"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.timeline-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-step {
  display: flex;
  gap: $space-5;
  padding: $space-5 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &.hovered {
    .timeline-card {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(75, 51, 255, 0.2);
      transform: translateX(4px);
    }

    .timeline-dot {
      background: rgba(75, 51, 255, 0.3);
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    gap: $space-4;
    padding: $space-4 0;
  }
}

.timeline-dot-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  position: relative;
}

.timeline-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: v-bind(dotColor);
  color: v-bind(dotTextColor);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(75, 51, 255, 0.2);

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
}

.timeline-line {
  width: 2px;
  flex: 1;
  min-height: 40px;
  margin: 8px 0;

  @media (max-width: 768px) {
    min-height: 32px;
  }
}

.timeline-card {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: $radius-lg;
  padding: $space-5;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: $space-4;
  }
}

.timeline-icon {
  font-size: 1.5rem;
  margin-bottom: $space-3;
  line-height: 1;
}

.timeline-title {
  font-size: $text-base !important;
  font-weight: 600 !important;
  color: $text-primary !important;
  margin-bottom: $space-2 !important;
  line-height: 1.3 !important;
}

</style>
