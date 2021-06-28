// Vue
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vuex
import {Store} from 'vuex'
import {RootState} from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}

// Window
declare global {
  interface Window {
    backend: string
  }
}
