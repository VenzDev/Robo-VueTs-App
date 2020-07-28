<template>
  <b-modal
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleForm"
    id="modal-1"
    title="Add Robot"
  >
    <p class="my-4">Fill empty Fields</p>
    <b-form>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Name"
          type="name"
          v-model="name"
        />
      </b-form-group>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Surname"
          type="name"
          v-model="surname"
        />
      </b-form-group>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Email"
          type="email"
          v-model="email"
        />
      </b-form-group>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Country"
          type="text"
          v-model="country"
        />
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer="{ close, ok }">
      <b-button @click="close()">Close</b-button>
      <b-button :disabled="isLoading" variant="primary">
        <span v-if="!isLoading" @click="ok">Add Robot</span>
        <span v-else>Loading...</span>
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BvModalEvent } from "bootstrap-vue";
import user from "@/store/modules/user";

@Component
export default class AddrobotModal extends Vue {
  name = "";
  surname = "";
  email = "";
  country = "";
  isLoading = false;

  resetModal() {
    this.name = "";
    this.surname = "";
    this.email = "";
    this.country = "";
  }

  close() {
    this.$nextTick(() => {
      this.$bvModal.hide("modal-1");
    });
  }

  async handleForm(bvModalEvt: BvModalEvent) {
    bvModalEvt.preventDefault();
    this.isLoading = true;
    await user
      .addRobot({
        name: this.name,
        surname: this.surname,
        email: this.email,
        country: this.country
      })
      .then(() => {
        this.$nextTick(() => {
          this.$bvModal.hide("modal-1");
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
      .finally(() => (this.isLoading = false));
  }
}
</script>
