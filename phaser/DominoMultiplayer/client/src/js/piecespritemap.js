/*global Dictionary, Utils, Config, Piece*/

var PieceSpriteMap = function (game, assetKey) {
    "use strict";
    var i, sprite;
    this.map = [[6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
        [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [5, 0], [4, 4],
        [4, 3], [4, 2], [4, 1], [4, 0], [3, 3], [3, 2], [3, 1],
        [3, 0], [2, 2], [2, 1], [2, 0], [1, 1], [1, 0], [0, 0]];
    this.dictionary = new Dictionary();
    for (i = 0; i < Config.DOMINO_PIECES_NUMBER; i = i + 1) {
        sprite = game.add.sprite(0, 0, assetKey, i);
        sprite.visible = false;
        this.dictionary.add(Utils.genPieceDictionaryKey(new Piece(this.map[i][0], this.map[i][1])), sprite);
    }
};