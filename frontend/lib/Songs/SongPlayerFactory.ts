import {Song} from "~/lib/Songs/Song";
import {DefaultSongPlayer} from "~/lib/Songs/DefaultSongPlayer";
import {FadeSongPlayer} from "~/lib/Songs/FadeSongPlayer";
import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";

export class SongPlayerFactory {
    static create(song: Song, root: Vue): AbstractSongPlayer {
        switch (song.manifest.player) {
            case "fade":
                return new FadeSongPlayer(song, root);
            case "default":
            default:
                return new DefaultSongPlayer(song, root);
        }
    }
}