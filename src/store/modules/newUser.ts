import { User, UserSubmit, UserResponse } from "../models";
import { MutationTree, GetterTree, ActionTree } from "vuex";
import { apiLogin } from "../api";
import { SET_ERROR_MESSAGE, SET_USER } from "../mutation-types";

export interface UserState {
  user: User | null;
  errorMessage: string | null;
}

const state: UserState = {
  user: null,
  errorMessage: null
};

const getters: GetterTree<UserState, any> = {
  user(state) {
    return state.user;
  },
  errorMessage(state) {
    return state.errorMessage;
  }
};

const mutations: MutationTree<UserState> = {
  [SET_USER](state, user: User) {
    state.user = user;
  },
  [SET_ERROR_MESSAGE](state, errorMessage: string) {
    state.errorMessage = errorMessage;
  }
};

const actions: ActionTree<UserState, any> = {
  async login({ commit }, submit: UserSubmit) {
    try {
      const data: UserResponse = await apiLogin(submit.email, submit.password);
      commit(SET_USER, {
        name: data.name,
        surname: data.surname,
        email: data.email
      });
      localStorage.setItem("token", data.token);
      return "success";
    } catch (err) {
      commit(SET_ERROR_MESSAGE, err.response.data.message);
      throw new Error(err.response.data.message);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
