/*global console, window, Config, Utils, Events, DominoSystem, Codes*/

/* This document contains the first line of code executed */

var dominoSystem;

function main() {
    'use strict';
    dominoSystem = new DominoSystem();
    dominoSystem.enqueueEvent(Events.INIT);
    window.onkeypress = Utils.onKeyPressed;
}

console.log(Config.SYSTEM_NAME + " - v" + Codes.VERSION_NUMBER);
window.onload = main;