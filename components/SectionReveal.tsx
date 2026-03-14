"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}