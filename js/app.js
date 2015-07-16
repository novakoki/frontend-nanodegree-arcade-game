// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;this.y = y;
    this.mx = 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.mx*dt
    if(this.x > 505){
        this.x -= 505;
        if(Math.random() < 0.7)
            this.mx = 200;
        else this.mx = 400;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;this.y = 380;
    this.mx = 0;this.my = 0;
    this.iswin = 0;
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    var tx = this.x + this.mx;
    var ty = this.y + this.my;
    if(tx < 505 && tx > -2 && ty < 480 && ty > -83){
        this.x = tx;
        this.y = ty;
    }
    this.mx = 0;this.my = 0;
}
Player.prototype.handleInput = function(key) {
    console.log(this.x);
    switch(key){
        case 'left': this.mx = -101;this.my = 0;break;
        case 'right': this.mx = 101;this.my = 0;break;
        case 'up': this.my = -83;this.mx = 0;break;
        case 'down': this.my = 83;this.mx = 0;break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0,60),new Enemy(303,60),new Enemy(404,130),new Enemy(202,130),new Enemy(101,220)];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
