/*global Config, Actions, States, Events*/

/* this object contains the function which defines all transitions in the state machine*/

var Rules = {
    initStateMachine: function (stateMachine) {
        'use strict';
        stateMachine.addTransition(States.FIRST, Events.INIT, States.LOGIN, [Actions.showLoginPage]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_BUTTON_CLICK, States.LOGIN, [Actions.validateLogin]);
        stateMachine.addTransition(States.LOGIN, Events.ENTER_PRESSED, States.LOGIN, [Actions.validateLogin]);
        stateMachine.addTransition(States.LOGIN, Events.ERROR_CONNECTION, States.LOGIN, [Actions.showLoginErrorConnection]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_REFUSED, States.LOGIN, [Actions.showLoginInvalid]);
    }
};