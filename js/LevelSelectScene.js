class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelectScene');
  }

  preload() {
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('select', 'assets/select_neon.png');
    this.load.image('song1', 'assets/song1.jpg');
    this.load.image('song2', 'assets/song2.jpg');
    this.load.image('song3', 'assets/song3.jpg');
    this.load.audio('song_description', 'assets/voice/Says Different Names for Each Gamemode.m4a');
  }

  create() {
    const MAX_SONG = 3; //how many songs can be selected
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    this.song_description = this.sound.add('song_description').setVolume(4);
    this.song_description.play();


    //Arrow
    const right = this.add.image(width - 10, height / 2, 'arrow').setOrigin(1, 0.5).setScale(width / 7000).setInteractive();
    const left = this.add.image(10, height / 2, 'arrow').setOrigin(1, 0.5).setScale(width / 7000).setAngle(180).setInteractive();

    //Select
    const select = this.add.image(width / 2, height * 4 / 5, 'select').setScale(width * 7 / 8000).setOrigin(0.5).setInteractive();

    //Song Detail
    const song = this.add.image(width / 2, height / 2 - 50, 'song1').setOrigin(0.5).setScale(width * 8 / 8000).setInteractive();
    var song_nm = 1; //current song number

    song.on('pointerdown', () => {
      this.song_description.stop();
      this.scene.start('PlayLevelScene', {
        level_number: song_nm,
      }); // Go to level select when tapped
    });

    select.on('pointerdown', () => {
      this.song_description.stop();
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