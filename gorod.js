document.getElementById("notification").addEventListener("click", function() {
  const menu = document.getElementById("notificationmenu");

  // Переключаем класс для отображения/скрытия меню
  if (menu.classList.contains("disp")) {
    menu.classList.remove("disp"); // Скрыть
  } else {
    menu.classList.add("disp"); // Показать
  }
});

// Закрытие меню при клике на кнопку
document.getElementById("closeNotificationMenu").addEventListener("click", function() {
  document.getElementById("notificationmenu").classList.remove("disp");
});
  