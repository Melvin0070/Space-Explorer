const playagain = document.getElementById("play-again")
const home = document.getElementById('Home')
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
const bgMuisc = new Audio('./assets/cosmos-space-game-action-shooter-astronauts-scifi-aliens-142978.mp3')
bgMuisc.play()
bgMuisc.loop = true

