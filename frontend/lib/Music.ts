import {reactive} from "vue";
import {Song} from "~~/lib/Songs/Song";
import {Category} from "~~/lib/Category";

export interface MusicInterface {
  currentSong: Song | null;
  currentSongProgress: number;
  currentCategory: Category;
  songChanging: boolean;
  selectedFilters: {
    [key: string]: string;
  };
}

export default reactive({
  currentSong: null,
  currentSongProgress: 0,
  currentCategory: null,
  songChanging: false,
  selectedFilters: {}
});
