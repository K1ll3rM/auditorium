import 'vue';
import '@nuxt/types'
import {Category} from "~/lib/Category";
import {Song} from "~/lib/Songs/Song";

declare module 'vue/types/vue' {
  interface Vue {
    $music: Music;
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
