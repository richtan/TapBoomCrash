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

  create() {

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
