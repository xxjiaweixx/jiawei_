//instructions1Scene.js

class instructions1Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instructions1Scene' });
    }

    
    preload(){
    // instructions1
    this.load.image('instructions1', 'assets/instructions1.jpg');

    }

    create() {
        this.add.image(0, 0, 'instructions1').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto instructions2Scene");
            this.scene.start("instructions2Scene");
            }, this );


    }

    update(){



    }
}