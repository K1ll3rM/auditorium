import {ConfigInterface} from "@/shared/ConfigInterface";

export class Config {

    public static data: ConfigInterface;

    public static async init() {
        this.data = window.api.getConfig();
    }

}