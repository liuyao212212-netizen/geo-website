<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  imageSrc: string
  backText?: string
  backSubtext?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  backText: '',
  backSubtext: '',
  width: 180,
  height: 240
})

const isHovered = ref(false)
</script>

<template>
  <div
    class="book-card"
    :style="{
      '--book-width': width + 'px',
      '--book-height': height + 'px'
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div :class="['book', { hovered: isHovered }]">
      <!-- Inner pages (visible when cover opens) -->
      <div class="book-inner">
        <div class="book-page book-page-1"></div>
        <div class="book-page book-page-2"></div>
        <div class="book-page book-page-3"></div>
        <div class="book-back-content">
          <p class="back-title">{{ backText }}</p>
          <p class="back-subtitle">{{ backSubtext }}</p>
        </div>
      </div>

      <!-- Cover (flips on hover) -->
      <div class="book-cover">
        <img :src="imageSrc" alt="" class="cover-image" />
        <div class="cover-spine"></div>
        <div class="cover-shine"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.book-card {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 800px;
}

.book {
  position: relative;
  width: var(--book-width);
  height: var(--book-height);
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

// Inner pages container (the "book block")
.book-inner {
  position: absolute;
  inset: 0;
  border-radius: 4px 12px 12px 4px;
  background: rgba(20, 16, 40, 0.95);
  overflow: hidden;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    2px 4px 16px rgba(0, 0, 0, 0.4);
}

// Stacked page edges (visible when cover opens)
.book-page {
  position: absolute;
  right: 0;
  border-radius: 0 12px 12px 0;
  background: rgba(30, 24, 55, 0.9);
  border-left: 1px solid rgba(255, 255, 255, 0.04);
}

.book-page-1 {
  top: 4px;
  bottom: 4px;
  left: 12px;
  z-index: 1;
}

.book-page-2 {
  top: 8px;
  bottom: 8px;
  left: 16px;
  z-index: 2;
  background: rgba(38, 30, 65, 0.9);
}

.book-page-3 {
  top: 12px;
  bottom: 12px;
  left: 20px;
  z-index: 3;
  background: rgba(45, 36, 75, 0.9);
}

// Back content (behind cover)
.book-back-content {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.4s ease 0.15s;

  .hovered & {
    opacity: 1;
  }
}

.back-title {
  font-size: 15px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px;
  line-height: 1.3;
  background: linear-gradient(135deg, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.back-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  line-height: 1.5;
}

// Cover (the front face that flips)
.book-cover {
  position: absolute;
  inset: 0;
  z-index: 10;
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 4px 12px 12px 4px;
  overflow: hidden;

  .hovered & {
    transform: rotateY(-170deg);
  }
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// Spine effect (left edge of cover)
.cover-spine {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(
    90deg,
    rgba(75, 51, 255, 0.4) 0%,
    rgba(75, 51, 255, 0.1) 100%
  );
  z-index: 2;
}

// Shine sweep on hover
.cover-shine {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.08) 45%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.08) 55%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.8s ease;
  pointer-events: none;

  .hovered & {
    transform: translateX(100%);
  }
}

// Mobile: gentle tilt on hover instead of full flip
@media (max-width: 768px) {
  .book-cover {
    .hovered & {
      transform: rotateY(-25deg);
    }
  }

  .book-back-content {
    // On mobile, show a subtle hint even with partial open
    transition: opacity 0.3s ease 0.1s;
  }
}

// Hover shadow depth
.book {
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 10%;
    right: 10%;
    height: 16px;
    background: rgba(75, 51, 255, 0.15);
    filter: blur(12px);
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
  }

  &.hovered::after {
    bottom: -12px;
    left: 5%;
    right: 5%;
    height: 20px;
    background: rgba(75, 51, 255, 0.25);
    filter: blur(16px);
  }
}
</style>
