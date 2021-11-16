<template>
    <div class="volume">
        <div class="button">
            <div v-if="volume === 0" class="bi bi-volume-off"></div>
            <div v-if="volume > 0 && volume < .75" class="bi bi-volume-down"></div>
            <div v-if="volume >= .75" class="bi bi-volume-up"></div>
        </div>
        <div class="popout bg-gray">
            <input type="range" class="volume" ref="volume" v-model.number="volume" @input="setVolume()" min="0" max="1" step="0.005">
            <output class="bubble" ref="bubble"></output>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.volume {
    position: relative;
}

.button {
    font-size: 2rem;
    line-height: 2rem;
    cursor: pointer;

    &:hover + .popout {
        opacity: 1;
        pointer-events: all;
    }
}

@keyframes disable-pointer-events {
    0%, 99% {
        pointer-events: none;
    }
}

.popout {
    $height: 8rem;
    $padding: .5rem;

    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: -($height + $padding);
    height: $height;
    padding: .5rem;
    border-radius: .25rem;
    transition: opacity .1s ease-in-out;

    &:hover {
        opacity: 1;
        pointer-events: all;
    }

    .volume {
        -webkit-appearance: slider-vertical;
        width: 1rem;

        &:hover + .bubble {
            opacity: 1;
        }
    }

    .bubble {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        left: -2rem;
        background: rgba(63, 62, 62, 0.2);
        border-radius: .25rem;
        padding: .25rem;
        width: 2rem;
        text-align: center;
        transition: opacity .1s ease-in-out;
    }
}

.bi-volume-off {
    transform: translateX(-.35rem);
}

.bi-volume-down {
    transform: translateX(-.1rem);
}

.bi-volume-up {
    transform: translateX(.15rem);
}
</style>

<script lang="ts">
import Vue from "vue";
import {Config} from "~/lib/Config";
import {debounce, round} from "@/shared/helpers";

export default Vue.extend({
    components: {},
    props: {
    },
    data() {
        return {
            volume: Config.data.volume
        }
    },
    mounted() {
        this.setBubble();
    },
    methods: {
        setVolume() {
            Config.data.volume = this.volume;
            this.$music.currentSong?.updateVolume();
            this.saveConfig();

            this.setBubble();
        },
        saveConfig: debounce(() => {
            Config.save();
        }, 2000),
        setBubble() {
            let range = <HTMLInputElement>this.$refs.volume;
            let bubble = <HTMLElement>this.$refs.bubble;

            const val = Number(range.value);
            const min = range.min ? Number(range.min) : 0;
            const max = range.max ? Number(range.max) : 100;
            const newVal = Number(((val - min) * 100) / (max - min));
            bubble.innerHTML = String(round(val * 100, 0));

            // Sorta magic numbers based on size of the native UI thumb
            bubble.style.bottom = `calc(${newVal}% + (${-16 - newVal * 0.15}px))`;
        }
    }
});
</script>