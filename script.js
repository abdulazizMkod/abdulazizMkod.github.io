const planets = document.querySelectorAll('.planet');
planets.forEach((planet, index) => {
    planet.style.animationDuration = `${5 + index * 2}s`;
    planet.style.transform = `rotate(${index * 120}deg)`;
});

document.addEventListener('DOMContentLoaded', function () {
    const planets = document.querySelectorAll('.planet');
    planets.forEach((planet, index) => {
        planet.style.animationDuration = `${5 + index * 2}s`;
        planet.style.transform = `rotate(${index * 120}deg)`;
    });

    const claimButton = document.getElementById('claim-button');
    const warningElement = document.querySelector('.warning');
    const defaultTokens = 0;
    const end = 1080;
    const duration = 25200 * 1000; // 7 часов (в миллисекундах)
    let currentTokens = parseFloat(localStorage.getItem('currentTokens')) || defaultTokens;
    let animationProgress = parseFloat(localStorage.getItem('animationProgress')) || 0;

    // Получаем сохранённое время старта
    let savedStartTime = parseFloat(localStorage.getItem('startTime')) || null;

    // Если время старта отсутствует, задаем его
    if (!savedStartTime) {
        savedStartTime = Date.now();
        localStorage.setItem('startTime', savedStartTime);
    }

    // Рассчитываем, сколько времени прошло с момента старта
    const timeElapsed = Date.now() - savedStartTime;

    // Функция для сброса анимации
    function resetAnimation() {
        localStorage.setItem('startTime', Date.now());
        animationProgress = 0;
        localStorage.setItem('animationProgress', animationProgress);
        requestAnimationFrame(animateNumber);
    }

    // Функция анимации
    function animateNumber() {
        let currentNumber;
        const timeElapsed = Date.now() - savedStartTime;
        if (timeElapsed < duration) {
            currentNumber = Math.min(animationProgress + (end * (timeElapsed / duration)), end);
            claimButton.innerText = `${currentNumber.toFixed(2)} / 1080`;

            // Сохранение прогресса в localStorage
            localStorage.setItem('animationProgress', currentNumber);
            requestAnimationFrame(animateNumber);
        } else {
            // Анимация завершена
            currentNumber = end;
            claimButton.innerText = `${currentNumber.toFixed(2)} / 1080`;
            localStorage.setItem('animationProgress', currentNumber);
        }
    }

    // Функция для отображения предупреждения
    function showWarning() {
        warningElement.style.opacity = 1;

        // Таймаут для скрытия предупреждения через 3 секунды
        setTimeout(() => {
            warningElement.style.opacity = 0;
        }, 3000);
    }

    // Обработка нажатия кнопки
    claimButton.onclick = function () {
        const currentNumber = parseFloat(claimButton.innerText.split(" / ")[0]);
        if (currentNumber < end) {
            setTimeout(showWarning, 300); // Задержка перед показом предупреждения
        } else {
            currentTokens += Math.floor(end);
            document.querySelector('.tokens').innerText = currentTokens;
            localStorage.setItem('currentTokens', currentTokens);
            animationProgress = 0; // Сбросить прогресс анимации после получения токенов
            resetAnimation(); // Запустить анимацию снова
        }
    };

    // Установка начального состояния кнопки и токенов
    claimButton.innerText = `${animationProgress.toFixed(2)} / 1080`;
    document.querySelector('.tokens').innerText = currentTokens;

    // Если время завершено, сразу завершить анимацию
    if (timeElapsed >= duration) {
        claimButton.innerText = `${end.toFixed(2)} / 1080`;
        localStorage.setItem('animationProgress', end);
    } else {
        // Запустить анимацию
        requestAnimationFrame(animateNumber);
    }

    


});
