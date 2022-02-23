const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, rope2, rope3
var fruit
var bg_img,food,rabbit
var bunny, blink, eat, sad
var btn 
var bkSound, cutSound, eatSond, sadSound, airSound
var blower
var muteBtn 
var btn2, btn3
var canW, canH

function preload()
{
  bg_img = loadImage("assets/background.png")
  food = loadImage("assets/melon.png")
  rabbit = loadImage("assets/Rabbit-01.png")
  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  eat = loadAnimation("assets/eat_0.png" , "assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
  bkSound = loadSound("assets/sound1.mp3")
  cutSound = loadSound("assets/rope_cut.mp3")
  eatSound = loadSound("assets/eating_sound.mp3")
  sadSound = loadSound("assets/sad.wav")
  airSound = loadSound("assets/air.wav")

  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
  eat.looping=false;
  sad.looping=false;
}

function setup() 
{
  
  var isMobile= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canW=displayWidth
    canH=displayHeight
    createCanvas(displayWidth+80,displayHeight);
  }else{
    canW=displayWidth
    canH=displayHeight
    createCanvas(displayWidth,displayHeight);
  }
  frameRate(80);
  bkSound.play()
  bkSound.setVolume(0.2)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);
  rope= new Rope(7,{x:40,y:30})
  rope2= new Rope(6,{x:370,y:40})
  rope3= new Rope(4,{x:400,y:225})
  var fruitOpitions = {
  density:0.001
  }
  fruit = Bodies.circle(300,300,15)
  Matter.Composite.add(rope.body,fruit)
  Matter.Composite.add(rope2.body,fruit)
  Matter.Composite.add(rope3.body,fruit)
  link1= new Link(rope,fruit)
  link2= new Link(rope2,fruit)
  link3= new Link(rope3,fruit)
  blink.frameDelay=20
  eat.frameDelay=20
  bunny = createSprite(170,canH-80,100,100)
  //bunny.addImage(rabbit)
  bunny.scale=0.2
  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("crying", sad)
  bunny.changeAnimation("blinking")
  //bunny.changeAnimation("eating")
  //bunny.changeAnimation("crying")


 btn=createImg("assets/cut_btn.png")
 btn.position(20,30)
 btn.size(50,50)
 btn.mouseClicked(drop)

 btn2=createImg("assets/cut_btn.png")
 btn2.position(330,35)
 btn2.size(50,50)
 btn2.mouseClicked(drop2)

 btn3=createImg("assets/cut_btn.png")
 btn3.position(360,200)
 btn3.size(50,50)
 btn3.mouseClicked(drop3)

 blower=createImg('assets/balloon.png')
 blower.position(10,250)
 blower.size(150,100)
 blower.mouseClicked(airBlow)

 muteBtn=createImg("assets/mute.png")
 muteBtn.position(450,20)
 muteBtn.size(50,50)
 muteBtn.mouseClicked(mute)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight)
  imageMode(CENTER)
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  if (fruit!== null) {
    image(food,fruit.position.x,fruit.position.y,60,60)
  }
  if (collide(fruit,bunny)===true) {
    bunny.changeAnimation("eating")
    eatSound.play()
  }
  if (fruit!== null&&fruit.position.y>=580) {
    bunny.changeAnimation("crying")
    sadSound.play()
    bkSound.stop()
    fruit=null
  }
  
  
  Engine.update(engine);
  

 
   drawSprites()
}
function drop(){
  rope.break()
  link1.detach()
  link1 = null
  cutSound.play()
  
}

function drop2(){
  rope2.break()
  link2.detach()
  link2 = null
  cutSound.play()
  
}
function drop3(){
  rope3.break()
  link3.detach()
  link3 = null
  cutSound.play()
  
}

function collide(body,sprite) {
  if (body!==null) {
    var d= dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d<= 80) {
      World.remove(world, fruit)
      fruit=null
      return true
    }else{
      return false
    }
  }
}
function airBlow() {
  Matter.Body.applyForce(fruit, {x: 0, y:0},{x:0.01,y:0})
  airSound.play()
}
function mute() {
  if (bkSound.isPlaying()) {
    bkSound.stop()
  } else {
    bkSound.play()
  }
}