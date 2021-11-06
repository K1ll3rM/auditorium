import {Songs, Song as SharedSong} from "../../shared/Song";

export class Song extends SharedSong {
    getSongsPath() {
        return window.storagePath + '/songs';
    }
}