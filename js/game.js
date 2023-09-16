class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo_tap', 'assets/logo/tap_neon.png');
    this.load.image('logo_boom', 'assets/logo/boom_neon.png');
    this.load.image('logo_crash', 'assets/logo/crash_neon.png');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    const tap = this.add.sprite(150, 200, 'logo_tap').setScale(1.25);
    const boom = this.add.sprite(400, 200, 'logo_boom').setScale(1.25);
    const crash = this.add.sprite(700, 200, 'logo_crash').setScale(1.25);

    const tap_to_start = this.add.text(width / 2, 480, 'Tap To Start', {
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

  create() {
    this.input.on('pointerdown', () => {
      this.scene.start('TutorialScene'); // Go to level select when tapped
    });
  }
}

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

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  backgroundColor: '#000000',
  width: 960,
  height: 640,
  scene: [GameScene, LevelSelectScene, TutorialScene],
};

const game = new Phaser.Game(config);
