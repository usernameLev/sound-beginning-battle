const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');
const sound3 = document.getElementById('sound3');

let timeoutId;
let isFighting = false;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let audioUnlocked = false;

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function unlockAudio() {
  if (audioUnlocked) return;

  [sound1, sound2, sound3].forEach((sound) => {
    sound.play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
      })
      .catch((err) => {
        console.warn('Audio unlock error:', err);
      });
  });

  audioUnlocked = true;
}

function startFight() {
  if (isFighting) return;

  unlockAudio(); // Убедимся, что звук разблокирован

  isFighting = true;
  startButton.disabled = true;

  timeoutId = setTimeout(() => {
    sound1.play().catch(console.warn);

    timeoutId = setTimeout(() => {
      sound2.play().catch(console.warn);

      timeoutId = setTimeout(() => {
        sound3.play().catch(console.warn);

        isFighting = false;
        startButton.disabled = false;
      }, getRandomTime(1500, 2000));
    }, getRandomTime(500, 2000));
  }, 5000);
}

function stopFight() {
  clearTimeout(timeoutId);

  [sound1, sound2, sound3].forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });

  isFighting = false;
  startButton.disabled = false;
}

// Привязка событий
startButton.addEventListener('click', startFight);
stopButton.addEventListener('click', stopFight);
