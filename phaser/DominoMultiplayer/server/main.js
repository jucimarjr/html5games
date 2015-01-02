/*global require*/

var Config = require('./config.js');
var Server = require(Config.PATH_SERVER);

var server = new Server();
server.start(3001);

