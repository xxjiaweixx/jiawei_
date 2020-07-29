//instructions2Scene.js

class instructions2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instructions2Scene' });
    }

    
    preload(){
    // instructions2
    this.load.image('instructions2', 'assets/instructions2.jpg');

    }

    create() {
        this.add.image(0, 0, 'instructions2').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto RuleofTheGameScene");
            this.scene.start("RuleofTheGameScene");
            }, this );


    }

    update(){



    }
}