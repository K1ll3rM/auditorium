import 'vue';
import '@nuxt/types'
import {Emitter} from "mitt";
import {ToastControllerInterface} from "~~/lib/Toast";
import {MusicInterface} from "~~/lib/Music";

declare module 'vue/types/vue' {
  interface Vue {
    $music: MusicInterface;
    $eventBus: Emitter;
    $toast: ToastControllerInterface;
  }
}
