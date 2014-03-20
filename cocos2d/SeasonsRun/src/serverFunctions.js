function onSocketConnected() {
    console.log("Connected to socket server");
    socket.emit("new player", { x: ( voidNode.getPosition().x * -1 ) + localPlayer.getPosition().x , y: localPlayer.getPosition().y });
};

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
    console.log("New player connected: " + data.id);
    var newPlayer = new Player(data.x, data.y, true);
    newPlayer.id = data.id;
    layerRemote.addChild(newPlayer);
    remotePlayers.push(newPlayer);
};

function onMovePlayer(data) {
    var remotePlayer = playerById(data.id);
    if (!remotePlayer)
        return;
    remotePlayer.setPosition( data.x , data.y );
};

function onChangeAnimation(data) {
    var remotePlayer = playerById(data.id);
    if (!remotePlayer)
        return;
    remotePlayer.getAnimation().play(data.animation);
};

function onRemovePlayer(data) {
    var remotePlayer = playerById(data.id);
    if (!remotePlayer) {
        console.log("Player not found: " + data.id);
        return;
    };
    remotePlayers.splice(remotePlayers.indexOf(remotePlayer), 1);
    layerGame.removeChild(remotePlayer);
};

function onNextMap(data) {
    if (localPlayer.id != data.id)
        nextMap.push(data.index);
};

function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id)
            return remotePlayers[i];
    };
    return false;
};