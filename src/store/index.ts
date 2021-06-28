import {createStore, Module} from 'vuex'
import auth from './auth'

export interface RootState {
}

const root: Module<RootState, RootState> = {
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
