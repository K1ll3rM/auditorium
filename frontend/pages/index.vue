<template>
    <main v-if="initialized">
        <control-bar/>
        <div class="main-container">
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

export default Vue.extend({
    head() {
        return {
            title: 'Auditorium'
        }
    },
    components: {FilterSidebar, ControlBar, Volume, Songs},
    async created() {
        await Config.init();
        this.initialized = true;
    },
    data() {
        return {
            initialized: false
        };
    }
})
</script>
