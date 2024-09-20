const planets = document.querySelectorAll('.planet');
planets.forEach((planet, index) => {
    planet.style.animationDuration = `${5 + index * 2}s`;
    planet.style.transform = `rotate(${index * 120}deg)`;
});

document.addEventListener('DOMContentLoaded', function () {
    const claimButton = document.getElementById('claim-button');
    const warningElement = document.querySelector('.warning');
    const defaultTokens = 0;
    const end = 1080;
    const duration = 25200 * 1000; // 7 hours
    let startTime = null;
    let currentTokens = parseFloat(localStorage.getItem('currentTokens')) || defaultTokens;
    let animationProgress = parseFloat(localStorage.getItem('animationProgress')) || 0;

    // Функция для сброса анимации
    function resetAnimation() {
        startTime = null;
        requestAnimationFrame(animateNumber);
    }

    // Функция анимации
    function animateNumber(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let currentNumber = Math.min(animationProgress + (end - animationProgress) * (progress / duration), end);
        claimButton.innerText = `${currentNumber.toFixed(2)} / 1080`;

        // Сохранение прогресса в localStorage
        localStorage.setItem('animationProgress', currentNumber);

        if (progress < duration) {
            requestAnimationFrame(animateNumber);
        } else {
            animationProgress = currentNumber;
            localStorage.setItem('animationProgress', animationProgress);
        }
    }

    // Функция для отображения предупреждения
    function showWarning() {
        warningElement.style.opacity = 1; // Показать предупреждение

        // Установить таймаут для скрытия предупреждения через 3 секунды
        setTimeout(() => {
            warningElement.style.opacity = 0; // Скрыть предупреждение
        }, 3000); // 3000 миллисекунд = 3 секунды
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

    resetAnimation(); // Начать начальную анимацию
});