
import yearChanger from '@modules/update-footer-year.js';
import animate from '@animation/master-animation.js';
import initMarquee from '@modules/marquee';

// Registration of the GSAP plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(ScrambleTextPlugin);

document.addEventListener('DOMContentLoaded', () => {

    // Initialize and start animation
    animate();

    // Initialize marquee animation
    initMarquee(5);

    // Initialization of the footer year changer plugin
    yearChanger.updateFooterYear('.footer-curent-year');

    // Initialization Swaper.js for section of "What my clients are saying"
    const swiper = new Swiper('.swiper', {
        effect: "cards",
        grabCursor: false,
    });
});


