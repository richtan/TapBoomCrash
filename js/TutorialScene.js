class TutorialScene extends Phaser.Scene {
  constructor() {
    super('TutorialScene');
  }

  preload() {
    this.load.image('drum', 'assets/tutorial/drum.png');
    this.load.audio('tutorial_song', 'assets/tutorial/tutorial_song.mp3');
    this.load.audio('bass_drum_sound', 'assets/tutorial/bass_drum_sound.mp3');
    this.load.audio('error_sound', 'assets/tutorial/error_sound.mp3');

    this.load.audio('tap_with_me', 'assets/voice/Just Tap Along With Me.m4a');
    this.load.audio('welcome', 'assets/voice/Welcome Message.m4a');
    this.load.audio('good_job', 'assets/voice/Good Job Lets Ramp It Up!.m4a');
    this.load.audio('nice', 'assets/voice/Nice How Bout This.m4a');
    this.load.audio('do_more', 'assets/voice/Wow Lets Do One More.m4a');
    this.load.audio('damm', 'assets/voice/Damn I_m Speechless.m4a');
    this.load.audio('try_again', 'assets/voice/Lets Try That Again.m4a');
    this.load.audio('let_see', 'assets/voice/Now Lets See How You Handle the Song!.m4a');
  }

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    const drum = this.add.sprite(width / 2, height / 2, 'drum').setOrigin(0.5).setScale(width * 6 / 8000).setInteractive();

    this.TOLERANCE = 0.2;
    this.MISTAKE_LIMIT = 10;

    this.song = this.sound.add('tutorial_song').setVolume(0.5);
    const bass = this.sound.add('bass_drum_sound').setVolume(4);
    this.error = this.sound.add('error_sound').setVolume(2);

    this.tap_with_me = this.sound.add('tap_with_me').setVolume(4);
    this.welcome = this.sound.add('welcome').setVolume(4);
    this.good_job = this.sound.add('good_job').setVolume(4);
    this.nice = this.sound.add('nice').setVolume(4);
    this.do_more = this.sound.add('do_more').setVolume(4);
    this.damm = this.sound.add('damm').setVolume(4);
    this.try_again = this.sound.add('try_again').setVolume(4);
    this.let_see = this.sound.add('let_see').setVolume(4);

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
    this.welcome.play();
    setTimeout(() => {
      this.tap_with_me.play();
    }, "5000");
    this.welcome.play();
    setTimeout(() => {
      this.let_see.play();
    }, "61000");

    this.input.on('pointerdown', () => {
      bass.play();
      this.add.timeline([
        {
          at: 0,
          run: () => { drum.setScale(width * 7 / 8000); },
        },
        {
          at: 100,
          run: () => { drum.setScale(width * 6 / 8000); },
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

          var random_value = Math.floor(Math.random() * 4);
          if(random_value == 0) {
            this.good_job.play();
          }
          else if(random_value == 1) {
            this.nice.play();
          }
          else if(random_value == 2) {
            this.do_more.play();
          }
          else {
            this.damm.play();
          }

          this.checkedTimestamps[timestamp] = true;
          scoreText.setText(`Score: ${score}`);
          navigator.vibrate(200);
          break;
        }
      }
      if (!tappedCorrect) { // Deal with when user taps too early
        for (var i = 0; i < beats['tutorial'].length; i++) {
          const timestamp = beats['tutorial'][i];
          if (!this.checkedTimestamps[timestamp] && currentTime > timestamp - this.TOLERANCE) {
            this.checkedTimestamps[timestamp] = true;
          }
        }
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
    // Deal with when user doesn't tap at all when they should or when they tap too late
    const currentTime = this.song.seek;
    for (const timestamp of beats['tutorial']) {
      if (!this.checkedTimestamps[timestamp] && currentTime > timestamp + this.TOLERANCE) {
        this.checkedTimestamps[timestamp] = true;
        this.mistakeCount++;
        this.try_again.play();
        this.livesLeftText.setText(`Lives Left: ${this.MISTAKE_LIMIT - this.mistakeCount}`);
        if (this.mistakeCount >= this.MISTAKE_LIMIT) {
          this.song.stop();
          this.scene.start('GameOverScene');
        }
      }
    }
  }
}