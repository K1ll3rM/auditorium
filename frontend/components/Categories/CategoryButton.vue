<template>
    <a @click="select(category)" v-if="category.id !== 'unsorted' || category.songs.length">
        <CategoryButtonStyle :class="buttonClass" :id="category.id">{{ content ? content : category.manifest.name }}</CategoryButtonStyle>
    </a>
</template>

<script lang="ts">
import Vue from "vue";
import {Category} from "~/lib/Category";
import None from "~/components/songs/none.vue";
import Song from "~/components/songs/song.vue";
import CategoryButtonStyle from "~/components/Categories/CategoryButtonStyle.vue";

export default Vue.extend({
    components: {CategoryButtonStyle, Song, None},
    props: {
        category: {
            type: Object as Vue.PropType<Category>,
            required: true
        },
        buttonClass: String,
        content: String
    },
    created() {
        console.log(this.category);
    },
    data() {
        return {
        }
    },
    methods: {
        select(category: Category) {
            this.$music.currentCategory = category;
            this.$emit('select');
        }
    }
});
</script>
