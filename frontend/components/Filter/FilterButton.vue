<template>
  <button class="btn btn-secondary mb-3" @click="toggleFilterSidebar"><i class="bi bi-sliders"></i></button>
</template>

<style>
</style>
<script lang="ts">

export default {
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
