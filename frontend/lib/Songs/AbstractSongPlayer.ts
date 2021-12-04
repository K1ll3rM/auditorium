import Vue from "vue";
import {Config} from "~/lib/Config";
import {easeInOutQuad, timeout} from "@/shared/helpers";
import {Song} from "~/lib/Songs/Song";

/**
 * The default song player
 */
export abstract class AbstractSongPlayer {
    public stopped: boolean = false;
    public gainMod: number = 1;
    public transitioning: boolean = false;
    public paused: boolean = false;
    public song: Song;
    public root: Vue;

    protected tracks: TracksObjectInterface = {};

    constructor(song: Song, root: Vue) {
        this.song = song;
        this.root = root;
    }

    protected async initTrack(track: TrackInterface, file: Uint8Array) {
        if(!(file instanceof Uint8Array)) {
            throw new Error('Given file is not of type Uint8Array');
        }

        track.buffer = track.context.createBufferSource();
        track.buffer.buffer = await track.context.decodeAudioData(file.buffer);

        track.gain = track.context.createGain();
        track.gain.connect(track.context.destination);
        track.buffer.connect(track.gain);
    }

    protected purgeTrack(track: TrackInterface) {
        track.context = new AudioContext();
        track.buffer = {} as AudioBufferSourceNode;
        track.gain = {} as GainNode;
    }

    public getVolume() {
        return Config.data.volume * this.gainMod * (this.song.manifest.gainMod ?? 1);
    }

    updateVolume() {
        for (let track of Object.values<TrackInterface>(this.tracks)) {
            track.gain.gain.value = this.getVolume();
        }
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

    async init() {
        await this.initTracks();

        this.gainMod = 0;
        this.updateVolume();
    }

    public async play() {
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

        this.stopped = false;
        await this.startTracks();

        this.transitioning = false;
        this.root.$music.currentSong = this;
        this.root.$music.songChanging = false;

        await this.fadeIn();
    }

    public async stop() {
        this.stopped = true;

        await this.fadeOut();
        await this.stopTracks();

        this.purgeTracks();
    }

    public async pause() {
        this.paused = true;
        await this.fadeOut(10);

        await this.pauseTracks();
    }

    public async unPause() {
        await this.unPauseTracks();
        this.paused = false;
        await this.fadeIn(10);
    }

    protected abstract initTracks(): Promise<void>;
    protected abstract startTracks(): Promise<void>;
    protected abstract stopTracks(): Promise<void>;

    protected abstract pauseTracks(): Promise<void>;
    protected abstract unPauseTracks(): Promise<void>;
    protected abstract purgeTracks(): void;
}

export interface TracksObjectInterface {
    [track: string]: TrackInterface;
}

export interface TrackInterface {
    context: AudioContext;
    buffer: AudioBufferSourceNode;
    gain: GainNode;
}