<template>
    <card class="bg-dark">
        {{ song.manifest.name }}
        <button class="btn btn-primary" @click="play()">Play</button>
    </card>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Song";

export default Vue.extend({
    components: {Card},
    props: {
        song: {
            type: Object as Vue.PropType<Song>,
            required: true
        },
    },
    data() {
        return {
            current: {
                intro: new AudioContext(),
                loop: new AudioContext()
            }
        }
    },
    methods: {
         async play() {
            let files = this.song.getFiles();
            await this.current.intro.decodeAudioData(files.intro.buffer);
        }
    }
});
</script>