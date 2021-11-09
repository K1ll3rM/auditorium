<template>
    <div @click="play">
        <song-style name="None"/>
    </div>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Song";
import {Global} from "~/lib/Global";
import {Config} from "~/lib/Config";
import {easeInOutQuad, timeout} from "@/shared/helpers";
import SongStyle from "~/components/songs/song-style.vue";

export default Vue.extend({
    components: {SongStyle, Card},
    data() {
        return {
        }
    },
    methods: {
        async play() {
            if(Global.songChanging) {
                return;
            }

            if(Global.currentSong) {
                Global.songChanging = true;
                await Global.currentSong.stop();
                Global.songChanging = false;
                Global.currentSong = null;
            }
        }
    }
});
</script>