'use strict';

export function round(number: number, places: number) {
    return +(Math.round(Number(number + "e+" + places)) + "e-" + places);
}

export function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeoutID: NodeJS.Timeout | null = null
    return function () {
        if (timeoutID) {
            return;
        }
        let args = arguments;
        // @ts-ignore
        let that = this;
        timeoutID = setTimeout(function () {
            // @ts-ignore
            fn.apply(that, args);

            timeoutID = null;
        }, delay)
    }
}

export function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export function timeout(delay: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, delay);
    });
}

export function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatSeconds(num: number) {
    if (Number.isNaN(num)) {
        return '00:00';
    }

    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num - hours * 3600) / 60);
    let seconds = Math.round(num - (minutes * 60 + hours * 3600));
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    let output = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

    if (hours) {
        output = hours + ':' + output;
    }

    return output;
}
