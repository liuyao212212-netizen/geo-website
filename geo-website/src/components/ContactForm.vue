<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  close: []
}>()

const currentStep = ref(1)
const submitted = ref(false)

const form = ref({
  company: '',
  name: '',
  title: '',
  phone: '',
  email: '',
  aiTags: [] as string[],
  painTag: '',
  message: ''
})

const aiOptions = ['ChatGPT', '豆包', '腾讯元宝', 'Kimi', 'DeepSeek', '文心一言', '通义千问', '智谱清言']
const painOptions = ['AI搜不到我们', 'AI推荐竞品', 'AI回答有误', '建企业AI知识库']

const toggleAi = (tag: string) => {
  const idx = form.value.aiTags.indexOf(tag)
  if (idx > -1) {
    form.value.aiTags.splice(idx, 1)
  } else {
    form.value.aiTags.push(tag)
  }
}

const selectPain = (tag: string) => {
  form.value.painTag = form.value.painTag === tag ? '' : tag
}

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const handleSubmit = () => {
  submitted.value = true
  setTimeout(() => {
    emit('close')
    submitted.value = false
    currentStep.value = 1
    form.value = {
      company: '',
      name: '',
      title: '',
      phone: '',
      email: '',
      aiTags: [],
      painTag: '',
      message: ''
    }
  }, 2500)
}
</script>

<template>
  <div class="form-overlay" @click.self="emit('close')">
    <div class="form-card">
      <!-- Close button -->
      <button class="close-btn" @click="emit('close')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      <!-- Header -->
      <div class="form-header">
        <img src="/images/logo-white.svg" alt="智优康赛" class="form-logo" />
        <div>
          <div class="form-title">开启<span class="highlight">AI</span>增长之旅</div>
          <div class="form-subtitle">告诉我们您的需求，GEO顾问为您定制方案</div>
        </div>
      </div>

      <!-- Step Indicator -->
      <div class="step-indicator">
        <div
          v-for="s in 3"
          :key="s"
          :class="['step-dot', { active: currentStep >= s, current: currentStep === s }]"
        >
          <span class="step-num">{{ s }}</span>
        </div>
        <div class="step-line">
          <div class="step-line-fill" :style="{ width: `${((currentStep - 1) / 2) * 100}%` }"></div>
        </div>
      </div>

      <!-- Success State -->
      <div v-if="submitted" class="success-state">
        <div class="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3>提交成功！</h3>
        <p>我们的GEO顾问将在24小时内与您联系</p>
      </div>

      <!-- Step 1: Basic Info -->
      <form v-else @submit.prevent="handleSubmit">
        <div v-if="currentStep === 1" class="step-content">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">公司名称</label>
              <input v-model="form.company" type="text" class="form-input" placeholder="请输入公司名称" />
            </div>
            <div class="form-group">
              <label class="form-label">您的姓名</label>
              <input v-model="form.name" type="text" class="form-input" placeholder="请输入您的姓名" />
            </div>
            <div class="form-group">
              <label class="form-label">职位</label>
              <input v-model="form.title" type="text" class="form-input" placeholder="请输入您的职位" />
            </div>
            <div class="form-group">
              <label class="form-label">联系电话</label>
              <input v-model="form.phone" type="tel" class="form-input" placeholder="请输入联系电话" />
            </div>
            <div class="form-group full-width">
              <label class="form-label">电子邮箱</label>
              <input v-model="form.email" type="email" class="form-input" placeholder="请输入电子邮箱" />
            </div>
          </div>
        </div>

        <!-- Step 2: AI Platforms & Pain Points -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="form-section">
            <label class="form-label">关注的AI平台</label>
            <div class="tags">
              <span
                v-for="tag in aiOptions"
                :key="tag"
                :class="['tag', { active: form.aiTags.includes(tag) }]"
                @click="toggleAi(tag)"
              >{{ tag }}</span>
            </div>
          </div>
          <div class="form-section">
            <label class="form-label">品牌痛点</label>
            <div class="tags">
              <span
                v-for="tag in painOptions"
                :key="tag"
                :class="['tag', { active: form.painTag === tag }]"
                @click="selectPain(tag)"
              >{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- Step 3: Message -->
        <div v-if="currentStep === 3" class="step-content">
          <div class="form-group">
            <label class="form-label">补充说明</label>
            <textarea
              v-model="form.message"
              class="form-textarea"
              placeholder="请描述您的具体需求或问题..."
              rows="5"
            ></textarea>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="form-actions">
          <button v-if="currentStep > 1" type="button" class="btn-prev" @click="prevStep">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            上一步
          </button>
          <div class="spacer"></div>
          <button
            v-if="currentStep < 3"
            type="button"
            class="btn-next"
            @click="nextStep"
          >
            下一步
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button v-else type="submit" class="btn-submit">
            提交咨询
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.form-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(3, 4, 10, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: formFadeIn 0.3s ease;
}

@keyframes formFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.form-card {
  position: relative;
  width: 100%;
  max-width: 560px;
  border-radius: 24px;
  overflow: hidden;
  animation: formSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(15, 8, 30, 0.95);
  border: 1px solid rgba(75, 51, 255, 0.2);
  box-shadow:
    0 0 60px rgba(75, 51, 255, 0.08),
    0 24px 80px rgba(0, 0, 0, 0.5);

  @media (max-width: 640px) {
    max-width: 100%;
    border-radius: 20px;
  }
}

@keyframes formSlideUp {
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

// ========== Close Button ==========
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.15);
  }
}

// ========== Header ==========
.form-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 28px 0;
}

.form-logo {
  height: 32px;
  width: auto;
  filter: drop-shadow(0 0 8px rgba(75, 51, 255, 0.4));
  flex-shrink: 0;
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;

  .highlight {
    background: linear-gradient(135deg, #00d4ff, #4c75ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.3));
  }
}

.form-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
}

// ========== Step Indicator ==========
.step-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 20px 28px;
  position: relative;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex-shrink: 0;

  &.active {
    background: rgba(75, 51, 255, 0.15);
    border-color: rgba(75, 51, 255, 0.4);
    color: #fff;
  }

  &.current {
    background: linear-gradient(135deg, #4b33ff, #4c75ff);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 0 16px rgba(75, 51, 255, 0.3);
  }
}

.step-line {
  position: absolute;
  left: 28px;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
  z-index: 1;
  margin: 0 14px;
}

.step-line-fill {
  height: 100%;
  background: linear-gradient(90deg, #4b33ff, #4c75ff);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
}

// ========== Step Content ==========
.step-content {
  padding: 0 28px 28px;
  animation: stepFadeIn 0.3s ease;
}

@keyframes stepFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: 1 / -1;
  }
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:focus {
    border-color: rgba(75, 51, 255, 0.5);
    background: rgba(75, 51, 255, 0.08);
    box-shadow: 0 0 16px rgba(75, 51, 255, 0.1);
  }
}

.form-textarea {
  @extend .form-input;
  resize: none;
  line-height: 1.6;
}

.form-section {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

// ========== Tags ==========
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;

  &:hover {
    border-color: rgba(75, 51, 255, 0.4);
    background: rgba(75, 51, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  &.active {
    background: rgba(75, 51, 255, 0.2);
    border-color: rgba(75, 51, 255, 0.55);
    color: #fff;
    box-shadow: 0 0 16px rgba(75, 51, 255, 0.18);
  }
}

// ========== Form Actions ==========
.form-actions {
  display: flex;
  align-items: center;
  padding: 20px 28px 28px;
  gap: 12px;

  .spacer {
    flex: 1;
  }
}

.btn-prev {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.15);
  }
}

.btn-next, .btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4b33ff, #4c75ff);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
  position: relative;
  overflow: hidden;

  &::before {
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

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }
}

// ========== Success State ==========
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 28px;
  text-align: center;
  animation: stepFadeIn 0.3s ease;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }

  p {
    color: rgba(255, 255, 255, 0.45);
    font-size: 14px;
  }
}

.success-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(75, 51, 255, 0.1);
  border-radius: 50%;
  animation: successPulse 2s ease-in-out infinite;

  svg {
    stroke: #4b33ff;
  }
}

@keyframes successPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(75, 51, 255, 0.2); }
  50% { box-shadow: 0 0 0 20px rgba(75, 51, 255, 0); }
}
</style>
