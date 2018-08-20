'use strict';

const hearts = document.querySelectorAll('.heart--list');
let hourSpan = document.getElementById('hour');
let minSpan = document.getElementById('min');
let secSpan = document.getElementById('sec');
let heartCount = 4;
let levelCount = document.getElementById('level');


// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        this.x += this.speed * dt;


        //reseting bugs
        if (this.x > 700) {
            this.x = -100;
            this.speed = 100 + Math.floor(Math.random() * 400);
        }

        //detecting collision
        if (player.x >= this.x - 40 && player.x <= this.x + 65) {
            if (player.y >= this.y - 40 && player.y <= this.y + 65) {
                player.reset();
                hitMessage();
                lostOfHeart();
                heartCount--;
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
class Player {
    constructor(x, y, counter) {
        this.x = x;
        this.y = y;
        this.counter = 0;
        this.level = 1;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        levelCount.textContent = this.level;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCtr) {
        if (keyCtr === 'left' && this.x > 0) {
            this.x -= 101;
        } else if (keyCtr === 'right' && this.x < 601) {
            this.x += 101;
        } else if (keyCtr === 'up' && this.y > 0) {
            this.y -= 83;
        } else if (keyCtr === 'down' && this.y < 540) {
            this.y += 83;
        }
        if (this.y < 0) {
            setTimeout(function () {
                player.reset();
            }, 200);
            this.counter++;
            console.log(this.counter);
            level();
            this.winner();
        }
    }

    //winning the game method
    winner() {
        if (this.counter === 6) {
            alert('congratulations, those enemies are just stepping stones. press OK to play again');
            gameReset();
        }
    }

    //gameOver
    gameOver() {
        alert('Game Over!, those enemies are just stepping stones, you can do it. life is full of up and downs. press OK to play again')
        gameReset();
    }

    //player reset
    reset() {
        this.x = 300;
        this.y = 540;
    }
}

// Now instantiate your objects.

const player = new Player(300, 540);

// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(-101, 55, 400),
    new Enemy(-100, 140, 280),
    new Enemy(-101, 220, 380),
    new Enemy(-101, 300, 150),
    new Enemy(-101, 380, 350)
];

//bugs to push into allEnemies array after each level
const otherEnemiesArr = [
    new Enemy(-101, 470, 400),
    new Enemy(-101, 55, 500),
    new Enemy(-100, 140, 600),
    new Enemy(-101, 220, 780),
    new Enemy(-101, 380, 180),
    new Enemy(-101, 380, 550)
];


//game reset
function gameReset() {
    document.location.reload();
}

//level function
function level() {
    if (player.counter === 2) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(otherEnemiesArr[0]);
    } else if (player.counter === 3) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(otherEnemiesArr[1]);
    } else if (player.counter === 4) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(otherEnemiesArr[2], otherEnemiesArr[3]);
    } else if (player.counter === 5) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(otherEnemiesArr[4], otherEnemiesArr[5]);
    }
}

//hiding the heart when hit by bugs
function lostOfHeart() {
    if (heartCount === 4) {
        hearts[3].style.visibility = 'hidden';
    }
    if (heartCount === 3) {
        hearts[2].style.visibility = 'hidden';
    }
    if (heartCount === 2) {
        hearts[1].style.visibility = 'hidden';
    }
    if (heartCount === 1) {
        hearts[0].style.visibility = 'hidden';
        alert('no more life,one more chance. you can still do it. press Okay to continue');
    }
    if (heartCount === 0) {
        player.gameOver();
    }
}


//Current time
curTime();

function curTime() {

    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    setInterval(function () {
        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hour++;
            min = 0;
        }
        if (hour >= 13) {
            hour -= 12;
        }
        sec = sec < 10 ? '0' + sec : sec;
        hourSpan.textContent = `${hour}h`;
        minSpan.textContent = `${min}mins`;
        secSpan.textContent = `${sec}s`;
    }, 1000);
}

//hit message
function hitMessage() {
    const msg = document.querySelector('.hit');
    msg.classList.add('hit--msg');
    setTimeout(function () {
        msg.classList.remove('hit--msg');
    }, 2000);
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
