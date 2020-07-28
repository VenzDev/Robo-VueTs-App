import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import user from "@/store/modules/user";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      guest: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/robots",
    name: "Robots",
    meta: {
      logged: true
    },
    component: () =>
      import(/* webpackChunkName: "Robots" */ "../views/Robots.vue")
  },
  {
    path: "/robot/:id",
    name: "Robot",
    meta: {
      logged: true
    },
    component: () =>
      import(/* webpackChunkName: "Robot" */ "../views/Robot.vue")
  },
  {
    path: "/user",
    name: "User",
    meta: {
      logged: true
    },
    component: () => import(/* webpackChunkName: "User" */ "../views/User.vue")
  },

  {
    path: "/register",
    name: "Register",
    meta: {
      guest: true
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("token") && !user.userData) {
    await user.auth();
  }
  const isUser = localStorage.getItem("token") && user.userData;
  if (to.matched.some(record => record.meta.logged)) {
    if (!isUser) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isUser) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
