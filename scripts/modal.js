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

    // Открытие окна
    // Находим все элементы с классом work-wrapper
    const workWrappers = document.querySelectorAll('.work-wrapper');

    workWrappers.forEach(wrapper => {
        // Добавляем обработчик клика на каждый элемент
        wrapper.addEventListener('click', () => {
            // Получаем значение атрибута work-id у текущего элемента
            // TODO: Заменить поиск элемента по id на поиск по атрибуту
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