/*This document contains the first line of code executed*/

/*global Utils, Events, DominoSystem, window*/

var dominoSystem;

function main() {
    'use strict';
    dominoSystem = new DominoSystem();
    dominoSystem.enqueueEvent(Events.INIT);
    window.onkeypress = Utils.onKeyPressed;
}

window.onload = main;