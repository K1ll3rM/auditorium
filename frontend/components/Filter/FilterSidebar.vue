<template>
    <div class="filter-sidebar-container">
        <div class="filter-sidebar" :class="hidden ? 'hidden' : ''">
            <div>
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.filter-sidebar-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    overflow: hidden;
}

.filter-sidebar {
    $width: 25rem;

    width: $width;
    height: calc(100vh - 65px);
    background: #2a2a2a;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9000;
    pointer-events: auto;
    transition: right 200ms ease-in-out;

    &.hidden {
        right: -$width;
    }

    .btn-close {
        font-size: 1.5rem;
        margin: .5rem;
    }
}
</style>
<script lang="ts">
import Vue from "vue";
import {FiltersInterface, Song} from "~/lib/Songs/Song";

export default Vue.extend({
    name: 'FilterSidebar',
    components: {},
    props: {},
    data() {
        return {
            hidden: true,
            filters: <FiltersInterface>{}
        }
    },
    created() {
        this.$root.$on('toggleFilterSidebar', () => {
            this.toggle();
        });

        this.$root.$on('category.change', () => {
            if (!this.$music.currentCategory) {
                return;
            }

            for (let song of this.$music.currentCategory.songs) {
                this.addToFilter(song);
            }

            for (let [filter, value] of Object.entries(this.filters)) {
                console.log(this.filters);
            }
        });
    },
    methods: {
        toggle() {
            this.hidden = !this.hidden;
        },
        close() {
            this.hidden = true;
        },
        addToFilter(song: Song) {
            if (song.manifest.filters) {
                for (let [filter, value] of Object.entries(song.manifest.filters)) {
                    if (!this.filters.hasOwnProperty(filter)) {
                        this.filters[filter] = [];
                    }

                    if (!this.filters[filter].includes(value)) {
                        this.filters[filter].push(value);
                    }
                }
            }
        }
    }
});
</script>