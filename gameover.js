const playagain = document.getElementById("play-again")
const home = document.getElementById('Home')
const bgMuisc = new Audio('./assets/cosmos-space-game-action-shooter-astronauts-scifi-aliens-142978.mp3')
const gameover = new Audio('./assets/video-game-fail-retro-long-glitchedtones-1-00-03.mp3')
const HighDisplay = document.getElementById('PlayerHighScore')
const nick = localStorage.getItem('nickname')
let mes = document.getElementById('mess')
let scoress = document.getElementById('scores')
// List of messages
// let LostMessage = [`The space is vast ${nick}, Gear UP! <br> There is a lot left to EXPLORE `, `Let's go ${nick}, The gems are waiting to collected <br> There is a lot left to EXPLORE`, `We could do better ${nick}, Ready UP! <br> There is a lot left to EXPLORE`]
// let WinMessage = [`Well done ${nick}, You are a great sailor of space <br> Let's Explore`, `Lovely run ${nick}, We live rich! <br> Let's EXPLORE`, `Great job ${nick}, That's imppressive <br> Let's Explore`]
let WinMessage = ['I love you Blessy']
let LostMessage = [' I love you Blessy']

playagain.addEventListener('click', ()=>{
    location.href = "game.html"
})
home.addEventListener('click', ()=>{
    location.href='index.html'
})

//shows the current score
scoress.innerHTML = localStorage.getItem('score')

const playerScore = parseInt(localStorage.getItem('score'));
const messageElement = document.getElementById('mess');
if (playerScore < 50) { //Display Lost Message
    const randomLostMessage = LostMessage[Math.floor(Math.random() * LostMessage.length)];
    messageElement.innerHTML = randomLostMessage;
} else {
    const randomWinMessage = WinMessage[Math.floor(Math.random() * WinMessage.length)];//displayes random winning messvge
    messageElement.innerHTML = randomWinMessage;
}

//Play Music
bgMuisc.play()
bgMuisc.loop = true
gameover.play()

//Displaye High score
HighDisplay.innerText = localStorage.getItem('highscore')
