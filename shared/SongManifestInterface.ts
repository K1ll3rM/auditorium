export interface SongManifestInterface {
    name?: string;
    category?: string|string[];
    player?: "default"|"loop";
    gainMod?: number;
}