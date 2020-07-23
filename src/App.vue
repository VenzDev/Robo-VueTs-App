<template>
  <div id="app">
    <Header />
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({ components: { Header } })
export default class App extends Vue {}
</script>

<style lang="scss">
.wrapper {
  min-height: 100vh;
  padding-top: 100px;
}
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.25s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 0.25s ease;
  opacity: 0;
}
</style>
