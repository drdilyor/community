import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'

import App from './App.vue'
import './assets/styles/index.scss'
import ui from './components/ui/plugin'
import store from './store'
import router from './router'
import messages from './messages'

const i18n = createI18n({
  locale: 'en',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
})

window.backend = import.meta.env.MODE == 'production'
  ? '??????????????????????'
  : 'http://localhost:34502'

;(window as any).vm = createApp(App)
.use(router)
.use(store)
.use(i18n)
.use(ui)
.mount('#app')
