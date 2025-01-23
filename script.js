const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const timerInput = document.getElementById('timerInput');
const setTimerBtn = document.getElementById('setTimerBtn');
const clearTimerBtn = document.getElementById('clearTimerBtn');
const timeRemaining = document.getElementById('timeRemaining');

let timer = null;
let remainingTime = 0;
let interval = null;

// Обновление времени воспроизведения
audio.addEventListener('timeupdate', () => {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    seekBar.value = audio.currentTime;
});

// Обновление длительности песни
audio.addEventListener('loadedmetadata', () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    seekBar.max = audio.duration;
});

// Управление воспроизведением
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Перемотка
seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
});

// Установка таймера
setTimerBtn.addEventListener('click', () => {
    const minutes = parseFloat(timerInput.value);
    if (minutes && minutes > 0) {
        const stopTime = minutes * 60; // Переводим минуты в секунды
        remainingTime = stopTime; // Устанавливаем оставшееся время
        clearTimeout(timer); // Очищаем предыдущий таймер
        clearInterval(interval); // Очищаем предыдущий интервал

        // Автоматически начинаем воспроизведение
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }

        // Устанавливаем таймер
        timer = setTimeout(() => {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            timeRemaining.textContent = 'Осталось: 0:00';
            alert('Таймер сработал! Воспроизведение остановлено.');
            clearInterval(interval); // Останавливаем интервал
        }, stopTime * 1000); // Устанавливаем таймер в миллисекундах

        // Обновляем оставшееся время каждую секунду
        interval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                const remainingMinutes = Math.floor(remainingTime / 60);
                const remainingSeconds = Math.floor(remainingTime % 60);
                timeRemaining.textContent = `Осталось: ${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
            }
        }, 1000);

        alert(`Таймер установлен на ${minutes} минут.`);
    } else {
        alert('Пожалуйста, введите корректное значение таймера.');
    }
});

// Очистка таймера
clearTimerBtn.addEventListener('click', () => {
    clearTimeout(timer);
    clearInterval(interval);
    remainingTime = 0;
    timeRemaining.textContent = 'Осталось: 0:00';
    alert('Таймер очищен.');
});