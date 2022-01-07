import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";
import {FadeSongFilesInterface} from "@/shared/FadeSongFilesInterface";
import {Song} from "~/lib/Songs/Song";

export class LoopSongPlayer extends AbstractSongPlayer {

    constructor(song: Song) {
        super(song);

        this.createTrack('loop');
    }

    protected async initTracks(): Promise<void> {
        let files = this.song.getFiles<FadeSongFilesInterface>();

        if(!files.loop) {
            throw new Error('Loop file does not exist');
        }

        await this.initTrack(this.tracks.loop, files.loop);
        this.tracks.loop.audio.loop = true;
    }

    protected startTracks(): Promise<void> {
        return this.tracks.loop.audio.play();
    }

    protected stopTracks(): void {
        this.tracks.loop.audio.pause();
    }

    protected pauseTracks(): void {
        this.tracks.loop.audio.pause();
    }

    protected unPauseTracks(): Promise<void> {
        return this.tracks.loop.audio.play();
    }

    protected purgeTracks(): void {
        this.purgeTrack(this.tracks.loop);
    }

    protected getTrackProgress(): number {
        return 0;
    }

    protected setTrackProgress(progress: number): boolean {
        return false;
    }
}