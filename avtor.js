//КОД АВТОРИЗАЦИИ
const dbRequest = indexedDB.open('UserDB', 1);

dbRequest.onupgradeneeded = function(event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'email' });
    }
};

dbRequest.onsuccess = function(event) {
    const db = event.target.result;

    const errorMessageElement = document.getElementById('error-message');

    document.getElementById('add-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const login = document.querySelector('.input-box input[placeholder="Введите логин..."]').value;
        const passwordavt = document.getElementById('passwordavt').value;

        const transaction = db.transaction('users', 'readonly');
        const userStore = transaction.objectStore('users');

        const getRequest = userStore.get(login);

        getRequest.onsuccess = function(event) {
            const user = event.target.result;

            if (user) {
                if (user.password === passwordavt) {
                    // Перенаправление
                    window.location.href = '/город.html';
                } else {
                    // Отображение ошибки
                    errorMessageElement.textContent = 'Неверный пароль. Пожалуйста, попробуйте снова.';
                }
            } else {
                // Отображение ошибки
                errorMessageElement.textContent = 'Пользователь не найден. Пожалуйста, зарегистрируйтесь.';
            }
        };

        getRequest.onerror = function(event) {
            console.error('Ошибка при получении данных из IndexedDB:', event.target.error);
            errorMessageElement.textContent = 'Ошибка при авторизации. Попробуйте позже.';
        };
    });
};

dbRequest.onerror = function(event) {
    console.error('Ошибка при открытии IndexedDB:', event.target.error);
    document.getElementById('error-message').textContent = 'Ошибка при подключении к базе данных.';
};
//КОД АВТОРИЗАЦИИ

