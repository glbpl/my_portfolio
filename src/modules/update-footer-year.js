/**
 * Module for automatic footer year updating
 * @module footerYearChanger
 */

/**
 * Updates the year in an element with class .footer-curent-year
 * @param {string} [selector='.footer-curent-year'] - CSS selector of the element where the year should be updated
 * @returns {boolean} - true if the year was successfully updated, false otherwise
 */
export function updateFooterYear(selector = '.footer-curent-year') {
  // Get current year
  const currentYear = new Date().getFullYear();

  // Find element by selector
  const spanElement = document.querySelector(selector);

  // Replace text inside the element with current year
  if (spanElement) {
    spanElement.textContent = currentYear;
    return true;
  }

  return false;
}

/**
 * Automatically updates the year when the module is imported
 * Called immediately after DOM is loaded
 */
function initFooterYear() {
  // Check if DOM is loaded
  if (document.readyState === 'loading') {
    // If DOM is still loading, add DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', () => {
      updateFooterYear();
    });
  } else {
    // If DOM is already loaded, update the year immediately
    updateFooterYear();
  }
}

// Export object with methods for use in other files
export default {
  updateFooterYear,
  init: initFooterYear
};

// Automatically initialize the module when imported
initFooterYear();