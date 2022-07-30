import {Song} from "~~/lib/Songs/Song";
import {DefaultSongPlayer} from "~~/lib/Songs/DefaultSongPlayer";
import {LoopSongPlayer} from "~~/lib/Songs/LoopSongPlayer";
import {AbstractSongPlayer} from "~~/lib/Songs/AbstractSongPlayer";

export class SongPlayerFactory {
    static create(song: Song): AbstractSongPlayer {
        switch (song.manifest.player) {
            case "loop":
                return new LoopSongPlayer(song);
            case "default":
            default:
                return new DefaultSongPlayer(song);
        }
    }
}
