"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "magic";
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
  const baseStyles = "font-bold rounded-full shadow-lg transition-all relative overflow-hidden";

  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600",
    secondary: "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600",
    magic: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {/* Sparkle effect */}
      {variant === "magic" && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
