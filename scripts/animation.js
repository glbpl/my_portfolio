document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(DrawSVGPlugin);
  gsap.from(".test-path", { duration: 1.5, drawSVG: 1 });
});
