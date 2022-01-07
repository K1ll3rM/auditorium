import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";
import {DefaultSongFilesInterface} from "@/shared/DefaultSongFilesInterface";

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

    protected async initTracks(): Promise<void> {
        let files = this.song.getFiles<DefaultSongFilesInterface>();

        if(!files.intro) {
            throw new Error('Intro file does not exist');
        }

        if(!files.loop) {
            throw new Error('Loop file does not exist');
        }

        await this.initTrack(this.tracks.intro, files.intro);
        await this.initTrack(this.tracks.loop, files.loop);

        this.tracks.loop.buffer.loop = true;
    }

    protected async startTracks(): Promise<void> {
        this.inIntro = true;
        this.tracks.intro.buffer.start(0);
        this.tracks.intro.buffer.addEventListener('ended', () => {
            this.inIntro = false;
            if (this.state === 'playing') {
                this.tracks.loop.buffer.start(0);
            }
        });
    }

    protected async stopTracks(): Promise<void> {
        if (this.inIntro) {
            this.tracks.intro.buffer.stop();
        } else {
            this.tracks.loop.buffer.stop();
        }
    }

    protected purgeTracks(): void {
        this.purgeTrack(this.tracks.intro);
        this.purgeTrack(this.tracks.loop);
    }

    protected async pauseTracks(): Promise<void> {
        if (this.inIntro) {
            await this.tracks.intro.context.suspend();
        } else {
            await this.tracks.loop.context.suspend();
        }
    }

    protected async unPauseTracks(): Promise<void> {
        if (this.inIntro) {
            await this.tracks.intro.context.resume();
        } else {
            await this.tracks.loop.context.resume();
        }
    }
}