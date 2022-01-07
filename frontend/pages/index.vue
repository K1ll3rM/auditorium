<template>
    <main v-if="initialized" >
        <control-bar/>
        <div class="main-container">
            <toasts ref="toasts"/>
            <div class="container">
                <songs></songs>
            </div>
        </div>
        <filter-sidebar/>
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
import Vue from 'vue'
import Songs from "~/components/songs/songs.vue";
import Volume from "~/components/controls/volume.vue";
import {Config} from "~/lib/Config";
import ControlBar from "~/components/controls/ControlBar.vue";
import FilterSidebar from "~/components/Filter/FilterSidebar.vue";
import Toasts from "~/components/Toast/Toasts.vue";
import {Toast, ToastStyle} from "~/lib/Toast";
import {Main} from "~/lib/Main";

export default Vue.extend({
    errorCaptured(err: Error): boolean | void {
        this.addToast(new Toast('An error has occurred! Check the console for more information.', ToastStyle.danger, 0));

        console.error(err);

        return false;
    },
    head() {
        return {
            title: 'Auditorium'
        }
    },
    components: {Toasts, FilterSidebar, ControlBar, Volume, Songs},
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
})
</script>
