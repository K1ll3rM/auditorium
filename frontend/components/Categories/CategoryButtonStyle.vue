<template>
    <button class="btn col" :class="$music.currentCategory && $music.currentCategory.id.startsWith(id) ? 'btn-secondary' : 'btn-secondary'"><slot/></button>
</template>

<script lang="ts">
import Vue from "vue";
import None from "~/components/songs/none.vue";
import Song from "~/components/songs/song.vue";

export default Vue.extend({
    components: {Song, None},
    props: {
        id: String
    }
});
</script>
