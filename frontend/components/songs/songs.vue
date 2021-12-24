<template>
    <div class="songs prevent-overflow">
        <div class="card mt-3 prevent-overflow">
            <div class="card-body prevent-overflow">
                <div class="position-relative">
                    <Category :categories="sortedCategories"/>
                    <button class="btn btn-secondary refresh mb-3" @click="refreshSongs">Refresh</button>
                </div>
                <div class="songs-container prevent-overflow mt-3" v-if="$music.currentCategory">
                    <div class="h-100 overflow-auto p-2">
                        <none/>
                        <song v-for="(song, id) in $music.currentCategory.songs" :key="id" :song="song"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.refresh {
    position: absolute;
    top: 0;
    right: 0;
}
</style>

<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import Song from "~/components/songs/song.vue";
import {Song as SongClass} from "~/lib/Songs/Song";
import None from "~/components/songs/none.vue";
import Category from "~/components/Categories/Category.vue";
import {Categories} from "~/lib/Category";

export default Vue.extend({
    components: {Category, None, Song, Card},
    props: [],
    created() {
        this.refreshSongs();
    },
    data() {
        return {
            sortedCategories: <Categories>{},
            categories: <Categories>{}
        }
    },
    methods: {
        async refreshSongs() {
            [this.categories, this.sortedCategories] = await SongClass.getSongsByCategory();
            if (this.$music.currentCategory) {
                this.$music.currentCategory = this.categories[this.$music.currentCategory.id];
            }

            if (this.$music.currentSong) {
                if(SongClass.songs[this.$music.currentSong.song.id]) {
                    this.$music.currentSong.song = SongClass.songs[this.$music.currentSong.song.id];
                    this.$music.currentSong.updateVolume();
                }
            }
        }
    }
});
</script>
