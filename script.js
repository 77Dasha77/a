document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
  
    var emailOrPhone = document.getElementById('name').value;
    var code = document.getElementById('code').value;
    var password = document.getElementById('password').value;
    var passwordConfirm = document.getElementById('password1').value;
  
    // Валидация данных
    if (!validateEmailOrPhone(emailOrPhone)) {
      alert('Неверный формат адреса электронной почты или номера телефона');
      return;
    }
  
    if (!validateCode(code)) {
      alert('Неверный формат кода подтверждения');
      return;
    }
  
    if (!validatePassword(password)) {
      alert('Пароль должен содержать не менее 8 символов');
      return;
    }
  
    if (password !== passwordConfirm) {
      alert('Пароли не совпадают');
      return;
    }
  
    // Отправка данных на сервер
    // Здесь должен быть код для отправки данных на сервер
    // Например, используя fetch API или XMLHttpRequest
  });
  
  function validateEmailOrPhone(value) {
    if (value.includes('@')) {
        return true;
  } else {
    return False;
}
  }
  
  function validateCode(value) {
    // Реализуйте проверку кода подтверждения
    // Возвращает true, если значение корректно, иначе false
  }
  
  function validatePassword(value) {
    // Проверка длины пароля
    return value.length >= 8;
  }