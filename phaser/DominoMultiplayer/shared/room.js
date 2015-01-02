/*global module*/

var Config = require('./config.js');
var List = require(Config.PATH_LIST);

/* This object stores information about a room where a domino match takes place */

var Room = function (number) {
    'use strict';
    this.number = number;
    this.userList = new List();
};