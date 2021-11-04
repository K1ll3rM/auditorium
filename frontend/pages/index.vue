<template>
    <div class="container">
        <h1>Auditorium</h1>

        <songs></songs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Songs from "~/components/songs/songs.vue";

let test: string = 'fdas';

export default Vue.extend({
    head() {
        return {
            title: 'Auditorium'
        }
    },
    components: {Songs}
})
</script>
