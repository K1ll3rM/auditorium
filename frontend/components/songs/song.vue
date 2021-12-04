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
import SongStyle from "~/components/songs/song-style.vue";
import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";
import {SongPlayerFactory} from "~/lib/Songs/SongPlayerFactory";

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
            songPlayer: {} as AbstractSongPlayer
        }
    },
    created() {
        this.setSongPlayer();
    },
    updated() {
        this.setSongPlayer();
    },
    methods: {
        setSongPlayer() {
            if(this.songPlayer?.song?.id === this.song.id) {
                return;
            }

            this.songPlayer = SongPlayerFactory.create(this.song, this.$root);
        }
    }
});
</script>