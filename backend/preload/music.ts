'use strict';

import {api} from "../preload";
import {ipcRenderer} from "electron";

api['getSongs'] = () => {
    return ipcRenderer.sendSync('music-request');
};