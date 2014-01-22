var TestColisao = cc.Layer.extend({
	misseis:[],
	cidade:null,
	init:function(){
		this._super();
		tela = cc.Director.getInstance().getWinSizeInPixels();
		this.setTouchEnabled(true);
		this.cidade = new Cidade(2.5);
        this.addChild(this.cidade);
        
		this.scheduleUpdate();
		
		return this
	},
	update:function(dt){
		for(var i =0;i<this.misseis.length;i++){
			if(this.collide(this.canhao, this.misseis[i]))
			{
				cc.log("acertou");
			}
		}
			
	},
	collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    },
	onTouchesEnded:function (pTouch,pEvent){
    	this.misseis.push(new Missil());
        this.addChild(this.misseis[this.misseis.length-1]);
        this.misseis[this.misseis.length-1].handleTouch(pTouch[0].getLocation());
    }
})

var TestColisaoScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new TestColisao();
        layer.init();
        this.addChild(layer);
    }
});