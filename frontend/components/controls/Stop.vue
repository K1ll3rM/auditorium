<template>
  <div class="stop">
    <div class="button" @click="stop()"
         :class="!$music.currentSong || !['playing', 'paused'].includes($music.currentSong.player.state) ? 'button-disabled' : ''">
      <i class="bi bi-x-square-fill"></i>
    </div>
  </div>
</template>

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

<script lang="ts">
import {defineNuxtComponent} from "#app";

export default defineNuxtComponent({
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
});
</script>
