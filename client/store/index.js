import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0,
      hasToken: false
    }),
    mutations: {
      increment (state) {
        state.counter++
      },
      toggleOn (state) {
        state.hasToken = true
      },
      toggleOff (state) {
        state.hasToken = false
      }
    }
  })
}

export default createStore