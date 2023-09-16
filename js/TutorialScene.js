class TutorialScene extends Phaser.Scene {
  constructor() {
    super('TutorialScene');
  }

  preload() {
    this.load.image('drum', 'assets/tutorial/drum.png');
    this.load.audio('tutorial_song', 'assets/tutorial/tutorial_song.mp3');
    this.load.audio('bass_drum_sound', 'assets/tutorial/bass_drum_sound.mp3');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    const drum = this.add.sprite(width / 2, height / 2, 'drum').setOrigin(0.5).setScale(1.0).setInteractive();

    const song = this.sound.add('tutorial_song').setVolume(0.5);
    const bass = this.sound.add('bass_drum_sound').setVolume(4);

    song.play();
    this.input.on('pointerdown', () => {
      bass.play();
      this.add.timeline([
        {
          at: 0,
          run: () => { drum.setScale(1.1); },
        },
        {
          at: 100,
          run: () => { drum.setScale(1.0); },
        },
      ]).play();
    });
  }
}