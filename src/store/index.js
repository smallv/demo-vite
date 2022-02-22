import { createStore } from 'vuex'
 
export default createStore({
  state () {
    return {
      username: ''
    }
  },
  mutations: {
    setUserName (state, payload) {
      state.username = payload
    }
  }
})