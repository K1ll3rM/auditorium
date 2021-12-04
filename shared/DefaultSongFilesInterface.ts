import {SongFilesInterface} from "./SongFilesInterface";

export interface DefaultSongFilesInterface extends SongFilesInterface {
    intro: Uint8Array;
    loop: Uint8Array;
}