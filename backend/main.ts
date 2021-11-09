// Modules to control application life and create native browser window
import {app, BrowserWindow} from "electron";
import {Storage} from "./lib/Storage";
const serve = require("electron-serve");
const path = require("path");
const loadURL = serve({ directory: "frontend/build" });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow|null;

function isDev() {
    return !app.isPackaged;
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1900,
        height: 1080,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        },
        icon: isDev()
            ? path.join(process.cwd(), "static/favicon.png")
            : path.join(__dirname, "build/favicon.png"),
        show: false,
    });

    if (isDev()) {
        mainWindow.loadURL("http://localhost:3000/");
        mainWindow.webContents.openDevTools();
    } else {
        loadURL(mainWindow);
    }

    // Uncomment the following line of code when app is ready to be packaged.
    // loadURL(mainWindow);

    // Open the DevTools and also disable Electron Security Warning.
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = String(true);

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Emitted when the window is ready to be shown
    // This helps in showing the window gracefully.
    mainWindow?.once("ready-to-show", () => {
        mainWindow?.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    await Storage.createStorage();
    require('./main/music');
    require('./main/config');

    createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

if(isDev()) {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

    app.whenReady().then(() => {
        installExtension(VUEJS_DEVTOOLS)
            .then((name: string) => console.log(`Added Extension:  ${name}`))
            .catch((err: Error) => console.log('An error occurred: ', err));
    });
}