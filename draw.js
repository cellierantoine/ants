var width = window.innerWidth;
var height = window.innerHeight;


var canvas = document.getElementById("test");
canvas.width = 800 //width;
canvas.height = 800 //height;

canvas.addEventListener("click", click);

var mob1 = new Mob(100,100);
var mob2 = new Mob(200,200);
var mob3 = new Mob(300,300);
var mob4 = new Mob(400,400);


function draw() {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  mob1.act();
  mob2.act();
  mob3.act();
  mob4.act();

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