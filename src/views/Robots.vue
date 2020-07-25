<template>
  <b-container>
    <div v-if="!isLoading">
      <b-row class="d-block d-sm-flex">
        <b-col class="col-12 col-lg-4">
          <h3 class="mr-3 my-3 my-lg-0" v-show="users">
            Your Robots
          </h3>
        </b-col>
        <b-col class="col-12 col-sm-6 col-lg-4">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
        <b-col class="col-12 col-sm-6 col-lg-4">
          <b-input-group prepend="per page">
            <b-form-input v-model="perPage"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="pb-3 align-items-center">
        <b-col class="col-12 col-sm-6 col-md-4">
          <b-input-group prepend="search">
            <b-form-input v-model="searchInput"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col class="col-12 col-sm-6 col-md-8 my-3">
          <b-dropdown id="dropdown-1" text="Sort By">
            <b-dropdown-item
              v-for="option in options"
              :key="option.key"
              :value="option.value"
              @click="selectedSort = option.value"
              >{{ option.text }}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="user in filteredData"
          v-bind:key="user.id"
          class="col-12 col-sm-6 col-md-4 col-xl-3 my-2"
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
    </div>
    <LoadingSpinner color="black" v-else class="loadingSpinner" />
  </b-container>
</template>

<script lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner";
import { Vue, Component } from "vue-property-decorator";
import { apiUsers } from "../store/api";

interface User {
  name: string;
}

@Component({ components: { LoadingSpinner } })
export default class Robots extends Vue {
  users: Array<User> | null = null;
  isLoading = false;
  searchInput = "";
  selectedSort = "";

  options = [
    { value: "name", text: "by name" },
    { value: "b", text: "Selected Option" },
    { value: "c", text: "This is an option with object value" }
  ];

  perPage = 4;
  currentPage = 1;
  rows = 10;

  async created() {
    this.isLoading = true;
    const data = await apiUsers();
    this.users = data;
    this.isLoading = false;
  }

  handleSort(e: Event) {
    console.log(e.target as HTMLInputElement);
  }

  get filteredData() {
    const from = this.currentPage * this.perPage - this.perPage;
    const to = this.currentPage * this.perPage;

    if (!this.users) return [];

    const filteredUsers = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchInput.toLowerCase());
    });
    this.rows = filteredUsers.length;

    if (this.selectedSort === "name")
      return filteredUsers.slice(from, to).sort((a, b) => {
        return a.name >= b.name ? -1 : 1;
      });
    else return filteredUsers.slice(from, to);
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

.loadingSpinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
