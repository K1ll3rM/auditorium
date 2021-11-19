import {SongManifestInterface} from "@/shared/SongManifestInterface";
import {SongInterface} from "@/shared/SongInterface";
import {Category} from "~/lib/Category";

export class Song implements SongInterface{
    readonly id: string;
    readonly path: string;

    readonly manifestDefault: SongManifestInterface = {
        name: "Missing name!",
        category: "unsorted"
    };
    manifest: SongManifestInterface = {};

    constructor(id: string, manifest: SongManifestInterface) {
        this.id = id;
        this.path = this.getSongPath();
        this.loadManifest(manifest);
    }

    static async getSongs(): Promise<Songs> {
        let reply = window.api.getSongs();
        let songs: Songs = {};

        for (const [id, manifest] of Object.entries(reply)) {
            songs[id] = new Song(id, manifest as SongManifestInterface);
        }

        return songs;
    }

    static async getSongsByCategory() {
        let songs = await this.getSongs();
        let [categories, sorted] = await Category.getCategories();

        for (let [id, song] of Object.entries(songs)) {
            if(!song.manifest.category) {
                song.manifest.category = 'unsorted';
            }

            if(!categories[song.manifest.category]) {
                throw new Error(`Song ${id} calls for category ${song.manifest.category} that doesn't exist.`);
            }

            categories[song.manifest.category].songs.push(song);
        }

        return [categories, sorted];
    }

    getSongPath() {
        return this.getSongsPath() + '/' + this.id;
    }

    getSongsPath() {
        return window.storagePath + '/songs';
    }

    loadManifest(manifest: SongManifestInterface) {
        this.manifest = Object.assign({}, this.manifestDefault, manifest);
    }

    getFiles() {
        return window.api.getSongFiles(this);
    }
}

export interface Songs {
    [key: string]: Song
}