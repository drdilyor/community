// Vue

// @ts-ignore
declare module '*.vue' {
  // @ts-ignore
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vuex
import {Store} from 'vuex'
import {RootState} from './store'
import api from './api'
import {f} from './filters'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
    $api: typeof api
    $f: typeof f
  }
}

// Window
declare global {
  interface Window {
    backend: string
  }
}
