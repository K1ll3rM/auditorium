import {ToastController} from "~~/lib/Toast";
import Music from "~~/lib/MusicInterface";
import EventBus from "~~/lib/EventBus";

export class Main {
  static toast = ToastController;
  static music = Music;
  static eventBus = EventBus;
}
