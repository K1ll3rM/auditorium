<template>
    <button class="btn btn-secondary mb-3" @click="toggleFilterSidebar"><i class="bi bi-sliders"></i></button>
</template>

<script lang="ts">

export default {
    name: "FilterButton",
    components: {},
    props: {},
    data() {
        return {}
    },
    methods: {
        toggleFilterSidebar() {
            this.$eventBus.emit("toggleFilterSidebar");
        }
    }
};
</script>
