import 'vue';
import '@nuxt/types'
import {Emitter} from "mitt";
import {MusicInterface} from "~~/lib/MusicInterface";
import {ToastControllerInterface} from "~~/lib/Toast";

declare module 'vue/types/vue' {
  interface Vue {
    $music: MusicInterface;
    $eventBus: Emitter;
    $toast: ToastControllerInterface;
  }
}
