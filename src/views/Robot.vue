<template>
  <b-container>
    <div v-if="!isLoading">
      <b-row class="p-3 justify-content-center">
        <b-button to="/robots" variant="primary">
          &larr; Back to Robots
        </b-button>
      </b-row>
      <b-row>
        <b-col class="col-12 col-md-6 p-3 ">
          <b-card class="shadow">
            <h2>{{ user.name }}</h2>
            <h4>{{ user.email }}</h4>
            <h4>{{ user.company.bs }}</h4>
            <p>{{ user.address.city }}</p>
            <p>{{ user.address.street }}</p>
            <p>{{ user.address.zipcode }}</p>
          </b-card>
        </b-col>
        <b-col class="col-12 col-md-6 p-3">
          <b-card class="shadow align-items-center">
            <img :src="'https://robohash.org/' + user.name" alt="robot" />
          </b-card>
        </b-col>
      </b-row>
    </div>
    <LoadingSpinner class="spinner" v-else />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { apiUserById } from "../store/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

@Component({
  components: {
    LoadingSpinner
  }
})
export default class Robot extends Vue {
  isLoading = false;
  user: object | null = null;

  get paramId() {
    return this.$route.params.id;
  }
  async created() {
    this.isLoading = true;
    const data = await apiUserById(this.paramId);
    this.user = data[0];
    this.isLoading = false;
    console.log(this.user);
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
