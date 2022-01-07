<template>
    <button class="btn btn-secondary mb-3" :class="$music.currentSong && ['stopping', 'pausing', 'starting', 'unpausing'].includes($music.currentSong.player.state) ? 'button-disabled' : ''" @click="randomSong"><i class="bi bi-shuffle"></i></button>
</template>

<style>
</style>
<script lang="ts">
import Vue from "vue";
import {Main} from "~/lib/Main";
import {Toast} from "~/lib/Toast";
import {rand} from "@/shared/helpers";

export default Vue.extend({
    components: {},
    props: {},
    data() {
        return {}
    },
    methods: {
        randomSong() {
            let length = this.$music.currentCategory.songs.length;

            if (length <= 0) {
                Main.addToast(new Toast("Can't shuffle: no songs in current category"));
                return;
            }

            this.$music.currentCategory.songs[rand(1, length) - 1].player.play();
        }
    }
});
</script>