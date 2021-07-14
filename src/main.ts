import {createApp} from 'vue'

import App from './App.vue'
import './assets/styles/index.scss'
import './assets/styles/content.scss'
import ui from './components/ui/plugin'
import store from './store'
import router from './router'
import i18n from './i18n'
import api from './api'
import filters from './filters'

window.backend = import.meta.env.MODE == 'production'
  ? 'https://community-uzbekcoders.herokuapp.com'
  : 'http://localhost:34502'

;(window as any).vm = createApp(App)
.use(router)
.use(store)
.use(i18n)
.use(ui)
.use(api)
.use(filters)
.mount('#app')
