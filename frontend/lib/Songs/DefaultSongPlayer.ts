import {AbstractSongPlayer} from "~~/lib/Songs/AbstractSongPlayer";
import {DefaultSongFilesInterface} from "@/shared/DefaultSongFilesInterface";
import {Song} from "~~/lib/Songs/Song";

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

        await Promise.allSettled([
            await this.initTrack(this.tracks.intro, files.intro),
            await this.initTrack(this.tracks.loop, files.loop)
        ]);

        this.tracks.loop.audio.loop = true;
    }

    protected async startTracks(): Promise<void> {
        this.inIntro = true;
        this.tracks.intro.audio.addEventListener('ended', () => {
            this.inIntro = false;
            if (this.state === 'playing') {
                this.tracks.loop.audio.play();
            }
        });
        await this.tracks.intro.audio.play();
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

    public async pauseTracks(): Promise<void> {
        if (this.inIntro) {
            this.tracks.intro.audio.pause();
        } else {
            this.tracks.loop.audio.pause();
        }
    }

    public async unPauseTracks(): Promise<void> {
        if (this.inIntro) {
            await this.tracks.intro.audio.play();
        } else {
            await this.tracks.loop.audio.play();
        }
    }

    public getDuration(): number {
        return this.tracks.intro.audio.duration + this.tracks.loop.audio.duration;
    }

    protected getCurrentTime(): number {
        if (!this.inIntro) {
            return this.tracks.intro.audio.duration + this.tracks.loop.audio.currentTime;
        }

        return this.tracks.intro.audio.currentTime;
    }

    protected setCurrentTime(progress: number): void {
        let paused;

        if (this.inIntro) {
            paused = this.tracks.intro.audio.paused;
        } else {
            paused = this.tracks.loop.audio.paused;
        }

        if (progress > this.tracks.intro.audio.duration) {
            this.tracks.loop.audio.currentTime = progress - this.tracks.intro.audio.duration;
            if (this.inIntro) {
                if (!paused) {
                    this.tracks.intro.audio.pause();
                    this.tracks.loop.audio.play();
                }

                this.tracks.intro.audio.currentTime = 0;
                this.inIntro = false;
            }
        } else {
            this.tracks.intro.audio.currentTime = progress;
            if (!this.inIntro) {
                if (!paused) {
                    this.tracks.intro.audio.play();
                    this.tracks.loop.audio.pause();
                }

                this.tracks.loop.audio.currentTime = 0;
                this.inIntro = true;
            }
        }
    }
}
