import {ipcMain} from "electron";
import {CHANNEL_GETCATEGORIES, CHANNEL_GETSONGFILES, CHANNEL_GETSONGS} from "../lib/Constants";
import {promises as fs} from "fs";
import {getFileName} from "../../shared/helpers";
import {Storage} from "../lib/Storage";
import {SongManifestInterface} from "../../shared/SongManifestInterface";
import {SongInterface} from "../../shared/SongInterface";
import {CategoryManifestInterface} from "../../shared/CategoryManifestInterface";

export const songPath = Storage.getStorage() + '/songs';
export const categoryPath = Storage.getStorage() + '/categories';

ipcMain.on(CHANNEL_GETSONGS, async (event) => {
    let files = await fs.readdir(songPath);
    let songs: Songs = {};

    for (let file of files) {
        let id = getFileName(file);
        let path = songPath + '/' + id;

        let manifestFile = await fs.readFile(path + '/manifest.json');

        songs[id] = JSON.parse(manifestFile.toString());
    }

    event.returnValue = songs;
});

ipcMain.on(CHANNEL_GETSONGFILES, async (event, song: SongInterface) => {
    let intro = await fs.readFile(song.path + "/intro.wav");
    let loop = await fs.readFile(song.path + "/loop.wav");

    event.returnValue = {
        intro: intro,
        loop: loop
    };
});

ipcMain.on(CHANNEL_GETCATEGORIES, async (event) => {
    let files = await fs.readdir(categoryPath);
    let categories: Categories = {};

    for (let file of files) {
        let id = getFileName(file).replace('.json', '');
        let path = categoryPath + '/' + id;

        let manifestFile = await fs.readFile(path + '.json');

        categories[id] = JSON.parse(manifestFile.toString());
    }

    event.returnValue = categories;
});


interface Songs {
    [id: string]: SongManifestInterface
}
interface Categories {
    [id: string]: CategoryManifestInterface
}