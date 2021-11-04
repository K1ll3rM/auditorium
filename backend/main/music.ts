import {ipcMain} from "electron";
import {Song} from "../lib/Song";


ipcMain.on('music-request', async (event) => {
    event.returnValue = await Song.getSongs();
});