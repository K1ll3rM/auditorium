<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from "vue";
import {Category} from "~/lib/Category";

export default Vue.extend({
    components: {},
    props: {
        category: {
            type: Object as Vue.PropType<Category>,
            required: true
        },
    },
    data() {
        return {
        }
    },
    methods: {
    }
});
</script>