import {ipcMain} from "electron";
import { promises as fs } from 'fs';

ipcMain.on('music-request', async (event, args) => {
    let files = await fs.readdir('.');


    console.log(args);
    event.returnValue = files;
});