<template>
  <b-modal @ok="handleForm" id="editRobot-modal" title="Edit Robot">
    <p class="my-4">Fill empty Fields</p>
    <b-form v-if="robotInfo">
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Name"
          type="name"
          v-model="robotInfo.name"
        />
      </b-form-group>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Surname"
          type="name"
          v-model="robotInfo.surname"
        />
      </b-form-group>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Email"
          type="email"
          v-model="robotInfo.email"
        />
      </b-form-group>
      <b-form-group>
        <input
          class="form-control form-input"
          placeholder="Country"
          type="text"
          v-model="robotInfo.country"
        />
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer="{ close, ok }">
      <b-button @click="close()">Close</b-button>
      <b-button :disabled="isLoading" variant="primary">
        <span v-if="!isLoading" @click="ok">Edit Robot</span>
        <span v-else>Loading...</span>
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { BvModalEvent } from "bootstrap-vue";
import user from "@/store/modules/user";

interface RobotInfo {
  _id: string;
  name: string;
  surname: string;
  email: string;
  country: string;
}

@Component
export default class EditRobotModal extends Vue {
  @Prop() initRobotInfo: RobotInfo | null = null;
  robotInfo: RobotInfo | null = JSON.parse(JSON.stringify(this.initRobotInfo));

  isLoading = false;

  close() {
    this.$nextTick(() => {
      this.$bvModal.hide("editRobot-modal");
    });
  }

  async handleForm(bvModalEvt: BvModalEvent) {
    bvModalEvt.preventDefault();
    this.isLoading = true;
    if (this.robotInfo) {
      await user
        .editRobot({
          robotId: this.robotInfo._id,
          name: this.robotInfo.name,
          surname: this.robotInfo.surname,
          email: this.robotInfo.email,
          country: this.robotInfo.country
        })
        .then(() => this.close())
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => (this.isLoading = false));
    } else this.isLoading = false;
  }
  @Watch("initRobotInfo")
  handleRobot() {
    this.robotInfo = JSON.parse(JSON.stringify(this.initRobotInfo));
  }
}
</script>
