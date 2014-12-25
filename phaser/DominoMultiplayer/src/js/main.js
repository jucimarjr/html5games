/*This document contains the first line of code executed*/

/*global Events, DominoSystem, window*/

var dominoSystem;

function main() {
    'use strict';
    dominoSystem.enqueueEvent(Events.LOGIN);
}

var dominoSystem = new DominoSystem();
window.onload = main;