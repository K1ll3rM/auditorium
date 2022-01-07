<template>
    <div class="play-pause">
        <div class="button" @click="togglePause()" :class="!$music.currentSong ? 'disabled' : ''">
            <div v-if="!$music.currentSong || $music.currentSong.player.paused" class="bi bi-play"></div>
            <div v-if="$music.currentSong && !$music.currentSong.player.paused" class="bi bi-pause"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.play-pause {
    display: inline-block;
}

.button {
    cursor: pointer;
    font-size: 2rem;
    line-height: 2rem;
}

.disabled {
    opacity: .5;
    pointer-events: none;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    components: {},
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
        togglePause() {
            if(!this.$music.currentSong) {
                return;
            }

            if(this.$music.currentSong.player.paused) {
                this.$music.currentSong.player.unPause();
            }
            else {
                this.$music.currentSong.player.pause();
            }
        }
    }
});
</script>