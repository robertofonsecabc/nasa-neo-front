import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token : null
  },
  mutations: {
    login(state, token){
      console.log(token)
      state.token = token
    },
    logout(state){
      state.token = null
    }
  },
  getters:{
    isAuthenticated: state => {
      return state.token != null && state.token.token != null
    },
    username: state => {
      if( state.token != null &&  state.token.username != null ){
        return state.token.username
      }
      return "No user"
    },
  },
  actions: {
  },
  modules: {
  }
})
