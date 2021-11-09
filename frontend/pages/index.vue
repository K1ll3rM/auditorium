<template>
    <div class="container">
        <h1>Auditorium</h1>

        <volume/>

        <songs></songs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Songs from "~/components/songs/songs.vue";
import Volume from "~/components/volume.vue";

export default Vue.extend({
    head() {
        return {
            title: 'Auditorium'
        }
    },
    components: {Volume, Songs}
})
</script>
