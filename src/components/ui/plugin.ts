import {App} from 'vue'
import Alert from './Alert.vue'
import Button from './Button.vue'
import Input from './Input.vue'

export default {
  install(app: App) {
    app.component('ui-alert', Alert)
    app.component('ui-button', Button)
    app.component('ui-input', Input)
  }
}
