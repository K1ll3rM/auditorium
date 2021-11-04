import {ipcMain} from "electron";
import {Song} from "../../shared/Song";


ipcMain.on('music-request', async (event) => {
    event.returnValue = await Song.getSongs();
});