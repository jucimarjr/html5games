var creditslayer = cc.Layer.extend({
	init:function(){
		this._super();
		
		var text = cc.LabelTTF.create("Programmer: Matheus Palheta\n\nGame Design: Jucimar Jr", 'Arial', 35);
		text.setPosition(tela.width/2,tela.height/2);
		this.addChild(text)
		
		var btBack = cc.Sprite.create("assets/btBack.png");
		var back = cc.MenuItemSprite.create(btBack, null,null, 'btBack', this);
		back.setPositionY(20);
		
        var menu = cc.Menu.create(back);
        menu.setPosition(400,20);
        this.addChild(menu);
        
        return this;
    },
	btBack:function(){
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.3, new Splash()));
    }	
});

var credits = cc.Scene.extend({
	onEnterTransitionDidFinish:function(){
    	this._super();
    	var layer = new creditslayer();
    	layer.init();
    	this.addChild(layer);
	}
})