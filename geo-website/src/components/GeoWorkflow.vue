<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// ========== Node Data ==========
interface WorkflowNode {
  id: number
  title: string
  subtitle: string
  items: string[]
}

const nodes: WorkflowNode[] = [
  {
    id: 0,
    title: '痛点诊断',
    subtitle: 'Pain Diagnosis',
    items: ['行业调研', '竞品排查', 'AI平台现状评估']
  },
  {
    id: 1,
    title: '策略定制',
    subtitle: 'Strategy Customization',
    items: ['关键词全路径覆盖', '多模态内容打造', '权威数据引入']
  },
  {
    id: 2,
    title: '内容生产',
    subtitle: 'Content Production',
    items: ['问答式FAQ库', '结构化知识图谱', '视频/图文多端适配']
  },
  {
    id: 3,
    title: 'AI占位',
    subtitle: 'AI Positioning',
    items: ['持续优化训练与AI模型深度绑定', '持续投放权威信息']
  },
  {
    id: 4,
    title: '动态更迭',
    subtitle: 'Dynamic Iteration',
    items: ['实时监测AI结果', '效果复盘', '优化升级']
  }
]

// ========== Animation State ==========
const activeIndex = ref(-1)
const completedIndices = ref<Set<number>>(new Set())
const isPlaying = ref(true)

const STEP_DURATION = 2500 // ms per step
const PAUSE_DURATION = 1500 // ms between cycles

let timer: ReturnType<typeof setTimeout> | null = null
let isUnmounted = false

function startCycle() {
  if (isUnmounted) return
  activeIndex.value = -1
  completedIndices.value.clear()

  function step(idx: number) {
    if (isUnmounted) return
    activeIndex.value = idx

    timer = setTimeout(() => {
      if (isUnmounted) return
      completedIndices.value.add(idx)
      activeIndex.value = -1

      if (idx < nodes.length - 1) {
        timer = setTimeout(() => step(idx + 1), 300)
      } else {
        // Cycle complete, wait then restart
        timer = setTimeout(() => startCycle(), PAUSE_DURATION)
      }
    }, STEP_DURATION)
  }

  timer = setTimeout(() => step(0), 500)
}

function togglePlay() {
  if (isPlaying.value) {
    isPlaying.value = false
    if (timer) clearTimeout(timer)
  } else {
    isPlaying.value = true
    startCycle()
  }
}

onMounted(() => {
  startCycle()
})

onBeforeUnmount(() => {
  isUnmounted = true
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="geo-workflow">
    <!-- Left: Node List -->
    <div class="workflow-nodes">
      <div
        v-for="(node, i) in nodes"
        :key="node.id"
        class="node-wrapper"
        :class="{
          active: activeIndex === i,
          completed: completedIndices.has(i)
        }"
      >
        <!-- Node Card -->
        <div class="node-card">
          <div class="node-header">
            <div class="node-badge">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="node-titles">
              <span class="node-title">{{ node.title }}</span>
              <span class="node-subtitle">{{ node.subtitle }}</span>
            </div>
          </div>

          <div class="node-body">
            <div class="node-output-label">Output</div>
            <div class="node-tags">
              <span
                v-for="(item, ii) in node.items"
                :key="ii"
                class="node-tag"
                :class="{ highlight: activeIndex === i }"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>

        <!-- Connector (between nodes) -->
        <div v-if="i < nodes.length - 1" class="connector">
          <div class="connector-line" :class="{ active: completedIndices.has(i) }">
            <div class="connector-particles">
              <div
                v-for="p in 3"
                :key="p"
                class="particle"
                :class="{ running: activeIndex === i + 1 || (completedIndices.has(i) && !completedIndices.has(i + 1)) }"
                :style="{ animationDelay: (p * 0.4) + 's' }"
              />
            </div>
          </div>
          <div class="connector-dot" :class="{ active: completedIndices.has(i) }">
            <span class="connector-plus">+</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Status Panel -->
    <div class="status-panel">
      <div class="panel-header">
        <div class="panel-title">
          <span class="panel-icon">⚡</span>
          GEO优化流程
        </div>
        <div class="panel-status" :class="{ running: activeIndex >= 0 }">
          {{ activeIndex >= 0 ? '运行中' : '就绪' }}
        </div>
      </div>

      <div class="panel-steps">
        <div
          v-for="(node, i) in nodes"
          :key="i"
          class="panel-step"
          :class="{
            active: activeIndex === i,
            completed: completedIndices.has(i)
          }"
        >
          <div class="step-dot" :class="{
            running: activeIndex === i,
            completed: completedIndices.has(i)
          }">
            <span v-if="completedIndices.has(i)">✓</span>
            <span v-else-if="activeIndex === i" class="spin">⟳</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div class="step-name">{{ node.title }}</div>
        </div>
      </div>

      <div class="panel-progress">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: ((completedIndices.size / nodes.length) * 100) + '%' }"
          />
        </div>
        <div class="progress-text">
          {{ completedIndices.size }} / {{ nodes.length }} 步骤完成
        </div>
      </div>

      <button class="play-btn" @click="togglePlay">
        <span>{{ isPlaying ? '⏸ 暂停' : '▶ 播放' }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.geo-workflow {
  display: flex;
  gap: 0;
  max-width: 1100px;
  margin: 0 auto;
  background: rgba(10, 11, 20, 0.7);
  border: 1px solid rgba(75, 51, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 16px;
    margin: 0 $space-4;
  }
}

// ========== Left: Nodes ==========
.workflow-nodes {
  flex: 1;
  padding: $space-8 $space-6;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: $space-5;
  }
}

.node-wrapper {
  position: relative;

  &.active .node-card {
    border-color: rgba(75, 51, 255, 0.5);
    box-shadow: 0 0 30px rgba(75, 51, 255, 0.15), inset 0 0 20px rgba(75, 51, 255, 0.03);
    transform: translateX(4px);
  }

  &.completed .node-card {
    border-color: rgba(34, 197, 94, 0.25);
    opacity: 0.85;
  }
}

.node-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: $space-5;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: $space-4;
  }
}

.node-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: $space-4;
}

.node-badge {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(75, 51, 255, 0.3), rgba(76, 117, 255, 0.2));
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(75, 51, 255, 0.3);

  .node-wrapper.active & {
    background: linear-gradient(135deg, $accent-purple, $accent-blue);
    animation: pulse-badge 1.5s ease-in-out infinite;
  }

  .node-wrapper.completed & {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.4);
    color: #22c55e;
  }
}

@keyframes pulse-badge {
  0%, 100% { box-shadow: 0 0 0 0 rgba(75, 51, 255, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(75, 51, 255, 0); }
}

.node-titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.node-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.node-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
}

.node-body {
  padding-top: $space-3;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.node-output-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: $space-2;
}

.node-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.node-tag {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  transition: all 0.4s ease;

  &.highlight {
    color: rgba(75, 51, 255, 0.9);
    background: rgba(75, 51, 255, 0.1);
    border-color: rgba(75, 51, 255, 0.25);
  }
}

// ========== Connector ==========
.connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $space-3 0;
  position: relative;
}

.connector-line {
  width: 2px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  position: relative;
  transition: background 0.4s ease;

  &.active {
    background: linear-gradient(180deg, rgba(75, 51, 255, 0.6), rgba(34, 197, 94, 0.4));
  }
}

.connector-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #4b33ff;
  transform: translateX(-50%) translateY(-10px);
  opacity: 0;
  box-shadow: 0 0 6px rgba(75, 51, 255, 0.6);

  &.running {
    animation: particle-fall 1.2s ease-in-out infinite;
  }
}

@keyframes particle-fall {
  0% { transform: translateX(-50%) translateY(-4px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(-50%) translateY(36px); opacity: 0; }
}

.connector-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  transition: all 0.4s ease;

  &.active {
    background: rgba(75, 51, 255, 0.2);
    border-color: rgba(75, 51, 255, 0.5);
  }
}

.connector-plus {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;

  .connector-dot.active & {
    color: rgba(75, 51, 255, 0.8);
  }
}

// ========== Right: Status Panel ==========
.status-panel {
  width: 260px;
  flex-shrink: 0;
  padding: $space-6;
  background: rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: $space-4;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $space-5;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.panel-icon {
  font-size: 16px;
}

.panel-status {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;

  &.running {
    background: rgba(75, 51, 255, 0.15);
    color: rgba(75, 51, 255, 0.9);
    border-color: rgba(75, 51, 255, 0.3);
  }
}

.panel-steps {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: $space-5;
}

.panel-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.4s ease;

  &.active {
    background: rgba(75, 51, 255, 0.08);
    border-color: rgba(75, 51, 255, 0.2);
  }

  &.completed {
    background: rgba(34, 197, 94, 0.05);
    border-color: rgba(34, 197, 94, 0.15);
  }
}

.step-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &.running {
    background: rgba(75, 51, 255, 0.2);
    color: #4b33ff;
    border-color: rgba(75, 51, 255, 0.4);
  }

  &.completed {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.3);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.step-name {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;

  .panel-step.active & {
    color: #fff;
  }

  .panel-step.completed & {
    color: rgba(255, 255, 255, 0.5);
  }
}

// ========== Progress Bar ==========
.panel-progress {
  margin-bottom: $space-4;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: $space-2;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $accent-purple, $accent-cyan);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.progress-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  text-align: center;
}

// ========== Play Button ==========
.play-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(75, 51, 255, 0.3);
  border-radius: 10px;
  background: rgba(75, 51, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: rgba(75, 51, 255, 0.2);
    border-color: rgba(75, 51, 255, 0.5);
    color: #fff;
  }
}
</style>
