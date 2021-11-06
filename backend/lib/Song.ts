'use strict';
import {promises as fs} from 'fs';
import {Storage} from "./Storage";
import {Songs, Song as SharedSong} from "../../shared/Song";
import {getFileName} from "../../shared/helpers";

export class Song extends SharedSong {

    getSongsPath(): string {
        return Song.getSongsPath();
    }

    static getSongsPath() {
        return Storage.getStorage() + '/songs';
    }

    static async getSongs() {
        let files = await fs.readdir(this.getSongsPath());
        let songs: Songs = {};

        for (let file of files) {
            let song = new Song(file);
            await song.loadManifest();

            songs[getFileName(file)] = song;
        }

        return songs;
    }

    getSongPath() {
        return Song.getSongsPath() + '/' + this.path;
    }

    async loadManifest() {
        let file = await fs.readFile(this.getSongPath() + '/manifest.json');
        this.manifest = Object.assign({}, this.manifestDefault, JSON.parse(file.toString()));
    }


}