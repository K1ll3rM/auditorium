import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld(
    "api", {
        send(channel: string, data: any) {
            let validChannels = ['music-request'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        sendSync(channel: string, data: any) {
            let validChannels = ['music-request'];
            if (validChannels.includes(channel)) {
                return ipcRenderer.sendSync(channel, data);
            }
        },
        receive(channel: string, func: (...args: any[]) => void) {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);