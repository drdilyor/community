import {App} from 'vue'

export default {
  install(app: App) {
    app.config.globalProperties.$f = {
      /* just here */
    }
  }
}
