class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo_tap', 'assets/tap_neon.png');
    this.load.image('logo_boom', 'assets/boom_neon.png');
    this.load.image('logo_crash', 'assets/crash_neon.png');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    const tap = this.add.image(150, 200, 'logo_tap');
    const boom = this.add.image(400, 200, 'logo_boom');
    const crash = this.add.image(700, 200, 'logo_crash');

    tap.setScale(1.25);
    boom.setScale(1.25);
    crash.setScale(1.25);

    const tap_to_start = this.add.text(width/2, 480, 'Tap To Start', {
      fontFamily: 'Arial',
      fontSize: '150px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('LevelSelectScene'); // Go to level select when tapped
    });
  }
}

class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelectScene');
  }
  
  preload() {
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('song1', 'assets/song1.png');
    this.load.image('song2', 'assets/song2.png');
    this.load.image('song3', 'assets/song3.png');
  }

  create() {
    const MAX_SONG = 3; //how many songs can be selected
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    //Arrow
    const right = this.add.image(width-60, height / 2, 'arrow');
    right.setScale(0.1);
    const left = this.add.image(60, height / 2, 'arrow');
    left.setScale(0.1);
    left.setAngle(180);

    //Select
    const select = this.add.text(width / 2, 540, 'SELECT', 
    {
      fontFamily: 'Arial',
      fontSize: '150px',
      fill: '#ffffff',
    }).setOrigin(0.5);
    select.setScale(0.5);
    
    //Song Detail
    const song = this.add.image(width / 2, height / 2 - 50, 'song1');
    song.setScale(0.5);
    var song_nm = 1; //current song number

    //Click
    this.input.on('pointerdown', () => {
      if (this.input.mousePointer.x < width / 3) {
        song_nm --;
        if (song_nm <= 0) {
          song_nm = MAX_SONG;
        }
        song.setTexture('song' + song_nm);
      } else if (this.input.mousePointer.x > width * 2 / 3) {
        song_nm ++;
        if (song_nm > MAX_SONG) {
          song_nm = 1;
        }
        song.setTexture('song' + song_nm);
      } else {
        //Start
      }
      
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  backgroundColor: '#000000',
  width: 960,
  height: 640,
  scene: [GameScene, LevelSelectScene],
};

const game = new Phaser.Game(config);
