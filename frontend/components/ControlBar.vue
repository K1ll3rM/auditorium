<template>
    <div class="bar bg-gray">
        <div class="container">
            <div class="left"></div>
            <div class="middle">

            </div>
            <div class="right">
                <volume/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bar {
    position: fixed;
    bottom: 0;
    padding: 1rem;
    width: 100%;
    z-index: 9001;
}

.container {
    display: flex;
    justify-content: space-between;
}

.left, .right {
    flex: 0 0 auto;
}

.middle {
    flex: 1 0 0;
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