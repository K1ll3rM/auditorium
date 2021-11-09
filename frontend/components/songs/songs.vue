<template>
    <card>
        <button class="btn btn-secondary" @click="refreshSongs">Refresh</button>
        <none/>
        <song v-for="(song, id) in songs" :key="id" :song="song"/>
    </card>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import Song from "~/components/songs/song.vue";
import {Song as SongClass, Songs} from "~/lib/Song";
import None from "~/components/songs/none.vue";

export default Vue.extend({
    components: {None, Song, Card},
    props: [],
    created() {
        this.refreshSongs();
    },
    data() {
        return {
            songs: <Songs>{}
        }
    },
    methods: {
        async refreshSongs() {
            this.songs = await SongClass.getSongs();
        }
    }
});
</script>
