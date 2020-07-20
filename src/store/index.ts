import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1
  },
  getters: {
    count: state => state.counter
  },
  actions: {
    incrementAsync({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("increment");
          resolve();
        }, 3000);
      });
    }
  },
  mutations: {
    increment(state) {
      state.counter += 1;
    }
  }
});
