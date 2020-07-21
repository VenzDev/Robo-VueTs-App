import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { User, UserResponse, UserSubmit } from "../models";
import { apiLogin } from "../api";

@Module({
  namespaced: true,
  name: "user",
  store,
  dynamic: true
})
class UserModule extends VuexModule {
  user: User | null = null;
  errorMessage: string | null = null;

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

  @Action({ rawError: true })
  async login(userSubmit: UserSubmit) {
    try {
      const data: UserResponse = await apiLogin(
        userSubmit.email,
        userSubmit.password
      );
      localStorage.setItem("token", data.token);
      this.context.commit("setUser", {
        name: data.name,
        surname: data.surname,
        email: data.email
      });
      return "success";
    } catch (err) {
      this.context.commit("setErrorMessage", err.response.data.message);
      throw new Error(err.response.data.message);
    }
  }
}

export default getModule(UserModule);
