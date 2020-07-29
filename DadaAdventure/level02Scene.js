//level02Scene.js

class level02Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level02Scene' });
    }
    
    preload(){
        //map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map2', 'assets/level02.json');

        // tiles in spritesheet
        this.load.spritesheet('tiles', 'assets/tiled-32x32.png', {frameWidth: 32, frameHeight: 32});

        // simple sapling animations
        this.load.atlas('sapling', 'assets/sapling.png', 'assets/sapling.json');

        // player animations
        this.load.atlas('player', 'assets/player1.png', 'assets/player1.json');

        this.load.atlas('robot', 'assets/robot.png', 'assets/robot.json');

    }

    create() {
        var map = this.make.tilemap({key: 'map2'});
        var Tiles = map.addTilesetImage('tiled-32x32', 'tiles');

        // groundLayer & platformLayer from Tiled
        this.groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0); 
        this.platformLayer = map.createDynamicLayer('platformLayer', Tiles, 0, 0);  
        this.houseLayer = map.createDynamicLayer('houseLayer', Tiles, 0, 0); 
        this.platformLayer.setCollisionByProperty({block:true}); 
        this.houseLayer.setCollisionByProperty({block:true}); 

        // Set starting and ending position using name
         this.start = map.findObject("objectLayer", obj => obj.name === "start");
         this.end = map.findObject("objectLayer", obj => obj.name === "end");

        // robot position
         this.robot = map.findObject("objectLayer", obj => obj.name === "robot");
         this.robot1 = map.findObject("objectLayer", obj => obj.name === "robot1");
         this.robot2 = map.findObject("objectLayer", obj => obj.name === "robot2");


        // create the ground layer
        // this.groundLayer.setCollisionByExclusion([-1]);
        //this.groundLayer.setCollisionByProperty({block: true});

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite
        this.player = this.physics.add.sprite(1168, 20, 'player').setScale(0.2);
        

       // small fix to our player images, we resize the physics body object slightly
       this.player.body.setSize(this.player.width, this.player.height);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.collider(this.player, this.houseLayer);
   


        // player walk animation
        this.anims.create({
        key:'walk',
        frames:[
        {key: 'player', frame: 'walk-01'},
        {key: 'player', frame: 'walk-02'},
        {key: 'player', frame: 'walk-03'},
        {key: 'player', frame: 'walk-04'},
        {key: 'player', frame: 'walk-05'},
        ],
    
        frameRate:10,
        repeat: -1
        });

        this.anims.create({
        key:'walk',
        frames: [{key:'player', frame:'walk-01'}],
        frameRate:10,
        });

        this.anims.create({
        key:'back',
        frames:[
        {key: 'player', frame: 'back-01'},
        {key: 'player', frame: 'back-02'},
        {key: 'player', frame: 'back-03'},
        {key: 'player', frame: 'back-04'},
        {key: 'player', frame: 'back-05'},
        ],
    
        frameRate:10,
        repeat: -1
        });

        this.anims.create({
         key:'back',
        frames: [{key:'player', frame:'back-01'}],
        frameRate:10,
        });

        this.anims.create({
        key:'front',
        frames:[
        {key: 'player', frame: 'front-01'},
        {key: 'player', frame: 'front-02'},
        {key: 'player', frame: 'front-03'},
        {key: 'player', frame: 'front-04'},
        {key: 'player', frame: 'front-05'},
        ],
    
        frameRate:10,
        repeat: -1
        });
        // idle with only one frame, so repeat is not needed
    

        this.anims.create({
        key:'front',
        frames: [{key:'player', frame:'front-01'}],
        frameRate:10,
        });
        

        this.time.addEvent({ delay: 1000, callback: this.moveDownUp, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveDownUp1, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveDownUp2, callbackScope: this, loop: false });

        ////// robot walk animation
         this.anims.create({
         key:'robot-back',
         frames:[
         {key: 'robot', frame: 'robot-back01'},
         {key: 'robot', frame: 'robot-back02'},
         {key: 'robot', frame: 'robot-back03'},
         {key: 'robot', frame: 'robot-back04'},
         {key: 'robot', frame: 'robot-back05'},
         ],
     
         frameRate:10,
         repeat: -1
         });
         
         
         this.anims.create({
         key:'robot-front',
         frames:[
         {key: 'robot', frame: 'robot-front01'},
         {key: 'robot', frame: 'robot-front02'},
         {key: 'robot', frame: 'robot-front03'},
         {key: 'robot', frame: 'robot-front04'},
         {key: 'robot', frame: 'robot-front05'},
         ],
     
         frameRate:10,
         repeat: -1
         });
     
         this.robot1 = this.physics.add.sprite(350, 60, 'robot').setScale(0.2).play('robot-front');
         this.robot2 = this.physics.add.sprite(70, 570, 'robot').setScale(0.2).play('robot-back');
         this.robot3 = this.physics.add.sprite(800, 355, 'robot').setScale(0.2).play('robot-back');
         

         ////// sapling animation
            this.anims.create({
            key:'sapling',
            frames:[
            {key: 'sapling', frame: 'sapling'},
            {key: 'sapling', frame: 'sapling-02'},
            {key: 'sapling', frame: 'sapling-03'},
            {key: 'sapling', frame: 'sapling-04'},
            {key: 'sapling', frame: 'sapling-05'},
            ],
        
            frameRate:10,
            repeat: -1
            });
            this.sapling = this.physics.add.sprite(940, 70, 'sapling').setScale(0.1).play('sapling');
            this.sapling = this.physics.add.sprite(1060, 570, 'sapling').setScale(0.1).play('sapling');
            this.sapling = this.physics.add.sprite(320, 570, 'sapling').setScale(0.1).play('sapling');
            this.sapling = this.physics.add.sprite(260, 260, 'sapling').setScale(0.1).play('sapling');
            this.sapling = this.physics.add.sprite(830, 500, 'sapling').setScale(0.1).play('sapling');

            //overlap
            this.physics.add.overlap(this.player, this.robot1, this.hitRobot, null, this );


        // Create the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBackgroundColor('#ccccff');


    }

    update(){
        if (this.cursors.left.isDown)
     {
        console.log("left");
        this.player.body.setVelocityX(-200);
        this.player.anims.play('walk', true); // walk left
        this.player.flipX = true; // flip the sprite to the left
     }
     else if (this.cursors.right.isDown)
     {
        console.log("right");
        this.player.body.setVelocityX(200);
        this.player.anims.play('walk', true);
        this.player.flipX = false; // use the original sprite looking to the right
     } 
     else if (this.cursors.up.isDown)
     {
        console.log("up");
        this.player.body.setVelocityY(-200);
        this.player.anims.play('back', true);
     }
     else if (this.cursors.down.isDown)
     {
        console.log("down");
        this.player.body.setVelocityY(200);
        this.player.anims.play('front', true);
     }

     else {
        this.player.body.setVelocity(0);
        this.player.anims.stop();
     } 

      // Check for reaching endPoint object
      if ( this.player.x <= 14 && this.player.y >= 375 ) {
      console.log('Reached End, level03Scene');
      //this.cameras.main.shake(500);
      this.time.delayedCall(1000,function() {
       this.scene.start("level03Scene");
      },[], this);
      }

    }

    moveDownUp() {
        console.log('moveDownUp')
        this.tweens.timeline({
            targets: this.robot,
            ease: 'Linear',
            loop: -1, // loop forever
            duration: 3000,
            tweens: [
            {
                y: 440,
            },
            {
                y: 60,
            },
        ]
        });
     }

     moveDownUp1() {
        console.log('moveDownUp')
        this.tweens.timeline({
            targets: this.robot1,
            ease: 'Linear',
            loop: -1, // loop forever
            duration: 3000,
            tweens: [
            {
                y: 60,
            },
            {
                y: 570,
            },
        ]
        });
     }

   moveDownUp2() {
    console.log('moveDownUp')
    this.tweens.timeline({
        targets: this.robot2,
        ease: 'Linear',
        loop: -1, // loop forever
        duration: 3000,
        tweens: [
        {
            y: 171,
        },
        {
            y: 355,
        },
    ]
    });
 }


        collectSapling(player, sprite){
        console.log("Sapling collected");
        this.score = this.score + 1 ;
        this.saplingText.setText(this.score);
        sprite.disableBody (true, true);
    
       
        return false;
        }

        hitRobot(player, sprite){
            console.log("hitRobot");
           
            sprite.disableBody (true, true);
            this.time.delayedCall(500,function() {
                this.score = 0
                this.scene.start("gameoverScene");
                },[], this);
        
           
            return false;
            }
       

}