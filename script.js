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


