
// Marquee animation module
export const initMarquee = (speed = 50) => {

    // Find all elements with attribute jtr-marquee="true"
    const marqueeElements = document.querySelectorAll('[jtr-marquee="true"]');

    // Process each marquee element
    marqueeElements.forEach(marqueeElement => {
        // Find all logos-wrapper elements inside the marquee
        const logosWrappers = marqueeElement.querySelectorAll('.logos-wrapper');

        // Apply animation to each logos-wrapper
        logosWrappers.forEach(wrapper => {
            // Create GSAP animation for continuous left movement to -100%
            gsap.to(wrapper, {
                xPercent: -100, // Move left by 100% of its own width
                duration: 100 / speed, // Duration based on speed parameter
                ease: "linear",
                repeat: -1, // Infinite repeat
                repeatDelay: 0,
            });
        });
    });
};

// Initialize marquee animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMarquee();
});

// Export function to allow custom speed configuration
export default initMarquee;