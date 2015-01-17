/*global Codes, Config*/

/* This object is used to control the login iframe */

var WaitMorePlayersPage = function (window) {
    "use strict";
    this.window = window;
    this.document = this.window.frames[Config.WAIT_PLAYERS_IFRAME_ID].contentWindow.document;
    this.hide();
    this.backButton = this.document.getElementById(Config.BACK_BUTTON_ID);
};
WaitMorePlayersPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        this.window.frames[Config.WAIT_PLAYERS_IFRAME_ID].style.zIndex = Config.Z_INDEX_FRONT;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        this.window.frames[Config.WAIT_PLAYERS_IFRAME_ID].style.zIndex = Config.Z_INDEX_BACK;
    },
    updatePlayers: function (roomList, user) {
        "use strict";
        var room = roomList.query("number", user.roomNumber),
            index = room.userList.indexOf(room.userList.query("login", user.login)),
            ul = this.document.getElementById(Config.WAIT_PLAYERS_UL_ID),
            li,
            div,
            i;
        room.userList.remove(index);
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.lastChild);
        }
        for (i = 0; i < room.userList.count; i = i + 1) {
            li = this.document.createElement(Codes.HTML_LI_TAG);
            div = this.document.createElement(Codes.HTML_DIV_TAG);
            div.innerHTML = room.userList.get(i).login;
            li.appendChild(div);
            ul.appendChild(li);
        }
        for (i = room.userList.count; i < room.capacity - 1; i = i + 1) {
            li = this.document.createElement(Codes.HTML_LI_TAG);
            div = this.document.createElement(Codes.HTML_DIV_TAG);
            div.innerHTML = Config.EMPTY_USER_TEXT;
            li.appendChild(div);
            ul.appendChild(li);
        }
    }
};