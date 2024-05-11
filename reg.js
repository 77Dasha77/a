function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validation(form) {
    function removeError(input) {
        const parent = input.parentElement;

        if (parent.classList.contains('error')) {
            const errorLabel = parent.querySelector('.error-label');
            if (errorLabel) {
                errorLabel.remove();
            }
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentElement;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;

        parent.classList.add('error');
        parent.appendChild(errorLabel);
    }

    let result = true;
    const allInputs = form.querySelectorAll('input');
    const passwordInput = document.getElementById('passwordreg');
    const emailInput = document.getElementById('name');
    // Удаление всех ошибок в начале
    

    // Проверка всех полей на заполненность
    for (const input of allInputs) {
        console.log(`Validating input with id: ${input.id}`);
        removeError(input);
        
    
        if (!input.value.trim()) {
            createError(input, 'Поле не заполнено!');
            result = false;
        } else {
            if (!isValidEmail(emailInput.value)) {
                removeError(input);
                createError(input, 'Некорректный адрес электронной почты!');
                result = false;
            }
        

            if (input.id === 'passwordreg' && input.value.length < 8) {
                removeError(input);
                createError(input, 'Пароль должен содержать не менее 8 символов!');
                result = false;
            } 
            if (input.id === 'password1' && input.value !== passwordInput.value) {
                removeError(input);
                createError(input, 'Пароли не совпадают!');
                result = false;
            }
        }
    }
    
    
   
    return result;
}

const dbRequest = indexedDB.open('UserDB', 1);

dbRequest.onupgradeneeded = function (event) {
    const db = event.target.result;
    
    // Создание хранилища 'users' с ключом 'email'
    const userStore = db.createObjectStore('users', { keyPath: 'email' });
};

dbRequest.onsuccess = function (event) {
    const db = event.target.result;

document.getElementById('add-form').addEventListener('submit', function (event) {
        event.preventDefault();

        if (validation(this)) {
            const email = document.getElementById('name').value;
            const passwordreg = document.getElementById('passwordreg').value;

            // Добавление данных в IndexedDB
            const transaction = db.transaction('users', 'readwrite');
            const userStore = transaction.objectStore('users');
            
            const newUser = {
                email: email,
                password: passwordreg
            };

            userStore.add(newUser);

            transaction.oncomplete = function () {
                console.log('User added to IndexedDB');
                window.location.href = '/город.html';
            };

            transaction.onerror = function (event) {
                console.error('Error adding user to IndexedDB:', event.target.error);
            };
        }
    });
};

dbRequest.onerror = function (event) {
    console.error('Error opening IndexedDB:', event.target.error);
};
