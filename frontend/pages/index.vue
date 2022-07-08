<template>
  <main v-if="initialized">
    <h1>testing</h1>
    <control-bar/>
    <!--        <div class="main-container">-->
    <!--            <toasts ref="toasts"/>-->
    <!--            <div class="container">-->
    <!--                <songs></songs>-->
    <!--            </div>-->
    <!--        </div>-->
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
import {Toast} from "~~/lib/Toast";
import {Main} from "~~/lib/Main";
import ControlBar from "~~/components/controls/ControlBar.vue";
import {Config} from "~~/lib/Config";

export default {
  components: {ControlBar},
  // errorCaptured(err: Error): boolean | void {
  //   this.addToast(new Toast('An error has occurred! Check the console for more information.', ToastStyle.danger, 0));
  //
  //   console.error(err);
  //
  //   return false;
  // },
  head() {
    return {
      title: 'Auditorium'
    }
  },
  async created() {
    this.initMain();
    await Config.init();
    this.initialized = true;
  },
  data() {
    return {
      initialized: false
    };
  },
  methods: {
    initMain() {
      Main.$root = this.$root;
      Main.addToast = this.addToast;
    },
    addToast(toast: Toast) {
      this.$refs.toasts.addToast(toast);
    }
  }
}
</script>
