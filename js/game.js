// import PlayLevelScene from "./PlayLevelScene";
// import LevelSelectScene from "./LevelSelectScene";
// import TutorialScene from "./TutorialScene";
// import GameScene from "./GameScene";

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  backgroundColor: '#000000',
  width: 960,
  height: 640,
  scene: [GameScene, LevelSelectScene, TutorialScene, PlayLevelScene],
};

const game = new Phaser.Game(config);
