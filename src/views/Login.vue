<template>
  <b-container class="my-md-5">
    <b-row align-h="center">
      <b-col style="background-color: #7f70f5" class="shadow-lg" md="8" lg="6">
        <div class="p-3 p-sm-5">
          <div class="text-center">
            <h2 class="text-white mb-3">Login</h2>
          </div>
          <b-form @submit="checkForm">
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Email"
                type="Email"
                v-model="email"
              />
            </b-form-group>
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Password"
                type="password"
                v-model="password"
              />
            </b-form-group>
            <b-button
              type="submit"
              variant="primary"
              class="btn-block form-button"
            >
              Login
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "@/styles/form.scss";

@Component
export default class Login extends Vue {
  email = "";
  password = "";

  checkForm(e: Event) {
    //to dobrze
    //const value = (e.target as HTMLInputElement).value;
    e.preventDefault();
    console.log({ email: this.email, password: this.password });
  }
}
</script>
