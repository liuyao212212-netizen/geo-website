<template>
  <div ref="containerRef" :class="['glass-surface', className]" :style="containerStyles">
    <svg class="glass-surface__svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter :id="filterId" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
          <feImage ref="feImageRef" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap ref="redChannelRef" in="SourceGraphic" in2="map" result="dispRed" />
          <feColorMatrix in="dispRed" type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feDisplacementMap ref="greenChannelRef" in="SourceGraphic" in2="map" result="dispGreen" />
          <feColorMatrix in="dispGreen" type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feDisplacementMap ref="blueChannelRef" in="SourceGraphic" in2="map" result="dispBlue" />
          <feColorMatrix in="dispBlue" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur ref="gaussianBlurRef" in="output" stdDeviation="0.7" />
        </filter>
      </defs>
    </svg>
    <div class="glass-surface__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, useTemplateRef, onMounted, computed, watch, nextTick, onUnmounted } from 'vue';

interface GlassSurfaceProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: string;
  className?: string;
  style?: CSSProperties;
}

const props = withDefaults(defineProps<GlassSurfaceProps>(), {
  width: '100%',
  height: 'auto',
  borderRadius: 16,
  borderWidth: 0.07,
  brightness: 70,
  opacity: 0.93,
  blur: 11,
  displace: 0.5,
  backgroundOpacity: 0.1,
  saturation: 1,
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20,
  xChannel: 'R',
  yChannel: 'G',
  mixBlendMode: 'difference',
  className: '',
  style: () => ({})
});

const generateUniqueId = () => Math.random().toString(36).substring(2, 15);
const uniqueId = generateUniqueId();
const filterId = `glass-filter-${uniqueId}`;
const redGradId = `red-grad-${uniqueId}`;
const blueGradId = `blue-grad-${uniqueId}`;

const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const feImageRef = useTemplateRef<SVGElement>('feImageRef');
const redChannelRef = useTemplateRef<SVGElement>('redChannelRef');
const greenChannelRef = useTemplateRef<SVGElement>('greenChannelRef');
const blueChannelRef = useTemplateRef<SVGElement>('blueChannelRef');
const gaussianBlurRef = useTemplateRef<SVGElement>('gaussianBlurRef');

let resizeObserver: ResizeObserver | null = null;

const generateDisplacementMap = () => {
  const rect = containerRef.value?.getBoundingClientRect();
  const actualWidth = rect?.width || 400;
  const actualHeight = rect?.height || 200;
  const edgeSize = Math.min(actualWidth, actualHeight) * (props.borderWidth * 0.5);

  const svgContent = `
    <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
      <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${props.borderRadius}" fill="url(#${redGradId})" />
      <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${props.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${props.mixBlendMode}" />
      <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${props.borderRadius}" fill="hsl(0 0% ${props.brightness}% / ${props.opacity})" style="filter:blur(${props.blur}px)" />
    </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
};

const updateDisplacementMap = () => {
  if (feImageRef.value) {
    feImageRef.value.setAttribute('href', generateDisplacementMap());
  }
};

const supportsSVGFilters = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  if (isWebkit || isFirefox) return false;
  const div = document.createElement('div');
  div.style.backdropFilter = `url(#${filterId})`;
  return div.style.backdropFilter !== '';
};

const supportsBackdropFilter = () => {
  if (typeof window === 'undefined') return false;
  return CSS.supports('backdrop-filter', 'blur(10px)');
};

const containerStyles = computed(() => {
  const baseStyles: Record<string, string | number> = {
    ...props.style,
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    borderRadius: `${props.borderRadius}px`,
  };

  const svgSupported = supportsSVGFilters();
  const backdropFilterSupported = supportsBackdropFilter();

  if (svgSupported) {
    return {
      ...baseStyles,
      background: `hsl(0 0% 0% / ${props.backgroundOpacity})`,
      backdropFilter: `url(#${filterId}) saturate(${props.saturation})`,
      boxShadow: `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
         0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
         0px 4px 16px rgba(17, 17, 26, 0.05),
         0px 8px 24px rgba(17, 17, 26, 0.05),
         0px 16px 56px rgba(17, 17, 26, 0.05),
         0px 4px 16px rgba(17, 17, 26, 0.05) inset,
         0px 8px 24px rgba(17, 17, 26, 0.05) inset,
         0px 16px 56px rgba(17, 17, 26, 0.05) inset`
    };
  } else {
    if (!backdropFilterSupported) {
      return {
        ...baseStyles,
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 0 rgba(255, 255, 255, 0.08)`
      };
    } else {
      return {
        ...baseStyles,
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px) saturate(1.8) brightness(1.2)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.8) brightness(1.2)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `0 8px 32px 0 rgba(75, 51, 255, 0.08),
                    0 2px 16px 0 rgba(75, 51, 255, 0.04),
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)`
      };
    }
  }
});

const updateFilterElements = () => {
  const elements = [
    { ref: redChannelRef, offset: props.redOffset },
    { ref: greenChannelRef, offset: props.greenOffset },
    { ref: blueChannelRef, offset: props.blueOffset }
  ];

  elements.forEach(({ ref: elRef, offset }) => {
    if (elRef.value) {
      elRef.value.setAttribute('scale', (props.distortionScale + offset).toString());
      elRef.value.setAttribute('xChannelSelector', props.xChannel);
      elRef.value.setAttribute('yChannelSelector', props.yChannel);
    }
  });

  if (gaussianBlurRef.value) {
    gaussianBlurRef.value.setAttribute('stdDeviation', props.displace.toString());
  }
};

const setupResizeObserver = () => {
  if (!containerRef.value || typeof ResizeObserver === 'undefined') return;
  resizeObserver = new ResizeObserver(() => {
    setTimeout(updateDisplacementMap, 0);
  });
  resizeObserver.observe(containerRef.value);
};

watch(
  [
    () => props.width, () => props.height, () => props.borderRadius,
    () => props.borderWidth, () => props.brightness, () => props.opacity,
    () => props.blur, () => props.displace, () => props.distortionScale,
    () => props.redOffset, () => props.greenOffset, () => props.blueOffset,
    () => props.xChannel, () => props.yChannel, () => props.mixBlendMode
  ],
  () => {
    updateDisplacementMap();
    updateFilterElements();
  }
);

watch([() => props.width, () => props.height], () => {
  setTimeout(updateDisplacementMap, 0);
});

onMounted(() => {
  nextTick(() => {
    updateDisplacementMap();
    updateFilterElements();
    setupResizeObserver();
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style lang="scss">
.glass-surface {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 260ms ease-out;

  &__svg {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: inherit;
    position: relative;
    z-index: 10;
  }
}
</style>
