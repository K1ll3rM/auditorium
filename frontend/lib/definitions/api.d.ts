import {Songs} from "@/shared/Song";

interface Api {
    getSongs(): Songs|string;
}