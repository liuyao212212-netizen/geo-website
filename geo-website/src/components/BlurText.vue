<template>
  <p ref="rootRef" class="flex flex-wrap blur-text" :class="className">
    <!-- Motion 组件只在 ready 后才渲染，确保 inView 已确定，避免动画触发错过 -->
    <template v-if="ready">
      <Motion
        v-for="(segment, index) in elements"
        :key="`${segment}-${index}`"
        tag="span"
        :initial="fromSnapshot"
        :animate="inView ? buildKeyframes(fromSnapshot, toSnapshots) : fromSnapshot"
        :transition="getTransition(index)"
        @animation-complete="handleAnimationComplete(index)"
        style="display: inline-block; will-change: transform, filter, opacity"
      >
        {{ segment === ' ' ? '\u00A0' : segment }}
        <template v-if="animateBy === 'words' && index < elements.length - 1">&nbsp;</template>
      </Motion>
    </template>
    <!-- ready 前渲染不可见占位文本，保持布局稳定 -->
    <template v-else>
      <span
        v-for="(segment, index) in elements"
        :key="`ph-${segment}-${index}`"
        style="display: inline-block; opacity: 0; filter: blur(10px);"
      >
        {{ segment === ' ' ? '\u00A0' : segment }}
        <template v-if="animateBy === 'words' && index < elements.length - 1">&nbsp;</template>
      </span>
    </template>
  </p>
</template>

<script setup lang="ts">
import { Motion, type Transition } from 'motion-v';
import { computed, nextTick, onActivated, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const props = withDefaults(defineProps<BlurTextProps>(), {
  text: '',
  delay: 200,
  className: '',
  animateBy: 'words',
  direction: 'top',
  threshold: 0.1,
  rootMargin: '0px',
  easing: (t: number) => t,
  stepDuration: 0.35
});

const inView = ref(false);
const ready = ref(false);
const rootRef = useTemplateRef<HTMLParagraphElement>('rootRef');
let observer: IntersectionObserver | null = null;

const setupObserver = () => {
  if (!rootRef.value) return;

  // Immediate check: if element is already in viewport, trigger right away
  const rect = rootRef.value.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  if (isVisible) {
    inView.value = true;
    ready.value = true;
    return;
  }

  // Set up IntersectionObserver for scroll-triggered visibility
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true;
        ready.value = true;
        if (rootRef.value) observer?.unobserve(rootRef.value);
      }
    },
    {
      threshold: 0,
      rootMargin: props.rootMargin
    }
  );

  observer.observe(rootRef.value);
};

onMounted(() => {
  // Wait for DOM to fully settle after route transition / lazy chunk load
  nextTick(() => {
    requestAnimationFrame(() => {
      setupObserver();
    });
  });

  // Fallback: force ready after 600ms if still not triggered
  // (handles race conditions during route transitions, slow chunk loads, etc.)
  const fallbackTimer = setTimeout(() => {
    if (!ready.value) {
      // If element is in viewport, trigger animation
      if (rootRef.value) {
        const r = rootRef.value.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          inView.value = true;
        }
      }
      // Always mark ready so Motion renders (even if still hidden, it'll animate when scrolled into view)
      ready.value = true;
    }
  }, 600);

  onBeforeUnmount(() => {
    clearTimeout(fallbackTimer);
  });
});

onActivated(() => {
  // Re-trigger when kept-alive component is activated
  // Reset state first, then re-run visibility check
  inView.value = false;
  ready.value = false;
  nextTick(() => {
    requestAnimationFrame(() => {
      setupObserver();
    });
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});

const elements = computed(() => (props.animateBy === 'words' ? props.text.split(' ') : props.text.split('')));

const defaultFrom = computed(() =>
  props.direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 }
);

const defaultTo = computed(() => [
  {
    filter: 'blur(5px)',
    opacity: 0.5,
    y: props.direction === 'top' ? 5 : -5
  },
  {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0
  }
]);

const fromSnapshot = computed(() => props.animationFrom ?? defaultFrom.value);
const toSnapshots = computed(() => props.animationTo ?? defaultTo.value);

const stepCount = computed(() => toSnapshots.value.length + 1);
const totalDuration = computed(() => props.stepDuration * (stepCount.value - 1));

const times = computed(() =>
  Array.from({ length: stepCount.value }, (_, i) => (stepCount.value === 1 ? 0 : i / (stepCount.value - 1)))
);

const getTransition = (index: number): Transition => ({
  duration: totalDuration.value,
  times: times.value,
  delay: (index * props.delay) / 1000,
  ease: props.easing
});

const handleAnimationComplete = (index: number) => {
  if (index === elements.value.length - 1) {
    props.onAnimationComplete?.();
  }
};
</script>
