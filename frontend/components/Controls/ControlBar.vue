<template>
    <div class="bar bg-gray">
        <div class="container">
            <div class="left">
                <PlayPause class="me-2"/>
                <stop/>
            </div>
            <div class="middle">
                <ProgressBar/>
            </div>
            <div class="right">
                <Volume/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Volume from "~~/components/controls/volume.vue";
import PlayPause from "~~/components/controls/PlayPause.vue";
import Stop from "~~/components/controls/Stop.vue";
import ProgressBar from "~~/components/controls/ProgressBar.vue";

export default {
    name: "ControlBar",
    components: {ProgressBar, PlayPause, Volume, Stop},
    props: {},
    data() {
        return {}
    },
    methods: {}
};
</script>

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
    display: flex;
    align-items: center;
}

.middle {
    flex: 1 0 0;
}
</style>
