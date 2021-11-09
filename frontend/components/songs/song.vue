<template>
    <div @click="play">
        <song-style :class="$music.currentSong && $music.currentSong.song.id === song.id ? 'selected' : ''" :name="song.manifest.name"/>
    </div>
</template>

<style>
</style>
<script lang="ts">
import Card from "~/components/Card.vue";
import Vue from "vue";
import {Song} from "~/lib/Song";
import {Config} from "~/lib/Config";
import {easeInOutQuad, timeout} from "@/shared/helpers";
import SongStyle from "~/components/songs/song-style.vue";

export default Vue.extend({
    components: {SongStyle, Card},
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
            stopped: false,
            gainMod: 1
        }
    },
    methods: {
        async init() {
            let files = this.song.getFiles();

            this.introTrack = this.introContext.createBufferSource();
            this.introTrack.buffer = await this.introContext.decodeAudioData(files.intro.buffer);

            this.introVolume = this.introContext.createGain();
            this.introVolume.connect(this.introContext.destination);
            this.introTrack.connect(this.introVolume);

            this.loopTrack = this.loopContext.createBufferSource();
            this.loopTrack.buffer = await this.loopContext.decodeAudioData(files.loop.buffer);

            this.loopVolume = this.loopContext.createGain();
            this.loopVolume.connect(this.loopContext.destination);
            this.loopTrack.connect(this.loopVolume);

            this.loopTrack.loop = true;

            this.gainMod = 0;
            this.updateVolume();
        },
        updateVolume() {
            this.introVolume.gain.value = Config.data.volume * this.gainMod;
            this.loopVolume.gain.value = Config.data.volume * this.gainMod;
        },
        async play() {
            if(this.$music.songChanging) {
                return;
            }

            if(this.$music.currentSong?.song?.id === this.song.id) {
                return;
            }

            this.$music.songChanging = true;

            if(this.$music.currentSong) {
                await this.$music.currentSong.stop();
            }

            await this.init();

            this.stopped = false
            this.inIntro = true;
            this.introTrack.start(0);
            this.introTrack.addEventListener('ended', () => {
                this.inIntro = false;
                if(!this.stopped) {
                    this.loopTrack.start(0);
                }
            });

            this.$music.currentSong = this;
            this.$music.songChanging = false;

            for (let i = this.gainMod * 100; i < 100; i++) {
                if(this.stopped) {
                    break;
                }

                await timeout(10);
                this.gainMod = easeInOutQuad(i / 100);
                this.updateVolume();
            }
        },
        async stop() {
            this.stopped = true;

            for (let i = this.gainMod * 100; i > 0; i--) {
                await timeout(15);
                this.gainMod = easeInOutQuad(i / 100);
                this.updateVolume();
            }

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