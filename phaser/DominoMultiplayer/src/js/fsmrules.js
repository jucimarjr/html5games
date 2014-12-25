/*global States, Events, document*/

/*This document contains the definitions of the possible transitions in the state machine and the possible actions that can be executed during these transitions*/

/* Actions */

function showLoginPage() {
    'use strict';
    document.getElementById("LoginFrame").style.display = "block";
}

/* Transition definitions */

function initStateMachine(stateMachine) {
    'use strict';
    stateMachine.addTransition(States.FIRST, Events.LOGIN, States.INITIATED, [showLoginPage]);
}