"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ConditionalMotionProps {
  children: ReactNode;
  initial?: any;
  animate?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  className?: string;
  [key: string]: any;
}

/**
 * ✅ Optimized motion component - Always uses motion.div
 * (No conditional rendering that causes re-mounts)
 */
export function ConditionalMotion({
  children,
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  whileHover,
  whileTap,
  className,
  ...rest
}: ConditionalMotionProps) {
  // Always render motion.div for consistent performance
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
