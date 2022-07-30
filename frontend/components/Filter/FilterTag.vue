<template>
    <div class="tag">{{ filterName }}: {{ filterValue }}
        <button class="remove" @click="remove()"></button>
    </div>
</template>

<style lang="scss" scoped>
.tag {
    background: #3B3B3B;
    display: inline-block;
    border-radius: 1rem;
    padding: .25rem .25rem .25rem .75rem;
    font-size: .75rem;

    .remove {
        border: none;

        &::before {
            display: inline-block;
            font-family: bootstrap-icons !important;
            font-style: normal;
            font-weight: normal !important;
            font-feature-settings: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: -.125em;
            -webkit-font-smoothing: antialiased;
            content: "\f623";
        }

        &:hover::before {
            content: "\f622";
        }
    }
}
</style>
<script lang="ts">

export default {
    components: {},
    props: {
        filterName: String,
        filterValue: String
    },
    data() {
        return {}
    },
    methods: {
        remove() {
            if (this.$music.selectedFilters[this.filterName]) {
                delete this.$music.selectedFilters[this.filterName];
                this.$eventBus.emit('applyFilters');
            }
        }
    }
};
</script>
