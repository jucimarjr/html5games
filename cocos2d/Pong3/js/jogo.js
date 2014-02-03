var BARRA_VERMELHA = 1;
var BARRA_AZUL = 2;
var BOLA = 3;

var GAME_LAYER = 4;
var keyboardUp1 = false;
var keyboardDown1 = false;
var keyboardUp2 = false;
var keyboardDown2 = false;

var AI = true;

var speed = 20;
var PTM_RATIO = 32.0;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    b2Listener = Box2D.Dynamics.b2ContactListener;

var world;
var bodies = [];

var ponto1 = 0;
var ponto2 = 0;
var score = null;
var scoreTotal = 10;

var spriteFrameIndex = 2;
var sprite2FrameIndex = 2;
var sprite3FrameIndex = 2;
var sprite4FrameIndex = 2;
var sprite = null;
var sprite2 = null;
var sprite3 = null;
var sprite4 = null;
var spriteFrameNamePrefix = "vermelha";
var sprite2FrameNamePrefix = "verde";
var sprite3FrameNamePrefix = "azul";
var cont = 1;
var cont2 = 1;
var cont3 = 1;
var cont4 = 1;

var animaBarraVermelha = false;
var animaBarraVerde = false;
var animaBarraAzul1 = false;
var animeBarraAzul2 = false;
var gameLayer = null;

var JogoLayer = cc.Layer.extend({

    init:function()
    {
        this._super();

        this.setKeyboardEnabled(true);

        gameLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 600, 480);

        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames("barra_vermelha.plist", "Imagens/barra_vermelha.png");

        var cache2 = cc.SpriteFrameCache.getInstance();
        cache2.addSpriteFrames("barra_verde.plist", "Imagens/barra_verde.png");

        var cache3 = cc.SpriteFrameCache.getInstance();
        cache3.addSpriteFrames("barra_azul.plist", "Imagens/barra_azul.png");
                
        sprite = cc.Sprite.createWithSpriteFrameName( spriteFrameNamePrefix + "1.png" );
        sprite2 = cc.Sprite.createWithSpriteFrameName(sprite2FrameNamePrefix + "1.png");
        sprite3 = cc.Sprite.createWithSpriteFrameName(sprite3FrameNamePrefix + "1.png");
        sprite4 = cc.Sprite.createWithSpriteFrameName(sprite3FrameNamePrefix + "1.png");
        var bola = cc.Sprite.create("Imagens/ball.png");
                        
        gameLayer.addChild(sprite, 0, BARRA_VERMELHA);
        gameLayer.addChild(sprite2, 0, BARRA_AZUL);
        gameLayer.addChild(sprite3);
        gameLayer.addChild(sprite4);
        gameLayer.addChild(bola, 0, BOLA);
        
        bola.setPosition(100, 200);
        bola.runAction(cc.RepeatForever.create( cc.RotateBy.create(1, 360)));

        sprite.setPosition(20, 100);
        sprite2.setPosition(580, 200);
        sprite3.setPosition(299, 10);
        sprite4.setPosition(299, 470);

        bodies.push(bola);
        bodies.push(sprite);
        bodies.push(sprite2);
        bodies.push(sprite3);
        bodies.push(sprite4);

        score = cc.LabelTTF.create(ponto1 + "  -  " + ponto2 , "" , 40);
        gameLayer.addChild(score);
        score.setPosition(300,440);

        //------------------------------------------BOX 2D -----------------------------------------------
                
        world = new b2World( new b2Vec2(0,0) , true );
        var listener = new b2Listener;

        listener.BeginContact = this.Contato;
        world.SetContactListener(listener);

        // Cria a bola

        var ballBodyDef = new b2BodyDef();
        ballBodyDef.type = b2Body.b2_dynamicBody;
        ballBodyDef.position.Set(100 / PTM_RATIO, 350 / PTM_RATIO);
        ballBodyDef.userData = 0;
        var body = world.CreateBody(ballBodyDef);

        var circle = new b2CircleShape();
        circle.m_radius = 16 / PTM_RATIO;

        ballShapeDef = new b2FixtureDef();
        ballShapeDef.shape = circle;
        ballShapeDef.density = 3.0;
        ballShapeDef.friction = 0.0;
        ballShapeDef.restitution = 1.1;

        body.CreateFixture(ballShapeDef);

        var spriteBola = bodies[0];

        setTimeout(function () {

            spriteBola.runAction(cc.FadeIn.create(3.0));
            spriteBola.setScale(5, 5);
            var scale1 = spriteBola.runAction(cc.ScaleTo.create(1.0, 1.0));
            var scale2 = spriteBola.runAction(cc.ScaleTo.create(0.5, 1.5));
            var scale3 = spriteBola.runAction(cc.ScaleTo.create(1.0, 1.0));
            var scale4 = spriteBola.runAction(cc.ScaleTo.create(0.5, 1.3));
            var scale5 = spriteBola.runAction(cc.ScaleTo.create(1.0, 1.0));
            spriteBola.runAction(cc.Sequence.create(scale1, scale2, scale3, scale4, scale5));

            body.ApplyImpulse(new b2Vec2(15, -7), new cc.Point(200 / PTM_RATIO, 350 / PTM_RATIO));

        }, 5000);

        // Cria o chão e o teto

        var groundBodyDef = new b2BodyDef();
        groundBodyDef.type = b2Body.b2_staticBody;

        var boxShapeDef = new b2FixtureDef();
        boxShapeDef.shape = new b2PolygonShape();
        boxShapeDef.shape.SetAsBox(600/PTM_RATIO, 0);        
                
        groundBodyDef.position.Set(0, 10 / PTM_RATIO);
        groundBodyDef.userData = 3;
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);          
        
        groundBodyDef.position.Set(0, 470 / PTM_RATIO);
        groundBodyDef.userData = 4;
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);
        
        // Cria as barras
        
        boxShapeDef.shape.SetAsBox( 18 / PTM_RATIO / 2, 114 / PTM_RATIO / 2);
        
        groundBodyDef.type = b2Body.b2_staticBody;
        groundBodyDef.density = 1.0;
        groundBodyDef.restitution = 1.1;
        groundBodyDef.userData = 1;
        
        groundBodyDef.position.Set( 20 / PTM_RATIO , 100 / PTM_RATIO );
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);
        
        groundBodyDef.userData = 2;
        groundBodyDef.position.Set( 580 / PTM_RATIO , 200 / PTM_RATIO );
        world.CreateBody(groundBodyDef).CreateFixture(boxShapeDef);
        
        //------------------------------------------------------------------------------------------------
                
        this.addChild(gameLayer, 0 , GAME_LAYER);
        
        setInterval(this.gameLoop, 20);
        setInterval(this.keyboardInput, 20);
        setInterval(this.animations, 50);

    },
    
    Contato: function( contact ){
    
        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();

        if (bodyB.GetUserData() == 0 && bodyA.GetUserData() == 1) {
            animaBarraVermelha = true;
        }
        if (bodyB.GetUserData() == 0 && bodyA.GetUserData() == 2) {
            animaBarraVerde = true;
        }
        if (bodyB.GetUserData() == 0 && bodyA.GetUserData() == 3) {
            animaBarraAzul1 = true;
        }
        if (bodyB.GetUserData() == 0 && bodyA.GetUserData() == 4) {
            animaBarraAzul2 = true;
        }

        var particle = cc.ParticleExplosion.create();
        particle.setTexture(cc.TextureCache.getInstance().addImage("Imagens/fire.png"));
        particle.setLife(0.3);
        particle.setStartSize(1);
        gameLayer.addChild(particle);
        particle.setPosition( new cc.Point( bodyB.GetPosition().x * PTM_RATIO , bodyB.GetPosition().y * PTM_RATIO ));
        
    },
    
    animations: function () {

        if( animaBarraVermelha ){

            //Barra Vermelha    

            gameLayer.removeChild(sprite);
            var indexAsString = spriteFrameIndex.toString();
            sprite = cc.Sprite.createWithSpriteFrameName(
                spriteFrameNamePrefix + indexAsString + ".png"
            );
            gameLayer.addChild(sprite);
            sprite.setPosition(bodies[1].getPosition());
            bodies[1] = sprite;
            
            if (spriteFrameIndex == 4) {
                cont = -1;
            }
            if (spriteFrameIndex == 1) {
                cont = 1;
                animaBarraVermelha = false;
            }
            spriteFrameIndex += cont;

        }

        if( animaBarraVerde ){

            //Barra Verde
    
            gameLayer.removeChild(sprite2);
            var indexAsString = sprite2FrameIndex.toString();
            sprite2 = cc.Sprite.createWithSpriteFrameName(
                sprite2FrameNamePrefix + indexAsString + ".png"
            );
            gameLayer.addChild(sprite2);
            sprite2.setPosition(bodies[2].getPosition());
            bodies[2] = sprite2;
            
            if (sprite2FrameIndex == 4) {
                cont2 = -1;
            }
            if (sprite2FrameIndex == 1) {
                cont2 = 1;
                animaBarraVerde = false;
            }

            sprite2FrameIndex += cont2;
            
        }
        
        if (animaBarraAzul1) {

            //Barra Azul1

            gameLayer.removeChild(sprite3);
            var indexAsString = sprite3FrameIndex.toString();
            sprite3 = cc.Sprite.createWithSpriteFrameName(
                sprite3FrameNamePrefix + indexAsString + ".png"
            );
            gameLayer.addChild(sprite3);
            sprite3.setPosition(bodies[3].getPosition());
            bodies[3] = sprite3;

            if (sprite3FrameIndex == 4) {
                cont3 = -1;
            }
            if (sprite3FrameIndex == 1) {
                cont3 = 1;
                animaBarraAzul1 = false;
            }

            sprite3FrameIndex += cont3;

        }
        
        if (animaBarraAzul2) {

            //Barra Azul2

            gameLayer.removeChild(sprite4);
            var indexAsString = sprite4FrameIndex.toString();
            sprite4 = cc.Sprite.createWithSpriteFrameName(
                sprite3FrameNamePrefix + indexAsString + ".png"
            );
            gameLayer.addChild(sprite4);
            sprite4.setPosition(bodies[4].getPosition());
            bodies[4] = sprite4;

            if (sprite4FrameIndex == 4) {
                cont4 = -1;
            }
            if (sprite4FrameIndex == 1) {
                cont4 = 1;
                animaBarraAzul2 = false;
            }

            sprite4FrameIndex += cont4;

        }

    },

    keyboardInput: function (){
    
        if (keyboardUp1 == true && bodies[1].getPosition().y <= 400) {
            var point = new cc.Point(bodies[1].getPosition().x, bodies[1].getPosition().y + speed);
            bodies[1].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 1) {
                    b.SetPosition( new cc.Point( point.x / PTM_RATIO , point.y / PTM_RATIO ));
                }
            }
        }

        if (keyboardDown1 == true && bodies[1].getPosition().y >= 80) {
            var point = new cc.Point(bodies[1].getPosition().x, bodies[1].getPosition().y - speed);
            bodies[1].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 1) {
                    b.SetPosition(new cc.Point(point.x / PTM_RATIO, point.y / PTM_RATIO));
                }
            }
        }

        if (keyboardUp2 == true && bodies[2].getPosition().y <= 400) {
            var point = new cc.Point(bodies[2].getPosition().x, bodies[2].getPosition().y + speed);
            bodies[2].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 2) {
                    b.SetPosition(new cc.Point(point.x / PTM_RATIO, point.y / PTM_RATIO));
                }
            }
        }

        if (keyboardDown2 == true && bodies[2].getPosition().y >= 80) {
            var point = new cc.Point(bodies[2].getPosition().x, bodies[2].getPosition().y - speed);
            bodies[2].setPosition(point);
            for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
                if (b.GetUserData() == 2) {
                    b.SetPosition(new cc.Point(point.x / PTM_RATIO, point.y / PTM_RATIO));
                }
            }
        }

    },
    
    gameLoop: function () {

        world.Step(1 / 40, 3, 5);
         
        for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
            if (b.GetUserData() == 0) {

                //Se Jogador 2 fizer Ponto

                if (b.GetPosition().x < 0) {

                    b.SetPosition(new cc.Point(100 / PTM_RATIO, 350 / PTM_RATIO));
                    b.SetLinearVelocity(new b2Vec2(0, 0));
                    b.m_fixtureList.SetRestitution(1.1);

                    ponto2++;
                    score.setString(ponto1 + "  -  " + ponto2, "", 50);

                    if (ponto2 == scoreTotal) {

                        var winner = cc.LabelTTF.create("O Jogador 2 Ganhou!!", "" , 40);
                        gameLayer.addChild(winner);
                        winner.setPosition( 300 , 250 );

                    } else {

                        var sprite = bodies[b.GetUserData()];

                        sprite.runAction(cc.FadeIn.create(3.0));
                        sprite.setScale(5, 5);
                        var scale1 = sprite.runAction(cc.ScaleTo.create(1.0, 1.0));
                        var scale2 = sprite.runAction(cc.ScaleTo.create(0.5, 1.5));
                        var scale3 = sprite.runAction(cc.ScaleTo.create(1.0, 1.0));
                        var scale4 = sprite.runAction(cc.ScaleTo.create(0.5, 1.3));
                        var scale5 = sprite.runAction(cc.ScaleTo.create(1.0, 1.0));
                        sprite.runAction(cc.Sequence.create(scale1, scale2, scale3, scale4, scale5));

                        b.ApplyImpulse(new b2Vec2(15, -7), new cc.Point(200 / PTM_RATIO, 350 / PTM_RATIO));

                    }

                } 
                    
                //Se Jogador 1 fizer Ponto

                if (b.GetPosition().x > 600 / PTM_RATIO) {

                    b.SetPosition(new cc.Point(500 / PTM_RATIO, 350 / PTM_RATIO));
                    b.SetLinearVelocity(new b2Vec2(0, 0));
                    b.m_fixtureList.SetRestitution(1.1);

                    ponto1++;
                    score.setString(ponto1 + "  -  " + ponto2, "", 50);

                    if (ponto1 == scoreTotal) {

                        var winner = cc.LabelTTF.create("O Jogador 1 Ganhou!!", "" , 40);
                        gameLayer.addChild(winner);
                        winner.setPosition(300, 250);

                    } else {

                        var sprite = bodies[b.GetUserData()];

                        sprite.runAction(cc.FadeIn.create(3.0));
                        sprite.setScale(5, 5);
                        var scale1 = sprite.runAction(cc.ScaleTo.create(1.0, 1.0));
                        var scale2 = sprite.runAction(cc.ScaleTo.create(0.5, 1.5));
                        var scale3 = sprite.runAction(cc.ScaleTo.create(1.0, 1.0));
                        var scale4 = sprite.runAction(cc.ScaleTo.create(0.5, 1.3));
                        var scale5 = sprite.runAction(cc.ScaleTo.create(1.0, 1.0));
                        sprite.runAction(cc.Sequence.create(scale1, scale2, scale3, scale4, scale5));

                        b.ApplyImpulse(new b2Vec2(-15, -7), new cc.Point(200 / PTM_RATIO, 350 / PTM_RATIO));

                    }

                }          

                //Atualiza o sprite da bola

                var ballData = b.GetUserData();
                var bola = bodies[ballData];
                bola.setPosition(new cc.Point(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                bola.rotation = -1 * b.GetAngle();

                //Limita a velocidade da bola
                
                if (b.GetLinearVelocity().x < -25 || b.GetLinearVelocity().x > 25) {
                    b.m_fixtureList.SetRestitution(1.0);
                }
                if (b.GetLinearVelocity().y < -25 || b.GetLinearVelocity().y > 25) {
                    b.m_fixtureList.SetRestitution(1.0);
                }
                
                //AI
                
                if (AI) {

                    for (var b2 = world.GetBodyList() ; b2 ; b2 = b2.GetNext()) {
                        if (b2.GetUserData() == 2) {
                            b2.SetPosition(new cc.Point(b2.GetPosition().x, b.GetPosition().y));
                            var b2sprite = bodies[b2.GetUserData()];
                            b2sprite.setPosition(new cc.Point(b2.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                        }
                    }

                }
                
            }
        }
        
    },

    onKeyUp: function (e) {
    
        if (e == cc.KEY.up)
            keyboardUp1 = false;
        if (e == cc.KEY.down)
            keyboardDown1 = false;
        if (e == 87)
            keyboardUp2 = false;
        if (e == 83)
            keyboardDown2 = false;

    },
    
    onKeyDown: function (e) {
        
        if (e == cc.KEY.up)
            keyboardUp1 = true;
        if (e == cc.KEY.down)
            keyboardDown1 = true;
        if (e == 87)
            keyboardUp2 = true;
        if (e == 83)
            keyboardDown2 = true;
        
    },

});

var JogoScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new JogoLayer();
        layer.init();
        this.addChild(layer);
    }
});