<template>
    <card>
        <button class="btn btn-secondary mb-3" @click="refreshSongs">Refresh</button>
        <CategoryButtons :categories="categories"/>
        <div class="songs" v-if="$music.currentCategory">
            <none/>
            <song v-for="(song, id) in $music.currentCategory.songs" :key="id" :song="song"/>
        </div>
    </card>
</template>

<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import Song from "~/components/songs/song.vue";
import {Categories as CategoriesClass, Song as SongClass} from "~/lib/Song";
import None from "~/components/songs/none.vue";
import CategoryButtons from "~/components/Categories/CategoryButtons.vue";

export default Vue.extend({
    components: {CategoryButtons, None, Song, Card},
    props: [],
    created() {
        this.refreshSongs();
    },
    data() {
        return {
            categories: <CategoriesClass>{}
        }
    },
    methods: {
        async refreshSongs() {
            this.categories = await SongClass.getSongsByCategory();
        }
    }
});
</script>
