export interface SongManifestInterface {
    name?: string;
    category?: string|string[];
    filters?: {
        [key: string]: string
    };
    player?: "default"|"loop";
    playerSettings?: {
        [key: string]: any
    };
    gainMod?: number;
}