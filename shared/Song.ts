'use strict';

export abstract class Song {
    manifestDefault: Manifest = {
        name: "Missing name!"
    };

    path: string;
    manifest: Manifest = {};

    constructor(path: string) {
        this.path = path;
    }

    abstract getSongsPath(): string;

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