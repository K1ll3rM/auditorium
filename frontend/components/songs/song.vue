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
import {Global} from "~/lib/Global";

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
            introVolume: {} as GainNode,
            loopVolume: {} as GainNode,
            inIntro: false,
            stopped: false
        }
    },
    methods: {
        async init() {
            let files = this.song.getFiles();

            this.introTrack = this.introContext.createBufferSource();
            this.introTrack.buffer = await this.introContext.decodeAudioData(files.intro.buffer);
            this.introTrack.connect(this.introContext.destination);

            this.introVolume = this.introContext.createGain();
            this.introVolume.connect(this.introContext.destination);
            this.introTrack.connect(this.introVolume);

            this.loopTrack = this.loopContext.createBufferSource();
            this.loopTrack.buffer = await this.loopContext.decodeAudioData(files.loop.buffer);
            this.loopTrack.connect(this.loopContext.destination);

            this.loopVolume = this.loopContext.createGain();
            this.loopVolume.connect(this.loopContext.destination);
            this.loopTrack.connect(this.loopVolume);

            this.loopTrack.loop = true;

            this.updateVolume();
        },
        updateVolume() {
            this.introVolume.gain.value = 0.1;
            this.loopVolume.gain.value = Global.volume;
        },
        async play() {
            if(Global.songChanging) {
                return;
            }

            if(Global.currentSong?.song?.id === this.song.id) {
                return;
            }

            Global.songChanging = true;

            await this.init();


            if(Global.currentSong) {
                await Global.currentSong.stop();
            }

            this.stopped = false
            this.inIntro = true;
            this.introTrack.start(0);
            this.introTrack.addEventListener('ended', () => {
                this.inIntro = false;
                if(!this.stopped) {
                    this.loopTrack.start(0);
                }
            });

            Global.songChanging = false;
            Global.currentSong = this;
        },
        async stop() {
            this.stopped = true;

            if(this.inIntro) {
                this.introTrack.stop();
            }
            else {
                this.loopTrack.stop();
            }

            this.purge();
        },
        purge() {
            this.introContext = new AudioContext();
            this.loopContext = new AudioContext();
            this.introTrack = {} as AudioBufferSourceNode;
            this.loopTrack = {} as AudioBufferSourceNode;
        }
    }
});
</script>