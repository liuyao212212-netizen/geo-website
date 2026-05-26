<script setup lang="ts">
interface NotificationCardProps {
  level?: 'warning' | 'error' | 'info' | 'success'
  title?: string
  body?: string
  tags?: string[]
}

const props = withDefaults(defineProps<NotificationCardProps>(), {
  level: 'warning',
  title: '',
  body: '',
  tags: () => []
})

const levelConfig: Record<string, { glow: string; border: string; accent: string; tag: string }> = {
  warning: {
    glow: 'rgba(234, 179, 8, 0.35)',
    border: 'rgba(234, 179, 8, 0.5)',
    accent: '#eab308',
    tag: 'rgba(234, 179, 8, 0.12)'
  },
  error: {
    glow: 'rgba(239, 68, 68, 0.35)',
    border: 'rgba(239, 68, 68, 0.5)',
    accent: '#ef4444',
    tag: 'rgba(239, 68, 68, 0.12)'
  },
  info: {
    glow: 'rgba(59, 130, 246, 0.35)',
    border: 'rgba(59, 130, 246, 0.5)',
    accent: '#3b82f6',
    tag: 'rgba(59, 130, 246, 0.12)'
  },
  success: {
    glow: 'rgba(34, 197, 94, 0.35)',
    border: 'rgba(34, 197, 94, 0.5)',
    accent: '#22c55e',
    tag: 'rgba(34, 197, 94, 0.12)'
  }
}

import { computed } from 'vue'
const config = computed(() => levelConfig[props.level] || levelConfig.warning)
</script>

<template>
  <div class="notification" :class="`notification--${level}`">
    <div class="notiglow" :style="{ background: config.glow }"></div>
    <div class="notiborderglow" :style="{ background: config.border }"></div>
    <div class="notititle">
      <!-- Icon -->
      <svg v-if="level === 'warning'" width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="config.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="noti-icon">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <svg v-else-if="level === 'error'" width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="config.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="noti-icon">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      <svg v-else-if="level === 'info'" width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="config.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="noti-icon">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="config.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="noti-icon">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      {{ title }}
    </div>
    <div class="notibody">{{ body }}</div>
    <div v-if="tags.length" class="noti-tags">
      <span
        v-for="tag in tags"
        :key="tag"
        class="noti-tag"
        :style="{ background: config.tag, color: config.accent }"
      >{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.notification {
  position: relative;
  padding: 20px 24px;
  background: rgba(8, 4, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  border-radius: 3px 0 0 3px;
  transition: opacity 0.3s ease;
}

.notification--warning::before { background: #eab308; }
.notification--error::before { background: #ef4444; }
.notification--info::before { background: #3b82f6; }
.notification--success::before { background: #22c55e; }

.notification:hover {
  transform: translateX(6px);
  border-color: rgba(255, 255, 255, 0.12);
}

.notification:hover .notiglow {
  opacity: 0.6;
}

.notification:hover .notiborderglow {
  opacity: 0.3;
}

/* Inner glow - radial gradient behind content */
.notiglow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 0;
}

/* Border glow - outer ring effect */
.notiborderglow {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 13px;
  filter: blur(12px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.notititle {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #f0f0f0;
  margin-bottom: 6px;
}

.noti-icon {
  flex-shrink: 0;
}

.notibody {
  position: relative;
  z-index: 1;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin-bottom: 10px;
}

.noti-tags {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.noti-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>
