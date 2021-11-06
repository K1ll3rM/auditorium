import {Song, Songs} from "~/lib/Song";

interface Api {
    getSongs(): Songs|string;
    getSongFiles(song: Song): any;
}