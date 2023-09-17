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

    this.TOLERANCE = 0.1;
    this.MISTAKE_LIMIT = 4;

    this.song = this.sound.add('tutorial_song').setVolume(0.5);
    const bass = this.sound.add('bass_drum_sound').setVolume(4);
    this.error = this.sound.add('error_sound').setVolume(2);

    const gameScene = this.scene.get('GameScene');

    var score = 0;
    const scoreText = this.add.text(16, 16, `Score: ${score}`, {
      fontFamily: 'Arial',
      fontSize: '32px',
      fill: '#ffffff',
    });

    this.mistakeCount = 0;
    this.livesLeftText = this.add.text(width - 16, 16, `Lives Left: ${this.MISTAKE_LIMIT - this.mistakeCount}`, {
      fontFamily: 'Arial',
      fontSize: '32px',
      fill: '#ffffff',
    }).setOrigin(1, 0);

    this.checkedTimestamps = {}

    this.song.play();

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

      const currentTime = this.song.seek;

      var tappedCorrect = false;
      for (var i = 0; i < beats['tutorial'].length; i++) {
        const timestamp = beats['tutorial'][i];
        const timeDelta = Math.abs(currentTime - timestamp);
        if (timeDelta <= this.TOLERANCE) { // must be within 100 ms of the beat
          tappedCorrect = true;
          score += 10;
          scoreText.setText(`Score: ${score}`);
          navigator.vibrate(200);
          break;
        }
      }
      if (!tappedCorrect) { // Deal with when user taps too early or too late
        this.mistakeCount++;
        this.livesLeftText.setText(`Lives Left: ${this.MISTAKE_LIMIT - this.mistakeCount}`);
        if (this.mistakeCount >= this.MISTAKE_LIMIT) {
          this.song.stop();
          this.scene.start('GameOverScene');
        }
        this.error.play();
      }
    });
  }

  update() {
    // Deal with when user doesn't tap at all when they should
    const currentTime = this.song.seek;
    for (const timestamp of beats['tutorial']) {
      if (!this.checkedTimestamps[timestamp] && currentTime > timestamp + this.TOLERANCE) {
        this.checkedTimestamps[timestamp] = true;
        this.mistakeCount++;
        this.livesLeftText.setText(`Lives Left: ${this.MISTAKE_LIMIT - this.mistakeCount}`);
        if (this.mistakeCount >= this.MISTAKE_LIMIT) {
          this.song.stop();
          this.scene.start('GameOverScene');
        }
        // this.error.play();
      }
    }
  }
}