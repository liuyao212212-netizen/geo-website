<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false
})
</script>

<template>
  <button
    :class="[
      'base-button',
      `variant-${variant}`,
      `size-${size}`,
      { disabled }
    ]"
    :disabled="disabled"
  >
    <!-- Blob effects for primary variant -->
    <div v-if="variant === 'primary'" class="blob blob-1"></div>
    <div v-if="variant === 'primary'" class="blob blob-2"></div>
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  font-family: $font-family;
  font-weight: $font-medium;
  border-radius: $radius-pill;
  cursor: pointer;
  overflow: hidden;
  transition: all $transition-normal;
  white-space: nowrap;
  border: 1px solid transparent;
  isolation: isolate;

  .button-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  // Sizes
  &.size-sm {
    padding: $space-2 $space-5;
    font-size: $text-sm;

    .blob { width: 80px; height: 80px; }
  }

  &.size-md {
    padding: $space-3 $space-8;
    font-size: $text-base;

    .blob { width: 120px; height: 120px; }
  }

  &.size-lg {
    padding: $space-4 $space-10;
    font-size: $text-lg;

    .blob { width: 150px; height: 150px; }
  }

  // ========== BLOB ANIMATION ==========
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(20px);
    opacity: 0.6;
    z-index: 1;
    transition: opacity $transition-normal, transform $transition-slow;
    pointer-events: none;
  }

  .blob-1 {
    background: radial-gradient(circle, rgba($accent-purple, 0.7) 0%, rgba($accent-purple, 0) 70%);
    top: -50%;
    left: -20%;
    animation: blobMove1 6s ease-in-out infinite;
  }

  .blob-2 {
    background: radial-gradient(circle, rgba($accent-blue, 0.6) 0%, rgba($accent-cyan, 0) 70%);
    bottom: -50%;
    right: -20%;
    animation: blobMove2 7s ease-in-out infinite;
  }

  @keyframes blobMove1 {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(30%, 20%) scale(1.1);
    }
    50% {
      transform: translate(10%, 40%) scale(0.9);
    }
    75% {
      transform: translate(-10%, 20%) scale(1.05);
    }
  }

  @keyframes blobMove2 {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(-20%, -30%) scale(1.15);
    }
    50% {
      transform: translate(-30%, -10%) scale(0.85);
    }
    75% {
      transform: translate(-10%, -20%) scale(1.05);
    }
  }

  // ========== VARIANTS ==========
  &.variant-default {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-color: $border-strong;
    color: $text-primary;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(75, 51, 255, 0.15) 0%, rgba(76, 117, 255, 0.08) 100%);
      opacity: 0;
      transition: opacity $transition-normal;
      border-radius: inherit;
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(75, 51, 255, 0.15);

      &::before {
        opacity: 1;
      }
    }
  }

  &.variant-primary {
    background: linear-gradient(135deg, rgba(75, 51, 255, 0.25) 0%, rgba(76, 117, 255, 0.12) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-color: rgba(75, 51, 255, 0.4);
    color: $text-primary;

    // Hover: blobs intensify + glow
    &:hover {
      border-color: rgba(75, 51, 255, 0.7);
      transform: translateY(-2px);
      box-shadow: 0 8px 40px rgba(75, 51, 255, 0.4);

      .blob {
        opacity: 1;
        filter: blur(25px);
      }

      .blob-1 {
        transform: translate(20%, 10%) scale(1.2);
      }

      .blob-2 {
        transform: translate(-15%, -15%) scale(1.15);
      }
    }

    &:active {
      transform: translateY(0) scale(0.98);

      .blob {
        opacity: 0.8;
        filter: blur(15px);
      }
    }
  }

  &.variant-ghost {
    background: transparent;
    border-color: transparent;
    color: $text-secondary;

    &:hover {
      color: $text-primary;
      background: rgba(255, 255, 255, 0.05);
    }
  }

  &:active:not(.variant-primary) {
    transform: translateY(0) scale(0.98);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
