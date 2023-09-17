var cacheName = 'phaser-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/assets/logo/boom_neon.png',
  '/assets/logo/crash_neon.png',
  '/assets/logo/cymbal_logo.png',
  '/assets/logo/cymbal_logo2.png',
  '/assets/logo/drum_logo.png',
  '/assets/logo/stick_logo.png',
  '/assets/logo/tap_neon.png',
  '/assets/tutorial/bass_drum_sound_backup.mp3',
  '/assets/tutorial/back_drum_sound.mp3',
  '/assets/tutorial/drum.png',
  '/assets/tutorial/tutorial_song.mp3',
  '/assets/tutorial/arrow.png',
  '/assets/tutorial/select_neon.png',
  '/assets/tutorial/song1.png',
  '/assets/tutorial/song2.png',
  '/assets/tutorial/song3.png',
  '/assets/tutorial/song4.png',
  '/assets/tutorial/tap_to_start.png',
  '/js/game.js',
  '/js/beats.js',
  '/js/GameOverScene.js',
  '/js/GameScene.js',
  '/js/LevelSelectScene.js',
  '/js/PlayLevelScene.js',
  '/js/TutorialScene.js',
  'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js'
];
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});