import SongComponent from "~/components/songs/song.vue";

export class Global {
    static currentSong: any|typeof SongComponent = null;
    static songChanging = false;
    static volume = 0.5;
}