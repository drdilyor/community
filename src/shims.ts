// Vue
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vuex
import {Store} from 'vuex'
import {RootState} from './store'
import api from './api'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
    $api: typeof api
  }
}

// Window
declare global {
  interface Window {
    backend: string
  }
}
