//storyline01Scene.js

class storyline01Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyline01Scene' });
    }


    preload(){
    // storyline 01 image
    this.load.image('storyline01', 'assets/storyline01.jpg');

    }

    create() {
        this.add.image(0, 0, 'storyline01').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto storyline02Scene");
            this.scene.start("storyline02Scene");
            }, this );
    }

    update(){



    }
}