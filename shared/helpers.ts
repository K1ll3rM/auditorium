'use strict';


export function getFileName(path: string) {
    return path.replace(/^.*[\\\/]/, '');
}

export function round(number: number, places: number) {
    return +(Math.round(Number(number + "e+" + places))  + "e-" + places);
}