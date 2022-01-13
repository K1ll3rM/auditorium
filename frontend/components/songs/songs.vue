<template>
    <div class="songs prevent-overflow">
        <div class="card mt-3 prevent-overflow">
            <div class="card-body prevent-overflow">
                <div class="position-relative mb-3">
                    <Category :categories="sortedCategories"/>
                    <div class="actions">
                        <shuffle-button/>
                        <filter-button/>
                        <button class="btn btn-secondary mb-3" @click="refreshSongs">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
                <div class="mb-1 p-2" v-if="Object.keys($music.selectedFilters).length">
                    <filter-tag v-for="(filterValue, filterName) in $music.selectedFilters" :key="filterName" :filter-name="filterName" :filter-value="filterValue"/>
                </div>
                <div class="songs-container prevent-overflow" v-if="$music.currentCategory">
                    <div class="h-100 overflow-auto p-2">
                        <song v-for="(song, id) in $music.currentCategory.songs" :key="id" :song="song"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.actions {
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
import {Categories, Category as CategoryClass} from "~/lib/Category";
import Category from "~/components/Categories/Category.vue";
import FilterButton from "~/components/Filter/FilterButton.vue";
import FilterTag from "~/components/Filter/FilterTag.vue";
import ShuffleButton from "~/components/Buttons/ShuffleButton.vue";

export default Vue.extend({
    components: {ShuffleButton, FilterTag, FilterButton, Category, Song, Card},
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
            await this.$music.currentSong?.player?.stop();
            await SongClass.loadSongsByCategory();

            this.categories = SongClass.categories;
            this.sortedCategories = SongClass.sortedCategories;

            if (this.$music.currentCategory) {
                this.$music.currentCategory = this.categories[this.$music.currentCategory.id];
            }

            this.$music.currentSong = null;

            if (!this.$music.currentCategory) {
                this.$music.currentCategory = CategoryClass.root;
            }
            this.$root.$emit('refresh');
        }
    }
});
</script>
