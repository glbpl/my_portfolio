document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(GSDevTools);
  gsap.registerPlugin(ScrambleTextPlugin);

  // Animate Hero page Text and Marquee
  {
    // Animate Text of Hero page
    const tl_hero_text = gsap.timeline();

    tl_hero_text.from(".hero_main-text", {
      y: "-5rem",
      opacity: 0,
    });

    tl_hero_text.from(
      ".hero-text",
      {
        y: "5rem",
        opacity: 0,
      },
      "<"
    );

    tl_hero_text.from(
      ".hero_cta-button",
      {
        y: "5rem",
        opacity: 0,
      },
      "<"
    );

    tl_hero_text.from(".section_marquee", {
      y: "5rem",
      opacity: 0,
    });

    // Animate background of text
    gsap.from(".hero_main-text", {
      backgroundPosition: "100% center", // Animate to the right
      duration: 5, // Animation duration (in seconds)
      repeat: -1, // Infinite loop
      ease: "sine.inOut",
      yoyo: true, // Move back and forth (optional)
    });
  }

  // Animate Hero page Monitor
  {
    // Вычисляем перемещение двух мониторов
    // Узнаем ширину Вьюпорат
    let element = document.querySelector(".monitor_viewport");
    const widthViewport = element.getBoundingClientRect().width;

    // Узнаем ширину Монитора
    element = document.querySelector(".monitor_window-portfolio");
    const widthMonitor = element.getBoundingClientRect().width;

    const deltaX = widthViewport - (widthViewport - widthMonitor) / 2 + 1;

    // Создаем таймлайн
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

    // Горизонтальный скролл влево первого монитора
    tl.to(".monitor_window-portfolio", {
      x: -deltaX,
      duration: 5,
    });

    // Горизонтальный скролл влево второго монитора
    tl.to(
      ".monitor_window-webflow",
      {
        x: -deltaX,
        duration: 5,
      },
      "<"
    );

    // Показываем анимацию прелоудера
    tl.from(
      ".monitor_lightning-load",
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

    // Скейл окна
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
    tl.to(".monitor_screen", {
      duration: 2,
    });

    // Исчезновение окна после скейла как фона (оставляем просто белый фон)
    tl.set(
      ".monitor_screen-img",
      {
        opacity: 0,
      },
      "<"
    ).set(
      ".monitor_window-webflow",
      {
        backgroundImage: "none",
      },
      "<"
    );

    // Появление текста More about me
    tl.from(
      ".about-me-more",
      {
        opacity: 0,
        x: -40,
        duration: 1,
      },
      "7.45"
    );

    // Появление Фото
    tl.from(
      ".my-photo",
      {
        opacity: 0,
        x: +40,
        duration: 1,
      },
      "7.45"
    );

    // Появление бейджа My Credo
    tl.from(
      ".my-credo",
      {
        border: "1px solid rgba(0, 0, 0, 0)",
        duration: 0.5,
      },
      "8"
    );

    tl.from(
      ".my-credo_bage",
      {
        opacity: 0,
        duration: 0.5,
      },
      "<"
    );

    // Исчезание бейджа My Credo
    tl.to(
      ".my-credo",
      {
        border: "1px solid rgba(0, 0, 0, 0)",
        duration: 0.5,
      },
      "11"
    );

    tl.to(
      ".my-credo_bage",
      {
        opacity: 0,
        duration: 0.5,
      },
      "<"
    );
  }

});
