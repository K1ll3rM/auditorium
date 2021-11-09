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
import {Global} from "~/lib/Global";

export default Vue.extend({
    components: {},
    props: {
    },
    data() {
        return {
            volume: Global.volume
        }
    },
    methods: {
        setVolume() {
            Global.volume = this.volume;
            Global.currentSong?.updateVolume();

            console.log(Global.volume);
        }
    }
});
</script>