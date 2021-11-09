<template>
    <div class="container" v-if="initialized">
        <h1>Auditorium</h1>

        <volume/>

        <songs></songs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Songs from "~/components/songs/songs.vue";
import Volume from "~/components/volume.vue";
import {Config} from "~/lib/Config";

export default Vue.extend({
    head() {
        return {
            title: 'Auditorium'
        }
    },
    components: {Volume, Songs},
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
