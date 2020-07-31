<template>
  <b-modal @ok="handleDelete" id="deleteRobot-modal" title="Delete Robot">
    <p class="my-4">Are you Sure</p>
    <template v-slot:modal-footer="{ close, ok }">
      <b-button @click="close()">Close</b-button>
      <b-button :disabled="isLoading" variant="primary">
        <span v-if="!isLoading" @click="ok">Delete Robot</span>
        <span v-else>Loading...</span>
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { BvModalEvent } from "bootstrap-vue";
import user from "@/store/modules/user";

@Component
export default class DeleteRobotModal extends Vue {
  @Prop() id!: string;
  isLoading = false;

  close() {
    this.isLoading = false;
    this.$nextTick(() => {
      this.$bvModal.hide("deleteRobot-modal");
    });
  }

  async handleDelete() {
    this.isLoading = true;
    await user.deleteRobot(this.id);
    this.close();
  }
}
</script>
