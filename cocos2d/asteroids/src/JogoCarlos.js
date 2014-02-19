var GAME_LAYER = 4; 

var keyBoardUp = false;
var keyBoardDown = false;
var keyBoardRight = false;
var keyBoardLeft = false;

var speed = 0;

var gameLayer: null;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2World = Box2D.Dynamics.b2World,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	b2Listener = Box2D.Dynamics.b2ContactListener;

var world;

var ship: null;
var shipFire: null;

	
var JogoLayer = cc.Layer.extend({
	this._super();
	
	init:function(){
		
		this.setKeyboardEnabled(true);
		
		gameLayer = cc.LayerColor.create(new cc.Color4B(0,0,0,255),800,480);
		
		this.ship = cc.Sprite.create("res/images/ship_22-34.png");
		this.shipFire = cc.Sprite.create("res/images/shipFire_22-34.png");
		
		
		
		
	}
	
	
	
})