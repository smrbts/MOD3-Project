function init() {
  console.log("init scuccessfully reached")
  stage = new PIXI.Container
  stageHeight = document.querySelector("#game-canvas").height
  stageWidth = document.querySelector("#game-canvas").width
  renderer = PIXI.autoDetectRenderer(stageWidth,stageHeight,{view:document.querySelector("#game-canvas")})

}
