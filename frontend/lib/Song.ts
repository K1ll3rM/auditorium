import {ManifestInterface} from "@/shared/ManifestInterface";
import {SongInterface} from "@/shared/SongInterface";
import SongComponent from "~/components/songs/song.vue";

export class Song implements SongInterface{
    static currentSong: any|typeof SongComponent = null;

    readonly id: string;
    readonly path: string;

    readonly manifestDefault: ManifestInterface = {
        name: "Missing name!"
    };
    manifest: ManifestInterface = {};

    constructor(id: string, manifest: ManifestInterface) {
        this.id = id;
        this.path = this.getSongPath();
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

    getFiles() {
        return window.api.getSongFiles(this);
    }
}

export interface Songs {
    [key: string]: Song
}