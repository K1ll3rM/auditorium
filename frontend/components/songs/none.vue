<template>
    <div @click="play">
        <song-style :class="!$music.currentSong ? 'selected' : ''" name="None"/>
    </div>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import SongStyle from "~/components/songs/song-style.vue";

export default Vue.extend({
    components: {SongStyle, Card},
    data() {
        return {
        }
    },
    methods: {
        async play() {
            if(this.$music.songChanging) {
                return;
            }

            if(this.$music.currentSong) {
                this.$music.songChanging = true;
                await this.$music.currentSong.stop();
                this.$music.songChanging = false;
                this.$music.currentSong = null;
            }
        }
    }
});
</script>