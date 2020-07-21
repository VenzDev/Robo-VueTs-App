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
            <b-button
              type="submit"
              variant="primary"
              class="btn-block form-button"
              ><LoadingSpinner v-if="isLoading" />
              <span v-else>Register</span>
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
import { apiRegister } from "@/store/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { toastSuccess, toastError } from "@/utils/toastConfig";

@Component({ components: { LoadingSpinner } })
export default class Register extends Vue {
  name = "";
  surname = "";
  email = "";
  password = "";
  repeatPassword = "";

  errorMessage = "";

  isLoading = false;

  $toast!: {
    open: Function;
  };

  checkForm(e: Event) {
    e.preventDefault();

    //Need validate inputs
    if (
      this.name.trim().length === 0 ||
      this.surname.trim().length === 0 ||
      this.password.trim().length === 0 ||
      this.repeatPassword.trim().length === 0 ||
      this.email.trim().length === 0
    ) {
      this.$toast.open(toastError("Empty inputs!"));
      return;
    }
    this.isLoading = true;
    apiRegister({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    })
      .then(() => {
        this.$toast.open(toastSuccess("Now you can log in :)"));
        this.$router.push("/login");
      })
      .catch(err => console.log(err))
      .finally(() => (this.isLoading = false));
  }
}
</script>
