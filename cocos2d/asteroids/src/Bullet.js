var bullet = [];
var bulletUFO = [];

var Bullet = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),

    xVelocity:100,
    yVelocity:100,
	bulletSpeed:100,


	ctor:function () {
        this._super();
		
        this.initWithSpriteFrameName("shoot_2-2.png");
        
        var p = ship.getPosition();
		var direction = ship.getRotation() + 180;
        var cs = ship.getContentSize();
        this.setPosition(p.x,p.y);
		
		this.xVelocity = Math.sin(direction*0.0174)*500;
		this.yVelocity = Math.cos(direction*0.0174)*500;
		
		cc.AudioEngine.getInstance().playEffect("res/audios/AsteroidsShoot.mp3",false);
        
        this.scheduleUpdate();
        layer.addChild(this);
    },
    
    update:function (dt) {
		var p = this.getPosition();
        p.x -= this.xVelocity * dt;
        p.y -= this.yVelocity * dt;
        this.setPosition(p);
    },

  //Calcula o retângulo que envolve o sprite da nave para verificar a colisão
	collideRect:function(position){
		var size = this.getContentSize();
	    return cc.rect(position.x - size.width/2, position.y - size.height/2, size.width, size.height);
	}
});


