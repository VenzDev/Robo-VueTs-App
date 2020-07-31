<template>
  <b-container>
    <div v-if="!isLoading">
      <b-row class="d-block d-sm-flex">
        <b-col class="col-12 col-lg-4">
          <h3 class="mr-3 my-3 my-lg-0" v-show="robots">
            Your Robots
          </h3>
        </b-col>
        <b-col class="col-12 col-sm-6 col-lg-4">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
        <b-col class="col-12 col-sm-6 col-lg-4">
          <b-input-group prepend="per page">
            <b-form-input v-model="perPage"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="pb-3 align-items-center">
        <b-col class="col-12 col-sm-4">
          <b-input-group prepend="search">
            <b-form-input v-model="searchInput"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col class="col-12 col-sm-4 my-3">
          <b-dropdown id="dropdown-1" text="Sort By">
            <b-dropdown-item
              v-for="option in options"
              :key="option.key"
              :value="option.value"
              @click="selectedSort = option.value"
              >{{ option.text }}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
        <b-col class="col-12 col-sm-4">
          <b-button v-b-modal.modal-1 variant="primary">Add Robot</b-button>
        </b-col>
      </b-row>
      <AddRobotModal />
      <DeleteRobotModal :id="selectedRobotId" />
      <EditRobotModal :initRobotInfo="selectedRobotToEdit" />
      <b-row>
        <transition-group
          style="width:100%; display:flex; flex-wrap:wrap;"
          tag="div"
        >
          <b-col
            class="col-12 col-sm-6 col-md-4 col-xl-3 my-2"
            v-for="robot in filteredData"
            v-bind:key="robot._id"
          >
            <b-card class="shadow roboCard">
              <div
                class="editIcon"
                @click="handleRobotEdit(robot)"
                v-b-modal.editRobot-modal
              >
                <v-icon name="edit"></v-icon>
              </div>
              <div
                class="deleteIcon"
                @click="selectedRobotId = robot._id"
                v-b-modal.deleteRobot-modal
              >
                <v-icon name="delete"></v-icon>
              </div>
              <router-link class="link" :to="'/robot/' + robot._id">
                <img
                  class="roboImg"
                  :src="'https://robohash.org/' + robot.name"
                  alt="Robot"
                />
                <h5 class="text-center p-3">{{ robot.name }}</h5>
              </router-link>
            </b-card>
          </b-col>
        </transition-group>
      </b-row>
    </div>
    <LoadingSpinner color="black" v-else class="loadingSpinner" />
  </b-container>
</template>

<script lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner";
import { Vue, Component, Watch } from "vue-property-decorator";
import AddRobotModal from "@/components/AddRobotModal";
import DeleteRobotModal from "@/components/DeleteRobotModal";
import EditRobotModal from "@/components/EditRobotModal";
import user from "@/store/modules/user";
import { RobotModel } from "../store/models";

@Component({
  components: {
    LoadingSpinner,
    AddRobotModal,
    DeleteRobotModal,
    EditRobotModal
  }
})
export default class Robots extends Vue {
  isLoading = false;
  isAnimating = false;
  searchInput = "";
  selectedSort = "";

  selectedRobotId: number | null = null;

  selectedRobotToEdit: RobotModel | null = null;

  options = [
    { value: "name", text: "by name" },
    { value: "b", text: "Todo" },
    { value: "c", text: "Todo" }
  ];

  perPage = 4;
  currentPage = 1;
  rows = 10;

  handleRobotEdit(robot: RobotModel) {
    this.selectedRobotToEdit = robot;
  }

  get robots() {
    return user.robots as Array<RobotModel>;
  }

  get filteredData() {
    const from = this.currentPage * this.perPage - this.perPage;
    const to = this.currentPage * this.perPage;

    if (!this.robots) return [];

    const filteredUsers = this.robots.filter(user => {
      return user.name.toLowerCase().includes(this.searchInput.toLowerCase());
    });
    this.rows = filteredUsers.length;

    if (this.selectedSort === "name")
      return filteredUsers.slice(from, to).sort((a, b) => {
        return a.name >= b.name ? -1 : 1;
      });
    else return filteredUsers.slice(from, to);
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: inherit;
}
.roboImg {
  width: 100%;
  min-width: 100px;
}
.roboCard:hover {
  transition: 0.3s;
  box-shadow: 0px 6px 12px rgba($color: blue, $alpha: 0.4) !important;
}

.loadingSpinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.deleteIcon,
.editIcon {
  top: 15px;
  right: 20px;
  position: absolute;
  height: 25px;
  width: 25px;
  transition: 0.2s;
  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    cursor: pointer;
    color: red;
  }
}

.editIcon {
  right: 50px;
  &:hover {
    color: blue;
  }
}
</style>
