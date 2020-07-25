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
          <NavbarItems :user="!!user" :handleLogout="handleLogout" />
          <UserDropdown :user="user" :handleLogout="handleLogout" />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import user from "@/store/modules/user";
import { User } from "@/store/models";
import UserDropdown from "@/components/Header/UserDropdown";
import NavbarItems from "@/components/Header/NavItems";

@Component({
  components: {
    UserDropdown,
    NavbarItems
  }
})
export default class Header extends Vue {
  open = false;

  get user(): User | null {
    return user.userData;
  }

  handleLogout() {
    setTimeout(() => {
      user.logout();
    }, 250);
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(120deg, #7f70f5, #0ea0ff);
  color: #fff;

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
