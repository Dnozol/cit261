// we can use this (geid) instead of typing out document.getElementById so frequently
export function geid(idName) {
    return document.getElementById(idName);
}

export function qs(className) {
    return document.querySelector(className);
}

export function qsa(className) {
    return document.querySelectorAll(className);
}

export function celi() {
    return document.createElement('li');
}