<template>
    <div class="bar bg-gray">
        <div class="container">
            <volume/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bar {
    position: fixed;
    bottom: 0;
    padding: 1rem;
    width: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";
import Volume from "~/components/volume.vue";

export default Vue.extend({
    components: {Volume},
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
    }
});
</script>