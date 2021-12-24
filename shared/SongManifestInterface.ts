export interface SongManifestInterface {
    name?: string;
    category?: string|string[];
    filters?: {
        [key: string]: string
    };
    player?: "default"|"loop";
    gainMod?: number;
}