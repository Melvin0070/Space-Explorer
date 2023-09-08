// Main game page
// The movement logic for spaceship is through mousemove, rest is by moving the those items in pixels in time intervals (milliseconds)

const spaceship = document.getElementById('spaceship');
const gameboard = document.getElementById('gameboard');
const timer = document.getElementById('timer');
const boardWidth = gameboard.clientWidth; 
const boardHeight = gameboard.clientHeight;
const livesContainer = document.getElementById('lives');
const shottmusic = new Audio('./assets/mixkit-short-laser-gun-shot-1670.wav')
const bgMuisc = new Audio('./assets/cosmos-space-game-action-shooter-astronauts-scifi-aliens-142978.mp3')
let spaceshipPosLeft = 300;
let spaceshipPosBottom = 0;
let shootInterval;
let spaceshipLife = 5;
let score = 0;

bgMuisc.play()
bgMuisc.loop = true

// all asteroid images
const asteroidImages = [
  './assets/Meteor (fire).png',
  './assets/stone-4317076_1920-removebg.png',
  './assets/output-onlinegiftools.gif',
  'assets/meteorite-1--unscreen.gif'

// all gem images
];
const gemImages = [
  './assets/gem-1.png',
  './assets/gem-2.png',
  './assets/gem-3.png',
];

// SpaceShip Movement 
window.addEventListener('mousemove', (e) => {
    spaceshipPosLeft = Math.min(e.clientX, document.documentElement.clientWidth- 10);
    spaceshipPosBottom = Math.min(document.documentElement.clientHeight - e.clientY, boardHeight - 5);

    spaceship.style.left = `${spaceshipPosLeft}px`;
    spaceship.style.bottom = `${spaceshipPosBottom}px`;
});

// References from  W3schools, Medium (JHey Thompkins), Phind
let touchStartX = null;
window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});
window.addEventListener('touchmove', (e) => {
    if (touchStartX !== null) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - touchStartX;
        spaceshipPosLeft = Math.min(spaceshipPosLeft + deltaX, boardWidth - 10);
        spaceship.style.left = `${spaceshipPosLeft}px`;

        touchStartX = touchX; // Update the initial touch position
    }
});

window.addEventListener('touchend', () => {
    touchStartX = null; // Reset the initial touch position when touch ends
});

// Fires bullet on pressing SpaceBar
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        fireBullet();
        shottmusic.currentTime=0
        shottmusic.play()

    }
});

// Bullet is created on spacebar keydown and move upwards 10 from it's prevous position every 10ms
function fireBullet() {
    let bullet = document.createElement('div');
    bullet.classList.add('bullet');
    gameboard.appendChild(bullet);
  
    let initialBulletPos = spaceshipPosLeft;
    bullet.style.left = `${initialBulletPos-5}px`; //aligning the bullet vertically

    let initialBulletBottom = spaceshipPosBottom + 100;
    bullet.style.bottom = `${initialBulletBottom}px`; //aligning bullet horizontally


    let shot = setInterval(() => {
        let bulletBottom = parseInt(bullet.style.bottom);
        if (bulletBottom > 0) {
            bullet.style.bottom = `${bulletBottom +10}px`;
            let asteroids = document.querySelectorAll('.asteroid');

            // Check it the bullet hits the asteroid
            for(let i = 0; i < asteroids.length; i++) {
                if(isColliding(bullet, asteroids[i])) {
                    bullet.remove();
                    asteroids[i].remove();
                    clearInterval(shot);
                    break;
                }
            }
            
            // Check if the bullet hits the gem
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

// Removes the bullet after 3 seconds
setInterval(()=>{
    bullet.remove();
},2500)
}

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        clearInterval(shootInterval);
    }
});



// Creates asteriods
function createAsteroid() {
  let asteroid = document.createElement('img');
  let randomAsteroidImage = asteroidImages[Math.floor(Math.random() * asteroidImages.length)]; 
  asteroid.src = randomAsteroidImage;
  asteroid.classList.add('asteroid');
  gameboard.appendChild(asteroid);

//   asteroid.style.width = '300px'
//   asteroid.style.height ='300px'
  asteroid.style.left = `${Math.random() * boardWidth}px`;
  asteroid.style.top = '0px';

  let speed = Math.random() * 10 + 1;

  let fall = setInterval(() => {
      let asteroidTop = parseInt(asteroid.style.top);
      if (asteroidTop < boardHeight) {
          asteroid.style.top = `${asteroidTop + speed}px`;

          if (isColliding(spaceship, asteroid)) {
            spaceshipLife--
            removeHeart()
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


function gameOver(){
  location.href = "gameover.html"
}

function removeHeart(){
    if (spaceshipLife >= 1) {
        const heart = document.getElementById(`heart-${spaceshipLife}`);
        heart.style.display = 'none';
    }

}

// Creates Gem
function createGem() {
  let gem = document.createElement('img');
  let randomGemImage = gemImages[Math.floor(Math.random() * gemImages.length)]; 
  gem.src = randomGemImage;
  gem.classList.add('gem');
  gameboard.appendChild(gem);

    // gem.style.width = '80px'
    // gem.style.height = '80px'
    gem.style.left = `${Math.random() * boardWidth}px`;
    gem.style.top = '0px';

    let speed = Math.random() *10+1;

    let fall = setInterval(() => {
        let gemTop = parseInt(gem.style.top);
        if(gemTop < boardHeight) {
            gem.style.top = `${gemTop + speed}px`;

            if(isColliding(spaceship, gem)) {
                score += 5;
                timer.innerText = score
                localStorage.setItem('score',score)
                gem.remove();
                clearInterval(fall);
            }
        }
        else {
            gem.remove();
            clearInterval(fall);
        }
    }, 10);
}


// Function to check collision using BounduingClientRect
function isColliding(obj1, obj2) {
    let rect1 = obj1.getBoundingClientRect();
    let rect2 = obj2.getBoundingClientRect();

// return statement credit ChatGPT
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

setInterval(createAsteroid, Math.random() * 500 + 800);
setInterval(createGem, Math.random() * 2000 + 1000);