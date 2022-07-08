import 'vue';
import '@nuxt/types'
import {Category} from "~~/lib/Category";
import {Song} from "~~/lib/Songs/Song";
import {Emitter} from "mitt";

declare module 'vue/types/vue' {
  interface Vue {
    $music: Music;
    $mitt: Emitter;
  }
}

interface Music {
  currentSong: Song | null;
  currentSongProgress: number;
  currentCategory: Category;
  songChanging: boolean;
  selectedFilters: {
    [key: string]: string;
  };
}
