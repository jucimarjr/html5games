/*global Config, States, Events*/

/* This object contains the function which defines all transitions in the state machine */

var Rules = function (actions) {
    "use strict";
    this.actions = actions;
};
Rules.prototype = {
    initStateMachine: function (stateMachine) {
        "use strict";
        stateMachine.addTransition(States.FIRST, Events.INIT, States.LOGIN, [this.actions.registerInputCapture.bind(this.actions), this.actions.showLoginPage.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_BUTTON_CLICK, States.LOGIN, [this.actions.validateLogin.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.ENTER_PRESSED, States.LOGIN, [this.actions.validateLogin.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.ERROR_CONNECTION, States.LOGIN, [this.actions.showLoginErrorConnection.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_REFUSED, States.LOGIN, [this.actions.showLoginInvalid.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.LOGIN_CONFIRMED, States.LOGIN, [this.actions.requestServerAddress.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.IP_RECEIVED, States.LOGIN, [this.actions.connectToSever.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.CONNECTION_ESTABLISHED, States.LOGIN, [this.actions.sendLoginToServer.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.SERVER_ACK_LOGIN, States.LOGIN, [this.actions.requestRoomsInfo.bind(this.actions)]);
        stateMachine.addTransition(States.LOGIN, Events.ROOMS_INFO_RECEIVED, States.ROOMS, [this.actions.populateRoomsPage.bind(this.actions), this.actions.showRoomsPage.bind(this.actions)]);
        stateMachine.addTransition(States.ROOMS, Events.ROOM_CLICKED, States.ROOMS, [this.actions.requestEnterRoom.bind(this.actions)]);
        stateMachine.addTransition(States.ROOMS, Events.SERVER_ALLOW_ENTER_ROOM, States.WAIT_MORE_PLAYERS, [this.actions.showWaitMorePlayersPage.bind(this.actions)]);
    }
};