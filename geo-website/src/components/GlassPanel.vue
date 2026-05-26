<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  glow?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  hover: true,
  glow: false
})
</script>

<template>
  <div
    :class="[
      'glass-panel',
      `padding-${padding}`,
      { 'hover-effect': hover, 'glow-effect': glow }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.glass-panel {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid $border-medium;
  border-radius: $radius-xl;
  overflow: hidden;

  // Corner accent
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: linear-gradient(225deg, rgba(75, 51, 255, 0.15) 0%, transparent 60%);
    border-top-right-radius: $radius-xl;
    pointer-events: none;
  }

  // Padding sizes
  &.padding-none {
    padding: 0;
  }

  &.padding-sm {
    padding: $space-4;
  }

  &.padding-md {
    padding: $space-6;
  }

  &.padding-lg {
    padding: $space-8;
  }

  &.padding-xl {
    padding: $space-10;
  }

  // Hover effect
  &.hover-effect {
    transition: all $transition-normal;

    &:hover {
      border-color: $border-strong;
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(75, 51, 255, 0.08);
    }
  }

  // Glow effect
  &.glow-effect {
    box-shadow: 0 0 40px rgba(75, 51, 255, 0.1);

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(75, 51, 255, 0.15);
    }
  }
}
</style>
