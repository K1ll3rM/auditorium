<template>
    <card>
        <button class="btn btn-secondary" @click="refreshSongs">Refresh</button>
        <song v-for="(song, id) in songs" :key="id" :song="song"></song>
    </card>
</template>

<style>
</style>
<script lang="ts">
import {Songs} from "@/shared/Song";
import Card from "~/components/Card.vue";
import Vue from "vue";
import Song from "~/components/songs/song.vue";
import {Song as SongClass} from "~/lib/Song";

export default Vue.extend({
    components: {Song, Card},
    props: [],
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
