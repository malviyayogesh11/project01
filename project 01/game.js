var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var balloon;
var isPumping = false;

function preload() {
    this.load.image('balloon', 'balloon.png');
}

function create() {
    balloon = this.physics.add.image(400, 300, 'balloon');
    balloon.setCollideWorldBounds(true);

    this.input.on('pointerdown', function() {
        if (!isPumping) {
            isPumping = true;
            this.time.addEvent({
                delay: 1000,
                callback: function() {
                    balloon.setVelocityX(Phaser.Math.Between(-200, 200));
                    balloon.setVelocityY(Phaser.Math.Between(-200, 200));
                },
                callbackScope: this,
                loop: false
            });
        } else {
            balloon.destroy();
        }
    }, this);
}

function update() {
    if (isPumping) {
        balloon.setAccelerationY(-100);
    }
}
