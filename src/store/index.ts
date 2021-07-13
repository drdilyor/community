import {createStore, Module} from 'vuex'
import auth, {AuthState} from './auth'
import api from '../api'
import router from '../router'

export interface RootState {
  auth: AuthState,
  homeArticles: any[],
  _homeArticlesLoading: boolean,
  noMoreArticles: boolean,
  homeShowTopics: boolean,
  articlesById: any,
}

const root: Module<RootState, RootState> = {
  // @ts-ignore
  state: {
    homeArticles: [],
    _homeArticlesLoading: false,
    noMoreArticles: false,
    homeShowTopics: false,
    articlesById: {},
  },
  mutations: {
    setHomeArticles(state, articles) {
      state.homeArticles = articles
    },
    pushHomeArticles(state, articles) {
      state.homeArticles = state.homeArticles.concat(articles)
    },
    setHomeArticlesLoading(state, value) {
      state._homeArticlesLoading = value
    },
    setNoMoreArticles(state, value) {
      state.noMoreArticles = value
    },
    setHomeShowTopics(state, value) {
      state.homeShowTopics = value
    },
    addArticleById(state, article) {
      state.articlesById[article._id] = article
    },
    setLiked(state, {article, newArticle}) {
      article.upvoted = newArticle.upvoted
      article.upvotes = newArticle.upvotes
      article.counts = newArticle.counts
    }
  },
  actions: {
    /// returns true if no articles left
    async loadHomeArticles({commit, state}): Promise<boolean> {
      const page = state.homeArticles.length / 5 + 1

      if (state._homeArticlesLoading) return false
      if (state.noMoreArticles) return true

      console.assert(page == (page | 0))

      commit('setHomeArticlesLoading', true)
      const [data] = await api.request('get', `/posts?type=article&limit=5&page=${page}`)
      commit('pushHomeArticles', data)
      commit('setHomeArticlesLoading', false)
      commit('setNoMoreArticles', data.length < 5)
      return data.length < 5
    },
    async loadArticle({commit, state}, id: string): Promise<any> {
      if (state.articlesById[id])
        return state.articlesById[id]

      const [data, res] = await api.request('get', `/posts/${id}`)
      if (res.status == 404) router.push('/404')
      commit('addArticleById', data)

      return data
    },
    // likes or removes like from article
    async likeArticle({commit}, article) {
      const [data, res] = await api.request(
        article.upvoted ? 'delete' : 'post',
        `/posts/${article.id}/votes`,
      )
      if (res.ok)
        commit('setLiked', {article, newArticle: data})
    },
  },
  getters: {},
  modules: {
    auth,
  },
}

export default createStore<RootState>(root)
