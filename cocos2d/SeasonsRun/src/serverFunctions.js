function onSocketConnected() {
    console.log("Connected to socket server");
    socket.emit("new player", { x: localPlayer.getPosition().x , y: localPlayer.getPosition().y });
};

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
    console.log("New player connected: " + data.id);
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = data.id;
    layerPlayer.addChild(newPlayer);
    remotePlayers.push(newPlayer);
};

function onMovePlayer(data) {
    var remotePlayer = playerById(data.id);
    if (!remotePlayer)
        return;
    remotePlayer.move(data.direction);
};

function onStopPlayer(data) {
    var Player = playerById(data.id);
    if (!Player)
        return;
    Player.stop();
};

function onJumpPlayer(data) {
    var Player = playerById(data.id);
    if (!Player)
        return;
    Player.jump();
};

function onRemovePlayer(data) {
    var removePlayer = playerById(data.id);
    if (!removePlayer) {
        console.log("Player not found: " + data.id);
        return;
    };
    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    world.DestroyBody(removePlayer.body);
    layerGame.removeChild(removePlayer);
};

function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id)
            return remotePlayers[i];
    };
    return false;
};