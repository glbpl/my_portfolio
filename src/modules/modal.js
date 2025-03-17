document.addEventListener("DOMContentLoaded", function () {

    // Закрытие окна
    const overlays = document.querySelectorAll('.modal-window');
    const tl_modal_window = gsap.timeline();

    overlays.forEach(overlay => {
        // Добавляем обработчик события клика
        overlay.addEventListener('click', () => {
            // Используем GSAP для плавного исчезновения
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.5, // Длительность анимации в секундах
                onComplete: () => {
                    overlay.classList.add('is-hidden');
                }
            });
        });
    });

    // Открытие окна портфолио
    // Находим все элементы с классом work-wrapper
    const workWrappers = document.querySelectorAll('.work-wrapper');

    workWrappers.forEach(wrapper => {
        // Добавляем обработчик клика на каждый элемент
        wrapper.addEventListener('click', () => {
            // Получаем значение атрибута work-id у текущего элемента
            const workId = wrapper.getAttribute('work-id');

            // Находим внутри works-windows элемент с таким же work-id
            const worksWindows = document.querySelector('.works-windows');
            const targetElement = worksWindows.querySelector(`[work-id="${workId}"]`);

            if (targetElement) {

                gsap.set(targetElement, {
                    opacity: 0,
                });

                gsap.to(targetElement, {
                    opacity: 1,
                    duration: 0.5, // Длительность анимации в секундах
                    onStart: () => {
                        targetElement.classList.remove('is-hidden');
                    }
                });
            } else {
                console.log('Элемент с таким work-id не найден.');
            }
        });
    });
});



//Modal Contact Window
// Animation of Modal Form Box
document.addEventListener("DOMContentLoaded", function () {
    const modal1 = document.getElementById("modal-contact-form");
    const modal2 = document.getElementById("modal-about-window");

    const openModal1Buttons = document.querySelectorAll(".open-contact-form");
    const openModal2Buttons = document.querySelectorAll(".open-about-window");

    const closeModalButtons = document.querySelectorAll(".close-modal");

    // Функция для открытия модального окна 
    function openModal(modal) {
        const contentWrapper = modal.querySelector(".contact-modal_content-wrapper");
        const contentOverlay = modal;

        // Оверлей и Окно делаем прозрачными
        gsap.set([contentWrapper, contentOverlay], {
            opacity: 0,
        });

        // Включаем элемент в DOM (делаем видимым но прозрачным)
        modal.classList.remove("hidden");

        // Анимируем появление фона и окна
        gsap.to(contentOverlay, {
            opacity: 1,
            duration: 0.3
        });

        // Анимация contentWrapper (въезд снизу)
        gsap.from(contentWrapper, {
            y: window.innerHeight,
            duration: 0.5,
            ease: "power2.out", // Плавное движение
        });

        gsap.to(contentWrapper, {
            opacity: 1,
            duration: 0.3
        });

        // Добавляем слушатель события keydown на весь документ
        document.addEventListener("keydown", function (event) {
            // Проверяем, была ли нажата клавиша Escape
            if (event.key === "Escape") {
                // Выполняем действие
                closeModal(modal);
            }
        });

    }

    // Функция для закрытия модального окна
    function closeModal(modal) {
        const contentWrapper = modal.querySelector(".contact-modal_content-wrapper");
        const contentOverlay = modal;

        // Анимируем исчезновение фона и окна
        gsap.to(contentOverlay, {
            opacity: 0,
            duration: 0.3
        });

        gsap.to(contentWrapper, {
            opacity: 0,
            duration: 0.3
        });

        // Выключаем элемент из DOM 
        modal.classList.add("hidden");
    }

    // Добавляем обработчики событий на кнопки для открытия первого модального окна
    openModal1Buttons.forEach(button => {
        button.addEventListener("click", () => openModal(modal1));
    });

    // Добавляем обработчики событий на кнопки для открытия окна About
    openModal2Buttons.forEach(button => {
        button.addEventListener("click", () => openModal(modal2));
    });

    // Добавляем обработчики событий на кнопки для закрытия модальных окон
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parentModal = button.closest(".modal_component");
            closeModal(parentModal);
        });
    });


});
