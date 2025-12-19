"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MagicButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  className = "",
}: MagicButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-violet-500 to-purple-600 text-white
      shadow-[0_4px_0_0_#6d28d9,0_6px_20px_rgba(139,92,246,0.4)]
      hover:shadow-[0_6px_0_0_#6d28d9,0_8px_25px_rgba(139,92,246,0.5)]
      active:shadow-[0_2px_0_0_#6d28d9,0_4px_15px_rgba(139,92,246,0.3)]
      hover:-translate-y-0.5 active:translate-y-0.5
    `,
    secondary: `
      bg-gradient-to-r from-cyan-400 to-cyan-500 text-white
      shadow-[0_4px_0_0_#0891b2,0_6px_20px_rgba(6,182,212,0.4)]
      hover:shadow-[0_6px_0_0_#0891b2,0_8px_25px_rgba(6,182,212,0.5)]
      active:shadow-[0_2px_0_0_#0891b2,0_4px_15px_rgba(6,182,212,0.3)]
      hover:-translate-y-0.5 active:translate-y-0.5
    `,
    ghost: `
      bg-white/80 text-violet-600 border-2 border-violet-200
      hover:bg-violet-50 hover:border-violet-300
      shadow-sm hover:shadow-md
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`
        font-bold rounded-2xl transition-all duration-200
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed !shadow-none !transform-none" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
