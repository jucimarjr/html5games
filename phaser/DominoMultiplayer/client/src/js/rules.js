/*global Config, Actions, States, Events*/

/* This object contains the function which defines all transitions in the state machine */

var Rules = {
    initStateMachine: function (stateMachine) {
        'use strict';
        stateMachine.addTransition(States.FIRST, Events.INIT, States.LOGIN, [Actions.showLoginPage]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_BUTTON_CLICK, States.LOGIN, [Actions.validateLogin]);
        stateMachine.addTransition(States.LOGIN, Events.ENTER_PRESSED, States.LOGIN, [Actions.validateLogin]);
        stateMachine.addTransition(States.LOGIN, Events.ERROR_CONNECTION, States.LOGIN, [Actions.showLoginErrorConnection]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_REFUSED, States.LOGIN, [Actions.showLoginInvalid]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_CONFIRMED, States.LOGIN, [Actions.requestServerAddress]);
        stateMachine.addTransition(States.LOGIN, Events.IP_RECEIVED, States.LOGIN, [Actions.connectToSever]);
        stateMachine.addTransition(States.LOGIN, Events.CONNECTION_ESTABLISHED, States.LOGIN, [Actions.sendLoginToServer]);
        stateMachine.addTransition(States.LOGIN, Events.SERVER_ACK_LOGIN, States.LOGIN, [Actions.requestRoomsInfo]);
        stateMachine.addTransition(States.LOGIN, Events.ROOMS_INFO_RECEIVED, States.ROOMS, [Actions.showRoomsPage]);
    }
};