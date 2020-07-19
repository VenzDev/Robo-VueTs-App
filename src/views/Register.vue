<template>
  <b-container class="my-md-5">
    <b-row align-h="center">
      <b-col style="background-color: #7f70f5" class="shadow-lg" md="8" lg="6">
        <div class="p-md-5">
          <div class="text-center">
            <h2 class="text-white mb-3">Register</h2>
          </div>
          <b-form @submit="checkForm">
            <b-row class="form-group">
              <b-col class="mb-3 mb-sm-0" sm="6">
                <input
                  class="form-control form-input"
                  placeholder="Name"
                  type="text"
                  v-model="name"
                />
              </b-col>
              <b-col sm="6">
                <input
                  class="form-control form-input"
                  placeholder="Surname"
                  type="text"
                  v-model="surname"
                />
              </b-col>
            </b-row>
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Email"
                type="text"
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
            <b-form-group>
              <input
                class="form-control form-input"
                placeholder="Repeat Password"
                type="password"
                v-model="repeatPassword"
              />
            </b-form-group>
            <div
              v-if="errorMessage"
              class="bg-white p-1 text-danger errorMessage"
            >
              <h5>{{ errorMessage }}</h5>
            </div>
            <b-button
              type="submit"
              variant="primary"
              class="btn-block form-button"
            >
              Register
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
export default class Register extends Vue {
  name = "";
  surname = "";
  email = "";
  password = "";
  repeatPassword = "";

  errorMessage = "";

  $toast!: {
    open: Function;
  };

  checkForm(e: Event) {
    e.preventDefault();
    this.$bvToast.show("b-toaster-top-center");
    console.log({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
    });

    if (this.name.length === 0) {
      this.$toast.open({
        message: "Inputs cannot be empty!",
        type: "error",
        duration: 5000,
        dismissible: true,
        position: "top"
      });
    }
  }
}
</script>
