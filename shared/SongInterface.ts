import {SongManifestInterface} from "./SongManifestInterface";

export interface SongInterface {
    readonly id: string;
    readonly path: string;

    readonly manifestDefault: SongManifestInterface;
    manifest: SongManifestInterface;
}