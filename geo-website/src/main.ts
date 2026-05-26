import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Styles
import './styles/reset.scss'
import './styles/base.scss'
import './styles/responsive.scss'

createApp(App).use(router).mount('#app')
