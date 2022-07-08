import {Toast} from "~~/lib/Toast";
import Music from "~~/lib/Music";
import EventBus from "~~/lib/EventBus";

export class Main {
  static addToast(toast: Toast) {};

  static music = Music;
  static eventBus = EventBus;
}
