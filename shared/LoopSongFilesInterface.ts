import {SongFilesInterface} from "./SongFilesInterface";

export interface LoopSongFilesInterface extends SongFilesInterface {
    loop: Uint8Array;
}