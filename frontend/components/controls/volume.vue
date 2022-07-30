<template>
    <div class="volume">
        <div class="button">
            <div v-if="volume === 0" class="bi bi-volume-off"></div>
            <div v-if="volume > 0 && volume < .75" class="bi bi-volume-down"></div>
            <div v-if="volume >= .75" class="bi bi-volume-up"></div>
        </div>
        <div class="popout bg-gray">
            <div class="range-bar" ref="rangeBar"></div>
            <input type="range" class="volume" ref="volume" v-model.number="volume" @input="setVolume()" min="0" max="1"
                   step="0.005">
            <output class="bubble" ref="bubble"></output>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

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

.popout {
    $height: 8rem;
    $padding: .5rem;

    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: -$height;
    height: $height;
    padding: 3.75rem $padding;
    border-radius: .25rem;
    transition: opacity .1s ease-in-out;
    left: .5rem;
    user-select: none;

    &:hover {
        opacity: 1;
        pointer-events: all;
    }

    &:after {
        top: -10%;
        left: -100%;
        width: 300%;
        height: 120%;
        content: '';
        position: absolute;
        z-index: -1;
    }

    .range-bar {
        height: 1rem;
        width: .25rem;
        background: #FFB400;
        position: absolute;
        bottom: .65rem;
        left: .4rem;
        z-index: 2;
        pointer-events: none;
        cursor: pointer;
    }

    .volume {
        -webkit-appearance: none;
        left: -3rem;
        width: 7rem;
        height: .25rem;
        position: absolute;
        transform: rotate(-90deg);

        &:hover + .bubble {
            opacity: 1;
        }

        &:focus-visible {
            outline: none;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: .25rem;
            width: 1rem;
            background: transparent;
            cursor: pointer;
        }

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
        }
    }

    .bubble {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        user-select: none;
        left: -2.1rem;
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
import {Config} from "~~/lib/Config";
import {debounce, round} from "~~/helpers";

export default {
    components: {},
    props: {},
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
            this.$music.currentSong?.player?.triggerVolumeUpdate();
            this.saveConfig();

            this.setBubble();
        },
        saveConfig: debounce(() => {
            Config.save();
        }, 2000),
        setBubble() {
            let range = <HTMLInputElement>this.$refs.volume;
            let bubble = <HTMLElement>this.$refs.bubble;
            let rangeBar = <HTMLElement>this.$refs.rangeBar;

            const val = Number(range.value);
            const min = range.min ? Number(range.min) : 0;
            const max = range.max ? Number(range.max) : 100;
            const newVal = Number(((val - min) * 100) / (max - min));
            bubble.innerHTML = String(round(val * 100, 0));

            // Sorta magic numbers based on size of the native UI thumb
            bubble.style.bottom = `calc(${newVal}% + (${-newVal * 0.32}px))`;
            rangeBar.style.height = `calc(${newVal}% + (${-newVal * 0.165}px))`;
        }
    }
};
</script>
