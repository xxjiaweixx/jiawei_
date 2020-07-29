//storyline02Scene.js

class storyline02Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyline02Scene' });
    }


    preload(){
    // storyline 02 image
    this.load.image('storyline02', 'assets/storyline02.jpg');

    }

    create() {
        this.add.image(0, 0, 'storyline02').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto storyline03Scene");
            this.scene.start("storyline03Scene");
            }, this );
    }

    update(){



    }
}