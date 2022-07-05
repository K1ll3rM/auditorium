<template>
  <div class="toast-container">
    <toast v-for="(toast, index) in toasts" :key="index" :toast="toast" @remove-toast="removeToast"/>
  </div>
</template>

<style lang="scss" scoped>
.toast-container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10000;
}
</style>

<script lang="ts">
import {defineNuxtComponent} from "#app";
import {Toast as ToastClass} from "~~/lib/Toast";
import Toast from "~~/components/Toast/Toast.vue";

export default defineNuxtComponent({
  components: {Toast},
  props: {},
  created() {
  },
  data() {
    return {
      toasts: {} as { [key: string]: ToastClass }
    }
  },
  methods: {
    addToast(toast: ToastClass) {
      Vue.set(this.toasts, toast.id, toast);
    },
    removeToast(e: { toast: ToastClass }) {
      Vue.delete(this.toasts, e.toast.id);
    }
  }
});
</script>
