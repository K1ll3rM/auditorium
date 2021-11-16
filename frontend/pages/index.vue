<template>
    <main>
        <control-bar/>
        <div class="container" v-if="initialized">
            <h1>Auditorium</h1>

            <songs></songs>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Songs from "~/components/songs/songs.vue";
import Volume from "~/components/controls/volume.vue";
import {Config} from "~/lib/Config";
import ControlBar from "~/components/controls/ControlBar.vue";

export default Vue.extend({
    head() {
        return {
            title: 'Auditorium'
        }
    },
    components: {ControlBar, Volume, Songs},
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
