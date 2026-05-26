<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)

const navLinks = [
  { label: '首页', routeName: 'Home', children: [] },
  {
    label: '解决方案', routeName: 'Solutions',
    children: [
      { label: '全方位 GEO', routeName: 'Solutions' },
      { label: '主流平台优化', routeName: 'Solutions' },
      { label: 'AI 搜索优化策略', routeName: 'Solutions' },
      { label: 'GEO 法则', routeName: 'Solutions' },
      { label: 'GEO 成效', routeName: 'Solutions' },
    ]
  },
  {
    label: '客户案例', routeName: 'Cases',
    children: [
      { label: '数据案例', routeName: 'Cases' },
      { label: '客户评价', routeName: 'Cases' },
      { label: '合作伙伴', routeName: 'Cases' },
    ]
  },
  {
    label: '智优平台', routeName: 'Platform',
    children: [
      { label: '智优系统', routeName: 'Platform' },
      { label: '核心能力', routeName: 'Platform' },
      { label: '系统优势', routeName: 'Platform' },
      { label: '系统赋能', routeName: 'Platform' },
    ]
  },
  {
    label: '关于我们', routeName: 'About',
    children: [
      { label: '公司介绍', routeName: 'About' },
      { label: '行业背书', routeName: 'About' },
      { label: '核心业务', routeName: 'About' },
      { label: '权威展示', routeName: 'About' },
    ]
  },
  {
    label: '资源中心', routeName: 'Resources',
    children: [
      { label: 'GEO 白皮书', routeName: 'Resources' },
      { label: 'GEO 联盟', routeName: 'Resources' },
      { label: 'GEO 常见问题', routeName: 'Resources' },
    ]
  }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleDropdown = (label: string) => {
  openDropdown.value = openDropdown.value === label ? null : label
}

const closeDropdown = () => {
  openDropdown.value = null
}

const navigateTo = (routeName: string) => {
  router.push({ name: routeName })
  closeDropdown()
  isMobileMenuOpen.value = false
}

const isActive = (routeName: string) => {
  return route.name === routeName
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeDropdown)
})

const emit = defineEmits<{
  openForm: []
}>()
</script>

<template>
  <header :class="['site-header', { scrolled: isScrolled }]">
    <div class="header-inner">
      <!-- Logo -->
      <router-link :to="{ name: 'Home' }" class="logo" @click.stop>
        <img src="/images/logo.svg" alt="智优康赛" class="logo-img" />
      </router-link>

      <!-- Desktop Nav -->
      <nav class="desktop-nav hide-mobile">
        <div
          v-for="link in navLinks"
          :key="link.label"
          class="nav-item"
          @click.stop
        >
          <router-link
            v-if="link.children.length === 0"
            :to="{ name: link.routeName }"
            :class="['nav-link', { 'router-link-active': isActive(link.routeName) }]"
          >
            {{ link.label }}
          </router-link>
          <a
            v-else
            :class="['nav-link', 'has-children', { 'router-link-active': isActive(link.routeName) }]"
            @click="navigateTo(link.routeName)"
            @mouseenter="openDropdown = link.label"
            @mouseleave="openDropdown = null"
          >
            {{ link.label }}
            <svg class="nav-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 5l3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <!-- Dropdown -->
          <div
            v-if="link.children.length > 0"
            :class="['nav-dropdown', { open: openDropdown === link.label }]"
            @mouseenter="openDropdown = link.label"
            @mouseleave="openDropdown = null"
          >
            <a
              v-for="child in link.children"
              :key="child.label"
              class="dropdown-link"
              @click="navigateTo(child.routeName)"
            >
              {{ child.label }}
            </a>
          </div>
        </div>
      </nav>

      <!-- Desktop CTA -->
      <div class="desktop-cta hide-mobile">
        <button class="btn-cta-nav" @click="emit('openForm')">预约诊断</button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-btn hide-desktop"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        :aria-expanded="isMobileMenuOpen"
      >
        <span :class="['hamburger', { open: isMobileMenuOpen }]">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div :class="['mobile-menu', { open: isMobileMenuOpen }]">
      <nav class="mobile-nav">
        <div v-for="link in navLinks" :key="link.label" class="mobile-nav-group">
          <a
            v-if="link.children.length === 0"
            :class="['mobile-nav-link', { 'router-link-active': isActive(link.routeName) }]"
            @click="navigateTo(link.routeName)"
          >
            {{ link.label }}
          </a>
          <a
            v-else
            :class="['mobile-nav-link', 'has-children', { 'router-link-active': isActive(link.routeName) }]"
            @click="navigateTo(link.routeName)"
          >
            {{ link.label }}
            <svg :class="['mobile-arrow', { rotated: openDropdown === 'm-' + link.label }]" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <div v-if="link.children.length > 0" :class="['mobile-sub-nav', { open: openDropdown === 'm-' + link.label }]">
            <a
              v-for="child in link.children"
              :key="child.label"
              class="mobile-sub-link"
              @click.stop="navigateTo(child.routeName)"
            >
              {{ child.label }}
            </a>
          </div>
        </div>
        <button class="btn-cta-nav mobile-cta" @click="emit('openForm'); isMobileMenuOpen = false">预约诊断</button>
      </nav>

      <!-- Mobile Footer Info -->
      <div class="mobile-footer-info">
        <div class="mobile-info-item">
          <span class="mobile-info-label">耐特康赛（母公司）</span>
          <span class="mobile-info-value">耐特康赛网络技术（北京）有限公司 | netconcepts.cn</span>
        </div>
        <div class="mobile-info-item">
          <span class="mobile-info-label">智优康赛（子公司）</span>
          <span class="mobile-info-value">北京智优康赛科技有限公司 | GEO业务独立运营</span>
        </div>
        <div class="mobile-info-item">
          <span class="mobile-info-label">总部</span>
          <span class="mobile-info-value">中国</span>
        </div>
        <div class="mobile-info-cta">
          商务合作：欢迎垂询，共同探索AI搜索时代的品牌增长路径
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-sticky;
  transition: all $transition-normal;

  &.scrolled {
    background: rgba(3, 4, 10, 0.8);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid $border-subtle;
  }
}

.header-inner {
  @include container;
  @include flex-between;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;

  .logo-img {
    height: 40px;
    width: auto;
  }
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: $space-6;
}

.nav-item {
  position: relative;
}

.nav-link {
  font-size: $text-sm;
  font-weight: $font-medium;
  color: $text-secondary;
  transition: color $transition-fast;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0;
  cursor: pointer;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: $gradient-hero;
    transition: width $transition-normal;
    border-radius: 2px;
  }

  &:hover, &.has-children:hover {
    color: $text-primary;

    &::after {
      width: 100%;
    }
  }

  &.router-link-active {
    color: $text-primary;

    &::after {
      width: 100%;
    }
  }

  .nav-arrow {
    transition: transform 0.2s ease;
  }

  &:hover .nav-arrow {
    transform: rotate(180deg);
  }
}

// Dropdown
.nav-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  opacity: 0;
  visibility: hidden;
  min-width: 180px;
  background: rgba(10, 10, 20, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(75, 51, 255, 0.12);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
}

.dropdown-link {
  display: block;
  padding: 10px 14px;
  font-size: $text-sm;
  color: $text-secondary;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: $text-primary;
    background: rgba(75, 51, 255, 0.08);
  }
}

// Nav CTA button (cssbuttons-io style)
.btn-cta-nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4b33ff, #4c75ff);
  color: #fff;
  font-size: $text-sm;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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
    transform: scale(0.97);
  }
}

.desktop-cta {
  flex-shrink: 0;
}

// Mobile Menu Button
.mobile-menu-btn {
  width: 40px;
  height: 40px;
  @include flex-center;
  z-index: 10;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;

  span {
    display: block;
    height: 2px;
    background: $text-primary;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) { width: 24px; }
    &:nth-child(2) { width: 18px; margin-left: auto; }
    &:nth-child(3) { width: 24px; }
  }

  &.open {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }
}

// Mobile Menu
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(3, 4, 10, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 80px $container-padding $space-8;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 5;

  &.open {
    transform: translateX(0);
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.mobile-nav-link {
  font-size: $text-lg;
  font-weight: $font-semibold;
  color: $text-primary;
  padding: $space-3 0;
  border-bottom: 1px solid $border-subtle;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &.has-children {
    cursor: pointer;
  }

  &.router-link-active {
    color: $accent-purple;
  }

  .mobile-arrow {
    transition: transform 0.25s ease;
    color: $text-tertiary;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.mobile-sub-nav {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.open {
    max-height: 300px;
  }
}

.mobile-sub-link {
  display: block;
  padding: $space-2 $space-4;
  font-size: $text-sm;
  color: $text-secondary;
  border-left: 2px solid rgba(75, 51, 255, 0.2);
  margin-left: $space-2;
  margin-bottom: 2px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: $text-primary;
    border-left-color: $accent-purple;
    background: rgba(75, 51, 255, 0.05);
  }
}

.mobile-cta {
  margin-top: $space-6;
  width: 100%;
  justify-content: center;
  padding: 14px 20px;
  font-size: $text-base;
}

// ========== Mobile Footer Info ==========
.mobile-footer-info {
  margin-top: auto;
  padding: $space-6 0 $space-8;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.mobile-info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mobile-info-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(75, 51, 255, 0.7);
  letter-spacing: 0.02em;
}

.mobile-info-value {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.5;
}

.mobile-info-cta {
  margin-top: $space-2;
  padding: $space-3 $space-4;
  background: rgba(75, 51, 255, 0.06);
  border: 1px solid rgba(75, 51, 255, 0.12);
  border-radius: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  text-align: center;
}
</style>
