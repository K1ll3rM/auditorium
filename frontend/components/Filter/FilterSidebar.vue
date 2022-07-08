<template>
  <div class="filter-sidebar-container" v-click-outside="close">
    <div class="filter-sidebar" :class="hidden ? 'hidden' : ''">
      <div>
        <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
      </div>
      <form ref="filterForm" v-if="$music.currentCategory" class="p-3">
        <div class="mb-3" v-for="(filter, name) in $music.currentCategory.filters">
          <label :for="'filter_' + name" class="form-label">{{ name }}</label>
          <select class="form-select" :id="'filter_' + name" :name="name" @change="apply()">
            <option value="">None</option>
            <option v-if="$music.selectedFilters[name] && !filter.values.includes($music.selectedFilters[name])"
                    :value="$music.selectedFilters[name]" selected>{{ $music.selectedFilters[name] }}
            </option>
            <option v-for="value in filter.values" :value="value"
                    :selected="$music.selectedFilters[name] && $music.selectedFilters[name] === value">{{ value }}
            </option>
          </select>
        </div>
      </form>
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
import {FiltersInterface} from "~~/lib/Filter";
import {timeout} from "~~/helpers";

export default {
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
  },
  methods: {
    async toggle() {
      await timeout(5);
      this.hidden = !this.hidden;
    },
    close() {
      if (!this.hidden) {
        this.hidden = true;
      }
    },
    apply() {
      let data = new FormData(this.$refs.filterForm as HTMLFormElement);

      this.$music.selectedFilters = {};

      data.forEach((value, filter) => {
        if (value) {
          this.$music.selectedFilters[filter] = value as string;
        }
      });

      this.$root.$emit('applyFilters');
    }
  }
};
</script>
