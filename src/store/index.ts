import {createStore, Module} from 'vuex'
import auth, {AuthState} from './auth'
import api from '../api'
import router from '../router'

export interface RootState {
  auth: AuthState,
  feed: any[],
  feedLoading: boolean,
  feedNoMore: boolean,
  articlesById: any,
  responsesByArticleId: any,
  usersByUsername: any,
  articlesByUser: any,
  articlesByUserLoading: any,
  articlesByUserNoMore: any,
}

const root: Module<RootState, RootState> = {
  // @ts-ignore
  state: {
    feed: [],
    feedLoading: false,
    feedNoMore: false,
    articlesById: {},
    responsesByArticleId: {},
    usersByUsername: {},
    articlesByUser: {},
    articlesByUserLoading: {},
    articlesByUserNoMore: {},
  },
  mutations: {
    setFeed(state, articles) {
      state.feed = articles
    },
    pushFeed(state, articles) {
      state.feed = state.feed.concat(articles)
    },
    setFeedLoading(state, value) {
      state.feedLoading = value
    },
    setFeedNoMore(state, value) {
      state.feedNoMore = value
    },
    addArticleById(state, article) {
      state.articlesById[article._id] = article
    },
    setLiked(state, {post, newPost}) {
      post.upvoted = newPost.upvoted
      post.upvotes = newPost.upvotes
      post.counts = newPost.counts
    },
    setResponses(state, {id, responses}) {
      state.responsesByArticleId[id] = responses
    },
    addUserByUsername(state, user) {
      state.usersByUsername[user.profile.username] = user
    },
    pushArticlesByUser(state, articles: any[]) {
      if (!articles.length) return

      // check all articles are from same user
      console.assert(articles.every(a => a.user.id == articles[0].user.id))
      const x = articles[0].user.id, f = state.articlesByUser
      f[x] = f[x].concat(articles)
    },
    setArticlesByUserLoading(state, {userId, value}) {
      state.articlesByUserLoading[userId] = value
    },
    setArticlesByUserNoMore(state, {userId, value}) {
      state.articlesByUserNoMore[userId] = value
    },
  },
  actions: {
    /// returns true if no articles left
    async loadFeed({commit, state}): Promise<boolean> {
      const page = state.feed.length / 5 + 1

      if (state.feedLoading) return false
      if (state.feedNoMore) return true

      console.assert(page == (page | 0))

      commit('setFeedLoading', true)
      const [data] = await api.request('get', `/posts?type=article&limit=5&page=${page}`)
      commit('pushFeed', data)
      commit('setFeedLoading', false)
      commit('setFeedNoMore', data.length < 5)
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
        commit('setLiked', {post: article, newPost: data})
    },
    async loadResponses({state, commit}, id) {
      if (state.responsesByArticleId[id])
        return
      const [data, res] = await api.request('get', `/posts/${id}/responses?limit=999`)
      commit('setResponses', {id, responses: data})
    },
    async likeResponse({state, commit}, response) {
      const [data, res] = await api.request(
        response.upvoted ? 'delete' : 'post',
        `/posts/${response.id}/votes`,
      )
      if (res.ok)
        commit('setLiked', {post: response, newPost: data})
    },
    async loadUser({state, commit}, username: string) {
      if (state.usersByUsername[username])
        return
      const [data, res] = await api.request('get', `/users/${username}`)
      if (res.ok)
        commit('addUserByUsername', data)
    },
    async loadUserArticles({state, commit}, userId: string) {
      const articles = state.articlesByUser
      if (!articles[userId])
        articles[userId] = []
      const page = articles[userId].length / 5 + 1

      if (state.articlesByUserLoading[userId])
        return
      if (state.articlesByUserNoMore[userId])
        return
      console.assert(page == (page | 0))

      commit('setArticlesByUserLoading', {userId, value: true})
      const [data] = await api.request('get', `/users/${userId}/posts?type=article&limit=5&page=${page}`)
      commit('pushArticlesByUser', data)
      commit('setArticlesByUserLoading', {userId, value: false})
      commit('setArticlesByUserNoMore', {userId, value: data.length < 5})
    }
  },
  getters: {},
  modules: {
    auth,
  },
}

export default createStore<RootState>(root)
