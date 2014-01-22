/**
 * Created by aluno on 21/11/13.
 */
var end = cc.Layer.extend({
    init:function()
    {
        this.setTouchEnabled(true);
        var text = cc.LabelTTF.create("","Arial",40);
        if(numCidades > 0){
            text.setString("You Win!!\nScore: "+ score);
        }else{
            text.setString("You Lose!!\nScore: "+score);
        }
        text.setPosition(cc.p(400,300));
        this.addChild(text);
    },
    onTouchesEnded:function (pTouch,pEvent){
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.2,new Splash));
    }
})

var endscene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new end();
        layer.init();
        this.addChild(layer);
    }
});
