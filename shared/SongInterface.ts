import {ManifestInterface} from "./ManifestInterface";

export interface SongInterface {
    manifestDefault: ManifestInterface;
    id: string;
    manifest: ManifestInterface;
}