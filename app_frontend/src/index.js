document.addEventListener('DOMContentLoaded', () => 
{
  const ASSET_ROOT = `./sprites`

 function mainMenu()
 {
   
 }




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




