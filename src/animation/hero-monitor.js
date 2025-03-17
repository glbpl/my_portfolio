

// Сцена движения окон влево и анимация загрузки webflow
function sceneWindowsLeft() {

    const tl = gsap.timeline();

    // Горизонтальный скролл влево первого и второго окна 
    tl.to(".monitor_windows",
        {
            duration: 4,
            x: "-50%",
        },
    );

    // Показываем анимацию прелоудера
    tl.from(".monitor_lightning-load",
        {
            scaleX: 0,
            duration: 4,
            ease: "power4.in",
        },
        "<+=0.5"
    );

    // Плавное исчезновение окна загрузки webflow
    tl.to(".monitor_loading-webflow", {
        autoAlpha: 0,
        duration: 0.5,
    });

    return tl;
}

// Сцена скейла окна и его исчезновение как фона
function sceneScaleWindow() {

    const tl = gsap.timeline();

    tl.to(".monitor_screen", {
        scale: 4,
        duration: 4,
        ease: "power2.in",
    });

    // Фон окна делаем прозрачным
    tl.to(".monitor_window-webflow", {
        backgroundColor: "transparent", // Используем backgroundColor
        duration: 1,
    });

    // Ничегонеделание
    // tl.to(".monitor_screen", {
    //     duration: 2,
    // });

    // Исчезновение окна после скейла как фона (оставляем просто белый фон)
    tl.set(
        ".monitor_screen-img",
        {
            opacity: 0,
        },
        "<"
    ).set(
        ".background-image-wf",
        {
            // backgroundImage: "none",
            opacity: 0,
        },
        "<"
    );

    return tl;
}

// Сцена появление контента внутри окна
function sceneWindowContent() {

    const tl = gsap.timeline();

    // Появление бейджа My Credo
    tl.from(
        ".my-credo_block",
        {
            border: "1px solid rgba(0, 0, 0, 0)",
            duration: 0.5,
        },
    );

    tl.from(
        ".my-credo_bage",
        {
            opacity: 0,
            duration: 0.5,
        },
        "<"
    );

    // Появление текста More about me
    tl.from(
        ".about-me-more",
        {
            opacity: 0,
            x: -40,
            duration: 1.5,
        },
        "<0.5"
    );

    // Появление Фото
    tl.from(
        ".my-photo",
        {
            opacity: 0,
            x: +40,
            duration: 1.5,
        },
        "<"
    );



    // Исчезание бейджа My Credo
    tl.to(
        ".my-credo_block",
        {
            border: "1px solid rgba(0, 0, 0, 0)",
            duration: 0.5,
        },
        "<70%"
    );

    tl.to(
        ".my-credo_bage",
        {
            opacity: 0,
            duration: 0.5,
        },
        "<"
    );

    return tl;

}

// Мастер анимация монитора при скроле страницы
export default function animateHeroMonitor() {

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".monitor",
            pin: true,
            start: "center center",
            end: "+=3000",
            scrub: 1,
            markers: false,
        },
    });

    tl.add(sceneWindowsLeft());

    tl.add(sceneScaleWindow());

    tl.add(sceneWindowContent(), '<40%');

}