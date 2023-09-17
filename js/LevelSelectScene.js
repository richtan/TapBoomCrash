class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelectScene');
  }

  preload() {
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('select', 'assets/select_neon.png');
    this.load.image('song1', 'assets/song1.png');
    this.load.image('song2', 'assets/song2.png');
    this.load.image('song3', 'assets/song3.png');
  }

  create() {
    const MAX_SONG = 3; //how many songs can be selected
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    //Arrow
    const right = this.add.image(width - 60, height / 2, 'arrow').setScale(0.1).setInteractive();
    const left = this.add.image(60, height / 2, 'arrow').setScale(0.1).setAngle(180).setInteractive();

    //Select
    const select = this.add.image(width / 2, height * 3 / 4, 'select').setScale(1).setOrigin(0.5).setInteractive();

    //Song Detail
    const song = this.add.image(width / 2, height / 2 - 50, 'song1').setScale(0.5).setInteractive();
    var song_nm = 1; //current song number

    song.on('pointerdown', () => {
      this.scene.start('PlayLevelScene', {
        level_number: song_nm,
      }); // Go to level select when tapped
    });

    select.on('pointerdown', () => {
      this.scene.start('PlayLevelScene', {
        level_number: song_nm,
      }); // Go to level select when tapped
    });

    this.input.on('pointerdown', () => {
      if (this.input.mousePointer.x < width / 2) {
        song_nm--;
        if (song_nm <= 0) {
          song_nm = MAX_SONG;
        }
        song.setTexture('song' + song_nm);
      } else {
        song_nm++;
        if (song_nm > MAX_SONG) {
          song_nm = 1;
        }
        song.setTexture('song' + song_nm);
      }
    });
  }
}