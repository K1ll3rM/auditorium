<template>
    <div>
        <button class="btn btn-secondary mb-3" @click="refreshSongs">Refresh</button>
        <card>
            <Category :categories="sortedCategories"/>
            <div class="songs mt-3" v-if="$music.currentCategory">
                <h5>Songs:</h5>
                <none/>
                <song v-for="(song, id) in $music.currentCategory.songs" :key="id" :song="song"/>
            </div>
        </card>
    </div>
</template>

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
            if(this.$music.currentCategory) {
                this.$music.currentCategory = this.categories[this.$music.currentCategory.id];
            }
        }
    }
});
</script>
