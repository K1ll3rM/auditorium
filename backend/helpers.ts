'use strict';

export function getFileName(path: string) {
    return path.replace(/^.*[\\\/]/, '');
}
