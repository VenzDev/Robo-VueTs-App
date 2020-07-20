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
              <v-wait for="incrementing count">
                <template slot="waiting">waiting</template>
                Register
              </v-wait>
            </b-button>
            <div v-if="isLoading">loading</div>
            <div>{{ count }}</div>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { mapWaitingGetters, mapWaitingActions } from "vue-wait";
import "@/styles/form.scss";

@Component({
  computed: {
    ...mapGetters(["count"]),
    ...mapWaitingGetters({ isIncrementing: "incrementing count" })
  },
  methods: {
    ...mapWaitingActions({ incrementAsync: "incrementing count" })
  }
})
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
  $l!: {
    start: Function;
    end: Function;
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
    this.$l.start("incrementing count");
    this.isLoading = true;
    this.$store.dispatch("incrementAsync").then(() => {
      this.$l.end("incrementing count");
      this.isLoading = false;
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
