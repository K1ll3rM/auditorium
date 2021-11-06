'use strict';

export abstract class Song {

    abstract getSongsPath(): string;

    path: string;
    manifest: Manifest = {};

    constructor(path: string) {
        this.path = path;
    }

    getSongPath() {
        return this.getSongsPath() + '/' + this.path;
    }
}

export interface Manifest {
    name?: string;
}

export interface Songs {
    [key: string]: Song
}