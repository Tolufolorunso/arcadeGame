const hearts = document.querySelectorAll('.heart--list');
let time = document.getElementById('time');
let heartCount = 4;
let levelCount = document.getElementById('level');

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};
//let counter = 0;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for

    this.x += this.speed * dt;
    if (this.x > 700) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 400);
    }


    if (player.x >= this.x - 40 && player.x <= this.x + 40) {
        if (player.y >= this.y - 40 && player.y <= this.y + 40) {
            setTimeout(reset, 30);
            lostOfHeart();
            heartCount--;
        }
    }
};


// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

function Player(x, y, counter) {
    this.x = x;
    this.y = y;
    this.counter = 0;
    this.level = 1;
    this.sprite = 'images/char-boy.png';
}

// This class requires an update(), render() and
Player.prototype.update = function () {
    levelCount.textContent = this.level;

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function (keyCtr) {
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
            reset();
        }, 200);
        this.counter++;
        console.log(this.counter);
        level();
        this.winner();
    }
};

Player.prototype.winner = function () {
    if (this.counter === 6) {
        alert('congratulations, those enemies are just stepping stones. press OK to play again');
        gameReset();
    }
};

Player.prototype.gameOver = function () {
    alert('Game Over!, those enemies are just stepping stones, you can do it. life is full of up and downs. press OK to play again')
    gameReset();
};

// Now instantiate your objects.

const player = new Player(300, 540);
const enemy1 = new Enemy(-101, 70, 400);
const enemy2 = new Enemy(-100, 140, 280);
const enemy3 = new Enemy(-101, 220, 380);
const enemy4 = new Enemy(-101, 300, 150);
const enemy5 = new Enemy(-101, 380, 350);
const enemy6 = new Enemy(-101, 470, 400);
const enemy7 = new Enemy(-101, 70, 500);
const enemy8 = new Enemy(-100, 140, 600);
const enemy9 = new Enemy(-101, 220, 780);
const enemy10 = new Enemy(-101, 380, 180);
const enemy11 = new Enemy(-101, 380, 550);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);


//player reset
function reset() {
    player.x = 300;
    player.y = 540;
}





//game reset
function gameReset() {
    document.location.reload();

}

function level() {
    if (player.counter === 2) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(enemy6);
    } else if (player.counter === 3) {
        player.level++;
        levelCount.textContent = player.level;

        allEnemies.push(enemy7);
    } else if (player.counter === 4) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(enemy8, enemy9);
    } else if (player.counter === 5) {
        player.level++;
        levelCount.textContent = player.level;
        allEnemies.push(enemy10, enemy11);
    }
}


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
        time.textContent = `${hour}h : ${min}mins : ${sec}s`;
    }, 1000);
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
