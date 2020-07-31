import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import {
  User,
  UserResponse,
  UserSubmit,
  UserAuthResponse,
  AddRobotSubmit,
  RobotModel,
  EditRobotSubmit
} from "../models";
import {
  apiLogin,
  apiAuth,
  apiAddRobot,
  apiDeleteRobot,
  apiEditRobot
} from "../api";
import router from "@/router";

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

  get robots() {
    return this.user?.robots;
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
  @Mutation
  setNewRobots(robots: Array<RobotModel>) {
    if (this.user !== null) this.user.robots = robots;
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
        email: data.email,
        robots: data.robots
      });
      return "success";
    } catch (err) {
      this.context.commit("setErrorMessage", err.response.data.message);
      throw new Error(err.response.data.message);
    }
  }
  @Action({ rawError: true })
  async auth() {
    try {
      const data: UserAuthResponse = await apiAuth();
      this.context.commit("setUser", data);
    } catch (err) {
      localStorage.removeItem("token");
      console.log(err.response.data.message);
    }
  }
  @Action({ rawError: true })
  logout() {
    localStorage.removeItem("token");
    this.context.commit("setUser", null);
    if (router.currentRoute.path !== "/") router.push("/");
  }
  @Action({ rawError: true })
  async addRobot(robot: AddRobotSubmit) {
    try {
      const data: Array<RobotModel> = await apiAddRobot(robot);
      this.context.commit("setNewRobots", data);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
  @Action({ rawError: true })
  async deleteRobot(id: string) {
    try {
      const data: Array<RobotModel> = await apiDeleteRobot(id);
      this.context.commit("setNewRobots", data);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }

  @Action({ rawError: true })
  async editRobot(editRobot: EditRobotSubmit) {
    try {
      const data: Array<RobotModel> = await apiEditRobot(editRobot);
      this.context.commit("setNewRobots", data);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
}

export default getModule(UserModule);
