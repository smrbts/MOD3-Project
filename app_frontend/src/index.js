document.addEventListener('DOMContentLoaded', () => 
{
  const ASSET_ROOT = `./sprites`
  function init() 
 {
  console.log("init scuccessfully reached")
  stage = new PIXI.Container
  stageHeight = document.querySelector("#game-canvas").height
  stageWidth = document.querySelector("#game-canvas").width
  renderer = PIXI.autoDetectRenderer(stageWidth,stageHeight,{view:document.querySelector("#game-canvas")})
 
 }

const character = document.createElement('img')
character.style.width = '70px'
character.style.position = 'absolute'
character.style.left = '10px'
character.style.bottom = '85px'
character.src = `${ASSET_ROOT}/idle.gif`
document.body.append(character)
obj = 
{
  y : 0,  // position
  dy : 0, // speed
  size : 20, // height
  onGround : false,  // true if on the ground
  drag : 0.99, // the drag is 0.01 
}
const grav = 0.1;
obj.dy += grav;
obj.y += obj.dy;
if(obj.y + obj.size >= 150)
{ // has hit ground
  obj.y = 150 - obj.size;  // place on ground
  obj.dy = 0;              // stop delta y
  obj.onGround = true;
}
else{

  obj.onGround = false;
}


let direction = null
let speed = 5

setInterval(function()
{
  const left = parseInt(character.style.left)
  const bottom = parseInt(character.style.bottom)

  if(direction == 'right')
  {
      character.style.left = `${left+speed}px`
  }

  if(direction == 'up')
  {
    character.style.bottom = `${bottom+speed}px`
  }

}, 20)

function walkRight()
{
  character.src = `${ASSET_ROOT}/run.gif`
  direction = null
}

function stop(){
  character.src = `${ASSET_ROOT}/idle.gif`
  direction = null
}

document.addEventListener("keydown", function(e)
{
  if(e.repeat) return
  if(e.key == "ArrowRight")
  {
      walkRight()
  }


})




});




