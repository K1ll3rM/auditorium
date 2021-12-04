import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";

/**
 * The default song player
 */
export class DefaultSongPlayer extends AbstractSongPlayer {
    protected tracks = {
        intro: {
            context: new AudioContext(),
            buffer: {} as AudioBufferSourceNode,
            gain: {} as GainNode
        },
        loop: {
            context: new AudioContext(),
            buffer: {} as AudioBufferSourceNode,
            gain: {} as GainNode
        }
    };
    
    public inIntro: boolean = false;

    async init() {
        let files = this.song.getFiles();

        await this.initTrack(this.tracks.intro, files.intro);
        await this.initTrack(this.tracks.loop, files.loop);

        this.tracks.intro.buffer.loop = true;

        this.gainMod = 0;
        this.updateVolume();
    }

    updateVolume() {
        this.tracks.intro.gain.gain.value = this.getVolume();
        this.tracks.intro.gain.gain.value = this.getVolume();
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
        this.tracks.intro.buffer.start(0);
        this.tracks.intro.buffer.addEventListener('ended', () => {
            this.inIntro = false;
            if(!this.stopped) {
                this.tracks.intro.buffer.start(0);
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
            this.tracks.intro.buffer.stop();
        }
        else {
            this.tracks.intro.buffer.stop();
        }

        this.purge();
    }

    async pause() {
        this.paused = true;
        await this.fadeOut(10);

        if(this.inIntro) {
            await this.tracks.intro.context.suspend();
        }
        else {
            await this.tracks.intro.context.suspend();
        }
    }

    async unPause() {
        if(this.inIntro) {
            await this.tracks.intro.context.resume();
        }
        else {
            await this.tracks.intro.context.resume();
        }
        this.paused = false;
        await this.fadeIn(10);
    }

    purge() {
        this.tracks.intro.context = new AudioContext();
        this.tracks.intro.context = new AudioContext();
        this.tracks.intro.buffer = {} as AudioBufferSourceNode;
        this.tracks.intro.buffer = {} as AudioBufferSourceNode;
    }
}