import {defineNuxtPlugin} from "#app";
import EventBus from "~~/lib/EventBus";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      eventBus: EventBus
    }
  };
})
