'use strict';

export class Song {

    static getSongsPath() {
        return window.storagePath + '/songs';
    }

    path: string;
    manifest: Manifest = {};

    constructor(path: string) {
        this.path = path;
    }

    getSongPath() {
        return Song.getSongsPath() + '/' + this.path;
    }
}

export interface Manifest {
    name?: string;
}

export interface Songs {
    [key: string]: Song
}