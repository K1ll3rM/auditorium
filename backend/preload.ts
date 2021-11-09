import {contextBridge} from "electron";
import {Storage} from "./lib/Storage";

export const api: Api = {
    checkReply(reply) {
        if(reply === 'reply was never sent') {
            console.log(reply);
            throw new Error('Expected reply but didn\'t get any');
        }
        return reply;
    }



    // send(channel: string, data: any) {
    //     let validChannels = ['music-request'];
    //     if (validChannels.includes(channel)) {
    //         ipcRenderer.send(channel, data);
    //     }
    // },
    // sendSync(channel: string, data: any) {
    //     let validChannels = ['music-request'];
    //     if (validChannels.includes(channel)) {
    //         return ipcRenderer.sendSync(channel, data);
    //     }
    // },
    // receive(channel: string, func: (...args: any[]) => void) {
    //     let validChannels = ["fromMain"];
    //     if (validChannels.includes(channel)) {
    //         ipcRenderer.on(channel, (event, ...args) => func(...args));
    //     }
    // }
};

require('./preload/music');
require('./preload/config');

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld('storagePath', Storage.getStorage());


interface Api {
    [name: string]: (...args: any[]) => any;
}