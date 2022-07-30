<template>
    <div class="toast-container">
        <Toast v-for="(toast, index) in $toast.toasts" :key="index" :toast="toast" @remove-toast="removeToast"/>
    </div>
</template>

<script lang="ts">
import {Toast as ToastClass} from "~~/lib/Toast";
import Toast from "~~/components/Toast/Toast.vue";

export default {
    name: "Toasts",
    components: {Toast},
    data() {
        return {
            toasts: {} as { [key: string]: ToastClass }
        }
    },
    methods: {
        removeToast(e: { toast: ToastClass }) {
            this.$toast.removeToast(e.toast.id);
        }
    }
};
</script>

<style lang="scss" scoped>
.toast-container {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 10000;
}
</style>
