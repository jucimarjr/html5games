/*global module, require, console*/

var Config = require("./config.js");
var List = require(Config.PATH_LIST);
var Piece = require(Config.PATH_PIECE);
var EmitEvents = require(Config.PATH_EMIT_EVENTS);
var Utils = require(Config.PATH_UTILS);
var Semaphore = require(Config.PATH_SEMAPHORE);

var GameManager = function (server) {
    "use strict";
    var i, j;
    this.server = server;
    this.allPieces = new List();
    for (i = 0; i <= Config.DOMINO_PIECES_MAX_VALUE; i = i + 1) {
        for (j = i; j <= Config.DOMINO_PIECES_MAX_VALUE; j = j + 1) {
            this.allPieces.add(new Piece(i, j));
        }
    }
    this.semaphore = new Semaphore(1);
};
GameManager.prototype = {
    initRoomPieces: function (room) {
        "use strict";
        var pieces = new List();
        pieces.copyFrom(this.allPieces);
        room.availablePieces = pieces;
    },
    registerCallbacks: function (socketClient) {
        "use strict";
        socketClient.on(EmitEvents.CLIENT_REQUEST_PIECES, this.sendPieces.bind(this));
    },
    sendPieces: function (json) {
        "use strict";
        var i, index, piece,
            user = this.server.userList.query("login", Utils.parse(json).login),
            room = this.server.roomList.query("number", user.roomNumber);
        user.piecesInHand = new List();
        for (i = 0; i < Config.NUBER_PIECES_BY_PLAYER; i = i + 1) {
            index = Utils.floor(Utils.random() * room.availablePieces.count);
            piece = room.availablePieces.get(index);
            user.piecesInHand.add(piece);
            room.availablePieces.remove(index);
        }
        this.server.socket.to(user.id).emit(EmitEvents.SERVER_SEND_PIECES, Utils.stringify(user.piecesInHand));
    }
};

module.exports = GameManager;