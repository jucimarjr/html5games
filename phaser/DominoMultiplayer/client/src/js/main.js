/*global console, document, window, Config, Events, DominoSystem, Codes*/

/* This document contains the first line of code executed */

var Phaser;

function main() {
    "use strict";
    Phaser = window.frames[Config.GAME_IFRAME_ID].contentWindow.Phaser;
    var dominoSystem = new DominoSystem(window, document);
    dominoSystem.enqueueEvent(Events.INIT);
    window.onkeypress = dominoSystem.hardware.onKeyPressed.bind(dominoSystem.hardware);
}

console.log(Config.SYSTEM_NAME + " - v" + Config.VERSION_NUMBER);
window.onload = main;