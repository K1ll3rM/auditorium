import {Song, Songs} from "~/lib/Song";
import {SongFilesInterface} from "@/shared/SongFilesInterface";
import {ConfigInterface} from "@/shared/ConfigInterface";

declare interface Api {
    getSongs(): Songs;
    getSongFiles(song: Song): SongFilesInterface;

    getConfig(): ConfigInterface;
    setConfig(config: ConfigInterface): void;
}