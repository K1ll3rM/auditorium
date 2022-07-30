import {defineNuxtPlugin} from "#app";
import {ToastController} from "~~/lib/Toast";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            toast: ToastController
        }
    };
})
