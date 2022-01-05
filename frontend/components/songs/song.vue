<template>
    <div @click="songPlayer.play()" :class="show ? '' : 'd-none'">
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
            songPlayer: {} as AbstractSongPlayer,
            show: true,
            beforeUpdateId: ''
        }
    },
    created() {
        this.filter();
        this.beforeUpdateId = this.song.id;

        this.setSongPlayer();

        this.$root.$on('applyFilters', () => {
            this.filter();
        });
    },
    updated() {
        if (this.beforeUpdateId !== this.song.id) {
            this.filter();
        }
        this.beforeUpdateId = this.song.id;
        this.setSongPlayer();
    },
    methods: {
        setSongPlayer() {
            if (this.songPlayer?.song?.id === this.song.id) {
                return;
            }

            this.songPlayer = SongPlayerFactory.create(this.song, this.$root);
        },
        filter: function () {
            let show = true;

            for (const [filterName, filterValue] of Object.entries(this.$music.selectedFilters)) {
                if (this.song.manifest.filters && this.song.manifest.filters[filterName] && this.song.manifest.filters[filterName] === filterValue) {
                    continue;
                }

                show = false;
                break;
            }

            this.show = show;
        }
    }
});
</script>