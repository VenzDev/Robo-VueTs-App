<template>
  <b-container>
    <b-row align-v="center">
      <b-col md="6" class="text-center">
        <div class="homeInfo">
          <h2>Simple Robot App Sandbox</h2>
          <h4>Login and see what this app can do!</h4>
        </div>
      </b-col>
      <b-col class="d-flex" md="6">
        <img class="img" src="@/assets/robot.png" alt="robot" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style scoped>
.homeInfo {
  background-color: #7f70f5;
  color: white;
  padding: 2rem;
  border-radius: 23px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}
.img {
  margin: 0 auto;
  height: 60vh;
}
@media (max-width: 400px) {
  .img {
    height: 40vh;
  }
}
</style>
