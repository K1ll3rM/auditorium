<template>
    <div class="card bg-dark mb-3">
        <div class="card-body">
            {{ name }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    cursor: pointer;
    transition: border ease-in-out .1s;

    &:hover {
        border-color: deepskyblue;
    }

    &.selected {
        border-color: forestgreen;
    }
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        name: String
    }
});
</script>