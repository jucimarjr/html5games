/*global Config, Codes, PieceSpriteMap, Utils, console*/

var PlayState = function (game) {
    "use strict";
    this.game = game;
    this.map = null;
    this.dominoSystem = null;
    this.pieces = null;
};
PlayState.prototype = {
    showUserHand: function () {
        "use strict";
        var i, x, y, sprite;
        x = this.game.world.centerX - 3 * Config.PIECES_FRAME_WIDTH;
        y = this.game.height - Config.PIECES_FRAME_HEIGHT / 2;
        for (i = 0; i < this.pieces.count; i = i + 1) {
            sprite = this.map.dictionary.get(Utils.genPieceDictionaryKey(this.pieces.get(i)));
            sprite.x = x;
            sprite.y = y;
            sprite.anchor.setTo(0.5, 0.5);
            x = x + Config.PIECES_FRAME_WIDTH;
            sprite.visible = true;
        }
    },
    init: function (system, pieces) {
        "use strict";
        this.dominoSystem = system;
        this.pieces = pieces;
    },
    preload: function () {
        "use strict";
        this.game.load.spritesheet(Config.PIECES_ASSET_KEY, Config.PIECES_ASSET_PATH, Config.PIECES_FRAME_WIDTH, Config.PIECES_FRAME_HEIGHT);
    },
    create: function () {
        "use strict";
        this.game.stage.backgroundColor = Codes.WHITE_COLOR;
        this.map = new PieceSpriteMap(this.game, Config.PIECES_ASSET_KEY);
        this.showUserHand();
    },
    update: function () {
        "use strict";
    }
};