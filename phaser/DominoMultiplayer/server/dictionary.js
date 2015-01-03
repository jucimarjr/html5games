/*global console, module*/

/* This object can store key-value pairs */

var Dictionary = function () {
    "use strict";
    this.count = 0;
    this.properties = ["add", "remove", "count", "properties", "get", "set"];
};
Dictionary.prototype = {
    add: function (key, value) {
        "use strict";
        if (!this.hasOwnProperty(key)) {
            this[key] = value;
            this.count = this.count + 1;
            return;
        }
        console.warn("dictionary.js - Dictionary.add - AVOIDED DUPLICATED KEY");
    },
    remove: function (key) {
        "use strict";
        if (this.properties.indexOf(key) === -1 && this.hasOwnProperty(key)) {
            delete this[key];
            this.count = this.count - 1;
            return;
        }
        console.warn("dictionary.js - Dictionary.remove - AVOIDED REMOVING NON-EXISTING KEY");
    },
    get: function (key) {
        "use strict";
        if (this.properties.indexOf(key) === -1 && this.hasOwnProperty(key)) {
            return this[key];
        }
        return null;
    },
    set: function (key, value) {
        "use strict";
        if (this.properties.indexOf(key) === -1 && this.hasOwnProperty(key)) {
            this[key] = value;
            return;
        }
        console.warn("dictionary.js - Dictionary.set - AVOIDED SETTING NON-EXISTING KEY");
    }
};

module.exports = Dictionary;