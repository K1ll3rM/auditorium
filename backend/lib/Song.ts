'use strict';
import {promises as fs} from 'fs';
import {Storage} from "./Storage";

export class Song {

    static getSongsPath() {
        return Storage.getStorage() + '/songs';
    }

    static async getSongs() {
        let files = await fs.readdir(this.getSongsPath());
        let songs = [];

        for (let file of files) {
            let song = new Song(file);
            await song.loadManifest();

            songs.push(song);
        }

        return songs;
    }

    path: string;
    manifest: Manifest;

    constructor(path: string) {
        this.path = path;
    }

    getSongPath() {
        return Song.getSongsPath() + '/' + this.path;
    }

    async loadManifest() {
        let file = await fs.readFile(this.getSongPath() + '/manifest.json');
        this.manifest = JSON.parse(file.toString());
    }


}

interface Manifest {
    name: string;
}