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

    async initTrack(track: TrackInterface, file: Uint8Array) {
        track.buffer = track.context.createBufferSource();
        track.buffer.buffer = await track.context.decodeAudioData(file.buffer);

        track.gain = track.context.createGain();
        track.gain.connect(track.context.destination);
        track.buffer.connect(track.gain);
    }

    public getVolume() {
        return Config.data.volume * this.gainMod;
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

    abstract updateVolume(): void;

    abstract play(): Promise<void>;
    abstract stop(): Promise<void>;

    abstract pause(): Promise<void>;
    abstract unPause(): Promise<void>;
    abstract purge(): void;
}

export interface TracksObjectInterface {
    [track: string]: TrackInterface;
}

export interface TrackInterface {
    context: AudioContext;
    buffer: AudioBufferSourceNode;
    gain: GainNode;
}