import 'vue';
import '@nuxt/types'
import SongComponent from "~/components/songs/song.vue";

declare module 'vue/types/vue' {
    interface Vue {
        $music: Music;
    }
}

interface Music {
    currentSong: typeof SongComponent|any;
    songChanging: boolean;
}