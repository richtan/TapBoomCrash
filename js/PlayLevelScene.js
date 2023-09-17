class PlayLevelScene extends Phaser.Scene {
  constructor() {
    super('PlayLevelScene');
  }

  init({ level_number }) {
    if (level_number == 1) {
      this.scene.start('TutorialScene');
    }
  }

  preload() {

  }

  create() {

  }
}