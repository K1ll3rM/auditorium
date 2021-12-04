<template>
    <div @click="songPlayer.play()">
        <song-style :class="($music.currentSong && $music.currentSong.song.id === song.id ? 'selected' : '') + (songPlayer.transitioning ? ' transitioning' : '')" :name="song.manifest.name"/>
    </div>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Songs/Song";
import {Config} from "~/lib/Config";
import {easeInOutQuad, timeout} from "@/shared/helpers";
import SongStyle from "~/components/songs/song-style.vue";
import {SongPlayer} from "~/lib/Songs/SongPlayer";

export default Vue.extend({
    components: {SongStyle, Card},
    props: {
        song: {
            type: Object as Vue.PropType<Song>,
            required: true
        },
    },
    data() {
        return {
            songPlayer: {} as SongPlayer
        }
    },
    created() {
        this.songPlayer = new SongPlayer(this.song, this.$root);
    },
    methods: {

    }
});
</script>