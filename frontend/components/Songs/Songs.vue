<template>
    <div class="songs prevent-overflow">
        <div class="card mt-3 prevent-overflow">
            <div class="card-body prevent-overflow">
                <div class="position-relative mb-3">
                    <Category :categories="sortedCategories"/>
                    <div class="actions">
                        <ShuffleButton/>
                        <FilterButton/>
                        <button class="btn btn-secondary mb-3" @click="refreshSongs">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
                <div class="mb-1 p-2" v-if="Object.keys($music.selectedFilters).length">
                    <FilterTag v-for="(filterValue, filterName) in $music.selectedFilters" :key="filterName"
                                :filter-name="filterName" :filter-value="filterValue"/>
                </div>
                <div class="songs-container prevent-overflow" v-if="$music.currentCategory">
                    <div class="h-100 overflow-auto p-2">
                        <Song v-for="(song, id) in $music.visibleSongs" :key="id" :song="song"/>
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
import Song from "~~/components/Songs/song.vue";
import {Song as SongClass} from "~~/lib/Songs/Song";
import {Categories} from "~~/lib/Category";
import Category from "~~/components/Categories/Category.vue";
import FilterButton from "~~/components/Filter/FilterButton.vue";
import FilterTag from "~~/components/Filter/FilterTag.vue";
import ShuffleButton from "~~/components/Buttons/ShuffleButton.vue";

export default {
    name: "Songs",
    components: {
        ShuffleButton,
        FilterTag,
        FilterButton,
        Category,
        Song
    },
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
                this.$music.setCurrentCategory(this.categories[this.$music.currentCategory.id]);
            } else {
                this.$music.setCurrentCategory(null);
            }

            this.$music.currentSong = null;

            this.$eventBus.emit("refresh");
        }
    }
};
</script>
