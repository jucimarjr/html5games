/*global FSMachine, initStateMachine*/

/* The object that embodies all the system*/

var DominoSystem = function () {
    'use strict';
    this.stateMachine = new FSMachine();
    initStateMachine(this.stateMachine);
};
DominoSystem.prototype = {
    enqueueEvent: function (event) {
        'use strict';
        this.stateMachine.enqueueEvent(event);
    }
};