<template>
  <div class="alert alert-dismissible" :class="(show ? 'show' : '') + style()" role="alert" :id="'toast_' + toast.id">
    <i v-if="toast.style === 0" class="bi bi-info-circle-fill flex-shrink-0 me-2"></i>
    <i v-if="toast.style === 1" class="bi bi-check-circle-fill flex-shrink-0 me-2"></i>
    <i v-if="toast.style === 2 || toast.style === 3" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"></i>
    {{ toast.message }}
    <button type="button" class="btn-close" @click="removeToast()" aria-label="Close"></button>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  opacity: 0;
  transition: .15s opacity ease-in-out;
  display: block;
  width: 350px;
  pointer-events: auto;

  &.show {
    opacity: 1;
  }

  &.danger {
    background: rgba(var(--bs-danger-rgb));
  }

  .bi {
    font-size: 1.2rem;
  }
}

</style>

<script lang="ts">
import {defineNuxtComponent} from "#app";
import {Toast, ToastStyle} from "~~/lib/Toast";
import {timeout} from "@/shared/helpers";

export default defineNuxtComponent({
  props: {
    toast: {
      type: Object as Vue.PropType<Toast>,
      required: true
    },
  },
  async created() {
    this.queueRemoval();
    await timeout(1);
    this.show = true;
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    async queueRemoval() {
      if (this.toast.delay === 0) {
        return;
      }

      await timeout(this.toast.delay);
      await this.fadeOut();
      this.removeToast();
    },
    fadeOut() {
      return new Promise<void>((resolve) => {
        this.$el.addEventListener('transitionend', () => {
          resolve();
        })
        this.show = false;
      });
    },
    removeToast() {
      this.$emit('remove-toast', {
        toast: this.toast
      });
    },
    style() {
      switch (this.toast.style) {
        case ToastStyle.success:
          return ' alert-success';
        case ToastStyle.warning:
          return ' alert-warning';
        case ToastStyle.danger:
          return ' alert-danger';
        default:
          return ' alert-info';
      }
    }
  }
});
</script>
