import {reactive} from "vue";
import {Song} from "~~/lib/Songs/Song";
import {Category} from "~~/lib/Category";
import {FiltersSelectedInterface} from "~~/lib/Filter";

export interface MusicInterface {
  currentSong: Song | null;
  currentSongProgress: number;
  currentCategory: Category | null;
  visibleSongs: Song[];
  songChanging: boolean;
  selectedFilters: FiltersSelectedInterface;

  setCurrentCategory(category: Category): void;

  setSelectedFilters(filters: FiltersSelectedInterface): void;
}

class Music implements MusicInterface {
  public currentSong: Song | null = null;
  public currentSongProgress: number = 0;
  public currentCategory: Category | null = null;
  public visibleSongs: Song[] = [];
  public songChanging: boolean = false;
  public selectedFilters: FiltersSelectedInterface = {};

  public setCurrentCategory(category: Category) {
    this.currentCategory = category;
    this.setVisibleSongs();
  }

  public setSelectedFilters(filters: FiltersSelectedInterface) {
    this.selectedFilters = filters;
    this.setVisibleSongs();
  }

  protected setVisibleSongs() {
    this.visibleSongs = this.currentCategory.songs.filter((song: Song) => {

      for (const [filterName, filterValue] of Object.entries(this.selectedFilters)) {
        if (song.manifest.filters && song.manifest.filters[filterName] && song.manifest.filters[filterName] === filterValue) {
          continue;
        }

        return false;
      }

      return true;
    });
  }
}

export default reactive(new Music());
