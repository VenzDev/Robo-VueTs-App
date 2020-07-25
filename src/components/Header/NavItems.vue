<template>
  <div class="d-block d-md-flex">
    <b-nav-item active-class="active" to="/link">
      <span>Home</span>
    </b-nav-item>
    <b-nav-item v-if="user" active-class="active" to="/robots">
      <span>Robots</span></b-nav-item
    >
    <b-nav-item v-if="!user" active-class="active" to="/login">
      <span>Login</span>
    </b-nav-item>
    <b-nav-item v-if="!user" active-class="active" to="/register">
      <span>Register</span>
    </b-nav-item>
    <b-nav-item
      v-show="user"
      class="d-md-none"
      active-class="active"
      to="/link"
    >
      <span>User Account</span>
    </b-nav-item>
    <b-nav-item class="d-md-none" v-show="user" @click="handleLogout">
      <span>Logout</span>
    </b-nav-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavItems extends Vue {
  @Prop({ default: false }) private user!: boolean;
  @Prop() private handleLogout!: Function;
}
</script>

<style lang="scss" scoped>
.active span::after {
  width: 100%;
}
a > span {
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
</style>
