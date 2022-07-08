<template>
  <div class="bar-container">
    <div class="left"></div>
    <div class="middle">
      <div class="before-slider">{{ formatSeconds($music.currentSongProgress) }}</div>
      <div class="slider"
           :class="!$music.currentSong || ['stopping', 'pausing', 'starting', 'unpausing'].includes($music.currentSong.player.state) ? 'button-disabled' : ''">
        <div class="bar" :style="{ width: (max ? ($music.currentSongProgress / max * 100) : 0) + '%' }"></div>
        <input class="input" v-model="$music.currentSongProgress" type="range" min="0" :max="max" step="0.1"
               @input="setProgress" @mousedown="mouseDown" @mouseup="mouseUp">
      </div>
      <div class="after-slider">{{ formatSeconds(max) }}</div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import {formatSeconds} from "~~/helpers";
import Music from "~~/lib/MusicInterface";

export default {
  components: {},
  props: {},
  created() {
    this.$eventBus.on('play', (e: { duration: number }) => {
      this.max = e.duration ? e.duration : 0;
    });
    this.$eventBus.on('stop', () => {
      this.$music.currentSongProgress = 0;
      this.max = 0;
    });
  },
  data() {
    return {
      max: 0,
      Music
    }
  },
  methods: {
    mouseDown() {
      this.$music.currentSong?.player?.pauseTracks();
    },
    mouseUp() {
      this.$music.currentSong?.player?.unPauseTracks();
    },
    setProgress() {
      this.$music.currentSong?.player?.setProgress(this.$music.currentSongProgress);
    },
    formatSeconds(num: number) {
      return formatSeconds(num);
    }
  }
};
</script>

<style lang="scss" scoped>
.bar-container {
  height: 100%;
  justify-content: space-between;
  padding: 0 2rem;
}

.left, .right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.middle {
  flex: 1 0 0;
  display: flex;
  align-items: center;
  height: 100%;
}

.before-slider {
  margin-right: 1rem;
}

.after-slider {
  margin-left: 1rem;
}

.slider {
  $border-radius: .25rem;
  $bar-color: #00BFFF;
  $height: .5rem;

  height: $height;
  width: 100%;
  position: relative;


  .bar {
    background: $bar-color;
    pointer-events: none;
    height: 100%;
    z-index: 1;
    position: absolute;
    border-radius: $border-radius;
  }

  .input {
    position: absolute;
    width: 100%;
    -webkit-appearance: none;
    height: 100%;
    border-radius: $border-radius;

    &:hover + .bubble {
      opacity: 1;
    }

    &:focus-visible {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 100%;
      width: .1rem;
      background: none;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: $height + 1rem;
      cursor: pointer;
      background: none;
    }
  }
}
</style>
