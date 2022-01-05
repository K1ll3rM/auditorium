import 'vue';
import '@nuxt/types'
import SongComponent from "~/components/songs/song.vue";
import {Category} from "~/lib/Category";

declare module 'vue/types/vue' {
    interface Vue {
        $music: Music;
    }
}

interface Music {
    currentSong: typeof SongComponent|any;
    currentCategory: typeof Category|any;
    songChanging: boolean;
    selectedFilters: {
        [key: string]: string;
    };
}