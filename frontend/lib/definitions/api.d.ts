import {Song, SongManifestsInterface} from "~/lib/Songs/Song";
import {ConfigInterface} from "@/shared/ConfigInterface";
import {CategoryManifests} from "~/lib/Category";
import {SongFilesInterface} from "@/shared/SongFilesInterface";

declare interface Api {
  getSongs(): SongManifestsInterface;

  getSongFiles<T extends SongFilesInterface>(song: Song): T;

  getCategories(): CategoryManifests;

  getConfig(): ConfigInterface;

  setConfig(config: ConfigInterface): void;
}
