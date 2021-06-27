import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'

import App from './App.vue'
import './assets/styles/index.scss'
import ui from './components/ui/plugin'
import store from './store'
import router from './router'

const i18n = createI18n({
  locale: 'en',
})

createApp(App)
.use(router)
.use(store)
.use(i18n)
.use(ui)
.mount('#app')
