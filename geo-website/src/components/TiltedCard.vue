<template>
  <figure
    ref="cardRef"
    class="tilted-card"
    :style="{
      height: containerHeight,
      width: containerWidth
    }"
    @mousemove="handleMouse"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="showMobileWarning" class="mobile-warning">
      This effect is not optimized for mobile. Check on desktop.
    </div>

    <Motion
      tag="div"
      class="tilted-inner"
      :style="{
        width: imageWidth,
        height: imageHeight
      }"
      :animate="{
        rotateX: rotateXValue,
        rotateY: rotateYValue,
        scale: scaleValue
      }"
      :transition="springTransition"
    >
      <img
        :src="imageSrc"
        :alt="altText"
        class="tilted-img"
        :style="{
          width: imageWidth,
          height: imageHeight
        }"
      />

      <Motion
        v-if="displayOverlayContent"
        tag="div"
        class="tilted-overlay"
      >
        <slot name="overlay" />
      </Motion>
    </Motion>

    <Motion
      v-if="showTooltip && captionText"
      tag="figcaption"
      class="tilted-caption"
      :animate="{
        x: xValue,
        y: yValue,
        opacity: opacityValue,
        rotate: rotateFigcaptionValue
      }"
      :transition="tooltipTransition"
    >
      {{ captionText }}
    </Motion>
  </figure>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import { Motion } from 'motion-v';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: boolean;
  displayOverlayContent?: boolean;
}

const props = withDefaults(defineProps<TiltedCardProps>(), {
  altText: 'Tilted card image',
  captionText: '',
  containerHeight: '300px',
  containerWidth: '100%',
  imageHeight: '300px',
  imageWidth: '300px',
  scaleOnHover: 1.1,
  rotateAmplitude: 14,
  showMobileWarning: true,
  showTooltip: true,
  overlayContent: false,
  displayOverlayContent: false
});

const cardRef = useTemplateRef<HTMLElement>('cardRef');
const xValue = ref(0);
const yValue = ref(0);
const rotateXValue = ref(0);
const rotateYValue = ref(0);
const scaleValue = ref(1);
const opacityValue = ref(0);
const rotateFigcaptionValue = ref(0);
const lastY = ref(0);

const springTransition = computed(() => ({
  type: 'spring' as const,
  damping: 30,
  stiffness: 100,
  mass: 2
}));

const tooltipTransition = computed(() => ({
  type: 'spring' as const,
  damping: 30,
  stiffness: 350,
  mass: 1
}));

function handleMouse(e: MouseEvent) {
  if (!cardRef.value) return;

  const rect = cardRef.value.getBoundingClientRect();
  const offsetX = e.clientX - rect.left - rect.width / 2;
  const offsetY = e.clientY - rect.top - rect.height / 2;

  const rotationX = (offsetY / (rect.height / 2)) * -props.rotateAmplitude;
  const rotationY = (offsetX / (rect.width / 2)) * props.rotateAmplitude;

  rotateXValue.value = rotationX;
  rotateYValue.value = rotationY;

  xValue.value = e.clientX - rect.left;
  yValue.value = e.clientY - rect.top;

  const velocityY = offsetY - lastY.value;
  rotateFigcaptionValue.value = -velocityY * 0.6;
  lastY.value = offsetY;
}

function handleMouseEnter() {
  scaleValue.value = props.scaleOnHover;
  opacityValue.value = 1;
}

function handleMouseLeave() {
  opacityValue.value = 0;
  scaleValue.value = 1;
  rotateXValue.value = 0;
  rotateYValue.value = 0;
  rotateFigcaptionValue.value = 0;
}
</script>

<style scoped>
.tilted-card {
  position: relative;
  perspective: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.mobile-warning {
  position: absolute;
  top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  display: block;
}

@media (min-width: 640px) {
  .mobile-warning {
    display: none;
  }
}

.tilted-inner {
  position: relative;
  transform-style: preserve-3d;
}

.tilted-img {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 15px;
  will-change: transform;
  transform: translateZ(0);
}

.tilted-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  will-change: transform;
  transform: translateZ(30px);
}

.tilted-caption {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
  background: #fff;
  padding: 4px 10px;
  font-size: 10px;
  color: #2d2d2d;
  opacity: 0;
  z-index: 3;
}

@media (max-width: 639px) {
  .tilted-caption {
    display: none;
  }
}
</style>
