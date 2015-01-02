/*global require*/

var Config = require('./config.js');
var Server = require(Config.PATH_SERVER);

/* The first lines of server code to be executed */

var server = new Server();
server.start(Config.SERVER_PORT);

