/*global require*/
var Config = require('./config.js');
var Server = require(Config.PATH_SERVER);

Server.getInstance().start(3001);

