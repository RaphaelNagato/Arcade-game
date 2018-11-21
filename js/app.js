// Enemies our player must avoid
var Enemy = function (xBugStart, yBugstart, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //x and y coordinates
    this.x = xBugStart;
    this.y = yBugstart + 55;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.move = 101;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // condition to check if enemy bug have passed boundary 
    if (this.x < this.move * 5) {
        this.x += this.speed * dt
    } else {
        this.x = -101;
    }
    // else  reset coordinates to starting positions
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Hero class
//Constructor

//Properties
//x coordinate
//y coordinate
//Sprite Image


//Methods
//Update Hero Coordinates
//check for hero collision with enemy
// did hero coordinates and enemy bug coordinates intersect?
//Win condition
// Did Hero reach final position?
//Render
//Draw hero in new position according to User input
//Reset coordinates
class Hero { //The player Class
    constructor() {
        this.sprite = "images/char-boy.png";
        this.yInterval = 101; // the interval for y and x was gotten from the canvas measure in render function (engine.js)
        this.xInterval = 83;
        this.xStart = (this.xInterval * 4) + 55; //Starting position calculated and taken from a subjective viewpoint
        this.yStart = this.yInterval * 2;
        this.x = this.xStart;
        this.y = this.yStart;
    }

    render() { // the hero instance;
        ctx.drawImage(Resources.get(this.sprite), this.y, this.x); //Render function taken from enemy starter code
    }
    update() { //Updates player Position
        for (const bug of allEnemies) {
            if (this.x === bug.y && (bug.x * 1.5 > this.y && bug.x < this.y + 9)) {
                this.gameReset()
            }
        }
        if (this.x === -28) {
            alert("You have won the game");
            this.gameReset();
        }
    }

    gameReset() { //Resets the game in case of a collision or a win
        this.y = this.yStart;
        this.x = this.xStart;
    }
    handleInput(input) { //This handles the input;
        if (input === "up" && this.x > 0) {
            this.x -= this.xInterval;
        } else if (input === "left" && this.y > 0) {
            this.y -= this.yInterval;
        } else if (input === "right" && this.y < this.yInterval * 4) {
            this.y += this.yInterval;
        } else if (input === "down" && this.x < (this.xInterval * 4) + 55) {
            this.x += this.xInterval;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Hero object
const player = new Hero();
// Make allEnemies array
const bugEnemy1 = new Enemy(-101, 0, 200);
const bugEnemy2 = new Enemy(-101, 83, 300);
const bugEnemy3 = new Enemy((-101 * 2.5), 83, 300);
const fastBug = new Enemy(-101, 166, 300);
let allEnemies = [];
allEnemies.push(bugEnemy1, bugEnemy2, bugEnemy3, fastBug);

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