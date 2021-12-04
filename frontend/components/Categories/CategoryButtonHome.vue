<template>
    <a @click="select()">
        <CategoryButtonStyle :class="buttonClass" id="home">{{ content ? content : 'home' }}</CategoryButtonStyle>
    </a>
</template>

<script lang="ts">
import Vue from "vue";
import None from "~/components/songs/none.vue";
import Song from "~/components/songs/song.vue";
import CategoryButtonStyle from "~/components/Categories/CategoryButtonStyle.vue";

export default Vue.extend({
    components: {CategoryButtonStyle, Song, None},
    props: {
        buttonClass: String,
        content: String
    },
    created() {
    },
    data() {
        return {
        }
    },
    methods: {
        select() {
            this.$music.currentCategory = null;
            this.$emit('select');
        }
    }
});
</script>
