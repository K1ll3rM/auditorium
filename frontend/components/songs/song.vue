<template>
    <div :class="show ? '' : 'd-none'">
        <div class="card bg-dark mb-3" :class="($music.currentSong && $music.currentSong.id === song.id ? 'selected' : '') + (song.player.transitioning ? ' transitioning' : '')">
            <div class="card-body">
                <div class="play me-1" @click="toggle()">
                    <div v-if="$music.currentSong && $music.currentSong.id === song.id && !$music.currentSong.player.paused" class="bi bi-pause"></div>
                    <div v-else class="bi bi-play"></div>
                </div>
                <div class="info">
                    {{ song.manifest.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    transition: border ease-in-out .1s;
    user-select: none;

    &:hover {
        border-color: #FFB400;
    }

    &.transitioning {
        border-color: white;
    }

    &.selected {
        border-color: deepskyblue;
    }
}

.card-body {
    display: flex;
    align-items: center;
}

.play {
    cursor: pointer;
    font-size: 2rem;
    line-height: 2rem;
    height: 2rem;
    flex-basis: 2rem;
    display: block;
}

.info {
    display: block;
}
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Songs/Song";

export default Vue.extend({
    components: {Card},
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
        },
        toggle() {
            if (!this.$music.currentSong || this.$music.currentSong.id !== this.song.id) {
                this.song.player.play();
                return;
            }

            if (this.song.player.paused) {
                this.song.player.unPause();
            } else {
                this.song.player.pause();
            }
        }
    }
});
</script>