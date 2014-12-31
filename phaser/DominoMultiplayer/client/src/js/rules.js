/*global Actions, States, Events*/

var Rules = {
    initStateMachine: function (stateMachine) {
        'use strict';
        stateMachine.addTransition(States.FIRST, Events.INIT, States.LOGIN, [Actions.showLoginPage]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_TRY, States.LOGIN, [Actions.validateLogin]);
    }
};