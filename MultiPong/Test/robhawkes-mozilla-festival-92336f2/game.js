var util = require("util"),
    io = require("socket.io");

var socket,
    players;

function init() {
    players = [];
};

socket = io.listen(8000);

init();

