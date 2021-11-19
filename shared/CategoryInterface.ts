import {SongInterface} from "./SongInterface";

export interface CategoryInterface {
    name?: string;
    children?: CategoryInterface[];
    songs?: SongInterface[];
}