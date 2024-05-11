document.getElementById("notification").addEventListener("click", function() {
    const menu = document.getElementById("notificationmenu");
  
    // Переключаем класс для отображения/скрытия меню
    if (menu.classList.contains("disp") == true) {
      menu.classList.remove("disp"); // Скрыть
    } else {
      menu.classList.add("disp"); // Показать
    }
  });
  