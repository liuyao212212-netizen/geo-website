<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const footerNav = [
  {
    title: '解决方案',
    routeName: 'Solutions',
    links: [
      { label: '全方位GEO', routeName: 'Solutions' },
      { label: '主流平台', routeName: 'Solutions' },
      { label: '优化策略', routeName: 'Solutions' },
      { label: 'GEO法则', routeName: 'Solutions' },
      { label: 'GEO成效', routeName: 'Solutions' },
    ]
  },
  {
    title: '客户案例',
    routeName: 'Cases',
    links: [
      { label: '成效数据', routeName: 'Cases' },
      { label: '客户评价', routeName: 'Cases' },
      { label: '合作伙伴', routeName: 'Cases' },
    ]
  },
  {
    title: '智优平台',
    routeName: 'Platform',
    links: [
      { label: '智优系统', routeName: 'Platform' },
      { label: '核心能力', routeName: 'Platform' },
      { label: '系统优势', routeName: 'Platform' },
      { label: '系统赋能', routeName: 'Platform' },
    ]
  },
  {
    title: '资源中心',
    routeName: 'Resources',
    links: [
      { label: 'GEO白皮书', routeName: 'Resources' },
      { label: 'GEO联盟', routeName: 'Resources' },
      { label: 'GEO常见问题', routeName: 'Resources' },
    ]
  },
  {
    title: '关于我们',
    routeName: 'About',
    links: [
      { label: '公司介绍', routeName: 'About' },
      { label: '行业背书', routeName: 'About' },
      { label: '核心业务', routeName: 'About' },
      { label: '权威认证', routeName: 'About' },
    ]
  }
]

const navigateTo = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-top">
      <div class="container footer-grid">
        <!-- Company Info -->
        <div class="footer-col company-col">
          <img src="/images/logo.svg" alt="智优康赛" class="footer-logo" />
          <p class="company-desc">
            AI搜索时代的品牌全球化战略伙伴，让AI主动推荐你的品牌。
          </p>
          <div class="qr-code">
            <img src="/images/qrcode.jpg" alt="微信二维码" />
            <span>关注公众号</span>
          </div>
        </div>

        <!-- Nav Columns -->
        <div
          v-for="col in footerNav"
          :key="col.title"
          class="footer-col nav-col"
        >
          <h4 class="footer-title" @click="navigateTo(col.routeName)">{{ col.title }}</h4>
          <ul class="footer-links">
            <li v-for="item in col.links" :key="item.label">
              <a @click="navigateTo(item.routeName)">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Company Info Bar -->
    <div class="footer-company">
      <div class="container">
        <div class="company-info-grid">
          <div class="company-info-item">
            <span class="company-info-label">耐特康赛（母公司）</span>
            <span class="company-info-value">耐特康赛网络技术（北京）有限公司 | netconcepts.cn</span>
          </div>
          <div class="company-info-item">
            <span class="company-info-label">智优康赛（子公司）</span>
            <span class="company-info-value">北京智优康赛科技有限公司 | GEO业务独立运营</span>
          </div>
          <div class="company-info-item">
            <span class="company-info-label">总部</span>
            <span class="company-info-value">中国</span>
          </div>
        </div>
        <div class="company-cta">
          <span>商务合作：欢迎垂询，共同探索AI搜索时代的品牌增长路径</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p> 智优康赛. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.site-footer {
  background: $bg-secondary;
  border-top: 1px solid $border-subtle;
}

.footer-top {
  padding: $space-20 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(5, 1fr);
  gap: $space-8;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: $space-8;
  }
}

.footer-col {
  &.company-col {
    @media (max-width: 1024px) {
      grid-column: 1 / -1;
      text-align: center;
    }
  }
}

.footer-logo {
  height: 40px;
  margin-bottom: $space-4;
}

.company-desc {
  color: $text-secondary;
  font-size: $text-sm;
  line-height: $line-height-relaxed;
  margin-bottom: $space-6;
  max-width: 280px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $space-2;

  img {
    width: 100px;
    height: 100px;
    border-radius: $radius-md;
    border: 1px solid $border-subtle;
  }

  span {
    font-size: $text-xs;
    color: $text-tertiary;
  }

  @media (max-width: 1024px) {
    align-items: center;
    margin: 0 auto;
  }
}

.footer-title {
  font-size: $text-sm;
  font-weight: $font-semibold;
  color: $text-primary;
  margin-bottom: $space-5;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: color $transition-fast;

  &:hover {
    color: $accent-purple;
  }
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  a {
    font-size: $text-sm;
    color: $text-secondary;
    transition: color $transition-fast;
    cursor: pointer;

    &:hover {
      color: $text-primary;
    }
  }
}

// Company Info Bar
.footer-company {
  border-top: 1px solid $border-subtle;
  padding: $space-8 0;

  @media (max-width: 768px) {
    padding: $space-6 0;
  }
}

.company-info-grid {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  margin-bottom: $space-6;
}

.company-info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.company-info-label {
  font-size: $text-sm;
  font-weight: 600;
  color: $accent-purple;
}

.company-info-value {
  font-size: $text-sm;
  color: $text-secondary;
}

.company-cta {
  background: rgba(75, 51, 255, 0.08);
  border: 1px solid rgba(75, 51, 255, 0.15);
  border-radius: $radius-lg;
  padding: $space-4 $space-6;
  text-align: center;

  span {
    font-size: $text-sm;
    color: $text-secondary;
  }

  @media (max-width: 768px) {
    padding: $space-3 $space-4;

    span {
      font-size: $text-xs;
    }
  }
}

.footer-bottom {
  border-top: 1px solid $border-subtle;
  padding: $space-6 0;

  p {
    font-size: $text-xs;
    color: $text-tertiary;
    text-align: center;
  }
}
</style>
