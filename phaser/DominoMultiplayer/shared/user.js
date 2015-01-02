/*global module*/

/* This object represents a connected user */

var User = function (id, login) {
    'use strict';
    this.id = id;
    this.login = login;
};

module.exports = User;