/*This document contains the first line of code executed*/

/*global console, window, Config, Utils, Events, DominoSystem, Codes*/

var dominoSystem;

function main() {
    'use strict';
    dominoSystem = new DominoSystem();
    dominoSystem.enqueueEvent(Events.INIT);
    window.onkeypress = Utils.onKeyPressed;
}

console.log(Config.SYSTEM_NAME + " - V." + Codes.VERSION_NUMBER);
window.onload = main;