"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.ipcMain.on('music-request', function (event, args) {
    console.log(args);
    event.returnValue = ['test1', 'test2'];
});
