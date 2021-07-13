import store from '../store'
import {App} from 'vue'
import {HttpMethod} from './types'
import { ApiView } from '.'

const api = {
  // returns data as the first element because
  // then it is possible to omit res parameter:
  //     api.request(...).then(([data]) => {...})
  async request(
    method: HttpMethod,
    url: string,
    json: any = null
  ): Promise<[any, Response]> {
    // remove slash at the beginning
    url = url[0] == '/' ? url.slice(1) : url

    const options: RequestInit = {method}
    const headers: any = {}
    if (store.state.auth.token) {
      headers['X-Token'] = store.state.auth.token
    }
    if (method == 'post' || method == 'put') {
      headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(json)
    }
    options.headers = headers
    const res = await fetch(`${window.backend}/${url}`, options)
    const data = await res.json()
    
    return [data, res]
  },
  install(app: App) {
    app.config.globalProperties.$api = api
    app.component('api-view', ApiView)
  }
}

export default api
