var TesteLayer = cc.Layer.extend({
	init:function()
    {
	    this._super();
	    
	    var tela = cc.Director.getInstance().getWinSizeInPixels();
	    var fundo = new cc.Sprite.create("res/teste.png");
	    fundo.setPosition(tela.width/2,tela.height/2);
	    this.addChild(fundo);
	    
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