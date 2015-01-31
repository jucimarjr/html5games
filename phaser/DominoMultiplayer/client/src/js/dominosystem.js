/*global console, Config, Hardware, Actions, Client, FSMachine, Rules, LoginPage, RoomsPage, User, WaitPlayersPage, ReadyPage, GamePage, ReconnectPage, Phaser, PlayState*/

/* The object that embodies all the system */

var DominoSystem = function (window, document) {
    "use strict";
    this.hardware = new Hardware(this, window);
    this.stateMachine = new FSMachine();
    this.client = new Client(this, document);
    this.user = new User();
    this.actions = new Actions(this);
    this.rules = new Rules(this.actions);
    this.game = null;
    this.rules.initStateMachine(this.stateMachine);
    this.pages = {
        login: new LoginPage(window),
        rooms: new RoomsPage(window),
        waitPlayers: new WaitPlayersPage(window),
        ready: new ReadyPage(window),
        game: new GamePage(window),
        reconnect: new ReconnectPage(window)
    };
};
DominoSystem.prototype = {
    initGame: function () {
        "use strict";
        console.log("game start");
        this.game = new Phaser.Game(Config.GAME_DIV_WIDTH, Config.GAME_DIV_HEIGHT, Phaser.AUTO, this.pages.game.document.getElementById(Config.GAME_DIV_ID));
        this.game.state.add(Config.PLAY_STATE_KEY, PlayState);
        this.game.state.start(Config.PLAY_STATE_KEY);
        console.log("game start");
    },
    enqueueEvent: function (event) {
        "use strict";
        this.stateMachine.enqueueEvent(event);
    }
};