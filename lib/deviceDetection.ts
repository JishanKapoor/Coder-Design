/**
 * Device detection utilities for animation handling
 */

/**
 * Determines if animations should be enabled based on device and browser
 * @returns boolean indicating if animations should be enabled
 */
export function shouldEnableAnimations(): boolean {
  if (typeof window === "undefined") return true;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return false;

  // Enable animations for all modern browsers
  return true;
}
