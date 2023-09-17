class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  preload() {
    this.load.image('menu', 'assets/tap_to_menu.png');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    var score = 1000;
    const score_text = this.add.text(width / 2, 540, 'SCORE:' + score, 
    {
      fontFamily: 'Arial',
      fontSize: '150px',
      fill: '#ffffff',
    }).setOrigin(0.5).setScale(0.5);

    const menu = this.add.sprite(width / 2, 600, 'menu').setScale(1).setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('LevelSelectScene'); // Go to level select when tapped
    });
  }
}
