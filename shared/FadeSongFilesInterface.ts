import {SongFilesInterface} from "./SongFilesInterface";

export interface FadeSongFilesInterface extends SongFilesInterface {
    loop: Uint8Array;
}