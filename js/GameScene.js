class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo_tap', 'assets/logo/tap_neon.png');
    this.load.image('logo_boom', 'assets/logo/boom_neon.png');
    this.load.image('logo_crash', 'assets/logo/crash_neon.png');
    this.load.image('tap_to_start', 'assets/tap_to_start.png');
    this.load.image('logo_drum', 'assets/logo/drum_logo.jpg');
    this.load.image('logo_stick', 'assets/logo/stick_logo.jpg');
    this.load.image('logo_cymbal', 'assets/logo/cymbal_logo2.png');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    const tap = this.add.sprite(width / 4, 200, 'logo_tap').setScale(1.25).setOrigin(0.5);
    const boom = this.add.sprite(width / 2, 200, 'logo_boom').setScale(1.25).setOrigin(0.5);
    const crash = this.add.sprite(width * 3 / 4, 200, 'logo_crash').setScale(1.25).setOrigin(0.5);

    const stick = this.add.sprite(width / 4, 350, 'logo_stick').setScale(0.5).setOrigin(0.5);
    const logo_drum = this.add.sprite(width / 2, 350, 'logo_drum').setScale(0.65).setOrigin(0.5);
    const cymbal = this.add.sprite(width * 3 / 4, 350, 'logo_cymbal').setScale(0.55).setOrigin(0.5);

    const start = this.add.sprite(width / 2, 600, 'tap_to_start').setScale(1.25).setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('LevelSelectScene'); // Go to level select when tapped
    });
  }
}
