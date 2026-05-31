# MEMORY.md - 智优康赛GEO官网项目

## 项目信息
- **项目名称**: 智优康赛GEO战略服务商官网
- **工作目录**: `/Users/rose/WorkBuddy/2026-05-25-14-09-56/geo-website/`
- **技术栈**: Vue 3.5 + TypeScript + Vite 5 + Vue Router 4 + SCSS + ogl + motion-v + gsap + SVG Filters
- **设计风格**: 深空黑底色(#03040a) + 紫色主色调(#4b33ff) + GlassSurface光学折射 + Orb WebGL背景 + Aurora极光标题背景 + BlurText逐词模糊入场 + FloatingLines浮动光线 + Particles粒子背景
- **部署目标**: GitHub Pages (base: './') + EdgeOne Pages (永久线上链接)
- **GitHub Pages**（⭐ 主要分享链接，无token，永久稳定）:
  - 链接: `https://liuyao212212-netizen.github.io/geo-website/`
  - 仓库: `https://github.com/liuyao212212-netizen/geo-website`
  - 账号: liuyao212212-netizen (gh CLI已登录)
  - 自动部署: push main → GitHub Actions 构建
  - git目录在父级 `/Users/rose/WorkBuddy/2026-05-25-14-09-56/`，geo-website是子目录
- **EdgeOne Pages**: 项目 `geo-website`, ID `pages-htybfe6lfbxo`, 账号 Rose小瑶（需eo_token，每次部署换token，不适合分享）

## 设计规范
- **背景色**: `#03040a` 深空黑
- **主色调**: `#4b33ff` 紫色渐变到 `#4c75ff` 蓝色
- **卡片**: GlassSurface组件（vue-bits，SVG filter displacement map光学折射），替代GlassPanel
- **按钮**: Uiverse conic-gradient旋转边框风格（by Lakshay-art），4层conic-gradient动画边框+深色按钮本体+搜索图标，从blob→sparkle→blob→cssbuttons-io→液态玻璃→conic-gradient迭代
- **圆角**: 卡片12px，按钮8px微圆角，小元素4-8px
- **字体**: Inter，响应式clamp字号
- **间距**: 使用变量体系，section间距96px/64px(mobile)
- **⚠️ 背景图规则**: 用户说"换背景图"默认是换整个板块的背景，不是只换标题区域。除非用户明确说"只换标题背景"，否则一律全section覆盖

### 分页面标题区统一规范（所有子页面必须遵守）
**布局**: 白色logo (`logo-white.svg`) + 竖线分隔 + BlurText渐变标题
```
<section class="page-hero">
  <MagicRings ... />  <!-- Three.js光环背景 -->
  <div class="page-hero-content container">
    <div class="page-hero-brand">
      <img src="/images/logo-white.svg" alt="智优康赛" class="page-hero-logo" />
      <span class="page-hero-divider" />
      <BlurText text="页面标题" ... className="page-hero-title" />
    </div>
  </div>
</section>
```
**注意**: 无副标题，只用logo+标题。首页Hero用OrbBackground，分页面标题区用MagicRings。

## 页面结构（6页）
1. **首页** (index) - ✅ 已完成
2. **解决方案** (solutions) - ✅ 已完成 - 全方位GEO(Profound风格：左标题+右终端演示，4功能标签切换)/主流平台(12个pill)/优化策略(被找到→被采纳→被认可三部曲)/GEO 3C法则(理解/信任/推荐)/全栈服务(Uiverse手风琴折叠卡片，10服务各独立色条)/GEO成效(双手机并排3D倾斜轮播，各自独立4截图循环)/CTA
3. **客户案例** (cases) - ✅ 已完成 - 成效数据(Uiverse skill-bar进度条，6条)/客户评价(可左右滑动卡片轮播，栖息地+得实)/合作伙伴(35个logo网格)/CTA
4. **智优平台** (platform) - ✅ 已完成 - 智优系统(GeoWorkflow自动播放垂直工作流)/核心功能(左标题+右5步时间线)/系统优势(Uiverse数据看板卡片，2×2网格，4卡片独立配色主题，含指标+柱状图+Live标签)/系统赋能(BentoGrid gsap粒子聚光灯网格，6行业卡片，只写文字不放图片)
5. **关于我们** (about) - ✅ 已完成 - Hero(MagicRings+logo-white+标题)/公司介绍(双栏)/发展历程(ScrollStack滚动堆叠5年份卡片)/权威背书(渠成照片+介绍)/核心团队(Uiverse资料卡+数据亮点)/客户案例(35个logo网格)/CTA
6. **资源中心** (resources) - ✅ 已完成 - GEO白皮书/GEO联盟(CGIA)/GEO常见问题(手风琴折叠)

## 素材路径
- Logo: `/public/images/logo.svg`
- AI平台Logo: `/public/images/ai-logos/` (豆包/腾讯元宝/通义千问/文心一言/智谱清言/DeepSeek/Kimi)
- 平台Mockup: `/public/images/platform-mockup.jpg`
- 二维码: `/public/images/qrcode.jpg`
- 白皮书封面: `/public/images/whitepaper-1.png`, `/public/images/whitepaper-2.png`
- GEO联盟二维码: `/public/images/qr-cgia.png`
- 客户Logo: `/public/images/clients/` (35个透明PNG)
- 渠成照片: `/public/images/team/qu-cheng.png`

## 重要决策记录
- 2026-05-25: 采用Vue3而非纯HTML，为后续多页面和交互预留扩展性
- 2026-05-25: Figma两套模板（Maesttro + Arise Agency）融合，取各自布局优势
- 2026-05-25: 首页8板块结构确认（Hero→危机→能力→流程→数据→CTA→Footer）
- 2026-05-25: 联系表单包含AI模型多选和品牌痛点单选
- 2026-05-26: Hero背景从图片→圆点loader→几何mask→Three.js Beam→vue-bits Orb(ogl)最终方案
- 2026-05-26: 安装motion-v(v2.2.1)做标题入场动画，安装ogl做WebGL Orb背景
- 2026-05-26: CTA按钮从blob→cssbuttons-io简洁风格，微圆角8px
- 2026-05-26: 所有卡片从GlassPanel+conic-gradient→GlassSurface(SVG filter displacement map光学折射)
  - Chrome支持折射效果，Safari/Firefox自动fallback到普通backdrop-filter
- 2026-05-26: Hero背景从Three.js Beam→vue-bits Orb组件(ogl WebGL)，默认紫色(hue=0)，hover扭曲+旋转
- 2026-05-26: 联系表单从3步分栏表单→Uiverse Cobp风格Chat Bot→换回3步分栏表单（用户要求还原）
- 2026-05-26: Hero标题字号从clamp(4.5rem,15vw,10rem)缩小到clamp(3.2rem,10vw,7rem)
- 2026-05-26: GEO五步法terminal-code隐藏滚动条（scrollbar-width:none）
- 2026-05-26: 移动端导航栏底部增加公司信息（耐特康赛母公司/智优康赛子公司/总部/商务合作）
- 2026-05-26: 资源中心页面完成：白皮书(左文右图+3D hover封面)+联盟(7权益卡片+二维码)+FAQ(手风琴折叠)
- 2026-05-26: 资源中心标题区用AuroraBackground极光背景(ogl WebGL)，三section配色各异
- 2026-05-26: 资源中心所有文本用BlurText逐词模糊入场动画(motion-v)，IntersectionObserver触发
- 2026-05-26: 多页面路由重构：安装vue-router@4，所有导航从锚点改为独立分页面路由
  - createWebHashHistory兼容GitHub Pages
  - 懒加载+代码分割，每页独立chunk
  - SiteHeader全面改用router-link + navigateTo
  - 当前活跃路由高亮(router-link-active)
  - 4个占位页面(Solutions/Cases/Platform/About)带Aurora极光Hero
- 2026-05-26: 智优平台页面完成4板块，标题区从SplashCursor→FloatingLines(Three.js浮动光线着色器)
  - 渐变配色#4b33ff→#4c75ff→#00d4ff，lineCount [4,8,4]
  - mixBlendMode:screen在深色背景上发光
- 2026-05-26: 智优平台GeoWorkflow工作流演示（纯Vue3+CSS，自动播放垂直布局）
  - 5个节点垂直排列：痛点诊断→策略定制→内容生产→AI占位→动态更迭
  - 自动循环播放（每步2.5s，间隔0.3s，循环间隔1.5s）
  - 节点间+号连接点+粒子流动动画
  - 右侧状态面板：步骤列表+进度条+播放/暂停按钮
  - 移动端自适应：面板移到下方
  - 删除system-header标题区（FloatingLines+文字全部删除）
  - 6能力卡片删除desc说明文字
  - 删除6个能力卡片网格，板块一只保留GeoWorkflow工作流演示
  - 系统赋能板块从6行业卡片网格→CircularGallery→CardSwap→BentoGrid(gsap粒子+聚光灯+磁性+点击涟漪)
  - BentoGrid组件：6行业卡片网格布局，移动端1列→平板2列→桌面4列，动画移动端自动禁用
  - glowColor改紫色75,51,255匹配品牌色调，只写行业文字不放图片
  - 安装gsap依赖
  - 删除所有板块的描述说明文字（advantages/coreFunctions/TimelineSteps的desc字段和BlurText）
- 2026-05-26: 关于我们页面完成：参考cohere.com/about，6板块（Hero/公司介绍/里程碑/权威背书/团队/客户/CTA）
  - 里程碑时间线：5节点左右交替，GlassSurface卡片，紫色发光节点，移动端左对齐
  - 权威背书：渠成照片+3段完整介绍文字，紫色光晕效果
  - 客户案例：35个logo网格，7→5→3→2列响应式，白色滤镜+hover高亮
  - ScrollReveal滚动动画，IntersectionObserver触发
  - 素材：渠成照片→/public/images/team/qu-cheng.png，35个客户logo→/public/images/clients/
- 2026-05-26: 关于我们核心团队板块升级：从圆形头像卡片→PCCard全息3D资料卡→Uiverse风格资料卡
  - 当前使用Uiverse风格资料卡：头像区+底部信息栏(mini头像+handle+在线状态)+邮件按钮+姓名/职位
  - 暗色主题适配：紫色渐变背景边框、毛玻璃信息栏、渐变文字姓名
  - 删除PCCard组件导入，直接在AboutView内实现
  - 渠成信息：name="渠成", title="创始人/董事长兼CEO", handle="@qucheng", status="GEO先行者"
  - 了解更多按钮跳转/contact页面
  - 保留右侧4个数据亮点卡片(18年/3专利/20+海外/AIIA)
- 2026-05-26: 关于我们发展历程重构为年份切换式布局（参考tec-do.com/about）
  - 左侧年份导航栏（倒序，sticky，点击切换高亮）+ 右侧内容区（大年份数字+事件列表）
  - 移动端：横向滚动年份导航+下方内容区
  - 5个年份：2026/2025/2022/2017/2008，每个年份4条事件（bullet points）

