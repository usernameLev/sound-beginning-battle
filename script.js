const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');
const sound3 = document.getElementById('sound3');

let timeoutId1, timeoutId2, timeoutId3; // Для каждого таймаута своя переменная
let isFighting = false;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

startButton.addEventListener('click', async function () {
  if (isFighting) return;

  isFighting = true;
  startButton.disabled = true;

  try {
    // Запускаем первый звук сразу (требование мобильных браузеров)
    await sound1.play();

    // Запускаем второй звук через случайный интервал
    timeoutId1 = setTimeout(async () => {
      try {
        await sound2.play();
      } catch (e) {
        console.log('Ошибка воспроизведения sound2:', e);
      }
    }, getRandomTime(500, 2000));

    // Запускаем третий звук через случайный интервал после второго
    timeoutId2 = setTimeout(async () => {
      try {
        await sound3.play();
      } catch (e) {
        console.log('Ошибка воспроизведения sound3:', e);
      }
      
      // После всех звуков разблокируем кнопку
      isFighting = false;
      startButton.disabled = false;
    }, getRandomTime(1500, 2000) + getRandomTime(500, 2000)); // сумма интервалов второго и третьего звуков

  } catch (error) {
    console.log('Ошибка воспроизведения sound1:', error);
    // Если звук не воспроизвелся, разблокируем кнопку
    isFighting = false;
    startButton.disabled = false;
  }
});

stopButton.addEventListener('click', function () {
  clearTimeout(timeoutId1);
  clearTimeout(timeoutId2);

  sound1.pause();
  sound2.pause();
  sound3.pause();

  sound1.currentTime = 0;
  sound2.currentTime = 0;
  sound3.currentTime = 0;

  isFighting = false;
  startButton.disabled = false;
});
