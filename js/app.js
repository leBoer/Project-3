//The Enemy class
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';

    //gives a random speed to each instance of the enemy
    this.speed = Math.floor((Math.random()*7)+1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + (20*this.speed)*dt;
    if (this.x > 500){
        this.x = -100;
        this.speed = Math.floor((Math.random()*7)+1);
    };

    // This creates the collision criteria between the player and the bugs
    if (this.x < (player.x + 40) && this.x > (player.x - 40) && this.y < (player.y + 40) && this.y > (player.y - 40)){
        player.x = 202;
        player.y = 375;
        player.level = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player class
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.level = 0;
};

Player.prototype.update = function(dt){
    // Displays the current player level
    ctx.font = '30px Arial';
    ctx.clearRect(202, 0, 100, 50);
    ctx.fillText('Level:' + this.level, 202, 35);
};

Player.prototype.render = function(){
    //Renders the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The movement function for the player
Player.prototype.handleInput = function(e){
    var e = e;
        if(e == 'left' && this.x > 0){
            this.x = this.x - 101;
        }else if (e == 'right' && this.x < 404){
            this.x = this.x + 101;
        }else if (e == 'up' && this.y > -40){
            this.y = this.y - 83;
        }else if (e == 'down' && this.y < 375){
            this.y = this.y + 83;
        }

    //Resets the player to the beginning upon reaching water, and level i increased
    if(this.y < 43) {
        this.x = 202;
        this.y = 375;
        this.level++;
    }
};

// Place the player object in a variable called player
var allEnemies = [];
allEnemies[1] = new Enemy(-100, 50);
allEnemies[2] = new Enemy(-100, 133);
allEnemies[3] = new Enemy(-100, 216);
console.log(allEnemies);

var player = new Player(202,375);
console.log(player);

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
