<template>
  <button class="btn col"
          :class="$music.currentCategory && $music.currentCategory.id.startsWith(id) ? 'btn-secondary' : 'btn-secondary'">
    <slot/>
  </button>
</template>

<script lang="ts">

export default {
  components: {},
  props: {
    id: String
  }
};
</script>
