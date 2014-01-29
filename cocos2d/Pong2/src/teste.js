var TesteLayer = cc.Layer.extend({
	init:function()
    {
	    this._super();
	    
	    var tela = cc.Director.getInstance().getWinSizeInPixels();
	    var backGround = new cc.Sprite.create("res/teste.png");
	    backGround.setPositionX(tela.width/2);
	    backGround.setPositionY(tela.height/2);
	    this.addChild(backGround);
	    
	    return this;
    }
});

TesteLayer.create = function() {
    var sg = new TesteLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

TesteLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = TesteLayer.create();
    scene.addChild(layer, 1);
    return scene;
};