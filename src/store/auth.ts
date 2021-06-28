import {ActionTree, Module, MutationTree} from 'vuex'
import {RootState} from './index'

export interface AuthState {
  token: string | null,
  user: any,
}

const state: AuthState = {
  token: null,
  user: null,
}

const mutations: MutationTree<AuthState> = {
  setToken(state, token: string) {
    state.token = token
  },
  setUser(state, user: string) {
    state.user = user
  }
}


const actions: ActionTree<AuthState, RootState> = {
  async login({commit}, payload: {email: string, password: string}) {
    try {
      const res = await fetch(`${window.backend}/sessions`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json',},
      })
      if (res.status == 200) {
        const data = await res.json()
        commit('setToken', data.token as string)
        commit('setUser', data.user)
      }
    }
    catch(e) {
      console.log(e)
    }
  },
}

const module: Module<AuthState, RootState> = {
  state, mutations, actions,
}

export default module
