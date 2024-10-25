document.addEventListener("DOMContentLoaded", function () {
  // Убедись, что плагины GSAP подключены, если они не подключены через CDN или локально
  gsap.registerPlugin(MorphSVGPlugin, InertiaPlugin);

  const wrappers = document.querySelectorAll(".work-wrapper");
  const body = document.querySelector("body");

  // Кастомные курсоры на странице
  const customWorksCursor = document.querySelector(".works_custom-cursor");
  const customCursor = document.querySelector(".custom-cursor");

  // Курсор для всей страницы
  body.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`; // Позиционируем по X
    customCursor.style.top = `${e.clientY}px`; // Позиционируем по Y
  });

  // Определяем максимальный угол наклона
  const maxRotation = 15;

  // Обходим все элементы .work-wrapper и добавляем обработчики событий
  wrappers.forEach((wrapper) => {
    // Отслеживаем движение мыши
    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();

      customWorksCursor.style.display = "block"; // Показываем кастомный курсор
      customCursor.style.display = "none";
      customWorksCursor.style.left = `${e.clientX}px`; // Позиционируем по X
      customWorksCursor.style.top = `${e.clientY}px`; // Позиционируем по Y

      // Вычисляем координаты курсора относительно центра элемента
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Рассчитываем повороты по осям X и Y
      const rotateX = (y / rect.height) * maxRotation;
      const rotateY = -(x / rect.width) * maxRotation;

      // Используем GSAP для анимации
      gsap.to(wrapper, {
        duration: 0.3, // Длительность анимации
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power1.out", // Плавность анимации
      });
    });

    // Возвращаем элемент в исходное положение при выходе курсора за пределы элемента
    wrapper.addEventListener("mouseleave", () => {
      gsap.to(wrapper, {
        duration: 0.5, // Плавное возвращение
        rotateX: 0,
        rotateY: 0,
        ease: "power1.out",
      });

      customWorksCursor.style.display = "none"; // Скрываем кастомный курсор, когда мышь покидает элемент
      customCursor.style.display = "block";
    });
  });

  // Морфинг курсора и прилипание к ссылкам .magnet-link
});
