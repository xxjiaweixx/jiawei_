//congratulationsScene.js

class congratulationsScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'congratulationsScene' });
    }
    preload(){
    // simple Main GameOver
    this.load.image('congratulations', 'assets/congratulations.png');

    }

    create() {
        this.add.image(0, 0, 'congratulations').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto gameoverScene");
            this.scene.start("gameoverScene");
            }, this );

    

    }

    update(){



    }
}