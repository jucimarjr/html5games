/*global Codes, Config, Utils, Dictionary*/

/* This object is used to control the rooms iframe */

var RoomsPage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.ROOMS_IFRAME_ID].contentWindow.document;
    this.logoutButton = this.document.getElementById(Config.LOGOUT_BUTTON_ID);
    this.dictionary = new Dictionary();
    this.onRoomClick = null;
    this.hide();
};
RoomsPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.ROOMS_IFRAME_ID].style.zIndex = Config.Z_INDEX_FRONT;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.ROOMS_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    },
    populateRooms: function (roomList) {
        "use strict";
        var i, j, li, roomDiv, div, ul, room, onclick;
        ul = this.document.getElementById(Config.ROOMS_UL_ID);
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.lastChild);
        }
        onclick = function (number) { return function () { this.roomClicked(number); }.bind(this); }.bind(this);
        for (i = 0; i < roomList.count; i = i + 1) {
            room = roomList.get(i);
            li = this.document.createElement(Codes.HTML_LI_TAG);
            roomDiv = this.document.createElement(Codes.HTML_DIV_TAG);
            roomDiv.className = Config.CSS_CLASS_ROOM;
            roomDiv.onclick = onclick(room.number);
            for (j = 0; j < room.userList.count; j = j + 1) {
                div = this.document.createElement(Codes.HTML_DIV_TAG);
                div.innerHTML = roomList.get(i).userList.get(j).login;
                roomDiv.appendChild(div);
            }
            for (j = room.userList.count; j < room.capacity; j = j + 1) {
                div = this.document.createElement(Codes.HTML_DIV_TAG);
                div.innerHTML = Config.EMPTY_USER_TEXT;
                roomDiv.appendChild(div);
            }
            li.appendChild(roomDiv);
            ul.appendChild(li);
            this.dictionary.remove(Config.CSS_CLASS_ROOM + room.number);
            this.dictionary.add(Config.CSS_CLASS_ROOM + room.number, roomDiv);
        }
    },
    roomClicked: function (roomNumber) {
        "use strict";
        if (this.onRoomClick !== null) {
            this.onRoomClick(roomNumber);
        }
    }
};