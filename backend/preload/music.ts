import {api} from "../preload";
import {ipcRenderer} from "electron";
import {CHANNEL_GETCATEGORIES, CHANNEL_GETSONGFILES, CHANNEL_GETSONGS} from "../lib/Constants";
import {SongInterface} from "../../shared/SongInterface";

api['getSongs'] = () => {
    return api.checkReply(ipcRenderer.sendSync(CHANNEL_GETSONGS));
};

api['getSongFiles'] = (song: SongInterface) => {
    return api.checkReply(ipcRenderer.sendSync(CHANNEL_GETSONGFILES, song));
};

api['getCategories'] = () => {
    return api.checkReply(ipcRenderer.sendSync(CHANNEL_GETCATEGORIES));
};