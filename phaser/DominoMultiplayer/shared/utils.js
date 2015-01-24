/*global Codes, parseInt, Math, List, module*/

/* This object contains javascript global functions used in this project */

var Utils = {
    parseInt: function (string) {
        "use strict";
        return (parseInt(string, Codes.DECIMAL_SYSTEM));
    },
    random: function () {
        "use strict";
        return Math.random();
    },
    floor: function (number) {
        "use strict";
        return Math.floor(number);
    },
    stringfy: function (object) {
        "use strict";
        return JSON.stringify(object);
    },
    parse: function (string) {
        "use strict";
        return JSON.parse(string);
    }
};

try {
    module.exports = Utils;
} catch (ignore) {}