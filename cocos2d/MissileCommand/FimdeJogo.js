/**
 * Created by aluno on 21/11/13.
 */
var end = cc.Layer.extend({
	name:null,
    init:function()
    {
        //this.setTouchEnabled(true);
		this.setKeyboardEnabled(true);
        var bg = cc.Sprite.create("assets/go.png");
        bg.setPosition(tela.width/2,tela.height/2);
        this.addChild(bg);
        
        var text = cc.LabelTTF.create("","Arial",40);
        text.setString("You Lose!!\nScore: "+45);
        text.setPosition(cc.p(400,250));
        this.addChild(text);
        
        this.name = cc.TextFieldTTF.create("<Enter your name>.", cc.size(400,50), cc.TEXT_ALIGNMENT_CENTER,"Arial", 25);
        this.name.setPosition(400, 150);
        //this.name.enableStroke(new cc.Color3B(0, 0, 0), 3, false);
        this.name.attachWithIME();
        
        this.addChild(this.name);
        
        return this;
    },
    onKeyDown:function(e){
        if(e == cc.KEY.enter){
        	/*
        	jog.nome = this.name.getString();
        	jog.score = score;
        	localStorage.top10.push(jog);
        	localStorage.top10.sort()
        	*/
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.2,new Splash()));
        }
    }
});

var endscene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new end();
        layer.init();
        this.addChild(layer);
    }
});
