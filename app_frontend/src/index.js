const SPRITE_ROOT = './assets/sprites'
const USER_URL = 'http://localhost:3000/users'
const SCORE_URL = 'http://localhost:3000/scores'
let user = {}

const rockBottom = 40
const scoreBoard = document.querySelector("#score")
const character = document.createElement("img")
const startGame = document.querySelector(".new_game_form")
const characterHeight = "100px"
character.style.height = characterHeight
character.style.position = "absolute"
character.style.left = "100px"
character.style.bottom = `${rockBottom+40}px`
character.src = `${SPRITE_ROOT}/run.gif`
document.body.append(character)

let speed_y = 25
let speed_x = 5

document.addEventListener("keydown",(e)=>{
  if(e.key == "ArrowUp"){
    console.log("jump")
    jump()
  }
  if(e.key =="ArrowDown"){
    debugger
  }
})

let newCloudInterval = setInterval(newCloud,2000)

let cloudInterval = setInterval(function(){
  let allClouds = document.querySelectorAll(".cloud")
  allClouds.forEach((cloud)=>{
    if (parseInt(cloud.style.left) < -300){
      cloud.remove()
    }
    cloud.style.left = `${parseInt(cloud.style.left) - cloud.speed}px`
  })
},20)

startGame.addEventListener("submit",(e) => {
  e.preventDefault()

  e.target.parentElement.style.display = "none"
  let gamerTag = e.target[0].value

  fetchUser(gamerTag)

  debugger

  clearInterval(playerIntervalIntro)
  let playerInterval = setInterval(function(){
    if (speed_y > 5) { //accelerating upward
      character.src = `${SPRITE_ROOT}/jump1.png`
      character.style.height = characterHeight
      speed_y = speed_y - 1
    }
    if (speed_y == 5 ) {
      character.src = `${SPRITE_ROOT}/mid_air.gif`
      character.style.height = characterHeight
      speed_y = speed_y - 1
    }
    if ( (speed_y < 5) && ( parseInt(character.style.bottom) > (rockBottom+20) ) ) { //weightlessness
      speed_y = speed_y - 1
    }
    if ((parseInt(character.style.bottom) <= rockBottom+20) && (parseInt(character.style.bottom) != rockBottom)) { //landing
      character.style.bottom = `${rockBottom}px`
      character.src = `${SPRITE_ROOT}/run.gif`
      character.style.height = characterHeight
      speed_y = 0
    }
    character.style.bottom = `${parseInt(character.style.bottom)+speed_y}px`
  },20)

  document.querySelectorAll(".obstacle").forEach((obstacle)=>{ obstacle.remove() })
  let score = 0

  let scoreInterval = setInterval(function(){
    scoreBoard.innerText = `SCORE: ${Math.round(score)}`
    score = score +=0.02
  },20)

  // Obstacle Animation

  let newObstacleInterval = setInterval(newObstacle,Math.floor(Math.random()*3000)+1000)

  let obstacleInterval = setInterval(function(){
    let allObstacles = document.querySelectorAll(".obstacle")
    allObstacles.forEach((obstacle)=>{
      if (parseInt(obstacle.style.left) < -300){
        obstacle.remove()
      }
      obstacle.style.left = `${parseInt(obstacle.style.left) - obstacle.speed}px`
      if (impact(obstacle)) {
        clearInterval(newObstacleInterval)
        clearInterval(obstacleInterval)
        clearInterval(scoreInterval)
        clearInterval(playerInterval)

        let gameOver = document.createElement('p')
        scoreBoard.innerText = `SCORE: ${Math.round(score)} - You were eaten by a ${obstacle.name} - GAME OVER`
        e.target.parentElement.style.display = "block"
        //persist score to score database
        //redirect to login page
      }
    })
  },20)

})

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

/////////////
//FUNCTIONS//
/////////////

let playerIntervalIntro = setInterval(function(){
  if (speed_y > 5) { //accelerating upward
    character.src = `${SPRITE_ROOT}/jump1.png`
    character.style.height = characterHeight
    speed_y = speed_y - 1
  }
  if (speed_y == 5 ) {
    character.src = `${SPRITE_ROOT}/mid_air.gif`
    character.style.height = characterHeight
    speed_y = speed_y - 1
  }
  if ( (speed_y < 5) && ( parseInt(character.style.bottom) > (rockBottom+20) ) ) { //weightlessness
    speed_y = speed_y - 1
  }
  if ((parseInt(character.style.bottom) <= rockBottom+20) && (parseInt(character.style.bottom) != rockBottom)) { //landing
    character.style.bottom = `${rockBottom}px`
    character.src = `${SPRITE_ROOT}/run.gif`
    character.style.height = characterHeight
    speed_y = 0
  }
  character.style.bottom = `${parseInt(character.style.bottom)+speed_y}px`
},20)

function jump() {
  speed_y = 25
}

function newObstacle() {
  let nextUp = obstacleArr[Math.floor(Math.random() * obstacleArr.length)]
  let obstacle = document.createElement("img")
  obstacle.src = nextUp.root
  let sizeRatio = Math.random() * (nextUp.size_range[1] - nextUp.size_range[0]) + nextUp.size_range[0]
  obstacle.style.height = `${Math.floor(nextUp.size_y * sizeRatio)}px`
  obstacle.style.width = `${Math.floor(nextUp.size_x * sizeRatio)}px`
  obstacle.style.position = "absolute"
  obstacle.style.left = `${window.innerWidth+10}px`
  obstacle.style.bottom = `${Math.random() * (nextUp.height_range[1] - nextUp.height_range[0]) + nextUp.height_range[0]}px`
  obstacle.name = nextUp.name
  obstacle.setAttribute("class","obstacle")
  obstacle.speed = Math.random() * (nextUp.speed_range[1] - nextUp.speed_range[0]) + nextUp.speed_range[0]
  document.body.append(obstacle)
}

// logic to detect an impact with an obstacle

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

function fetchUser(gamerTag){
  fetch(USER_URL)
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      user = data.find((user)=>{return user.gamer_tag == gamerTag})
      if (user == undefined) {
        createNewUser(gamerTag)
      }
    })
}

function createNewUser(gamerTag){
  fetch(USER_URL,{
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      gamer_tag: gamerTag
    })
  })
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      user = data
    })
}

// reference for obstacles

let obstacleArr = [
  {
    name: "Fire Skull",
    size_x: 89,
    size_y: 99,
    root: "./assets/obstacles/fire-skull.gif",
    speed_range: [4,7],
    height_range: [0.2*window.innerHeight,0.8*window.innerHeight],
    size_range: [1.5,2.0] //multiple of origininal
  },
  {
    name: "Deamon",
    size_x: 157,
    size_y: 125,
    root: "./assets/obstacles/deamon.gif",
    speed_range: [3,4],
    height_range: [0.2*window.innerHeight,0.8*window.innerHeight],
    size_range: [1.5,2.5] //multiple of origininal
  },
  {
    name: "Night-mare",
    size_x: 119,
    size_y: 77,
    root: "./assets/obstacles/night-mare.gif",
    speed_range: [5,8],
    height_range: [rockBottom-30,rockBottom],
    size_range: [1,2] //multiple of origininal
  },
  {
    name: "Bee",
    size_x: 37,
    size_y: 39,
    root: "./assets/obstacles/bee.gif",
    speed_range: [3,4],
    height_range: [0.2*window.innerHeight,0.8*window.innerHeight],
    size_range: [3,4] //multiple of origininal
  }
]
