import {ManifestInterface} from "@/shared/ManifestInterface";
import {SongInterface} from "@/shared/SongInterface";

export class Song implements SongInterface{

    manifestDefault: ManifestInterface = {
        name: "Missing name!"
    };

    id: string;
    manifest: ManifestInterface = {};

    constructor(id: string, manifest: ManifestInterface) {
        this.id = id;
        this.loadManifest(manifest);
    }

    static async getSongs() {
        let reply = window.api.getSongs();
        let songs: Songs = {};

        for (const [id, manifest] of Object.entries(reply)) {
            songs[id] = new Song(id, manifest as ManifestInterface);
        }

        return songs;
    }

    getSongPath() {
        return this.getSongsPath() + '/' + this.id;
    }

    getSongsPath() {
        return window.storagePath + '/songs';
    }

    loadManifest(manifest: ManifestInterface) {
        this.manifest = Object.assign({}, this.manifestDefault, manifest);
    }
}

export interface Songs {
    [key: string]: Song
}