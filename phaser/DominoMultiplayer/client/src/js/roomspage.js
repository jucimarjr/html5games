/*global document, window, console, Codes, Config, Utils, Dictionary*/

/* This object is used to control the login iframe */

var RoomsPage = function () {
    "use strict";
    window.frames[Config.ROOMS_IFRAME_ID].onkeypress = Utils.onKeyPressed;
    this.document = window.frames[Config.ROOMS_IFRAME_ID].contentWindow.document;
    this.roomList = null;
    this.dictionary = new Dictionary();
    this.hide();
    return;
};

RoomsPage.prototype = {
    show: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_BLOCK;
        window.frames[Config.ROOMS_IFRAME_ID].style.zIndex = 1;
    },
    hide: function () {
        "use strict";
        this.document.body.style.display = Codes.CSS_DISPLAY_NONE;
        window.frames[Config.ROOMS_IFRAME_ID].style.zIndex = 0;
    },
    populateRooms: function (roomList) {
        "use strict";
        var i, j, li, table, div, ul, room;
        this.roomList = roomList;
        ul = this.document.getElementById(Config.ROOMS_UL_ID);
        while (ul.hasChildNodes()) {
            ul.removeChild(table.lastChild);
        }
        for (i = 0; i < this.roomList.count; i = i + 1) {
            room = this.roomList.get(i);
            li = this.document.createElement(Codes.HTML_LI_TAG);
            table = this.document.createElement(Codes.HTML_DIV_TAG);
            table.className = Config.CSS_CLASS_TABLE;
            for (j = 0; j < room.userList.count; j = j + 1) {
                div = this.document.createElement(Codes.HTML_DIV_TAG);
                div.innerHTML = this.roomList.userList.get(j).login;
                table.appendChild(div);
            }
            li.appendChild(table);
            ul.appendChild(li);
            this.dictionary.add(Config.CSS_CLASS_TABLE + room.number, li);
        }
    },
    updateRoom: function (roomNumber) {
        "use strict";
        var i, table, div, room;
        room = this.roomList.query("number", roomNumber);
        table = this.dictionary.get(Config.CSS_CLASS_TABLE + roomNumber);
        while (table.hasChildNodes()) {
            table.removeChild(table.lastChild);
        }
        for (i = 0; i < room.userList.count; i = i + 1) {
            div = this.document.createElement(Codes.HTML_DIV_TAG);
            div.innerHTML = room.userList.get(i).login;
            table.appendChild(div);
        }
    }
};