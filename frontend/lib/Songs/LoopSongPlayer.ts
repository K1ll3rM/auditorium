import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";
import {FadeSongFilesInterface} from "@/shared/FadeSongFilesInterface";

export class LoopSongPlayer extends AbstractSongPlayer {
    protected tracks = {
        loop: {
            context: new AudioContext(),
            buffer: {} as AudioBufferSourceNode,
            gain: {} as GainNode
        }
    };

    protected async initTracks(): Promise<void> {
        let files = this.song.getFiles<FadeSongFilesInterface>();

        if(!files.loop) {
            throw new Error('Loop file does not exist');
        }

        await this.initTrack(this.tracks.loop, files.loop);
        this.tracks.loop.buffer.loop = true;
    }

    protected async startTracks(): Promise<void> {
        this.tracks.loop.buffer.start(0);
    }

    protected async stopTracks(): Promise<void> {
        this.tracks.loop.buffer.stop();
    }

    protected async pauseTracks(): Promise<void> {
        await this.tracks.loop.context.suspend();
    }

    protected async unPauseTracks(): Promise<void> {
        await this.tracks.loop.context.resume();
    }

    protected purgeTracks(): void {
        this.purgeTrack(this.tracks.loop);
    }
}