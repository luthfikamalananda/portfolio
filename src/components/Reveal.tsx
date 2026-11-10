"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useUI } from "./UIProvider";

/**
 * Text/blocks that settle in when scrolled into view: blur → sharp, rising a little.
 * Unhurried (1s) and starts once half the block is visible, so a nav jump finishes
 * scrolling before most of it plays. Chain several with increasing `delay` to read top-to-bottom.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { reducedMotion } = useUI();
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
