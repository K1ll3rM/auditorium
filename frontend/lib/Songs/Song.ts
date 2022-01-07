import {SongManifestInterface} from "@/shared/SongManifestInterface";
import {SongInterface} from "@/shared/SongInterface";
import {Categories, Category} from "~/lib/Category";
import {SongFilesInterface} from "@/shared/SongFilesInterface";
import {AbstractSongPlayer} from "~/lib/Songs/AbstractSongPlayer";
import {SongPlayerFactory} from "~/lib/Songs/SongPlayerFactory";

export class Song implements SongInterface {
    static songs: SongsInterface = {};
    static categories: Categories = {};
    static sortedCategories: Categories = {};

    readonly id: string;
    readonly path: string;

    readonly manifestDefault: SongManifestInterface = {
        name: "Missing name!",
        category: "unsorted",
        player: "default",
        gainMod: 1,
        filters: {}
    };
    manifest: SongManifestInterface = {};

    readonly player: AbstractSongPlayer | null = null;

    constructor(id: string, manifest: SongManifestInterface, initPlayer = true) {
        this.id = id;
        this.path = this.getSongPath();
        this.loadManifest(manifest);
        if (initPlayer) {
            this.player = SongPlayerFactory.create(this);
        }
    }

    public cloneWithoutPlayer() {
        return new Song(this.id, this.manifest, false);
    }

    static async getSongs(): Promise<SongsInterface> {
        let reply = window.api.getSongs();
        let songs: SongsInterface = {};

        for (const [id, manifest] of Object.entries(reply)) {
            songs[id] = new Song(id, manifest);
        }

        return songs;
    }

    static async loadSongsByCategory() {
        this.songs = await this.getSongs();
        [this.categories, this.sortedCategories] = await Category.getCategories();

        for (let [id, song] of Object.entries(this.songs)) {
            if (!song.manifest.category) {
                song.manifest.category = ['unsorted'];
            }

            if (!Array.isArray(song.manifest.category)) {
                song.manifest.category = [song.manifest.category];
            }

            for (let category of song.manifest.category) {
                if (!this.categories[category]) {
                    throw new Error(`Song ${id} calls for category ${category} that doesn't exist.`);
                }

                this.categories[category].pushToSongs(song);
            }
        }

        return this;
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

    getFiles<T extends SongFilesInterface>() {
        return window.api.getSongFiles<T>(this.cloneWithoutPlayer());
    }
}

export interface SongsInterface {
    [key: string]: Song
}

export interface SongManifestsInterface {
    [key: string]: SongManifestInterface
}