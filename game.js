const spaceship = document.getElementById('spaceship');
const gameboard = document.getElementById('gameboard');
let spaceshipPosLeft = 300;
let spaceshipPosBottom = 0;
const spaceshipWidth = 50;
const boardHeight = gameboard.clientHeight;
const boardWidth = gameboard.clientWidth;
let shootInterval;
const asteroidImages = [
    './assets/meteorite (1).png',
    './assets/meteorite.png',
    './assets/asteroids.png',

];




window.addEventListener('mousemove', (e) => {
    spaceshipPosLeft = Math.min(e.clientX, document.documentElement.clientWidth - spaceshipWidth);
    spaceshipPosBottom = Math.min(document.documentElement.clientHeight - e.clientY, boardHeight - 10);

    spaceship.style.left = `${spaceshipPosLeft}px`;
    spaceship.style.bottom = `${spaceshipPosBottom}px`;
});

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        fireBullet();
    }
});

function fireBullet() {
    let bullet = document.createElement('div');
    bullet.classList.add('bullet');
    gameboard.appendChild(bullet);

    let initialBulletPos = spaceshipPosLeft;
    bullet.style.left = `${initialBulletPos}px`;

    let initialBulletBottom = spaceshipPosBottom + 50;
    bullet.style.bottom = `${initialBulletBottom}px`;


    let shot = setInterval(() => {
        let bulletBottom = parseInt(bullet.style.bottom);
        if (bulletBottom > 0) {
            bullet.style.bottom = `${bulletBottom + 5}px`;
            let asteroids = document.querySelectorAll('.asteroid');
            for(let i = 0; i < asteroids.length; i++) {
                if(isColliding(bullet, asteroids[i])) {
                    bullet.remove();
                    asteroids[i].remove();
                    clearInterval(shot);
                    clearTimeout(shootInterval); // Clear the timeout when bullet hits an asteroid
                    break;
                }
            }

            let gems = document.querySelectorAll('.gem');
            for(let i = 0; i < gems.length; i++) {
                if(isColliding(bullet, gems[i])) {
                    bullet.remove();
                    gems[i].remove();
                    clearInterval(shot);
                    break;
                }
            }


        } else {
            bullet.remove();
            clearInterval(shot);
        }
    }, 10);
    setInterval(()=>{
        bullet.remove()
    },3000)
}

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        clearInterval(shootInterval);
    }
});


let spaceshipLife = 5;
let score = 0;

function createAsteroid() {
    let asteroid = document.createElement('img');
    let randomAsteroidImage = asteroidImages[Math.floor(Math.random() * asteroidImages.length)]; // Select a random asteroid image
    asteroid.src = randomAsteroidImage;
    asteroid.classList.add('asteroid');
    gameboard.appendChild(asteroid);
    
    asteroid.style.left = `${Math.random() * boardWidth}px`;
    asteroid.style.top = '0px';

    let speed = Math.random() * 5 + 1;

    let fall = setInterval(() => {
        let asteroidTop = parseInt(asteroid.style.top);
        if (asteroidTop < boardHeight) {
            asteroid.style.top = `${asteroidTop + speed}px`;

            if (isColliding(spaceship, asteroid)) {
                spaceshipLife--;
                if (spaceshipLife <= 0) {
                    gameOver();
                }
                asteroid.remove();
                clearInterval(fall);
            }
        } else {
            asteroid.remove();
            clearInterval(fall);
        }
    }, 10);
}


function createGem() {
    let gem = document.createElement('img');
    gem.src = './assets/gem-2.png';
    gem.classList.add('gem');
    gameboard.appendChild(gem);

    gem.style.left = `${Math.random() * boardWidth}px`;
    gem.style.top = '0px';

    let speed = Math.random() * 10 + 1;

    let fall = setInterval(() => {
        let gemTop = parseInt(gem.style.top);
        if (gemTop < boardHeight) {
            gem.style.top = `${gemTop + speed}px`;

            if (isColliding(spaceship, gem)) {
                score++;
                gem.remove();
                clearInterval(fall);
            }
        } else {
            gem.remove();
            clearInterval(fall);
        }
    }, 10);
}


function isColliding(obj1, obj2) {
    let rect1 = obj1.getBoundingClientRect();
    let rect2 = obj2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

setInterval(createAsteroid, Math.random() * 5000 + 1000);
setInterval(createGem, Math.random() * 5000 + 1000);