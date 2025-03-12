import yearChanger from '@modules/update-footer-year.js';
import animate from '@animation/master-animation.js';

// Registration of the GSAP plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(ScrambleTextPlugin);

// Initialization of the footer year changer plugin
yearChanger.updateFooterYear('.footer-curent-year');

document.addEventListener('DOMContentLoaded', () => {
    // Initialization and start animation
    animate();

    // Initialization Swaper.js for section of "What my clients are saying"
    const swiper = new Swiper('.swiper', {
        effect: "cards",
        grabCursor: false,
    });
});


