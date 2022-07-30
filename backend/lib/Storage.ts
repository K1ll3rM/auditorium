'use strict';
import * as os from 'os';
import {promises as fs} from 'fs';
import {getDocumentsFolder} from 'platform-folders';
import {DEFAULT_CONFIG} from "./Constants";

export class Storage {

    static folders: string[] = [
        '/songs',
        '/categories'
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
        this.createConfig();

        let path = this.getStorage();

        await this.createDir(path);

        for (let folder of this.folders) {
            await this.createDir(path + folder);
        }
    }

    static async createDir(path: string) {
        try {
            await fs.stat(path);
        } catch (e) {
            await fs.mkdir(path);
        }
    }

    static async createConfig() {
        let file = this.getStorage() + '/config.json';

        try {
            await fs.stat(file);
        } catch (e) {
            await fs.writeFile(file, JSON.stringify(DEFAULT_CONFIG));
        }
    }

}
