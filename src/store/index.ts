import Vue from "vue";
import Vuex from "vuex";
import newUser from "@/store/modules/newUser";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    newUser
  }
});
