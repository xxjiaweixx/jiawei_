            
        var config = {
            type: Phaser.AUTO,
            width: 700,
            height: 450,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0},
                    debug: true
                }
        },
        scene: [mainScene, storyline01Scene, storyline02Scene, storyline03Scene, instructions1Scene, instructions2Scene, RuleofTheGameScene, level01Scene, level02Scene, level03Scene,gameoverScene,congratulationsScene]
        };
        
        var game = new Phaser.Game(config);
    