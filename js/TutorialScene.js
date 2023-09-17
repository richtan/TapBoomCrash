class TutorialScene extends Phaser.Scene {
  constructor() {
    super('TutorialScene');
  }

  preload() {
    this.load.image('drum', 'assets/tutorial/drum.png');
    this.load.audio('tutorial_song', 'assets/tutorial/tutorial_song.mp3');
    this.load.audio('bass_drum_sound', 'assets/tutorial/bass_drum_sound.mp3');
    this.load.audio('error_sound', 'assets/tutorial/error_sound.mp3');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    const drum = this.add.sprite(width / 2, height / 2, 'drum').setOrigin(0.5).setScale(1.0).setInteractive();

    const song = this.sound.add('tutorial_song').setVolume(0.5);
    const bass = this.sound.add('bass_drum_sound').setVolume(4);
    const error = this.sound.add('error_sound').setVolume(2);

    const gameScene = this.scene.get('GameScene');

    var score = 0;
    const scoreText = this.add.text(16, 16, `Score: ${score}`, {
      fontFamily: 'Arial',
      fontSize: '32px',
      fill: '#ffffff',
    })

    var mistakeCount = 0;

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

      const currentTime = song.seek;

      var tappedCorrect = false;
      for (const timestamp of beats['tutorial']) {
        const timeDelta = Math.abs(currentTime - timestamp);
        if (timeDelta <= 0.1) { // must be within 100 ms of the beat
          tappedCorrect = true;
          score += 10;
          scoreText.setText(`Score: ${score}`);
          navigator.vibrate(200);
          break;
        }
      }
      if (!tappedCorrect) {
        mistakeCount++;
        // if (mistakeCount >= 3) {
        //   song.stop();
        //   this.scene.start('GameOverScene');
        // }
        error.play();
      }
      // TODO: Check if player didn't tap when they were supposed to
    });
  }
}