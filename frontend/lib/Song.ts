import {Songs, Song as SharedSong} from "../../shared/Song";
import {promises as fs} from "fs";
import {getFileName} from "@/shared/helpers";

export class Song extends SharedSong {
    static async getSongs() {
        return window.api.getSongs();
    }

    getSongsPath() {
        return window.storagePath + '/songs';
    }
}