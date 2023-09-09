// Get details of the Player's username and nickname
const usernameInput = document.getElementById('usernameInput');
const nicknameInput = document.getElementById('nicknameInput');
const form = document.getElementById('form'); //Bug fix by GPT, (button -> form)

// Javascript Object to store name abd nick name
let player = {

}

form.addEventListener('submit', function() {

    const username = usernameInput.value;
    const nickname = nicknameInput.value;

    localStorage.setItem('username', username);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('playerInfo', player)

    player = {
        username: username,
        nickname: nickname
    }
    
});

const bgMuisc = new Audio('./assets/cosmos-space-game-action-shooter-astronauts-scifi-aliens-142978.mp3')
bgMuisc.play()
bgMuisc.loop = true
