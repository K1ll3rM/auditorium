"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    send: function (channel, data) {
        var validChannels = ['music-request'];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data);
        }
    },
    sendSync: function (channel, data) {
        var validChannels = ['music-request'];
        if (validChannels.includes(channel)) {
            return electron_1.ipcRenderer.sendSync(channel, data);
        }
    },
    receive: function (channel, func) {
        var validChannels = ["fromMain"];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.on(channel, function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        }
    }
});
