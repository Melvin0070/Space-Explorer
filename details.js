// Get details of the Player's username and nickname
const usernameInput = document.getElementById('usernameInput');
const nicknameInput = document.getElementById('nicknameInput');
const form = document.getElementById('form'); //Bug fix by GPT, (button -> form)

form.addEventListener('submit', function() {

    const username = usernameInput.value;
    const nickname = nicknameInput.value;

    localStorage.setItem('username', username);
    localStorage.setItem('nickname', nickname);
});