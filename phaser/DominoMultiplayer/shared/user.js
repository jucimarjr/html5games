/*global module*/

/* This object holds information about a connected user */

var User = function (id, login, roomNumber) {
    'use strict';
    this.id = id;
    this.login = login;
    this.roomNumber = roomNumber;
    this.pair = null;
    this.piecesInHand = null;
};

try {
    module.exports = User;
} catch (ignore) {}