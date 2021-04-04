var ball,ballImg, database, position,bg;

function preload(){
    ballImg=loadImage("balloonIMG.png")
    bg=loadImage("cityIMG.jpeg")
}
function setup(){
    database=firebase.database();
    createCanvas(2000,800);
    ball = createSprite(250,250,10,10);
    ball.addImage(ballImg)
   
    var ballpositionref=database.ref('ball/position')
    ballpositionref.on("value",readposition)
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
   
    drawSprites();
}

function writePosition(x,y){
   database.ref('ball/position').set({
       x:position.x+x,
       y:position.y+y
   })
}

function readposition(data){
    position=data.val()
    ball.x=position.x
    ball.y=position.y 
}