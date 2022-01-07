<template>
    <div class="play-pause">
        <div class="button" @click="togglePause()" :class="!$music.currentSong || ['stopping', 'pausing', 'starting', 'unpausing'].includes($music.currentSong.player.state) ? 'disabled' : ''">
            <div v-if="!$music.currentSong || ['paused', 'pausing', 'stopping'].includes($music.currentSong.player.state)" class="bi bi-play"></div>
            <div v-else class="bi bi-pause"></div>
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
    props: {},
    data() {
        return {}
    },
    methods: {
        togglePause() {
            if (!this.$music.currentSong) {
                return;
            }

            if (this.$music.currentSong.player.state === 'paused') {
                this.$music.currentSong.player.unPause();
            } else if (this.$music.currentSong.player.state === 'playing') {
                this.$music.currentSong.player.pause();
            }
        }
    }
});
</script>