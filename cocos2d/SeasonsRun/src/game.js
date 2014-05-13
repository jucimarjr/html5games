/*************************************************************************************************************************************/
//Inicia o Layer do Jogo
/*************************************************************************************************************************************/

var screen = null;
var socket = null;
var localPlayer = null;
var destroyer = null;

var remotePlayers = [];
var distanceLabel = null;

var layerGame = null;
var layerLabel = null;
var layerSprite = null;
var layerMapBackground = null;
var layerMapBackground2 = null;
var _tilemaps = [];
var _tilemapsBackground = [];
var _tilemapsBackground2 = [];
var tileMapSize = 4400;
var runSoundDelay = 8;
var changeSeason = null;
var actualMap = null;

var world = null;
var PTM_RATIO = 30.0;
var ACTUAL_LAYER = 1;
var loopNumber;
var lapCount;
var nextMap = [];
var objectsToDestroy = [];
var bodiesToDestroy = [];
var spritesToDestroy = [];
var mapsCount = null;

var tileMapsInScene = [];
var MapBackgroundInScene = [];
var MapBackground2InScene = [];
var PLAYER_GROUP = -1;
var MENUMAP_TAG = 10;

var voidNode;
var voidNodeBackground;
var voidNodeBackground2;
var voidNodeMapBackground;
var voidNodeBackgroundLap;
var voidNodeBackground2Lap;

var velocity;
var updateThread = null;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Listener = Box2D.Dynamics.b2ContactListener,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJointDef,
    b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2GearJoint = Box2D.Dynamics.Joints.b2GearJointDef;

var GameLayer = cc.LayerGradient.extend({

    keyLeft: false,
    keyRight: false,
    
    init:function()
    {
        _tilemaps = [];
        _tilemapsBackground = [];
        _tilemapsBackground2 = [];
        this._super();
        this.setVector(cc.p(10,12));
        this.setStartColor(new cc.Color4B(64, 201, 234, 255));
        this.setEndColor(new cc.Color4B(235, 235, 172, 255));
        
        //Pega o tamanho da tela
        screen = cc.Director.getInstance().getWinSize();

        //Cria o Layer do jogo
        layerSprite = cc.Layer.create(0, 480);
        layerGame = cc.Layer.create(0, 480);
        layerLabel = cc.Layer.create(0, 480);
        layerRemote = cc.Layer.create(0, 480);
        layerMapBackground = cc.Layer.create(0, 480);
        layerMapBackground2 = cc.Layer.create(0, 480);

        //Tile Maps
        _tilemaps.push("res/maps/map0.tmx");
        //_tilemaps.push("res/maps/map1.tmx");
        //_tilemaps.push("res/maps/map2.tmx");
	    //_tilemaps.push("res/maps/map3.tmx");
        //_tilemaps.push("res/maps/map4.tmx");
        //_tilemaps.push("res/maps/map5.tmx");
        _tilemaps.push("res/maps/map6.tmx");
        _tilemaps.push("res/maps/map7.tmx");
        _tilemaps.push("res/maps/map8.tmx");
        _tilemaps.push("res/maps/map9.tmx");
        //_tilemaps.push("res/maps/map10.tmx");
        _tilemaps.push("res/maps/mapTransition.tmx");
        
        _tilemapsBackground.push("res/maps/map0background.tmx");
        
        _tilemapsBackground2.push("res/maps/map0background2.tmx");
        
        //Cria o primeiro mapa
        
        var _tileMap = cc.TMXTiledMap.create(_tilemaps[0]);
        _tileMap.retain();
        _tileMap.setPosition(cc.p(0, 0));
        layerGame.addChild(_tileMap,0,MENUMAP_TAG);

        _tileMap = cc.TMXTiledMap.create(_tilemapsBackground[0]);
        _tileMap.retain();
        _tileMap.setPosition(cc.p(0, 0));
        layerMapBackground.addChild(_tileMap, 0, MENUMAP_TAG);

        _tileMap = cc.TMXTiledMap.create(_tilemapsBackground2[0]);
        _tileMap.retain();
        _tileMap.setPosition(cc.p(0, 0));
        layerMapBackground2.addChild(_tileMap, 0, MENUMAP_TAG);

        //Configura o Box2D
        world = new b2World(new b2Vec2(0, -20), true);

        //Cria o personagem local
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/RunnerFinal/RunnerFinal0.png", "res/RunnerFinal/RunnerFinal0.plist", "res/RunnerFinal/RunnerFinal.ExportJson");
        localPlayer = new Player(-40, 350, false);
        layerSprite.addChild(localPlayer);
        
        voidNode = cc.ParallaxNode.create();
        voidNode.addChild(layerRemote, 0, cc.p(1.0, 1.0), cc.p(0, 0));
        voidNode.addChild(layerGame, -1, cc.p(1.0, 1.0), cc.p(0, 0));
        voidNodeMapBackground = cc.ParallaxNode.create();
        voidNodeMapBackground.addChild(layerMapBackground, 0, cc.p(0.5, 0.5), cc.p(0, 0));
        voidNodeMapBackground2 = cc.ParallaxNode.create();
        voidNodeMapBackground2.addChild(layerMapBackground2, 0, cc.p(0.5, 0.5), cc.p(0, 0));
        this.addChild(voidNodeMapBackground2, 1);
        this.addChild(voidNodeMapBackground, 2);
        this.addChild(voidNode, 3);
        this.addChild(layerSprite, 3);
        this.addChild(layerLabel, 4);
        return true;
    },

    initGame: function () {
        voidNodeBackgroundLap = 0;
        voidNodeBackground2Lap = 0;
        loopNumber = 0;
        lapCount = 1;
        mapsCount = 0;
        actualMap = 0;
        velocity = 6;
        nextMap = [];
        objectsToDestroy = [];
        bodiesToDestroy = [];
        MapBackgroundInScene = [];
        MapBackground2InScene = [];
        MapBackgroundToBeLoaded = [];
        MapBackground2ToBeLoaded = [];
	    nextMap.push(0);
	    changeSeason = false;
        this.setKeyboardEnabled(true);
                
        //Inicia a conexão com o servidor
        if (localStorage["gameType"] == "multi") {
            try {
                socket = io.connect("http://192.168.0.10/", { port: 8080, transports: ["websocket"], 'force new connection': true });
                socket.on("connect", onSocketConnected);
                socket.on("disconnect", onSocketDisconnect);
                socket.on("new player", onNewPlayer);
                socket.on("move player", onMovePlayer);
                socket.on("remove player", onRemovePlayer);
                socket.on("change animation", onChangeAnimation);
                socket.on("next map", onNextMap);
            } catch (e) {
                alert("Error: Server not found");
            }
        }

        //Coloca a pontuação na tela                
        distanceLabel = cc.LabelTTF.create("0m", "PipeDream", 40);
        distanceLabel.setPosition(new cc.Point(screen.width - 90, screen.height - 40));
        distanceLabel.setColor(new cc.Color4B(10, 197, 17, 255));
        layerLabel.addChild(distanceLabel);
        
        var listener = new b2Listener;
        listener.BeginContact = this.contactHandle;
        world.SetContactListener(listener); 

        //Setup debug draw
        
        var canvas = document.getElementById('canvas');
        var debugContext = canvas.getContext('2d');
        var debugDraw = new b2DebugDraw();
        debugContext.translate(0, canvas.height);
        debugContext.scale(1, -1);
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(PTM_RATIO);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit);
        world.SetDebugDraw(debugDraw);
        
        setTimeout(function (updateGame) {

            var label = cc.LabelTTF.create("GO!", "PipeDream", 70);
            label.setPosition(new cc.Point(screen.width / 2, screen.height / 2));
            label.setColor(new cc.Color4B(0, 0, 0, 255));

            label.runAction(cc.FadeIn.create(3.0));
            label.runAction(cc.ScaleTo.create(1.5, 1.5));
            label.runAction( cc.Sequence.create( cc.FadeOut.create(1.0) , cc.CallFunc.create( function(label){ layerSprite.removeChild(label) } , label ) ) );

            layerSprite.addChild(label);

            cc.AudioEngine.getInstance().stopMusic();
            cc.AudioEngine.getInstance().playMusic("res/audios/summerSong.mp3", true);
            cc.AudioEngine.getInstance().setMusicVolume(0.5);

            updateThread = setInterval(updateGame, 20);
        }, 2000, this.updateGame);

    },

    contactHandle: function (contact) {

        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();
              
        if (bodyA.tag == "crashBox"){
            if( bodyB.GetUserData() != null )
                if ( bodyB.GetUserData().tag == "Player")
                    endGame();
        }

        if (bodyA.tag == "destroySensor" && bodyB.GetUserData().tag == "Player") {
            var body = getBodyByTag(bodyA.objectTag);
            if (body.GetUserData() != null)
                layerSprite.removeChild(body.GetUserData());
            bodiesToDestroy.push(body);
        }

        if (bodyA.tag == "moveSensor" && bodyB.GetUserData().tag == "Player") {
            var body = getBodyByTag(bodyA.objectTag);
            body.SetLinearVelocity( new b2Vec2( bodyA.objectSpeedX , bodyA.objectSpeedY ));
        }

    },

    onKeyDown: function (e) {
        
        if (e == cc.KEY.up)
            localPlayer.jump();
        if (e == cc.KEY.down)
            localPlayer.roll();

    },

    updateGame: function () {

        world.Step(1 / 40, 3, 5);
        //world.DrawDebugData();

        //Remove os bodies já utilizados
        if (objectsToDestroy.length > 100) {
            world.DestroyBody(objectsToDestroy[0]);
            objectsToDestroy.splice(0, 1);
        }

        //Remove os sprites já utilizados
        if (spritesToDestroy.length > 50) {
            layerSprite.removeChild(spritesToDestroy[0]);
            spritesToDestroy.splice(0, 1);
        }

        //Roda o som
        
        if (localPlayer.onGround && runSoundDelay < 0 && localPlayer.getAnimation().getCurrentMovementID() != "jump") {
            cc.AudioEngine.getInstance().playEffect("res/audios/run.wav",false);
            runSoundDelay = 8;
        }else
            runSoundDelay -= 0.5;
            
        //Manda a posição para os outros jogadores
        if (socket)
            socket.emit("move player", { x: ( voidNode.getPosition().x * -1 ) + localPlayer.getPosition().x , y: localPlayer.getPosition().y });

        //Acelera o personagem
        if (localPlayer.body.GetLinearVelocity().x < 3.5)
            localPlayer.body.SetLinearVelocity(new b2Vec2(localPlayer.body.GetLinearVelocity().x + 0.1, localPlayer.body.GetLinearVelocity().y));
        
        //Verifica se o jogador está no chão
        if (localPlayer.body.GetLinearVelocity().y > 2 && localPlayer.getAnimation().getCurrentMovementID() == "run") {
            localPlayer.getAnimation().play("jump");
            localPlayer.onGround = false;
            if(socket)
                socket.emit("change animation", { animation: "jump" });
        }

        if (localPlayer.body.GetLinearVelocity().y > -1 && localPlayer.body.GetLinearVelocity().y < 1) {
            if (localPlayer.getAnimation().getCurrentMovementID() == "") {
                localPlayer.rolling = false;
                localPlayer.body.SetActive(true);
                if (!localPlayer.onGround)
                    localPlayer.land();
                else {
                    localPlayer.getAnimation().play("run");
                    if (socket)
                        socket.emit("change animation", { animation: "run" });
                }
            }
        } 
        
        //Faz o mapa andar

        var playerVelocity = localPlayer.body.GetLinearVelocity().x;
        if (playerVelocity < 0)
            playerVelocity = 0;

        voidNode.setPosition(cc.p(voidNode.getPosition().x - (velocity + playerVelocity), voidNode.getPosition().y ));
        voidNodeMapBackground.setPosition(cc.p(voidNodeMapBackground.getPosition().x - (velocity + playerVelocity - 0.3), voidNodeMapBackground.getPosition().y));
        voidNodeMapBackground2.setPosition(cc.p(voidNodeMapBackground2.getPosition().x - 1.2, voidNodeMapBackground2.getPosition().y));

        //Atualiza os dados
        localPlayer.distance += (( playerVelocity + velocity ) / 100);
        distanceLabel.setString(localPlayer.distance.toFixed(1)+"m", 40);
                
        //Remove layer anterior
        if (tileMapsInScene.length == 3) {
            layerGame.removeChild(tileMapsInScene[0], true);
            tileMapsInScene[0].release();
            tileMapsInScene.splice(0, 1);
        }
        
        if (MapBackgroundInScene.length == 3) {
            layerMapBackground.removeChild(MapBackgroundInScene[0], true);
            MapBackgroundInScene[0].release();
            MapBackgroundInScene.splice(0, 1);
        }
       
        //Adiciona os backgrounds de tempo em tempo
        if ((voidNodeMapBackground.getPosition().x * -1) > ((8500 * voidNodeBackgroundLap) - 1500 )) {
                        
            var randomNumber;
            randomNumber = Math.floor((Math.random() * (_tilemapsBackground.length - 1)));

            var MapBackground = cc.TMXTiledMap.create(_tilemapsBackground[randomNumber]);
            MapBackground.retain();

            MapBackground.setPosition(cc.p((tileMapSize * voidNodeBackgroundLap), 0));
            MapBackgroundInScene.push(MapBackground);
            layerMapBackground.addChild(MapBackground);

            voidNodeBackgroundLap++;

        }
        
        //Adiciona os mapas de tempo em tempo
        if ((voidNode.getPosition().x * -1) > ((tileMapSize * loopNumber)) - 900) {

            var randomNumber;

            //Se for mudança de estação

            if (changeSeason) {

                voidNodeMapBackground.setPosition(cc.p(0, 0));
                voidNodeMapBackground2.setPosition(cc.p(0, 0));
                voidNodeBackgroundLap = 0;
                changeSeason = false;

                layerMapBackground2.removeChild(MapBackground2InScene[0], true);
                MapBackground2InScene[0].release();
                MapBackground2InScene.splice(0, 1);

                var MapBackground = cc.TMXTiledMap.create(_tilemapsBackground2[voidNodeBackground2Lap]);
                MapBackground.retain();

                MapBackground.setPosition(cc.p(0, 0));
                MapBackground2InScene.push(MapBackground);
                layerMapBackground2.addChild(MapBackground);

            }

            //Se for transicao de mapas
            
            if (mapsCount == 6) {

                randomNumber = _tilemaps.length-1;
                mapsCount = 0;
                changeSeason = true;

            //Senao, seleciona um mapa aleatório

            } else {
                
                if (nextMap.length == 0) {
                    randomNumber = Math.floor((Math.random() * (_tilemaps.length - 1)));
                    while (randomNumber == actualMap) {
                        randomNumber = Math.floor((Math.random() * (_tilemaps.length - 1)));
                    }
                    actualMap = randomNumber;
                    if (socket)
                        socket.emit("next map", { index: randomNumber });
                } else {
                    randomNumber = nextMap[0];
                    nextMap.splice(0, 1);
                }

            }

            //Cria o mapa a partir do arquivo TMX
            
            var _tileMap = cc.TMXTiledMap.create(_tilemaps[randomNumber]);
            _tileMap.retain();
            
            _tileMap.setPosition(cc.p(tileMapSize * loopNumber, 0));
            tileMapsInScene.push(_tileMap);
            layerGame.addChild(_tileMap);

            var objectGroup = _tileMap.getObjectGroup("objects").getObjects();
            for (var i in objectGroup) {
                if (loopNumber == 0)
                    createBodyFromTile(objectGroup[i], cc.p(0, 0));
                else
                    createBodyFromTile(objectGroup[i], cc.p(900, 0));
            }
            loopNumber++;
            mapsCount++;
            
        }
                
        //Atualiza os corpos de acordo com a posição do Node

        if (bodiesToDestroy.length != 0) {
            world.DestroyBody(bodiesToDestroy.pop());
        }
        
        for (var b = world.GetBodyList() ; b ; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                var bodySprite = b.GetUserData();
                if (bodySprite.tag == "Player") {
                    if (!bodySprite.isRemote) {
                        if (b.GetPosition().x < -45 / PTM_RATIO || b.GetPosition().y < -50 / PTM_RATIO)
                            endGame();
                        else {
                            if ((b.GetPosition().x < 150 / PTM_RATIO) && localPlayer.onGround)
                                b.SetLinearVelocity(new b2Vec2(2.4, b.GetLinearVelocity().y));
                            if (b.GetPosition().x > 150 / PTM_RATIO)
                                b.SetPosition(cc.p(150 / PTM_RATIO, b.GetPosition().y));
                            if (b.GetLinearVelocity().x > 3.5   )
                                b.SetLinearVelocity( new b2Vec2( b.GetLinearVelocity().x - 0.1 , b.GetLinearVelocity().y ) );
                        }
                    }
                } else
                    b.SetPosition(cc.p(b.GetPosition().x - (velocity + playerVelocity) / PTM_RATIO, b.GetPosition().y));
                bodySprite.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
                bodySprite.setRotation(b.GetAngle() * 180 * -1 / Math.PI);
            } else if (b.tag != "destroyer")
                b.SetPosition(cc.p(b.GetPosition().x - (velocity + playerVelocity) / PTM_RATIO, b.GetPosition().y));
  
        }
        
    },
    
    
});

function endGame() {
    clearInterval(updateThread);

    cc.AudioEngine.getInstance().stopMusic();

    var label = cc.LabelTTF.create("Over!", "PipeDream", 80);
    label.setPosition(new cc.Point(screen.width / 2, screen.height / 2));
    label.setColor(new cc.Color4B(255, 13, 0, 255));
    layerLabel.addChild(label);

    if (localPlayer.distance > parseFloat( localStorage["bestScore"] ))
        localStorage["bestScore"] = localPlayer.distance.toFixed(1);

    label = cc.LabelTTF.create(localPlayer.distance.toFixed(1)+"m", "Zion", 40);
    label.setPosition(new cc.Point(screen.width / 2, screen.height / 2 - 50));
    label.setColor(new cc.Color4B(0, 0, 0, 255));
    layerLabel.addChild(label);
        
    if (socket)
        socket.disconnect();

    setTimeout(function () {
        for (var i = 0 ; i < objectsToDestroy.length ; i++)
            world.DestroyBody(objectsToDestroy[i]);
        var scene = cc.Scene.create();
        scene.addChild(new Menu());
        cc.Director.getInstance().replaceScene(cc.TransitionFadeBL.create(1.5, scene));
    }, 3000);

};

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        layer.initGame();
        this.addChild(layer);
    }
});