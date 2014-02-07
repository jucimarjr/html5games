//Variáveis do JOGO
var screen = null;
var timeLabel = null;
var gameTime = null;
    
var RIGHT_WALL = 1;
var LEFT_WALL = 2;
var UP_WALL = 3;
var DOWN_WALL = 4;

var TIPO_VERDE = 1;
var TIPO_VERMELHO = 2;
var TIPO_LARANJA = 3;
var TIPO_LILAS = 4;
var TIPO_CINZA = 5;

//Variáveis do BOX2D

var world = null;
var PTM_RATIO = 32.0;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Listener = Box2D.Dynamics.b2ContactListener;

var OBJECTS_GROUP = -1;
var WALLS_GROUP = -2;

/*************************************************************************************************************************************/
//Inicia o Layer do Jogo
/*************************************************************************************************************************************/

var GameLayer = cc.Layer.extend({

    score: 0,
    scoreLabel: null,
    layerGame: null,
    threads: [],    

    spriteFrameCache: cc.SpriteFrameCache.getInstance(),
    animCache: cc.AnimationCache.getInstance(),

    init:function()
    {
                
        this._super();
        gameTime = 30;
        
        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        //Pega o tamanho da tela
        screen = cc.Director.getInstance().getWinSize();

        //Cria o Layer do jogo
        this.layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 600, 480); 
        
        this.scoreLabel = cc.LabelTTF.create(this.score, "GhoulySolidRegular", 40);
        this.scoreLabel.setPosition(new cc.Point(screen.width - 40, 40));
        this.layerGame.addChild(this.scoreLabel);
        
        timeLabel = cc.LabelTTF.create(gameTime, "GhoulySolidRegular", 60);
        timeLabel.setColor( new cc.Color3B(209, 0, 0) );
        timeLabel.setPosition(new cc.Point(screen.width/2, screen.height - 40));
        this.layerGame.addChild(timeLabel);

        //Configurações do mundo BOX2D
        
        world = new b2World(new b2Vec2(0, 0), true);    //Gravidade 0
        
        var listener = new b2Listener;
        listener.BeginContact = this.ContactHandle;
        world.SetContactListener(listener); 
        
        this.createWalls();
    
        //Pega os SpriteSheets e joga na memória

        this.spriteFrameCache.addSpriteFrames("assets/verde.plist", "assets/verde.png");
        this.spriteFrameCache.addSpriteFrames("assets/vermelho.plist", "assets/vermelho.png");
        this.spriteFrameCache.addSpriteFrames("assets/lilas.plist", "assets/lilas.png");
        this.spriteFrameCache.addSpriteFrames("assets/laranja.plist", "assets/laranja.png");
        this.spriteFrameCache.addSpriteFrames("assets/cinza.plist", "assets/cinza.png");

        //Cria as animações
        
        this.createAnimations("verde_esquerda", 2, "verdeEsquerda");
        this.createAnimations("verde_direita", 2, "verdeDireita");
        this.createAnimations("verde_cima", 2, "verdeCima");
        this.createAnimations("verde_baixo", 2, "verdeBaixo");

        this.createAnimations("vermelho_esquerda", 2, "vermelhoEsquerda");
        this.createAnimations("vermelho_direita", 2, "vermelhoDireita");
        this.createAnimations("vermelho_cima", 2, "vermelhoCima");
        this.createAnimations("vermelho_baixo", 2, "vermelhoBaixo");

        this.createAnimations("lilas_esquerda", 2, "lilasEsquerda");
        this.createAnimations("lilas_direita", 2, "lilasDireita");
        this.createAnimations("lilas_cima", 2, "lilasCima");
        this.createAnimations("lilas_baixo", 2, "lilasBaixo");

        this.createAnimations("laranja_esquerda", 2, "laranjaEsquerda");
        this.createAnimations("laranja_direita", 2, "laranjaDireita");
        this.createAnimations("laranja_cima", 2, "laranjaCima");
        this.createAnimations("laranja_baixo", 2, "laranjaBaixo");

        this.createAnimations("cinza_esquerda", 2, "cinzaEsquerda");
        this.createAnimations("cinza_direita", 2, "cinzaDireita");
        this.createAnimations("cinza_cima", 2, "cinzaCima");
        this.createAnimations("cinza_baixo", 2, "cinzaBaixo");
        
        //Cria os sprites dos personagens

        for (var i = 0 ; i < 10 ; i++) {
            this.createSprite();
        }

        //Adiciona o Layer do jogo
        this.addChild(this.layerGame);
        this.threads.push( setInterval(this.updateSpritePosition, 20) );
        this.threads.push( setInterval(this.updateTimer, 1000, this) );

        return true;
    },

    /*************************************************************************************************************************************/
    //Cria as animações e joga na memória
    /*************************************************************************************************************************************/

    createAnimations: function (spritePrefix, maxIndex, animationName) {

        var animFrames = [];
        var frame;
        var str = "";
        for (var i = 1; i <= maxIndex; i++) {
            str = spritePrefix + i + ".png";
            frame = this.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        this.animCache.addAnimation(animation, animationName);

    },

    /*************************************************************************************************************************************/
    //Cria o Sprite
    /*************************************************************************************************************************************/

    createSprite: function(){
    
        var sprite;
        var animation;
        var tipo = Math.floor(Math.random() * 5 + 1);
                
        if (tipo == TIPO_VERDE) {
            sprite = cc.Sprite.createWithSpriteFrameName("verde_esquerda1.png");
            sprite.tag = TIPO_VERDE;
            animation = this.animCache.getAnimation("verdeEsquerda");
        }

        if (tipo == TIPO_VERMELHO) {
            sprite = cc.Sprite.createWithSpriteFrameName("vermelho_esquerda1.png");
            sprite.tag = TIPO_VERMELHO;
            animation = this.animCache.getAnimation("vermelhoEsquerda");
        }
        
        if (tipo == TIPO_LARANJA) {
            sprite = cc.Sprite.createWithSpriteFrameName("laranja_esquerda1.png");
            sprite.tag = TIPO_LARANJA;
            animation = this.animCache.getAnimation("laranjaEsquerda");
        }

        if (tipo == TIPO_LILAS) {
            sprite = cc.Sprite.createWithSpriteFrameName("lilas_esquerda1.png");
            sprite.tag = TIPO_LILAS;
            animation = this.animCache.getAnimation("lilasEsquerda");
        }

        if (tipo == TIPO_CINZA) {
            sprite = cc.Sprite.createWithSpriteFrameName("cinza_esquerda1.png");
            sprite.tag = TIPO_CINZA;
            animation = this.animCache.getAnimation("cinzaEsquerda");
        }

        sprite.runAction( cc.FadeIn.create(1) );
        animation.setRestoreOriginalFrame(true);
        this.layerGame.addChild(sprite);
        
        var position = new cc.Point( Math.random() * (screen.width-100) + 100 , Math.random() * (screen.height-100) + 100);
        sprite.setPosition( position.x , position.y );
        sprite.runAction(  cc.RepeatForever.create( cc.Animate.create( animation ) ) );

        var b = this.createBody(sprite.getPosition(), sprite);
        b.ApplyImpulse(new b2Vec2( Math.random()*10 , Math.random()*10 ), new cc.Point( position.x / PTM_RATIO, position.y / PTM_RATIO));
    
    },

    /*************************************************************************************************************************************/
    //Atualiza a posição dos sprites de acordo com os corpos BOX 2D
    /*************************************************************************************************************************************/

    updateSpritePosition: function() {
    
        world.Step(1 / 40, 3, 5);
         
        for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                var bodySprite = b.GetUserData();
                bodySprite.setPosition( b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO );
                bodySprite.rotation = -1 * b.GetAngle();
            }
        }

    },

    /*************************************************************************************************************************************/
    //Gerencia os contatos
    /*************************************************************************************************************************************/

    ContactHandle: function ( contact ) {
        
        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();

        var animationColor;
        var animationSide;

        //Verifica o tipo de objeto

        if (bodyA.GetUserData().tag == TIPO_VERDE)
            animationColor = "verde";
        if (bodyA.GetUserData().tag == TIPO_VERMELHO)
            animationColor = "vermelho";
        if (bodyA.GetUserData().tag == TIPO_LILAS)
            animationColor = "lilas";
        if (bodyA.GetUserData().tag == TIPO_LARANJA)
            animationColor = "laranja";
        if (bodyA.GetUserData().tag == TIPO_CINZA)
            animationColor = "cinza";

        //Verifica qual parede o objeto bateu

        if (bodyB.GetUserData() == RIGHT_WALL)
            animationSide = "Esquerda";
        if (bodyB.GetUserData() == LEFT_WALL)
            animationSide = "Direita";
        if (bodyB.GetUserData() == UP_WALL)
            animationSide = "Baixo";
        if (bodyB.GetUserData() == DOWN_WALL)
            animationSide = "Cima";

        var sprite = bodyA.GetUserData();
        var animation = cc.AnimationCache.getInstance().getAnimation( animationColor + animationSide );
        animation.setRestoreOriginalFrame(true);
        sprite.stopAllActions();
        sprite.runAction(  cc.RepeatForever.create( cc.Animate.create( animation ) ) );
        
    },

    /*************************************************************************************************************************************/
    //Cria Paredes
    /*************************************************************************************************************************************/

    createWalls: function (){
    
        var shapeDef = new b2FixtureDef();
        shapeDef.shape = new b2PolygonShape();
        shapeDef.filter.groupIndex = WALLS_GROUP;
        var bodyDef = new b2BodyDef();

        shapeDef.shape.SetAsBox( screen.width / PTM_RATIO, 0 );
        bodyDef.type = b2Body.b2_staticBody;

        bodyDef.position.Set(0, 10 / PTM_RATIO);
        bodyDef.userData = DOWN_WALL;
        world.CreateBody(bodyDef).CreateFixture(shapeDef);

        bodyDef.position.Set(0, 470 / PTM_RATIO);
        bodyDef.userData = UP_WALL;
        world.CreateBody(bodyDef).CreateFixture(shapeDef);

        shapeDef.shape.SetAsBox(0, screen.height / PTM_RATIO);
        bodyDef.position.Set(0, 0);
        bodyDef.userData = LEFT_WALL;
        world.CreateBody(bodyDef).CreateFixture(shapeDef);

        bodyDef.position.Set(screen.width / PTM_RATIO, 0);
        bodyDef.userData = RIGHT_WALL;
        world.CreateBody(bodyDef).CreateFixture(shapeDef);

    },

    /*************************************************************************************************************************************/
    //Cria um corpo
    /*************************************************************************************************************************************/

    createBody: function ( position , sprite ) {

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set( position.x / PTM_RATIO , position.y / PTM_RATIO );
        bodyDef.userData = sprite;
        bodyDef.bullet = true;
        
        shapeDef = new b2FixtureDef();
        shapeDef.shape = new b2PolygonShape();
        shapeDef.filter.groupIndex = OBJECTS_GROUP;
        shapeDef.shape.SetAsBox( 20 / PTM_RATIO , 20 / PTM_RATIO );
        shapeDef.density = 1.5;
        shapeDef.friction = 0.0;
        shapeDef.restitution = 1.0;
        
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(shapeDef);
        
        return body;

    },

    /*************************************************************************************************************************************/
    //Destrói um Corpo
    /*************************************************************************************************************************************/

    destroyBody: function( body ){
    
        var particle = cc.ParticleExplosion.create();
        particle.setTexture(cc.TextureCache.getInstance().addImage("assets/fire.png"));
        particle.setLife(0.3);
        particle.setStartSize(1);
        particle.setPosition(new cc.Point(body.GetPosition().x * PTM_RATIO, body.GetPosition().y * PTM_RATIO));

        var index = Math.floor(Math.random() * 9).toString();
        cc.AudioEngine.getInstance().playEffect("Som/Plop"+index+".wav", false);

        this.layerGame.addChild(particle);
        
        this.layerGame.removeChild(body.GetUserData());
        world.DestroyBody(body);

        if (gameTime != 0) {
            this.createSprite();
            this.score++;
            this.scoreLabel.setString(this.score, 50);
        }

    },

    /*************************************************************************************************************************************/
    //Verifica se algum objeto foi tocado
    /*************************************************************************************************************************************/

    verifyTouch: function( touchPoint ){
        
        for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                var inside = b.m_fixtureList.TestPoint(touchPoint);
                if (inside)
                    this.destroyBody( b );
            }
        }

    },

    /*************************************************************************************************************************************/
    //Atualiza o Timer
    /*************************************************************************************************************************************/

    updateTimer: function ( layer ) {

        gameTime--;
        timeLabel.setString( gameTime , 50 );

        if (gameTime == 0) {
             
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() != null) {
                    layer.destroyBody(b);
                }
            }

            var Label = cc.LabelTTF.create("ACABOU!", "GhoulySolidRegular", 80);
            Label.setPosition(new cc.Point(screen.width/2, screen.height/2));
            layer.layerGame.addChild(Label);
            layer.layerGame.removeChild(timeLabel);
            layer.schedule( layer.onTick1 , 5 );
        
            delete world;
            for (var i = 0 ; i < layer.threads.length ; i++)
                clearInterval( layer.threads[i] );

            cc.AudioEngine.getInstance().playEffect("Som/Explosion.wav", false);
            cc.AudioEngine.getInstance().playMusic("Som/GhostBusters_.mp3", true);

        }

    },

    onTick1:function (dt) {
        var scene = cc.Scene.create();
        scene.addChild(new Menu());
        cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(1.0,scene));
    },

    /*************************************************************************************************************************************/
    //Função do Mouse
    /*************************************************************************************************************************************/

    onMouseUp: function (event) {
        var location = event.getLocation();
        this.verifyTouch( new cc.Point( location.x / PTM_RATIO , location.y / PTM_RATIO ) );
    },

    /*************************************************************************************************************************************/
    //Função do toque
    /*************************************************************************************************************************************/

    onTouchesEnded: function (touches, event) {
        if (touches.length <= 0)
            return;

        var touch = touches[0];
        var touchPoint = new cc.Point( touch.getLocation().x / PTM_RATIO , touch.getLocation().y / PTM_RATIO );

        this.verifyTouch(touchPoint);
        
    }

});

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});