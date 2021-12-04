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

    updateVolume() {
        this.tracks.intro.gain.gain.value = this.getVolume();
        this.tracks.intro.gain.gain.value = this.getVolume();
    }

    protected async initTracks(): Promise<void> {
        let files = this.song.getFiles();

        await this.initTrack(this.tracks.intro, files.intro);
        await this.initTrack(this.tracks.loop, files.loop);
    }

    protected async startTracks(): Promise<void> {
        this.inIntro = true;
        this.tracks.intro.buffer.start(0);
        this.tracks.intro.buffer.addEventListener('ended', () => {
            this.inIntro = false;
            if (!this.stopped) {
                this.tracks.intro.buffer.start(0);
            }
        });
    }

    protected async stopTracks(): Promise<void> {
        if (this.inIntro) {
            this.tracks.intro.buffer.stop();
        } else {
            this.tracks.intro.buffer.stop();
        }
    }

    protected purgeTracks(): void {
        this.tracks.intro.context = new AudioContext();
        this.tracks.intro.context = new AudioContext();
        this.tracks.intro.buffer = {} as AudioBufferSourceNode;
        this.tracks.intro.buffer = {} as AudioBufferSourceNode;
    }

    protected async pauseTracks(): Promise<void> {
        if (this.inIntro) {
            await this.tracks.intro.context.suspend();
        } else {
            await this.tracks.intro.context.suspend();
        }
    }

    protected async unPauseTracks(): Promise<void> {
        if (this.inIntro) {
            await this.tracks.intro.context.resume();
        } else {
            await this.tracks.intro.context.resume();
        }
    }
}