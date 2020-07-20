import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { helperApi2 } from "../fakeApi";
import { User } from "../models";

@Module({
  namespaced: true,
  name: "nice",
  store,
  dynamic: true
})
class NiceModule extends VuexModule {
  user: User | null = null;
  surname = "test";

  get getTestname() {
    return this.surname;
  }

  @Mutation
  setSurname(newName: string) {
    this.surname = newName;
  }

  @Action({ commit: "setSurname" })
  async asyncSetSurname(name: string) {
    await helperApi2();
    return name;
  }
}

export default getModule(NiceModule);
