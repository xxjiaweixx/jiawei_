//level01Scene.js

class level01Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level01Scene' });
        this.score = 0
    }

    preload(){
        //map made with Tiled in JSON format
          this.load.tilemapTiledJSON('map1', 'assets/level01.json');

        // tiles in spritesheet
         this.load.spritesheet('tiles', 'assets/tiled-32x32.png', {frameWidth: 32, frameHeight: 32});

        // simple sapling animations
         this.load.atlas('sapling', 'assets/sapling.png', 'assets/sapling.json');
        
        // player animations
          this.load.atlas('player', 'assets/player1.png', 'assets/player1.json');

          this.load.image('life','assets/life.png');

        //mp3
         this.load.audio('collect','assets/PowerUp18.mp3');
         this.load.audio('bgmusic','assets/SummertimeFun.mp3');
         this.load.audio('hit','assets/Clank3.mp3');

    }

   create() {
        var map = this.make.tilemap({key: 'map1'});
        var Tiles = map.addTilesetImage('tiled-32x32', 'tiles');

        this.collectSnd = this.sound.add('collect');

         this.hitSnd = this.sound.add('hit'),{volume: 100};
         this.bgmusicSnd = this.sound.add('bgmusic');

         this.bgmusicSnd.play();
    
         this.bgmusicSnd.loop = true;
    
        
        // groundLayer & platformLayer from Tiled
        this.groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0); 
        this.platformLayer = map.createDynamicLayer('platformLayer', Tiles, 0, 0); 
        this.platformLayer.setCollisionByProperty({block:true}); 

        // Set starting and ending position using name
         this.start = map.findObject("objectLayer", obj => obj.name === "start");
         this.end = map.findObject("objectLayer", obj => obj.name === "end");

        // create the ground layer
        // this.groundLayer.setCollisionByExclusion([-1]);
        this.groundLayer.setCollisionByProperty({block: true});

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite
        this.player = this.physics.add.sprite(80, 20, 'player').setScale(0.2);

        // small fix to our player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width, this.player.height);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
    
    
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

         this.sapling1 = this.physics.add.sprite(70, 200, 'sapling').setScale(0.1).play('sapling');
         this.sapling2 = this.physics.add.sprite(450, 500, 'sapling').setScale(0.1).play('sapling');
         this.sapling3 = this.physics.add.sprite(720, 100, 'sapling').setScale(0.1).play('sapling');
         this.sapling4 = this.physics.add.sprite(950, 580, 'sapling').setScale(0.1).play('sapling');
         this.sapling5 = this.physics.add.sprite(1150, 190, 'sapling').setScale(0.1).play('sapling');

         // Collide platform with sapling
         this.physics.add.collider(this.platformLayer, this.sapling);
         this.physics.add.collider(this.groundLayer, this.sapling);

         //overlap sapling
         this.physics.add.overlap(this.player, this.sapling1, this.collectSapling, null, this );
         this.physics.add.overlap(this.player, this.sapling2, this.collectSapling, null, this );
         this.physics.add.overlap(this.player, this.sapling3, this.collectSapling, null, this );
         this.physics.add.overlap(this.player, this.sapling4, this.collectSapling, null, this );
         this.physics.add.overlap(this.player, this.sapling5, this.collectSapling, null, this );

        

         // this text will show the score
         this.saplingText = this.add.text(650, 50, this.score, {
         fontSize: '30px',
         fill: '#221C48'
         });

         // fix the text to the camera
         this.saplingText.setScrollFactor(0);
         this.saplingText.visible = true;

         this.anims.create({
         key: this.player,
         frames: [{key: this.player, frame: this.player}],
         frameRate: 10,
         });


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
      if ( this.player.x >= 1183 && this.player.y >= 20 && this.score == 5 ) {
      console.log('Reached End, level02Scene');
      //this.cameras.main.shake(500);
      this.time.delayedCall(1000,function() {
       this.scene.start("level02Scene");
      },[], this);
      }
        
    }

      collectSapling(player, sprite){
      console.log("Sapling collected");
      this.score = this.score + 1 ;
      this.collectSnd.play();
      this.saplingText.setText(this.score);
      sprite.disableBody (true, true);
      
      return false;
      }



}

