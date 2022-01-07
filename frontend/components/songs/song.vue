<template>
    <div @click="song.player.play()" :class="show ? '' : 'd-none'">
        <song-style :class="($music.currentSong && $music.currentSong.song.id === song.id ? 'selected' : '') + (song.player.transitioning ? ' transitioning' : '')" :name="song.manifest.name"/>
    </div>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Songs/Song";
import SongStyle from "~/components/songs/song-style.vue";

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
            show: true,
            beforeUpdateId: ''
        }
    },
    created() {
        this.filter();
        this.beforeUpdateId = this.song.id;

        this.$root.$on('applyFilters', () => {
            this.filter();
        });
    },
    updated() {
        if (this.beforeUpdateId !== this.song.id) {
            this.filter();
        }
        this.beforeUpdateId = this.song.id;
    },
    methods: {
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