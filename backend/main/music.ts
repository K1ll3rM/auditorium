import {ipcMain} from "electron";
import {Song} from "../lib/Song";
import {CHANNEL_GETSONGS} from "../lib/Constants";

ipcMain.on(CHANNEL_GETSONGS, async (event) => {
    event.returnValue = await Song.getSongs();
});