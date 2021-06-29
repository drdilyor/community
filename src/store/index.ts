import {createStore, Module} from 'vuex'
import auth, {AuthState} from './auth'
import api from '../api'

export interface RootState {
  auth: AuthState,
  topics: any[],
  articles: any[],
  _articlesLoading: boolean,
  noMoreArticles: boolean,
}

const root: Module<RootState, RootState> = {
  // @ts-ignore
  state: {
    topics: [],
    articles: [],
    _articlesLoading: false,
    noMoreArticles: false,
  },
  mutations: {
    setTopics(state, topics) {
      state.topics = topics
    },
    setArticles(state, articles) {
      state.articles = articles
    },
    pushArticles(state, articles) {
      state.articles = state.articles.concat(articles)
    },
    setArticlesLoading(state, value) {
      state._articlesLoading = value
    }
  },
  actions: {
    loadTopics({commit, state}) {
      if (state.topics.length) return
      api.request('get', '/topics')
      .then(([data]) => commit('setTopics', data.filter(
        // Only "official" topics
        (i: any) => i.picture,
      )))
    },
    /// returns true if no articles left
    async loadArticles({commit, state}): Promise<boolean> {
      const page = state.articles.length / 5 + 1

      if (state._articlesLoading) return false
      if (state.noMoreArticles) return true

      console.assert(page == (page|0))

      commit('setArticlesLoading', true)
      const [data] = await api.request('get', `/posts?type=article&limit=5&page=${page}`)
      commit('pushArticles', data)
      commit('setArticlesLoading', true)

      return data.length < 5
    }
  },
  getters: {
  },
  modules: {
    auth,
  }
}

export default createStore<RootState>(root)
