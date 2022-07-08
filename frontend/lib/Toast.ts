import {reactive} from "vue";

export class Toast {
  id: string;

  message: string;

  style: ToastStyle;
  delay: number;

  constructor(message: string, style: ToastStyle = ToastStyle.default, delay: number = 5000) {
    this.id = Math.random().toString(36).slice(2);

    this.message = message;

    this.style = style;
    this.delay = delay;
  }
}

export enum ToastStyle {
  default,
  success,
  warning,
  danger,
}

export const ToastController = reactive({
  toasts: {},
  addToast(toast: Toast) {
    this.toasts[toast.id] = toast;
  },
  removeToast(id: string) {
    delete this.toasts[id];
  }
});

export interface ToastControllerInterface {
  toasts: {
    [id: string]: Toast
  };

  addToast(toast: Toast);

  removeToast(id: string);
}
