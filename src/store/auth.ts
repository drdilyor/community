import {ActionTree, Module, MutationTree} from 'vuex'
import {RootState} from './index'
import api from '../api'

export interface AuthState {
  token: string | null,
  user: any,
}

const state: AuthState = {
  token: localStorage.getItem('authToken'),
  user: localStorage.getItem('authUser')
    && JSON.parse(localStorage.getItem('authUser') as string),
}

const mutations: MutationTree<AuthState> = {
  setToken(state, token: string) {
    state.token = token
  },
  setUser(state, user: string) {
    state.user = user
  },
}


const actions: ActionTree<AuthState, RootState> = {
  async login({commit}, payload: {email: string, password: string}) {
    const [data, res] = await api.request('post', '/sessions', payload)
    if (res.status == 200) {
      commit('setToken', data.token as string)
      commit('setUser', data.user)
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      return true
    } else {
      throw new Error(data.detail.errors.general)
    }
  },
}

const module: Module<AuthState, RootState> = {
  state, mutations, actions,
}

export default module
