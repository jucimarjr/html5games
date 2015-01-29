/*global module*/

var Piece = function (side1, side2) {
    "use strict";
    this.side1 = side1;
    this.side2 = side2;
};
Piece.prototype = {
    isEqual: function (piece) {
        "use strict";
        return (this.side1 === piece.side1 &&
            this.side2 === piece.side2) ||
            (this.side2 === piece.side1 &&
            this.side1 === piece.side2);
    }
};

try {
    module.exports = Piece;
} catch (ignore) {}