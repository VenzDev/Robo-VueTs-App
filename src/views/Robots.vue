<template>
  <b-container>
    <b-row class="p-3">
      <h3 v-show="users">Your Robots</h3>
    </b-row>
    <b-row>
      <b-col
        v-for="user in users"
        v-bind:key="user.id"
        class=" col-12 col-sm-6 col-md-4 col-xl-3 my-2"
      >
        <b-card class="shadow roboCard">
          <img
            class="roboImg"
            :src="'https://robohash.org/' + user.name"
            alt=""
          />
          <h5 class="text-center p-3">{{ user.name }}</h5>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { apiUsers } from "../store/api";

Component.registerHooks(["created"]);

@Component
export default class Robots extends Vue {
  users: Array<object> | null = null;
  async created() {
    const data = await apiUsers();
    this.users = data;
    console.log(data);
  }
}
</script>

<style lang="scss" scoped>
.roboImg {
  width: 100%;
  min-width: 100px;
}
.roboCard:hover {
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 6px 12px rgba($color: blue, $alpha: 0.4) !important;
}
</style>
