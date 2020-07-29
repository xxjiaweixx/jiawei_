//storyline03Scene.js

class storyline03Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyline03Scene' });
    }


    preload(){
    // storyline 03 image
    this.load.image('storyline03', 'assets/storyline03.jpg');

    }

    create() {
        this.add.image(0, 0, 'storyline03').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto instructions1Scene");
            this.scene.start("instructions1Scene");
            }, this );
    }

    update(){



    }
}