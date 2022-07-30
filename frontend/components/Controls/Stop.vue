<template>
    <div class="stop">
        <div class="button" @click="stop()"
             :class="!$music.currentSong || !['playing', 'paused'].includes($music.currentSong.player.state) ? 'button-disabled' : ''">
            <i class="bi bi-x-square-fill"></i>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "Stop",
    components: {},
    props: {},
    data() {
        return {}
    },
    methods: {
        async stop() {
            if (this.$music.songChanging) {
                return;
            }

            if (this.$music.currentSong) {
                this.$music.songChanging = true;
                await this.$music.currentSong.player?.stop();
                this.$music.songChanging = false;
                this.$music.currentSong = null;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.stop {
    display: inline-block;
}

.button {
    cursor: pointer;
    font-size: 1rem;
    line-height: 2rem;
}
</style>
