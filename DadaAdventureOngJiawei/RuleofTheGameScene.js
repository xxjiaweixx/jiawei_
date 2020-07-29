//RuleofTheGameScene.js

class RuleofTheGameScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'RuleofTheGameScene' });
    }

    
    preload(){
    // instructions2
    this.load.image('RuleofTheGame', 'assets/RuleofTheGame.png');

    }

    create() {
        this.add.image(0, 0, 'RuleofTheGame').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto level01Scene");
            this.scene.start("level01Scene");
            }, this );


    }

    update(){



    }
}