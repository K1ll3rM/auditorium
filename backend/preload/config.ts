import {api} from "../preload";
import {ipcRenderer} from "electron";
import {CHANNEL_GETCONFIG, CHANNEL_SETCONFIG} from "../lib/Constants";
import {ConfigInterface} from "../../shared/ConfigInterface";

api['getConfig'] = () => {
    return api.checkReply(ipcRenderer.sendSync(CHANNEL_GETCONFIG));
};

api['setConfig'] = (config: ConfigInterface) => {
    return ipcRenderer.send(CHANNEL_SETCONFIG, config);
};