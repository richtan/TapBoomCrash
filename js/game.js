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

    const tap = this.add.image(200, 200, 'logo_tap');
    const boom = this.add.image(400, 200, 'logo_boom');
    const crash = this.add.image(650, 200, 'logo_crash');

    this.scene.launch('GameScene');

    this.gameScene = this.scene.get('GameScene');
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  backgroundColor: '#000000',
  width: 960,
  height: 640,
  scene: [GameScene],
};

const game = new Phaser.Game(config);