const closePopupBtn = document.getElementById('box-close');
play_btn = document.querySelector(".play-button")
play_btn.addEventListener('click', ()=>{
    location.href="details.html"
})
instruct = document.querySelector(".instructions-button")
instruct.addEventListener('click',()=>{
    document.getElementById('instruct').style.display= 'block'
})
closePopupBtn.addEventListener('click',()=>{
    document.getElementById('instruct').style.display= 'none'
})
const bgMuisc = new Audio('./assets/cosmos-space-game-action-shooter-astronauts-scifi-aliens-142978.mp3')
bgMuisc.play()
bgMuisc.loop = true

