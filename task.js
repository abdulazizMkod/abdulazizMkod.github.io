document.addEventListener('DOMContentLoaded', function () {
    const taskButtons = document.querySelectorAll('.task-button');
    let tokens = parseFloat(localStorage.getItem('tokens-task')) || 0;

    // Установка начального состояния токенов
    document.querySelector('.tokens-task').innerText = tokens;

    // Восстановление состояния кнопок при загрузке страницы
    taskButtons.forEach(button => {
        const task = button.getAttribute('data-task');
        const buttonState = localStorage.getItem(`${task}-state`);

        if (buttonState === 'claimed') {
            button.style.backgroundColor = 'gray';
            button.innerText = '✔️';
            button.disabled = true;
        } else if (buttonState === 'claim') {
            button.style.backgroundColor = '#72D3D8';
            button.innerText = 'Claim';
        }
    });

    taskButtons.forEach(button => {
        button.addEventListener('click', function () {
            const task = button.getAttribute('data-task');
            const buttonState = localStorage.getItem(`${task}-state`);
            const url = button.getAttribute('data-url'); // Получаем URL для перехода

            if (buttonState !== 'claim' && buttonState !== 'claimed') {
                // Переход на внешний сайт (например, Telegram, Instagram)
                window.open(url, '_blank'); // Открываем ссылку в новой вкладке

                // Запуск анимации кнопки
                button.classList.add('animating');

                // Изменение кнопки на "Claim" через 5 секунд
                setTimeout(() => {
                    button.classList.remove('animating');
                    button.style.backgroundColor = '#72D3D8';
                    button.innerText = 'Claim';
                    localStorage.setItem(`${task}-state`, 'claim');
                }, 5000);
            } else if (buttonState === 'claim') {
                // Добавляем 300 токенов при нажатии на "Claim"
                tokens += 300;
                document.querySelector('.tokens-task').innerText = tokens;
                localStorage.setItem('tokens', tokens);

                // Изменение фона на серый и текста на галочку
                button.style.backgroundColor = 'gray';
                button.innerText = '✔️';
                button.disabled = true;
                localStorage.setItem(`${task}-state`, 'claimed');
            }
        });
    });
    const claimTaskTokens = document.querySelector('.task-claim-button');

    claimTaskTokens.onclick = function () {
        const taskTokensElement = document.querySelector('.tokens-task');
        const tokensElement = document.querySelector('.tokens');

        // Получаем текущее количество токенов из элементов
        let taskTokens = parseFloat(taskTokensElement.innerText) || 0;
        let tokens = parseFloat(tokensElement.innerText) || 0;

        // Добавляем taskTokens к общим токенам
        tokens += taskTokens;

        // Обнуляем taskTokens и обновляем отображение
        taskTokens = 0;

        // Обновляем отображение на странице
        taskTokensElement.innerText = taskTokens.toFixed(0);
        tokensElement.innerText = tokens.toFixed(0);
    };
});
