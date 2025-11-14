"use client";
import { shouldEnableAnimations } from "../../lib/deviceDetection";

/**
 * Hook to determine if animations should be enabled.
 * - Enables animations for all browsers.
 * - Uses reduced motion preference if set by the user.
 * - Special handling for iOS Safari to prevent animation flicker on refresh.
 */
export const useAnimations = (): boolean => {
  // Respect user preference
  if (typeof window !== "undefined") {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;
  }

  // iOS Safari fix — enable animations but with forced reflow protection
  return shouldEnableAnimations();
};

/**
 * Helper function for conditional motion props
 */
export const getMotionProps = (shouldAnimate: boolean, props: any) => {
  return shouldAnimate ? props : {};
};
