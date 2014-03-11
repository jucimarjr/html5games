/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require("util"),					// Utility resources (logging, object inspection, etc)
	io = require("socket.io");				// Socket.IO
    Player = require("./Player").Player;

/**************************************************
** GAME VARIABLES
**************************************************/
var socket,		// Socket controller
    players,	// Array of connected players
    mapIndex;

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
    players = [];
    mapIndex = null;
	socket = io.listen(8080);

	socket.configure(function() {
		socket.set("transports", ["websocket"]);
		socket.set("log level", 2);
	});
	socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
    util.log("New player has connected: ");
    util.log("mapIndex: " + mapIndex);
    client.on("disconnect",onClientDisconnect);
    client.on("new player",onNewPlayer);
    client.on("move player", onMovePlayer);
    client.on("change animation", onChangeAnimation);
    client.on("next map", onNextMap);
    if (mapIndex != null) {
        util.log("map index enviado");
        this.emit("next map", { index: mapIndex });
    }
};

function onClientDisconnect() {
    util.log("Player has disconnected: " + this.id);
    var removePlayer = playerById(this.id);
    if (!removePlayer) {
        return;
    };
    players.splice(players.indexOf(removePlayer), 1);
    this.broadcast.emit("remove player", { id: this.id });
    if (players.length == 0)
        mapIndex = null;
};

function onNewPlayer(data) {
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = this.id;
    this.broadcast.emit("new player", { id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY() });
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
        existingPlayer = players[i];
        this.emit("new player", { id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY() });
    };
    players.push(newPlayer);
};

function onMovePlayer(data) {
    var movePlayer = playerById(this.id);
    if (!movePlayer) {
        return;
    };
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
    this.broadcast.emit("move player", { id: movePlayer.id, x:data.x , y:data.y });
};

function onChangeAnimation(data) {
    var Player = playerById(this.id);
    if (!Player) {
        return;
    }
    this.broadcast.emit("change animation", { id: Player.id, animation:data.animation });
};

function onNextMap(data) {
    var Player = playerById(this.id);
    if (mapIndex == null)
        mapIndex = data.index;
    util.log("New map: " + data.index);
    this.broadcast.emit("next map", { id: Player.id , index: data.index });
};

/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
};

/**************************************************
** RUN THE GAME
**************************************************/
init();