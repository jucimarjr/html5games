/*global require, module*/

/* This object stores information about a room where a domino match takes place */

var Room = function (number, list, capacity) {
    'use strict';
    this.number = number;
    this.userList = list;
    this.capacity = capacity;
    this.availablePieces = null;
};
Room.prototype = {
    isFull: function () {
        'use strict';
        return (this.userList.count >= this.capacity);
    }
};

try {
    module.exports = Room;
} catch (ignore) {}