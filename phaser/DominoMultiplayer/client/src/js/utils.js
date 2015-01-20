/*global Codes, parseInt*/

/* This object contains javascript global functions used in this project */

var Utils = {
    parseInt: function (string) {
        "use strict";
        return (parseInt(string, Codes.DECIMAL_SYSTEM));
    }
};