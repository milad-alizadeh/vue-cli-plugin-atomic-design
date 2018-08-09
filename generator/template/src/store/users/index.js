const state = {
  user: {}
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

const actions = {
  async getUser ({ commit }, username) {
    let response = await fetch(`//api.github.com/users/${username}`)
    let user = await response.json()
    commit('setUser', user)
  }
}

export default {
  state,
  mutations,
  actions
}
