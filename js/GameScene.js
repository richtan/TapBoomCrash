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