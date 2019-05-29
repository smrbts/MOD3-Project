const ASSET_ROOT = './assets'
const rockBottom = 70
const scoreBoard = document.querySelector("#score")
const charachter = document.createElement("img")
character.style.width = '70px'
character.style.position = 'absolute'
character.style.left = '20px'
character.style.bottom = `${rockBottom+40}px`
character.src = `${ASSET_ROOT}/giphy.gif`
document.body.append(character)

let speed_y = 25
let speed_x = 5
let score = 0

setInterval(function(){
  if (parseInt(character.style.bottom) <= rockBottom) {
    character.style.bottom = `${rockBottom}px`
  }
  else {
    speed_y = speed_y - 1
  }
  character.style.bottom = `${parseInt(character.style.bottom)+speed_y}px`
  scoreBoard.innerText = `SCORE: ${Math.round(score)}`
  score = score +=0.02
},20)

function jump() {
  speed_y = 25
}

document.addEventListener("keydown",(e)=>{
  if(e.key == "ArrowUp"){
    console.log("jump")
    jump()
  }
  if(e.key =="ArrowDown"){
    debugger
  }
})


// Obstacle Animation
function newObstacle() {
  const OBSTACLE_ROOT = './assets/obstacles'
  const obstacleRef = ['1','2','3']
  let obstacle = document.createElement("img")
  obstacle.src = `${OBSTACLE_ROOT}/obstacle-${obstacleRef[Math.floor(Math.random() * obstacleRef.length)]}.png`

  obstacle.style.height = `${(Math.floor(Math.random()*200)+50)}px`
  obstacle.style.width = `50px`
  obstacle.style.position = "absolute"
  obstacle.style.left = `${window.innerWidth+10}px`
  obstacle.style.bottom = `${rockBottom-30}px`
  obstacle.setAttribute("class","obstacle")
  obstacle.speed = speed_x
  document.body.append(obstacle)
}

setInterval(newObstacle,Math.floor(Math.random()*3000)+1000)

setInterval(function(){
  let allObstacles = document.querySelectorAll(".obstacle")
  allObstacles.forEach((obstacle)=>{
    if (parseInt(obstacle.style.left) < -300){
      obstacle.remove()
    }
    obstacle.style.left = `${parseInt(obstacle.style.left) - obstacle.speed}px`
    if (impact(obstacle)) {
      console.log("HIT")
    }
  })
},20)


// Cloud Animation
function newCloud() {
  const CLOUD_ROOT = './assets/clouds'
  const cloudRef = ['1','2','3']
  let cloud = document.createElement("img")
  cloud.style.width = `${Math.floor(Math.random()*200)+100}px`
  cloud.style.position = "absolute"
  cloud.style.left = `${window.innerWidth+10}px`
  cloud.style.bottom = `${(Math.floor(Math.random()*5)+5)*window.innerHeight/10}px`
  cloud.src = `${CLOUD_ROOT}/cloud-${cloudRef[Math.floor(Math.random() * cloudRef.length)]}.png`
  cloud.setAttribute("class","cloud")
  cloud.speed = Math.floor(Math.random()*3+1)
  document.body.append(cloud)
}

setInterval(newCloud,2000)

setInterval(function(){
  let allClouds = document.querySelectorAll(".cloud")
  allClouds.forEach((cloud)=>{
    if (parseInt(cloud.style.left) < -300){
      cloud.remove()
    }
    cloud.style.left = `${parseInt(cloud.style.left) - cloud.speed}px`
  })
},20)

function impact(obstacle) {

  let y1 = parseInt(character.style.bottom)
  let y2 = y1 + parseInt(character.style.height)
  let x1 = parseInt(character.style.left)
  let x2 = x1 + parseInt(character.style.width)
  let oy1 = parseInt(obstacle.style.bottom)
  let oy2 = oy1 + parseInt(obstacle.style.height)
  let ox1 = parseInt(obstacle.style.left)
  let ox2 = ox1 + parseInt(obstacle.style.width)
  if ( ( ((x1>ox1)&&(x1<ox2)) || ((x2>ox1)&&(x2<ox2)) ) && ( ((y1<oy2)&&(y1>oy1)) || ((y2<oy2)&&(y2>oy1)) ) ) {
    return true
  }
  else {
    return false
  }
}




});




