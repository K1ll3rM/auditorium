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
            introContext: new AudioContext(),
            loopContext: new AudioContext(),
            introTrack: {} as AudioBufferSourceNode,
            loopTrack: {} as AudioBufferSourceNode,
        }
    },
    methods: {
        async init() {
            let files = this.song.getFiles();

            this.introTrack = this.introContext.createBufferSource();
            this.introTrack.buffer = await this.introContext.decodeAudioData(files.intro.buffer);
            this.introTrack.connect(this.introContext.destination);

            this.loopTrack = this.loopContext.createBufferSource();
            this.loopTrack.buffer = await this.loopContext.decodeAudioData(files.loop.buffer);
            this.loopTrack.connect(this.loopContext.destination);

            this.loopTrack.loop = true;
        },
        async play() {
            await this.init();

            this.introTrack.start(0);
            this.introTrack.addEventListener('ended', () => {
                this.loopTrack.start(0);
            });
        }
    }
});
</script>