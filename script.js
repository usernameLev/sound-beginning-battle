const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');
const sound3 = document.getElementById('sound3');
let timeoutId1, timeoutId2, timeoutId3;
let isFighting = false;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// Функция для случайного времени
function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Разблокировка аудио через AudioContext (если нужно)
let audioContext;
function unlockAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Функция запуска последовательного проигрывания звуков
function startFight() {
  if (isFighting) return;

  isFighting = true;
  startButton.disabled = true;

  unlockAudioContext();

  // Проигрываем первый звук сразу (важно для мобильных)
  sound1.play().catch(console.warn);

  timeoutId1 = setTimeout(() => {
    sound2.play().catch(console.warn);

    timeoutId2 = setTimeout(() => {
      sound3.play().catch(console.warn);

      timeoutId3 = setTimeout(() => {
        isFighting = false;
        startButton.disabled = false;
      }, getRandomTime(1500, 2000));
    }, getRandomTime(500, 2000));
  }, 5000);
}

startButton.addEventListener('click', () => {
  unlockAudioContext();
  startFight();
});

stopButton.addEventListener('click', () => {
  clearTimeout(timeoutId1);
  clearTimeout(timeoutId2);
  clearTimeout(timeoutId3);

  [sound1, sound2, sound3].forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });

  isFighting = false;
  startButton.disabled = false;
});
