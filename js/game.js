// import PlayLevelScene from "./PlayLevelScene";
// import LevelSelectScene from "./LevelSelectScene";
// import TutorialScene from "./TutorialScene";
// import GameScene from "./GameScene";

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  backgroundColor: '#000000',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [GameScene, LevelSelectScene, TutorialScene, PlayLevelScene],
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});