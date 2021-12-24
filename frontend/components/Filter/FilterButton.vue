<template>
    <button class="btn btn-secondary mb-3" @click="toggleFilterSidebar"><i class="bi bi-sliders"></i></button>
</template>

<style>
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    components: {},
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
        toggleFilterSidebar() {
            this.$root.$emit('toggleFilterSidebar');
        }
    }
});
</script>