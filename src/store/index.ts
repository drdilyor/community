import {createStore, Module} from 'vuex'
import auth, {AuthState} from './auth'

export interface RootState {
  auth: AuthState,
}

const root: Module<RootState, RootState> = {
  // @ts-ignore
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth,
  }
}

export default createStore<RootState>(root)
