import {reactive} from "vue";

export default reactive({
  currentSong: null,
  currentSongProgress: 0,
  currentCategory: null,
  songChanging: false,
  selectedFilters: {}
});
