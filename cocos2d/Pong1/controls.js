controlsLayer = cc.Layer.extend({
	init:function()
    {
        this._super();
        
        var image = cc.Sprite.create("assets/controls.png");
        image.setPosition(570, 350);
        this.addChild(image);
        
        var texto = cc.LabelTTF.create("Impeca que a bola atravesse sua\nparede rebatendo-a com a barra.\n" +
        							   "pontua quando a bola atravessar\na parede do adversario.\n" +
        							   "vence o jogo quem ganhar 10 pontos.\nJogador 1:\n\n\nJogador 2:", 'Arial', 15);
        texto.setPosition(130, 400);
        this.addChild(texto);
        
        var back = cc.MenuItemFont.create("BACK", 'back', this);
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
        
        return this;
    },
    back:function(){
    	cc.Director.getInstance().replaceScene(new menu());
    }
});

controls = cc.Scene.extend({
    onEnter:function(){
    	this._super();
    	var layer = new controlsLayer();
    	layer.init();
    	this.addChild(layer);
	}
});