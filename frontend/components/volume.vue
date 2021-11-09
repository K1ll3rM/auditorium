<template>
    <div class="mb-3">
        <label for="volume" class="form-label">Volume</label>
        <input type="range" class="form-range" id="volume" v-model.number="volume" @input="setVolume()" min="0" max="1" step="0.005">
    </div>
</template>

<style>
</style>
<script lang="ts">
import Vue from "vue";
import {Config} from "~/lib/Config";
import {debounce} from "@/shared/helpers";

export default Vue.extend({
    components: {},
    props: {
    },
    data() {
        return {
            volume: Config.data.volume
        }
    },
    methods: {
        setVolume() {
            Config.data.volume = this.volume;
            this.$music.currentSong?.updateVolume();
            this.saveConfig();
        },
        saveConfig: debounce(() => {
            Config.save();
        }, 2000)
    }
});
</script>