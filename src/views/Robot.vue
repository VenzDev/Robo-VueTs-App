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
            <h2>{{ "Name: " + robot.name }}</h2>
            <h4>{{ "Surname: " + robot.surname }}</h4>
            <h4>{{ robot.email }}</h4>
            <p>{{ robot.country }}</p>
            <p>{{ "Created: " + createdDate }}</p>
            <p>{{ "Updated: " + updatedDate }}</p>
          </b-card>
        </b-col>
        <b-col class="col-12 col-md-6 p-3">
          <b-card class="shadow align-items-center">
            <img :src="'https://robohash.org/' + robot.name" alt="robot" />
          </b-card>
        </b-col>
      </b-row>
    </div>
    <LoadingSpinner class="spinner" v-else />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { apiRobotById } from "../store/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { RobotModel } from "@/store/models";
@Component({
  components: {
    LoadingSpinner
  }
})
export default class Robot extends Vue {
  isLoading = false;
  robot: RobotModel | null = null;

  get paramId() {
    return this.$route.params.id;
  }
  get createdDate() {
    if (this.robot === null) return "empty";
    const date = new Date(this.robot.createdAt);
    return date.toLocaleString();
  }

  get updatedDate() {
    if (this.robot === null) return "empty";
    const date = new Date(this.robot.updatedAt);
    return date.toLocaleString();
  }
  async created() {
    this.isLoading = true;
    this.robot = await apiRobotById(this.paramId);
    this.isLoading = false;
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
