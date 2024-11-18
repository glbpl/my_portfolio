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
  let customCursorSVG = document.querySelector(pageCursorSelector);
  const body = document.querySelector("body");
  let cursorFixed = false; // Флаг для фиксации курсора

  resizeSVGToFitContent(customCursorSVG);

  // Курсор для всей страницы (круг)
  body.addEventListener("mousemove", (e) => {
    if (!cursorFixed) {
      customCursorSVG.style.left = `${e.clientX}px`; // Позиционируем по X
      customCursorSVG.style.top = `${e.clientY}px`; // Позиционируем по Y
    }
  });

  // Функции для фиксации и разблокировки курсора
  const fixCursor = () => {
    cursorFixed = true;
  };

  const releaseCursor = () => {
    cursorFixed = false;
  };

  // Возвращаем функции фиксации и разблокировки
  return { fixCursor, releaseCursor };
}

/**
 * Функция меняет размер svg под размер его содержимого
 * @param {svg} svg
 * @returns {svg}
 */
function resizeSVGToFitContent(svg, width = null, height = null) {
  // Получаем размеры содержимого внутри SVG
  const bbox = svg.getBBox();

  // Если заданы параметры width и height, используем их
  if (width !== null && height !== null) {
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
  } else {
    // Если width и height не заданы, подстраиваем размеры под содержимое
    svg.setAttribute("width", bbox.width);
    svg.setAttribute("height", bbox.height);
  }

  // Устанавливаем viewBox, чтобы подогнать видимую область под содержимое
  svg.setAttribute(
    "viewBox",
    `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
  );

  // Возвращаем обновленный SVG
  return svg;
}

/**
 * Делаем прилипание к ссылкам и преобразуем указатель
 * @param {string} linksClass - Название класса ссылок на которох будет прилипание и преобразование
 * @param {string} cursorSelector - Класс указателя
 */
function createMagicCursor(linksClass, cursorSelector) {
  const magnetLinks = document.querySelectorAll(linksClass);
  const customCursorSVG = document.querySelector(cursorSelector);

  // Вызов createCustomCursor внутри createMagicLinks
  const { fixCursor, releaseCursor } = createCustomCursor(cursorSelector);

  // Конвертируем элемент-курсор circle в path
  MorphSVGPlugin.convertToPath(`${cursorSelector} circle`);

  const customCursorPath = document.querySelector(`${cursorSelector} path`);

  // Перебираем все ссылки
  magnetLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const linkRect = link.getBoundingClientRect();

      // Создаем прямоугольник
      const rectPath = createRoundedSquarePath(
        linkRect.width,
        linkRect.height,
        10
      );

      // Фиксируем курсор
      fixCursor();

      // TODO: Узнать подробнее как работает параметр ViewBox в SVG
      // Изменяем размер SVG под рамзер прямоугольника
      resizeSVGToFitContent(customCursorSVG, linkRect.width, linkRect.height);

      // Анимация "прилипания" и трансформации с помощью MorphSVG
      gsap.to(customCursorSVG, {
        left: linkRect.left + "px",
        top: linkRect.top + "px",
        duration: 0.3,
        ease: "power1.out",
        // inertia: {
        //   resistance: 15,
        // },
      });

      gsap.to(customCursorPath, {
        duration: 0.8,
        ease: "power1.out",
        morphSVG: {
          shape: rectPath,
        },
      });
    });

    // Когда  курсор покидает ссылку
    link.addEventListener("mouseleave", () => {
      // Возвращаем курсор в исходное состояние
      // releaseCursor();

      // Возвращаем курсор в исходное состояние (круг)
      gsap.to(customCursorPath, {
        duration: 0.8,
        ease: "power1.out",
        morphSVG: { shape: customCursorPath },
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Убедись, что плагины GSAP подключены, если они не подключены через CDN или локально
  gsap.registerPlugin(MorphSVGPlugin, InertiaPlugin);

  // createCustomCursor(".custom-cursor");
  create3dCards(".work-wrapper", ".works_custom-cursor", ".custom-cursor");
  createMagicCursor(".magnet-link", ".custom-cursor");
});
