<template>
  <b-navbar class="navbar" type="dark" toggleable="md" fixed="top">
    <b-container>
      <b-link to="/" class="navbar-brand logo">Robo App</b-link>
      <b-navbar-toggle
        class="bg-transparent toggler"
        target="nav-collapse"
      ></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-if="userData"
            class="d-md-none"
            active-class="active"
            to="/link"
          >
            <span>User Account</span>
          </b-nav-item>
          <b-nav-item active-class="active" to="/link">
            <span>Home</span>
          </b-nav-item>
          <b-nav-item active-class="active" to="/super">
            <span>Link</span></b-nav-item
          >
          <b-nav-item active-class="active" to="/login">
            <span>Login</span>
          </b-nav-item>
          <b-nav-item active-class="active" to="/register">
            <span>Register</span>
          </b-nav-item>
          <div class="d-none d-md-flex">
            <div
              class="d-flex justify-content-center align-items-center"
              v-if="userData"
            >
              <div class="topbar-divider"></div>
              <p class="align-middle my-0 mx-2">
                {{ userData.name + " " + userData.surname }}
              </p>
              <b-avatar
                class="avatar"
                variant="primary"
                :text="userData.name[0] + userData.surname[0]"
              ></b-avatar>
            </div>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";

@Component
export default class Header extends Vue {
  get userData() {
    return user.userData;
  }
}
</script>

<style lang="scss" scoped>
.topbar-divider {
  width: 0;
  border-right: 1px solid #e3e6f0;
  height: 2.375rem;
  margin: auto 1rem;
}
.navbar {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(120deg, #7f70f5, #0ea0ff);
  color: #fff;

  & a > span {
    position: relative;
    overflow: hidden;
    padding: 5px;

    &::after {
      transition: ease-in-out 0.2s;
      content: "";
      display: block;
      position: absolute;
      bottom: 0px;
      width: 0%;
      height: 1px;
      background-color: white;
    }
    &:hover::after {
      width: 100%;
    }
  }
  & .active span::after {
    width: 100%;
  }
  .login {
    border: 1px solid white;
    padding: 10px 15px;
    border-radius: 23px;
    &:hover::after {
      width: 0;
    }
  }
}
</style>
