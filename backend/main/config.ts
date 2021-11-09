import {ipcMain} from "electron";
import {CHANNEL_GETCONFIG, CHANNEL_SETCONFIG, DEFAULT_CONFIG} from "../lib/Constants";
import {promises as fs} from "fs";
import {Storage} from "../lib/Storage";

ipcMain.on(CHANNEL_GETCONFIG, async (event) => {
    const configPath = Storage.getStorage() + '/config.json';

    let file = await fs.readFile(configPath);
    event.returnValue = Object.assign({}, DEFAULT_CONFIG, JSON.parse(file.toString()));
});

ipcMain.on(CHANNEL_SETCONFIG, async (event, config) => {
    const configPath = Storage.getStorage() + '/config.json';

    await fs.writeFile(configPath, JSON.stringify(config));
});