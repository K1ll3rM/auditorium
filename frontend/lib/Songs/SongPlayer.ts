import {SongManifestInterface} from "@/shared/SongManifestInterface";
import {SongInterface} from "@/shared/SongInterface";
import {Category} from "~/lib/Category";
import Vue from "vue";
import {Config} from "~/lib/Config";
import {easeInOutQuad, timeout} from "@/shared/helpers";
import {Song} from "~/lib/Songs/Song";

export class SongPlayer {
    public introContext: AudioContext = new AudioContext();
    public loopContext: AudioContext = new AudioContext();
    public introTrack: AudioBufferSourceNode = {} as AudioBufferSourceNode;
    public loopTrack: AudioBufferSourceNode = {} as AudioBufferSourceNode;
    public introVolume: GainNode = {} as GainNode;
    public loopVolume: GainNode = {} as GainNode;
    public inIntro: boolean = false;
    public stopped: boolean = false;
    public gainMod: number = 1;
    public transitioning: boolean = false;
    public paused: boolean = false;
    public song: Song;
    public root: Vue;

    constructor(song: Song, root: Vue) {
        this.song = song;
        this.root = root;
    }

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
    }
    updateVolume() {
        this.introVolume.gain.value = Config.data.volume * this.gainMod;
        this.loopVolume.gain.value = Config.data.volume * this.gainMod;
    }
    async play() {
        if(this.root.$music.songChanging) {
            return;
        }

        if(this.root.$music.currentSong?.song?.id === this.song.id) {
            return;
        }

        this.paused = false;
        this.transitioning = true;
        this.root.$music.songChanging = true;

        if(this.root.$music.currentSong) {
            await Promise.allSettled([
                this.root.$music.currentSong.stop(),
                this.init()
            ]);
        }
        else {
            await this.init();
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

        this.transitioning = false;
        this.root.$music.currentSong = this;
        this.root.$music.songChanging = false;

        await this.fadeIn();
    }
    async stop() {
        this.stopped = true;

        await this.fadeOut();

        if(this.inIntro) {
            this.introTrack.stop();
        }
        else {
            this.loopTrack.stop();
        }

        this.purge();
    }
    async fadeOut(delay: number = 15) {
        for (let i = this.gainMod * 100; i > 0; i--) {
            await timeout(delay);
            this.gainMod = easeInOutQuad(i / 100);
            this.updateVolume();
        }
    }
    async fadeIn(delay: number = 10) {
        for (let i = this.gainMod * 100; i < 100; i++) {
            if(this.stopped) {
                break;
            }

            await timeout(delay);
            this.gainMod = easeInOutQuad(i / 100);
            this.updateVolume();
        }
    }
    async pause() {
        this.paused = true;
        await this.fadeOut(10);

        if(this.inIntro) {
            await this.introContext.suspend();
        }
        else {
            await this.loopContext.suspend();
        }
    }
    async unPause() {
        if(this.inIntro) {
            await this.introContext.resume();
        }
        else {
            await this.loopContext.resume();
        }
        this.paused = false;
        await this.fadeIn(10);
    }
    purge() {
        this.introContext = new AudioContext();
        this.loopContext = new AudioContext();
        this.introTrack = {} as AudioBufferSourceNode;
        this.loopTrack = {} as AudioBufferSourceNode;
    }
}

export interface Songs {
    [key: string]: Song
}