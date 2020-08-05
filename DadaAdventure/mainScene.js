//gameScene.js

class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }


    preload(){
    // simple Main Page image
    this.load.image('mainPage', 'assets/mainPage.jpg');

    }

    create() {
        this.add.image(0, 0, 'mainPage').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto storyline01Scene");
            this.scene.start("storyline01Scene");
            }, this );

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        

        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level01Scene");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level02Scene");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level03Scene");
            }, this ); 
    }

    update(){



    }
}