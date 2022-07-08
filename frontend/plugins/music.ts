import {defineNuxtPlugin} from "#app";
import {reactive} from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    }
  });


  return {
    provide: {
      music: reactive({
        currentSong: null,
        currentSongProgress: 0,
        currentCategory: null,
        songChanging: false,
        selectedFilters: {}
      })
    }
  };
})
