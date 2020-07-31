import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import VueWait from "vue-wait";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import feather from "vue-icon";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toast-notification/dist/theme-default.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(feather, "v-icon");
Vue.use(VueToast);
Vue.use(VueWait);

declare module "vue/types/vue" {
  interface Vue {
    $wait: VueWait;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    wait?: VueWait;
  }
}

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true, // You must pass this option `true` to use Vuex
    vuexModuleName: "vuex-example-module", // It's optional, `wait` by default.,
    accessorName: "$l"
  }),
  render: h => h(App)
}).$mount("#app");
