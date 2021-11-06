import {api} from "../preload";
import {ipcRenderer} from "electron";
import {CHANNEL_GETSONGS} from "../lib/Constants";

api['getSongs'] = () => {
    return ipcRenderer.sendSync(CHANNEL_GETSONGS);
};