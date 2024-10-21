const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');
const sound3 = document.getElementById('sound3');
let timeoutId; // Переменная для хранения идентификатора таймера

document.getElementById('startButton').addEventListener('click', function () {
  // Функция для генерации случайного времени
  function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Запуск первого звука через 5 секунд
  timeoutId = setTimeout(() => {
    sound1.play();

    // Запуск второго звука через случайный интервал
    timeoutId = setTimeout(() => {
      sound2.play();

      // Запуск третьего звука через случайный интервал
      timeoutId = setTimeout(() => {
        sound3.play();
      }, getRandomTime(1500, 2000)); // от 1.5 до 2 секунд для третьего звука
    }, getRandomTime(500, 2000)); // от 0.5 до 2 секунд для второго звука
  }, 5000); // Первый звук через 5 секунд
});

document.getElementById('stopButton').addEventListener('click', function () {
  clearTimeout(timeoutId); // Остановка генерации звуков

  // Остановка воспроизведения всех звуков
  sound1.pause();
  sound2.pause();
  sound3.pause();

  // Сброс времени воспроизведения всех звуков
  sound1.currentTime = 0;
  sound2.currentTime = 0;
  sound3.currentTime = 0;
});
