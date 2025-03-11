import footerYearChanger from './update-footer-year.js';

// Initialization of the footer year changer plugin
footerYearChanger.init();

// Initialization Swaper.js for section of "What my clients are saying"
const swiper = new Swiper('.swiper', {
    effect: "cards",
    grabCursor: false,
});