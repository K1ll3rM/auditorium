<template>
    <div @click="play">
        <song-style :class="(!$music.currentSong ? 'selected' : '') + (transitioning ? ' transitioning' : '')" name="None"/>
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
            transitioning: false
        }
    },
    methods: {
        async play() {
            if(this.$music.songChanging) {
                return;
            }

            if(this.$music.currentSong) {
                this.transitioning = true;
                this.$music.songChanging = true;
                await this.$music.currentSong.stop();
                this.$music.songChanging = false;
                this.transitioning = false;
                this.$music.currentSong = null;
            }
        }
    }
});
</script>