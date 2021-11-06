import {Songs} from "~/lib/Song";

interface Api {
    getSongs(): Songs|string;
}