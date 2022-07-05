<template>
  <button class="btn btn-secondary mb-3" @click="toggleFilterSidebar"><i class="bi bi-sliders"></i></button>
</template>

<style>
</style>
<script lang="ts">
import {defineNuxtComponent} from "#app";

export default defineNuxtComponent({
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {
    toggleFilterSidebar() {
      this.$root.$emit('toggleFilterSidebar');
    }
  }
});
</script>
