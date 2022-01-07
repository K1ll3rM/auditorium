import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";
import {DefaultSongFilesInterface} from "@/shared/DefaultSongFilesInterface";
import {Song} from "~/lib/Songs/Song";

/**
 * The default song player
 */
export class DefaultSongPlayer extends AbstractSongPlayer {

    public inIntro: boolean = false;

    constructor(song: Song) {
        super(song);

        this.createTrack('intro');
        this.createTrack('loop');
    }

    protected async initTracks(): Promise<void> {
        let files = this.song.getFiles<DefaultSongFilesInterface>();

        if (!files.intro) {
            throw new Error('Intro file does not exist');
        }

        if (!files.loop) {
            throw new Error('Loop file does not exist');
        }

        await this.initTrack(this.tracks.intro, files.intro);
        await this.initTrack(this.tracks.loop, files.loop);

        this.tracks.loop.audio.loop = true;
    }

    protected async startTracks(): Promise<void> {
        this.inIntro = true;
        this.tracks.intro.audio.play();
        this.tracks.intro.audio.addEventListener('ended', () => {
            this.inIntro = false;
            if (this.state === 'playing') {
                this.tracks.loop.audio.play();
            }
        });
    }

    protected async stopTracks(): Promise<void> {
        if (this.inIntro) {
            this.tracks.intro.audio.pause();
        } else {
            this.tracks.loop.audio.pause();
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

    protected getDuration(): number {
        return this.tracks.intro.audio.duration + this.tracks.loop.audio.duration;
    }

    protected getCurrentTime(): number {
        if (!this.inIntro) {
            return this.tracks.intro.audio.duration + this.tracks.loop.audio.currentTime;
        }

        return this.tracks.intro.audio.currentTime;
    }

    protected setCurrentTime(progress: number): void {
        throw new Error('NOT IMPLEMENTED');

        this.tracks.loop.audio.currentTime = progress;
    }
}