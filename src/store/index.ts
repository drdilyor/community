import {createStore, Module} from 'vuex'
import auth, {AuthState} from './auth'
import api from '../api'

export interface RootState {
  auth: AuthState,
  topics: any[],
}

const root: Module<RootState, RootState> = {
  // @ts-ignore
  state: {
    topics: [],
  },
  mutations: {
    setTopics(state, topics) {
      state.topics = topics
    }
  },
  actions: {
    loadTopics({commit, state}) {
      if (state.topics.length) return
      api.request('get', '/topics')
      .then(([data]) => commit('setTopics', data.filter(
        // Only "official" topics
        i => i.picture,
      )))
    }
  },
  getters: {
  },
  modules: {
    auth,
  }
}

export default createStore<RootState>(root)
