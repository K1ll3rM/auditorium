import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";

export class FadeSongPlayer extends AbstractSongPlayer {
    protected tracks = {
        main: {
            context: new AudioContext(),
            buffer: {} as AudioBufferSourceNode,
            gain: {} as GainNode
        }
    };

    protected initTracks(): Promise<void> {
        return Promise.resolve(undefined);
    }

    protected pauseTracks(): Promise<void> {
        return Promise.resolve(undefined);
    }

    protected purgeTracks(): void {
    }

    protected startTracks(): Promise<void> {
        return Promise.resolve(undefined);
    }

    protected stopTracks(): Promise<void> {
        return Promise.resolve(undefined);
    }

    protected unPauseTracks(): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateVolume(): void {
    }

}