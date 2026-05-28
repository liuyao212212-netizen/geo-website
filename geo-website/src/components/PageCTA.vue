<script setup lang="ts">
import GlassSurface from './GlassSurface.vue'

defineEmits<{
  openForm: []
}>()
</script>

<template>
  <section class="page-cta">
    <div class="page-cta-bg" />
    <div class="container">
      <div class="page-cta-inner">
        <div class="page-cta-glow"></div>
        <GlassSurface
          :borderRadius="20"
          :backgroundOpacity="0.1"
          :blur="18"
          :saturation="1.3"
          class="page-cta-panel"
        >
          <div class="page-cta-layout">
            <div class="page-cta-content">
              <h2 class="page-cta-title">开启GEO优化之旅</h2>
              <p class="page-cta-desc">
                让AI成为品牌增长的新引擎，现在就开始行动
              </p>
              <div class="page-cta-actions">
                <button class="btn-cta" @click="$emit('openForm')">预约诊断</button>
                <button class="btn-cta btn-cta--outline" @click="$emit('openForm')">联系我们</button>
              </div>
            </div>
            <!-- Phone Mockup -->
            <div class="phone-wrapper">
              <div class="phone-outer">
                <div class="phone-device">
                  <div class="phone-screen">
                    <div class="phone-glow-orb phone-glow-1"></div>
                    <div class="phone-glow-orb phone-glow-2"></div>
                    <div class="phone-text-group">
                      <span class="phone-hello-text">你好</span>
                      <span class="phone-ai-text">AI</span>
                    </div>
                    <div class="phone-unlock">
                      <span>Touch to unlock</span>
                      <svg width="14" height="14" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M33.9,46V29.9a16.1,16.1,0,0,1,32.2,0M50,62v8.1m-24.1,16H74.1a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H25.9a8,8,0,0,0-8,8V78.1A8,8,0,0,0,25.9,86.1Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.page-cta {
  position: relative;
  overflow: hidden;
  padding: 96px 24px;

  @media (max-width: 768px) {
    padding: 64px 20px;
  }
}

.page-cta-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('/images/cta-bg-new.jpg');
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(3, 4, 10, 0.3) 0%,
      rgba(75, 51, 255, 0.1) 50%,
      rgba(3, 4, 10, 0.4) 100%
    );
  }
}

.page-cta .container {
  position: relative;
  z-index: 2;
}

.page-cta-inner {
  position: relative;
}

.page-cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(75, 51, 255, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.page-cta-panel {
  position: relative;
  padding: clamp(40px, 6vw, 80px) clamp(24px, 4vw, 64px);

  .glass-surface__content {
    padding: 0;
  }
}

.page-cta-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
}

.page-cta-content {
  text-align: center;
  flex: 1;

  @media (min-width: 769px) {
    text-align: left;
  }
}

.page-cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.page-cta-desc {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 480px;

  @media (min-width: 769px) {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
}

.page-cta-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;

  @media (min-width: 769px) {
    justify-content: flex-start;
  }

  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4b33ff, #4c75ff);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;
  box-shadow: 0 2px 12px rgba(75, 51, 255, 0.25);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(75, 51, 255, 0.4);

    &::after {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }

  &.btn-cta--outline {
    background: transparent;
    border: 1.5px solid rgba(75, 51, 255, 0.4);
    box-shadow: none;

    &::after {
      background: linear-gradient(90deg, transparent, rgba(75, 51, 255, 0.08), transparent);
    }

    &:hover {
      background: rgba(75, 51, 255, 0.08);
      border-color: rgba(75, 51, 255, 0.6);
      box-shadow: 0 4px 20px rgba(75, 51, 255, 0.15);
    }
  }
}

// ========== PHONE MOCKUP ==========
.phone-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-outer {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.35), rgba(76, 117, 255, 0.2));
  padding: 3px;
  box-shadow: 0 4px 30px rgba(75, 51, 255, 0.2);
}

.phone-device {
  position: relative;
  width: 160px;
  height: 320px;
  background: #0a0a0f;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.03);

  &:hover {
    transform: rotate(8deg);

    .phone-glow-1 {
      transform: translate(40px, -40px);
    }
    .phone-glow-2 {
      transform: translate(40px, 56px);
    }
    .phone-ai-text {
      filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.7));
    }
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 260px;
    border-radius: 18px;
  }
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 1;
}

.phone-glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  z-index: -1;
  transition: transform 0.5s ease;

  &.phone-glow-1 {
    width: 60px;
    height: 60px;
    background: rgba(75, 51, 255, 0.5);
    top: 50px;
    right: 20px;
  }

  &.phone-glow-2 {
    width: 48px;
    height: 48px;
    background: rgba(255, 140, 50, 0.45);
    bottom: 80px;
    right: 30px;
  }
}

.phone-text-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  line-height: 1;
  gap: 2px;
}

.phone-hello-text {
  font-size: 36px;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 28px;
  }
}

.phone-ai-text {
  font-size: 48px;
  background: linear-gradient(135deg, #00d4ff, #4c75ff, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
  filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.45));
  transition: filter 0.5s ease;

  @media (max-width: 768px) {
    font-size: 36px;
  }
}

.phone-unlock {
  position: absolute;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    bottom: 28px;
    font-size: 10px;
  }
}
</style>
