import {Song, Songs} from "~/lib/Song";
import {SongFilesInterface} from "@/shared/SongFilesInterface";

declare interface Api {
    getSongs(): Songs|string;
    getSongFiles(song: Song): SongFilesInterface;
}