<template>
    <div class="bar bg-gray">
        <div class="container">
            <div class="left">
                <play-pause class="me-2"/>
                <stop/>
            </div>
            <div class="middle">
                <progress-bar/>
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
    display: flex;
    align-items: center;
}

.middle {
    flex: 1 0 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import Volume from "~/components/controls/volume.vue";
import PlayPause from "~/components/controls/PlayPause.vue";
import Stop from "~/components/controls/Stop.vue";
import ProgressBar from "~/components/controls/ProgressBar.vue";

export default Vue.extend({
    components: {ProgressBar, PlayPause, Volume, Stop},
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