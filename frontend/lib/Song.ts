import {Songs, Song as SharedSong} from "../../shared/Song";

export class Song extends SharedSong {
    static async getSongs() {
        let reply = window.api.getSongs();

        if(!(reply instanceof Object)) {
            console.log(reply);
            throw new Error('Song reply was not an Object');
        }

        return reply;
    }

    getSongsPath() {
        return window.storagePath + '/songs';
    }
}