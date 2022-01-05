import Vue from "vue";

export default ({ app }, inject) => {
    inject('music', Vue.observable({
        currentSong: null,
        currentCategory: null,
        songChanging: false,
        selectedFilters: {}
    }));
}