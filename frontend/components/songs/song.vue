<template>
  <div :class="show ? '' : 'd-none'">
    <div class="card bg-dark mb-3"
         :class="($music.currentSong && $music.currentSong.id === song.id ? 'selected' : '') + ' ' + song.player.state">
      <div class="card-body">
        <div class="play me-1" @click="toggle()"
             :class="$music.currentSong && ['stopping', 'pausing', 'starting', 'unpausing'].includes($music.currentSong.player.state) ? 'button-disabled' : ''">
          <div v-if="$music.currentSong && !['paused', 'pausing', 'stopping', 'stopped'].includes(song.player.state)"
               class="bi bi-pause"></div>
          <div v-else class="bi bi-play"></div>
        </div>
        <div class="info">
          {{ song.manifest.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  transition: border ease-in-out .1s;
  user-select: none;

  &:hover {
    border-color: #FFB400;
  }

  &.selected {
    border-color: deepskyblue;
  }

  &.starting {
    border-color: white;
  }

  &.stopping {
    border-color: #8b2e24;
  }
}

.card-body {
  display: flex;
  align-items: center;
}

.play {
  cursor: pointer;
  font-size: 2rem;
  line-height: 2rem;
  height: 2rem;
  flex-basis: 2rem;
  display: block;
}

.info {
  display: block;
}
</style>
<script lang="ts">
import Card from "~~/components/Card.vue";
import {Song} from "~~/lib/Songs/Song";

export default {
  components: {Card},
  props: {
    song: {
      type: Object as Vue.PropType<Song>,
      required: true
    },
  },
  data() {
    return {
      show: true,
      beforeUpdateId: ''
    }
  },
  created() {
    this.filter();
    this.beforeUpdateId = this.song.id;

    this.$root.$on('applyFilters', () => {
      this.filter();
    });
  },
  updated() {
    if (this.beforeUpdateId !== this.song.id) {
      this.filter();
    }
    this.beforeUpdateId = this.song.id;
  },
  methods: {
    filter: function () {
      let show = true;

      for (const [filterName, filterValue] of Object.entries(this.$music.selectedFilters)) {
        if (this.song.manifest.filters && this.song.manifest.filters[filterName] && this.song.manifest.filters[filterName] === filterValue) {
          continue;
        }

        show = false;
        break;
      }

      this.show = show;
    },
    toggle() {
      if (!this.song.player) {
        return;
      }

      if (!this.$music.currentSong || this.$music.currentSong.id !== this.song.id) {
        this.song.player.play();
        return;
      }

      if (this.song.player.state === 'paused') {
        this.song.player.unPause();
      } else if (this.song.player.state === 'playing') {
        this.song.player.pause();
      }
    }
  }
});
</script>
