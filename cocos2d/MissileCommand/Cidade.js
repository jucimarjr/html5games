/**
 * Created by aluno on 18/11/13.
 */
var Cidade = cc.Sprite.extend({
    sprites:[],
    ctor:function(i){
        this._super();
        this.sprites = cc.SpriteFrameCache.getInstance();
        this.sprites.addSpriteFrames("cidade.plist", "cidade.png");

        var frame1 = this.sprites.getSpriteFrame("cidade3.png")
        this.initWithSpriteFrame(frame1);

        if(i < 3)
            this.setPosition(tela.width/40 + tela.width/20 + 120 * i, tela.height/10);
        else
            this.setPosition(tela.width/2 + tela.width/15 + tela.width/20 + 120 * (i - 3), tela.height/10);
    },
    alive:true,
    explosao:null,
    kill:function(){
        var frame = []
        frame.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade2.png"));
        frame.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade1.png"));
        var explode = cc.Animation.create(frame, 0.3);
        var action = cc.Animate.create(explode);
        this.runAction(action);
        //cc.AudioEngine.getInstance().setEffectsVolume(0.1);
        //cc.AudioEngine.getInstance().playEffect("bomb",false);
        if(this.displayFrame() == cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade1.png"));
        {
            this.alive = false;
            //this.explosao = cc.ParticleSmoke.create();
            //this.explosao.setPosition(20,20);
            //this.explosao.setDuration(4);
            //this.explosao.setLife(5);
            //this.explosao.setTotalParticles(15);
            //this.explosao.setEmissionRate(4);
            //this.addChild(this.explosao);
        }
    },
    collideRect:function(p){
        if(this.alive == false)
            return cc.rect(1000000,100000,1,1)
        var a = this.getContentSize();
        return cc.rect(p.x - a.width + 20, p.y - a.height + 10,a.width,a.height);
    }
});