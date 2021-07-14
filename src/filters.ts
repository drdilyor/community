import {App} from 'vue'
import i18n from './i18n'

export const f = {
  date(value: string): string {
    const date = new Date(Date.parse(value))
      if (date.setHours(0,0,0,0) == new Date().setHours(0,0,0,0)) {
        return i18n.global.t('today')
      } else {
        return date.toLocaleDateString()
      }
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$f = f
  }
}
