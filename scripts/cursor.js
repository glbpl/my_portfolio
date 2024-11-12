/**
 * Создает SVG path элемент в виде квадрата с закругленными углами.
 * @param {number} width - Ширина квадрата
 * @param {number} height - Высота квадрата
 * @param {number} borderRadius - Радиус скругления углов
 * @returns {SVGPathElement} - Path элемент с заданной формой
 */
function createRoundedSquarePath(width, height, borderRadius) {
  // Создаем путь SVG для квадрата с закругленными углами
  const squarePath = `
    M ${borderRadius},0
    H ${width - borderRadius}
    Q ${width},0 ${width},${borderRadius}
    V ${height - borderRadius}
    Q ${width},${height} ${width - borderRadius},${height}
    H ${borderRadius}
    Q 0,${height} 0,${height - borderRadius}
    V ${borderRadius}
    Q 0,0 ${borderRadius},0
    Z
  `;

  // Создаем элемент path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", squarePath);
  path.setAttribute("fill", "lightblue"); // Цвет заливки (можно изменить при необходимости)
  path.setAttribute("stroke", "blue"); // Цвет обводки (можно изменить при необходимости)
  path.setAttribute("stroke-width", "2"); // Толщина обводки (можно изменить при необходимости)

  return path;
}

/**
 * Создаем 3d карточки которые поворачиваются при движении курсора на них и меняем вид самого курсора
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

document.addEventListener("DOMContentLoaded", function () {
  // Убедись, что плагины GSAP подключены, если они не подключены через CDN или локально
  gsap.registerPlugin(MorphSVGPlugin, InertiaPlugin);

  create3dCards(".work-wrapper", ".works_custom-cursor", ".custom-cursor");

  const body = document.querySelector("body");
  const magnetLinks = document.querySelectorAll(".magnet-link");

  // Конвертируем элемент-курсор circle в path
  MorphSVGPlugin.convertToPath(".custom-cursor circle");
  // MorphSVGPlugin.convertToPath(".custom-cursor rect");

  // Кастомные курсоры на странице

  const customCursorSVG = document.querySelector(".custom-cursor");
  const customCursorPath = document.querySelector(".custom-cursor path");
  // const customCursorPath = document.querySelector(".custom-cursor circle");

  // Курсор для всей страницы (круг)
  body.addEventListener("mousemove", (e) => {
    customCursorSVG.style.left = `${e.clientX}px`; // Позиционируем по X
    customCursorSVG.style.top = `${e.clientY}px`; // Позиционируем по Y
  });

  // Морфинг курсора и прилипание к ссылкам .magnet-link

  // Применяем эффект прилипания и изменения формы к каждой ссылке
  magnetLinks.forEach((link) => {
    // При наведении на ссылку
    link.addEventListener("mouseenter", () => {
      const linkRect = link.getBoundingClientRect();

      // Создаем строку для path, представляющего прямоугольник
      // const rectPath = `M0 0 H${linkRect.width + 20} V${
      //   linkRect.height + 10
      // } H0 Z`;

      // Анимация "прилипания" и трансформации с помощью MorphSVG
      gsap.to(customCursorSVG, {
        left: linkRect.left + "px",
        top: linkRect.top + "px",
        duration: 0.3,
        ease: "power1.out",
        // inertia: {
        //   left: linkRect.left,
        //   top: linkRect.top,
        //   resistance: 15,
        // },

        // backgroundColor: "#ff6600",
      });

      gsap.to(customCursorPath, {
        morphSVG: {
          shape: "<rect>",
          width: linkRect.width + 20, // Делаем курсор чуть больше ссылки
          height: linkRect.height + 10, // Делаем курсор чуть выше ссылки
          borderRadius: "12px", // Закругленные углы
        },
      });
    });

    // Когда  курсор покидает ссылку
    // link.addEventListener("mouseleave", () => {
    //   // Возвращаем курсор в исходное состояние (круг)
    //   gsap.to(customCursorPath, {
    //     clearProps: "width,height",
    //     borderRadius: "50%",
    //     backgroundColor: "#ff6600",
    //     duration: 0.3,
    //     ease: "power1.out",
    //     morphSVG: { type: "circle" },
    //   });
    // });
  });
});
