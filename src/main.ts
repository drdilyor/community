import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'

import App from './App.vue'
import './assets/styles/index.scss'
import Button from './components/ui/Button.vue'

const i18n = createI18n({
  locale: 'en',
})

createApp(App)
.use(i18n)
.component('ui-button', Button)
.mount('#app')
