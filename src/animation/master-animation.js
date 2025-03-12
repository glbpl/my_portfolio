import animateHeroPage from '@animation/hero-page.js';
import animateHeroMonitor from '@animation/hero-monitor.js';

export default function start() {
  gsap.timeline()
    .add(animateHeroPage())
    .add(animateHeroMonitor());
}
