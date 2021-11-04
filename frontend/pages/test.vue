<template>
    <div>
        <h1>Testing</h1>
        <NuxtLink to="/">Test2</NuxtLink>
        <button @click="refreshSongs()">refresh</button>
        <div v-for="(song, id) in songs" :key="id" :ref="`song-${id}`">
            {{ song.manifest.name }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Songs} from "@/shared/Song";

export default Vue.extend({
    components: {},
    data() {
        return {
            songs: <Songs>{}
        }
    },
    methods: {
        refreshSongs() {
            this.songs = window.api.sendSync('music-request');
            console.log(this.$refs)
        }
    }
});
</script>
