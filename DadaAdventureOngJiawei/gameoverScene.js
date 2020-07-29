//gameoverScene.js

class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }
    preload(){
    // simple Main GameOver
    this.load.image('gameover', 'assets/gameover.png');


    }

    create() {
        this.add.image(0, 0, 'gameover').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto mainScene");
            this.scene.start("mainScene");
            }, this );


    }

    update(){



    }
}