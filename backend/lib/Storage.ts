'use strict';
import * as os from 'os';
import { promises as fs } from 'fs';
import {getDocumentsFolder} from 'platform-folders';

export class Storage {

    static folders: string[] = [
        '/songs'
    ];

    static getStorage() {
        switch (os.platform()) {
            case "win32":
            case "linux":
                return getDocumentsFolder() + '/auditorium';
            default:
                throw new Error('Platform not supported');
        }
    }

    static async createStorage() {
        let path = this.getStorage();

        await this.createDir(path);

        for (let folder of this.folders) {
            await this.createDir(path + folder);
        }
    }

    static async createDir(path: string) {
        try {
            await fs.stat(path);
        }
        catch (e) {
            await fs.mkdir(path);
        }
    }

}