import {CategoryManifestInterface} from "@/shared/CategoryManifestInterface";
import {Song} from "~/lib/Songs/Song";

export class Category {
    readonly id: string;

    parent: Category|null = null;

    children: Category[] = [];
    songs: Song[] = [];

    readonly manifestDefault: CategoryManifestInterface = {
        name: "Missing name!",
        fullName: null,
        description: null
    };

    manifest: CategoryManifestInterface = {} as CategoryManifestInterface;

    constructor(id: string, manifest: CategoryManifestInterface) {
        this.id = id;
        this.loadManifest(manifest);
    }

    static async getCategories(): Promise<Categories[]> {
        let reply = window.api.getCategories();
        let categories: Categories = {
            unsorted: new Category('unsorted', {name: "Unsorted"})
        };
        let sorted: Categories = {};

        for (const [id, manifest] of Object.entries(reply)) {
            categories[id] = new Category(id, manifest as CategoryManifestInterface);
        }

        for (const [id, category] of Object.entries(categories)) {
            if(!id.match(/\./)) {
                sorted[id] = category;
            }
            else {
                let parentId = id.replace(/\.[^\/.]+$/, '');
                if(!categories[parentId]) {
                    throw new Error(`Category ${id} calls for parent ${parentId} that doesn't exist.`);
                }

                categories[parentId].children.push(category);
                category.parent = categories[parentId];
            }
        }

        return [categories, sorted];
    }

    loadManifest(manifest: CategoryManifestInterface) {
        this.manifest = Object.assign({}, this.manifestDefault, manifest);

        if(this.manifest.fullName === null) {
            this.manifest.fullName = this.manifest.name;
        }
    }

    pushToSongs(song: Song) {
        this.songs.push(song);

        if(this.parent) {
            this.parent.pushToSongs(song);
        }
    }

    getBreadcrumb() {
        let cat: Category = this;
        let breadcrumb: Category[] = [];

        while(cat.parent) {
            cat = cat.parent;
            breadcrumb.unshift(cat);
        }

        return breadcrumb;
    }
}

export interface Categories {
    [key: string]: Category
}

export interface CategoryManifests {
    [key: string]: CategoryManifestInterface
}