<template>
  <main v-if="initialized">
    <div class="main-container">
      <toasts ref="toasts"/>
      <div class="container">
        <!--                    <songs></songs>-->
      </div>
    </div>
    <control-bar/>
    <!--        <filter-sidebar/>-->
  </main>
</template>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 65px);
  position: relative;

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>

<script lang="ts">
import {Toast, ToastStyle} from "~~/lib/Toast";
import {Main} from "~~/lib/Main";
import ControlBar from "~~/components/controls/ControlBar.vue";
import {Config} from "~~/lib/Config";
import Toasts from "~~/components/Toast/Toasts.vue";

export default {
  components: {Toasts, ControlBar},
  errorCaptured(err: Error): boolean | void {
    Main.toast.addToast(new Toast('An error has occurred! Check the console for more information.', ToastStyle.danger, 0));

    console.error(err);

    return false;
  },
  head() {
    return {
      title: 'Auditorium'
    }
  },
  async created() {
    await Config.init();
    this.initialized = true;
  },
  data() {
    return {
      initialized: false
    };
  },
  methods: {
  }
}
</script>
