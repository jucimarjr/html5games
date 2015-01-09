/*global Hardware, Actions, Client, FSMachine, Rules, LoginPage, RoomsPage, User, WaitMorePlayersPage*/

/* The object that embodies all the system */

var DominoSystem = function (window, document) {
    "use strict";
    this.hardware = new Hardware(this, window);
    this.stateMachine = new FSMachine();
    this.client = new Client(this, document);
    this.user = new User();
    this.actions = new Actions(this);
    this.rules = new Rules(this.actions);
    this.rules.initStateMachine(this.stateMachine);
    this.pages = {
        login: new LoginPage(window),
        rooms: new RoomsPage(window),
        waitMorePlayers: new WaitMorePlayersPage(window)
    };
};
DominoSystem.prototype = {
    enqueueEvent: function (event, param) {
        "use strict";
        this.stateMachine.enqueueEvent(event, param);
    }
};