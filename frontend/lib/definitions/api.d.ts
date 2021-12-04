import {Song, Songs} from "~/lib/Songs/Song";
import {DefaultSongFilesInterface} from "@/shared/DefaultSongFilesInterface";
import {ConfigInterface} from "@/shared/ConfigInterface";
import {CategoryManifests} from "~/lib/Category";

declare interface Api {
    getSongs(): Songs;
    getSongFiles(song: Song): DefaultSongFilesInterface;
    getCategories(): CategoryManifests;

    getConfig(): ConfigInterface;
    setConfig(config: ConfigInterface): void;
}