class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init({score, success, level_number}) {
    this.score = score;
    this.success = success;
    this.level_number = level_number;
    this.game.sound.stopAll();
  }

  preload() {

  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    if (this.success) {
      this.congratsText = this.add.text(width / 2, height * 7 / 6000, `Congratulations!`, {
        fontFamily: "Arial",
        fontSize: "145px",
        fill: "#39FF14",
      }).setOrigin(0.5, 0).setScale(width / 1400);
    } else {
      this.youFailedText = this.add.text(width / 2, height * 7 / 6000, `You Failed!`, {
        fontFamily: "Arial",
        fontSize: "145px",
        fill: "#FF3131",
      }).setOrigin(0.5, 0).setScale(width / 1400);
    }
    this.finalScoreText = this.add.text(width / 2, height * 2000 / 6000, `Final Score: ${this.score}`, {
      fontFamily: "Arial",
      fontSize: "145px",
      fill: "#21F8F6",
    }).setOrigin(0.5, 0).setScale(width / 2200);
    
    this.playAgainText = this.add.text(width - 20, height * 4500 / 6000, `Play Again`, {
      fontFamily: "Arial",
      fontSize: "145px",
      fill: "#ffc42e",
    }).setOrigin(1, 0).setScale(width / 1800);

    this.mainMenuText = this.add.text(20, height * 4500 / 6000, `Main Menu`, {
      fontFamily: "Arial",
      fontSize: "145px",
      fill: "#FF10F0",
    }).setOrigin(0, 0).setScale(width / 1800);

    this.input.on("pointerdown", () => {
      if (this.input.mousePointer.x < width / 2) {
        // this.scene.start('LevelSelectScene');
        this.scene.start('GameScene');
      } else {
        this.scene.start('LevelSelectScene');
        // this.scene.start('PlayLevelScene', {level_number: this.level_number});
      }
    });
  }
}