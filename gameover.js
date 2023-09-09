const playagain = document.getElementById("play-again")
const home = document.getElementById('Home')
const bgMuisc = new Audio('./assets/cosmos-space-game-action-shooter-astronauts-scifi-aliens-142978.mp3')
const gameover = new Audio('./assets/video-game-fail-retro-long-glitchedtones-1-00-03.mp3')
const HighDisplay = document.getElementById('PlayerHighScore')

playagain.addEventListener('click', ()=>{
    location.href = "game.html"
})
home.addEventListener('click', ()=>{
    location.href='index.html'
})
let scoress = document.getElementById('scores')
let username = document.getElementById('name')
username.innerText = localStorage.getItem('nickname')
scoress.innerHTML = localStorage.getItem('score')


console.log(HighDisplay)
bgMuisc.play()
bgMuisc.loop = true
gameover.play()

let highest = localStorage.getItem('highscore')
if (scoress>highest){
    HighDisplay.innerText = highest
}
