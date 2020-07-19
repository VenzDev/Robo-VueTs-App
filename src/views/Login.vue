<template>
  <b-container class="my-md-5">
    <b-row align-h="center">
      <b-col style="background-color: #7f70f5" class="shadow-lg" md="8" lg="6">
        <div class="p-3 p-sm-5">
          <div class="text-center">
            <h2 class="text-white mb-3">Login</h2>
          </div>
          <b-form>
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Email"
                type="text"
              />
            </b-form-group>
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Password"
                type="password"
              />
            </b-form-group>
            <b-button variant="primary" class="btn-block form-button"
              >Login</b-button
            >
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.form-input {
  border: none;
  border-radius: 10rem;
  padding: 1.5rem 1rem;
}
.form-button {
  padding: 0.75rem 1rem;
  border-radius: 10rem;
  margin-top: 2rem;
}
</style>
