// Анимация появления элементов после загрузки страницы 
export default function animateHeroPage() {
    const tl = gsap.timeline();

    tl.from(".hero_main-text", {
        y: "-5rem",
        opacity: 0,
    });

    tl.from( 
        ".hero-text",
        {
            y: "5rem",
            opacity: 0,
        },
        "<"
    );

    tl.from(
        ".hero_cta-button",
        {
            y: "5rem",
            opacity: 0,
        },
        "<"
    );

    // Animate background of text
    tl.from(".hero_main-text", {
        backgroundPosition: "100% center", // Animate to the right
        duration: 5, // Animation duration (in seconds)
        repeat: -1, // Infinite loop
        ease: "sine.inOut",
        yoyo: true, // Move back and forth (optional)
    }, "<");

    return tl;
}