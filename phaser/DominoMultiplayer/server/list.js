/*global console, module*/

/* The object which holds a content added to a list  */

var ListCell = function (content, next) {
    'use strict';
    this.content = content;
    this.next = next;
};

/* Defines a object to represent a list */

var List = function () {
    'use strict';
    var headCell = new ListCell();
    this.first = headCell;
    this.last = headCell;
    this.count = 0;
};

List.prototype = {
    makeEmpty: function () {
        'use strict';
        this.last = this.first;
        this.count = 0;
    },
    isEmpty: function () {
        'use strict';
        return (this.count === 0);
    },
    add: function (content) {
        'use strict';
        this.count = this.count + 1;
        this.last.next = new ListCell(content);
        this.last = this.last.next;
    },
    get: function (position) {
        'use strict';
        var cell, i;
        if (this.isEmpty() || position >= this.count) {
            console.error("list.js - List.get: LIST IS EMPTY OR POSITION TOO HIGH");
            return null;
        }
        cell = this.first.next;
        for (i = 0; i < position; i = i + 1) {
            cell = cell.next;
        }
        return cell.content;
    },
    indexOf: function (content) {
        'use strict';
        var cell, i = 0;
        if (this.isEmpty()) {
            console.error("list.js - List.get: LIST IS EMPTY");
            return null;
        }
        cell = this.first.next;
        while (cell.content !== content) {
            i = i + 1;
            cell = cell.next;
            if (!cell) {
                return null;
            }
        }
        return i;
    },
    remove: function (position) {
        'use strict';
        var i, cell = this.first;
        if (position >= this.count) {
            return;
        }
        this.count = this.count - 1;
        for (i = 0; i < position; i = i + 1) {
            cell = cell.next;
        }
        if (cell.next === this.last) {
            this.last = cell;
            this.last.next = {};
            return;
        }
        cell.next = cell.next.next;
    },
    query: function (property, value) {
        'use strict';
        var cell;
        if (this.isEmpty()) {
            console.error("list.js - List.query: LIST IS EMPTY");
            return;
        }
        cell = this.first.next;
        while (cell.content[property] !== value) {
            cell = cell.next;
            if (!cell) {
                return null;
            }
        }
        return cell.content;
    },
    contains: function (property, value) {
        'use strict';
        if (this.query(property, value)) {
            return true;
        }
        return false;
    }
};

module.exports = List;