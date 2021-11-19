import {ManifestInterface} from "@/shared/ManifestInterface";
import {SongInterface} from "@/shared/SongInterface";

export class Song implements SongInterface{
    readonly id: string;
    readonly path: string;

    readonly manifestDefault: ManifestInterface = {
        name: "Missing name!",
        category: ""
    };
    manifest: ManifestInterface = {};

    constructor(id: string, manifest: ManifestInterface) {
        this.id = id;
        this.path = this.getSongPath();
        this.loadManifest(manifest);
    }

    static async getSongs(): Promise<Songs> {
        let reply = window.api.getSongs();
        let songs: Songs = {};

        for (const [id, manifest] of Object.entries(reply)) {
            songs[id] = new Song(id, manifest as ManifestInterface);
        }

        return songs;
    }

    static async getSongsByCategory() {
        let songs = await this.getSongs();
        let categories = {};

        for (let [id, song] of Object.entries(songs)) {

        }
    }

    categorize() {

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

export interface Categories {

}