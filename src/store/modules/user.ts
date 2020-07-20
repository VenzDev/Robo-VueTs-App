import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { helperApi } from "../fakeApi";
import { User, UserResponse, UserSubmit } from "../models";
import { apiLogin } from "../api";
import { TableSimplePlugin } from "bootstrap-vue";

@Module({
  namespaced: true,
  name: "user",
  store,
  dynamic: true
})
class UserModule extends VuexModule {
  user: User | null = null;
  errorMessage!: string;

  get userData() {
    return this.user;
  }

  get errorMessageGetter() {
    return this.errorMessage;
  }

  @Mutation
  setUser(newUser: User) {
    this.user = newUser;
  }

  @Mutation
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  @Action({ commit: "setUser" })
  async login(userSubmit: UserSubmit) {
    try {
      const user: UserResponse = await apiLogin(
        userSubmit.email,
        userSubmit.password
      );
      localStorage.setItem("token", user.token);
      return {
        name: user.name,
        surname: user.surname,
        email: user.email
      };
    } catch (err) {
      console.log(err);
    }
  }
}

export default getModule(UserModule);
