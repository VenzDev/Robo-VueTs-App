<template>
  <b-container class="my-md-5">
    <b-row align-h="center">
      <b-col style="background-color: #7f70f5" class="shadow-lg" md="8" lg="6">
        <div class="p-md-5">
          <div class="text-center">
            <h2 class="text-white mb-3">Register</h2>
          </div>
          <b-form>
            <b-row class="form-group">
              <b-col class="mb-3 mb-sm-0" sm="6">
                <input
                  class="form-control form-input"
                  placeholder="Name"
                  type="text"
                />
              </b-col>
              <b-col sm="6">
                <input
                  class="form-control form-input"
                  placeholder="Surname"
                  type="text"
                />
              </b-col>
            </b-row>
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
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Repeat Password"
                type="password"
              />
            </b-form-group>
            <b-button variant="primary" class="btn-block form-button"
              >Register</b-button
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
export default class Register extends Vue {}
</script>

<style lang="scss" scoped>
.form-input {
  border: none;
  font-size: 1rem;
  border-radius: 10rem;
  padding: 1.5rem 1rem;
}
.form-button {
  border-radius: 10rem;
  margin: 1rem 0;
  margin-top: 2rem;
}
</style>
