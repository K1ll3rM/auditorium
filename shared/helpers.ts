'use strict';

export function getFileName(path: string) {
    return path.replace(/^.*[\\\/]/, '');
}

export function round(number: number, places: number) {
    return +(Math.round(Number(number + "e+" + places))  + "e-" + places);
}

export function debounce (fn: () => void, delay: number) {
    let timeoutID: NodeJS.Timeout|null = null
    return function () {
        if(timeoutID) {
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