import {ManifestInterface} from "./ManifestInterface";

export interface SongInterface {
    readonly id: string;
    readonly path: string;

    readonly manifestDefault: ManifestInterface;
    manifest: ManifestInterface;
}