import {Song} from "~/lib/Songs/Song";
import {DefaultSongPlayer} from "~/lib/Songs/DefaultSongPlayer";
import {LoopSongPlayer} from "~/lib/Songs/LoopSongPlayer";
import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";

export class SongPlayerFactory {
    static create(song: Song, root: Vue): AbstractSongPlayer {
        switch (song.manifest.player) {
            case "loop":
                return new LoopSongPlayer(song, root);
            case "default":
            default:
                return new DefaultSongPlayer(song, root);
        }
    }
}