<template>
  <div class="position-relative d-none d-md-flex">
    <div
      v-if="user"
      style="cursor: pointer"
      class="d-flex justify-content-center align-items-center"
      @click="handleOpenDropdown"
    >
      <div class="topbar-divider"></div>
      <p class="align-middle my-0 mr-3">
        {{ user.name + " " + user.surname }}
      </p>
      <b-avatar
        class="avatar"
        :text="user.name[0] + user.surname[0]"
      ></b-avatar>
    </div>
    <transition name="list">
      <ul class="superDropdown w-100" v-if="open">
        <li class="d-block">
          <router-link class="userLink" to="/user">Account</router-link>
        </li>
        <li class="d-block" @click="logout">Logout</li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class UserDropdown extends Vue {
  @Prop({ default: null }) private user!: object;
  @Prop() private handleLogout!: Function;

  open = false;

  handleOpenDropdown() {
    this.open = !this.open;
  }

  logout() {
    this.handleOpenDropdown();
    this.handleLogout();
  }

  @Watch("$route")
  closeDropdownOnRouteChange() {
    this.open = false;
  }
}
</script>

<style lang="scss" scoped>
.userLink {
  text-decoration: none;
  color: inherit;
}

.superDropdown {
  display: block;
  position: absolute;
  list-style: none;
  opacity: 1;
  padding: 1rem;
  top: calc(100% + 0.5rem);
  color: black;
  background-color: white;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);

  & li {
    cursor: pointer;

    &:hover {
      color: blue;
    }
  }
}

.topbar-divider {
  width: 0;
  border-right: 1px solid #e3e6f0;
  height: 2.375rem;
  margin: auto 1rem;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>
