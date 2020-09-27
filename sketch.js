var monkey , monkeyRunning;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, foodScore, ground
var END = 0, PLAY = 1, gameState = PLAY;

function preload(){
  
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(450, 400);
  
  monkey = createSprite(80, 325, 10, 10);
  monkey.addAnimation("walking",monkeyRunning );
  monkey.scale = 0.15
  monkey.setCollider("circle",0,0, 240);
  monkey.debug = false;
  
  ground = createSprite(5000, 385, 10000, 35);
  ground.shapeColor = "sienna";
  
  obstacleGroup = new Group();
  bananaGroup = new Group();

  
  ground.velocityX = -4;
  
  score=0;
  foodscore=0;
}

function draw() {

  background("white");
  stroke("red");
  fill("red");
  textSize(20);
    text("Survival time: "+ score, 180,50);
    text("Bananas: "+ foodscore, 205,100);
  if(gameState === PLAY){
    
          spawnObstacles();
       food();
        if(keyDown("space")&& monkey.y>=324) {
        monkey.velocityY = -15;
    } 
    monkey.velocityY = monkey.velocityY + 0.6
     ground.velocityX = -4;
    if(frameCount%70 === 0){
    score= score+1
    }
     if(obstacleGroup.isTouching(monkey)){
        gameState = END;
     }
       if (bananaGroup.isTouching(monkey)){
           foodscore = foodscore+1;
           bananaGroup.destroyEach();
      }
      drawSprites();
  }
  
  if(gameState === END){
     ground.velocityX = 0;
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
     background("black"); 
     stroke("white")
     fill("white")
     text("Game Over!", 165, 200);
     text("Press r to restart", 150, 250);
     reset();
     }  
      if (ground.x<0){
    ground.x = 5000;
      
    }
  monkey.collide(ground);
  if(keyDown("r") && gameState === END){
     gameState = PLAY;
     
     }

}

function reset(){
  
  obstacleGroup.destroyEach(); 
  bananaGroup.destroyEach(); 
  score = 0;
  foodscore = 0;
}
function spawnObstacles(){

 if (frameCount % 70 === 0){
   obstacle = createSprite(400,335,10,40); 
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.lifetime = 150;
   obstacle.velocityX = -6;
   obstacle.velocityX=-(6+(score/20))
   obstacleGroup.add(obstacle);
    }  
  
}

function food(){
 
  if (frameCount % 100 === 0){

    banana = createSprite(400, 335, 10, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.lifetime = 150;
    banana.velocityX = -3;
    banana.y = Math.round(random(120, 200));
    bananaGroup.add(banana);
  }
}
