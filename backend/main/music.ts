import {ipcMain} from "electron";

ipcMain.on('music-request', (event, args) => {
    console.log(args);
    event.returnValue = ['test1', 'test2'];
});