/**
 * GSAP ScrollSmoother Configuration
 *
 * Adjust these values to customize the smooth scrolling behavior
 */

export const smoothScrollConfig = {
  // How smooth the scrolling is (0 = no smoothing, 1 = normal, 2 = very smooth, 3+ = extremely smooth)
  smooth: 2,

  // Enable/disable smooth scrolling for touch devices (0 = disabled, 0.1-1 = enabled with varying smoothness)
  smoothTouch: 0.1,

  // Enable data-speed effects (parallax effects on elements)
  effects: true,

  // Normalize scroll behavior across different browsers/devices
  normalizeScroll: true,

  // Ignore specific elements from smooth scrolling
  // ignoreMobileResize: true,

  // Additional options you can uncomment and use:
  // speed: 1, // Speed multiplier (1 = normal speed, 0.5 = half speed, 2 = double speed)
  // preventDefault: true, // Prevent default scroll behavior
};

/**
 * Usage in _app.js:
 *
 * import { smoothScrollConfig } from "@/lib/smoothScrollConfig";
 *
 * ScrollSmoother.create(smoothScrollConfig);
 */
