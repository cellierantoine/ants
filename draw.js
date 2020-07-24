var width = window.innerWidth;
var height = window.innerHeight;


var canvas = document.getElementById("test");
canvas.width = 800 //width;
canvas.height = 800 //height;

canvas.addEventListener("click", click);

var mob1 = new Mob(400,400);


var obstacle1 = new Obstacle(499,499,102,102);


function draw() {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  mob1.act();

  drawObstacle(ctx);
  drawRessources(ctx);
  drawMob(ctx);
  

  window.requestAnimationFrame(draw);
}

function drawRessources(ctx){
  for(let i = 0; i < Ressource.ressourceList.length; i++){
    ressource = Ressource.ressourceList[i];
    ctx.fillStyle = "red";
    ctx.fillRect(ressource.x-3, ressource.y-3, 6, 6);
  }
  ctx.save();
}

function drawObstacle(ctx){
  for(let i = 0; i < Obstacle.obstacleList.length; i++){
    obstacle = Obstacle.obstacleList[i];
    ctx.fillStyle = "brown";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.dx, obstacle.dy);
  }
  ctx.save();
}

function drawMob(ctx){
  for(let i = 0; i < Mob.mobList.length; i++){
    mobtmp = Mob.mobList[i];
    ctx.fillStyle = "green"
    ctx.fillRect(mobtmp.x-5, mobtmp.y-5, 10, 10);
  }
  ctx.save();
}

function click(event){
    new Ressource(event.clientX, event.clientY);
}


draw();