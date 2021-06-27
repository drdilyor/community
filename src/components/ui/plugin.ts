import {App} from 'vue'
import Button from './Button.vue'
import Input from './Input.vue'

export default {
  install(app: App) {
    app.component('ui-button', Button)
    app.component('ui-input', Input)
  }
}
