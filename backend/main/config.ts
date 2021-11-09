import {ipcMain} from "electron";
import {CHANNEL_GETCONFIG, CHANNEL_SETCONFIG} from "../lib/Constants";
import {promises as fs} from "fs";
import {Storage} from "../lib/Storage";
import {ConfigInterface} from "../../shared/ConfigInterface";

export const defaultConfig: ConfigInterface = {
    volume: 0.5
};

export const configPath = Storage.getStorage() + '/config.json';

ipcMain.on(CHANNEL_GETCONFIG, async (event) => {
    let file = await fs.readFile(configPath);
    event.returnValue = Object.assign({}, defaultConfig, JSON.parse(file.toString()));
});

ipcMain.on(CHANNEL_SETCONFIG, async (event, config) => {
    await fs.writeFile(configPath, JSON.stringify(config));
});