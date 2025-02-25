// TODO: Перенести функционал в класс чтобы курсор стал объектом
// TODO: Сделать генерацию курсоров в коде и вставлять их в DOM

/**
 * Преобразуем карточки портфолио в 3d карточки которые поворачиваются при движении курсора на них и меняем вид самого курсора
 * @param {string} cardsClass - Название класса карточек которые нужно преобразовать
 * @param {string} cardsCursorSelector - Селектор курсора который будет появляться при навидении на карточку
 * @param {string} pageCursorSelector - Селектор курсора всего документа
 */
function create3dCards(cardsClass, cardsCursorSelector, pageCursorSelector) {
  const maxRotation = 15; // Определяем максимальный угол наклона карточки

  const wrappers = document.querySelectorAll(cardsClass);
  const customWorksCursor = document.querySelector(cardsCursorSelector);
  const customCursorSVG = document.querySelector(pageCursorSelector);

  // Обходим все элементы .work-wrapper и добавляем обработчики событий
  wrappers.forEach((wrapper) => {
    // Отслеживаем движение мыши
    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();

      customWorksCursor.style.display = "block"; // Показываем кастомный курсор
      customCursorSVG.style.display = "none";
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
      customCursorSVG.style.display = "block";
    });
  });
}

/**
 * Создаем движение кастомного курсора для всей страницы
 * @param {string} pageCursorSelector - Селектор курсора всего документа
 */
function createCustomCursor(pageCursorSelector) {
  const customCursorSVG = document.querySelector(pageCursorSelector);
  const body = document.querySelector("body");

  // Курсор для всей страницы (круг)
  body.addEventListener("mousemove", (e) => {
    customCursorSVG.style.left = `${e.clientX}px`; // Позиционируем по X
    customCursorSVG.style.top = `${e.clientY}px`; // Позиционируем по Y
  });
}

/**
 * Анимация курсора при движении над ссылкой
 * @param {string} pageCursorSelector
 * @param {string} magnetLinksSelector
 */
function hoverCursorAnimation(pageCursorSelector, magnetLinksSelector) {
  const magnetLinks = document.querySelectorAll(magnetLinksSelector);

  magnetLinks.forEach((link) => {
    // При наведении на ссылку
    link.addEventListener("mouseenter", () => {
      // Включаем анимацию GSAP для курсора
      gsap.to(pageCursorSelector, {
        scale: 1.5, // Увеличиваем размер курсора
        duration: 0.3, // Длительность анимации
        ease: "power1.out", // Плавное изменение
      });
    });

    // Когда  курсор покидает ссылку
    link.addEventListener("mouseleave", () => {
      // Возвращаем курсор в исходное состояние
      gsap.to(pageCursorSelector, {
        scale: 1, // Возвращаем исходный размер
        duration: 0.3, // Длительность анимации
        ease: "power1.out", // Плавное изменение
      });
    });
  });
}

/**
 * Изменение курсора при нажатии кнопки мыши
 * @param {string} pageCursorSelector - Селектор курсора всего документа
 */
function pressMouseButton(pageCursorSelector) {
  // При нажатии кнопки мыши
  document.addEventListener("mousedown", () => {
    gsap.to(pageCursorSelector, {
      scale: 0.3, // Уменьшаем размер курсора
      duration: 0.3, // Длительность анимации
      ease: "power1.out", // Плавное изменение
    });
  });

  // При отпускании кнопки мыши
  document.addEventListener("mouseup", () => {
    gsap.to(pageCursorSelector, {
      scale: 1, // Возвращаем исходный размер
      duration: 0.3, // Длительность анимации
      ease: "power1.out", // Плавное изменение
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Убедись, что плагины GSAP подключены, если они не подключены через CDN или локально
  createCustomCursor(".custom-cursor");
  hoverCursorAnimation(".custom-cursor", ".magnet-link");
  create3dCards(".work-wrapper", ".works_custom-cursor", ".custom-cursor");
  pressMouseButton(".custom-cursor");
});

