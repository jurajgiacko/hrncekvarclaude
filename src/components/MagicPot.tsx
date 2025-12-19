"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MagicPotProps {
  emojis: string[];
  isCooking: boolean;
  onCookingComplete?: () => void;
}

export function MagicPot({ emojis, isCooking, onCookingComplete }: MagicPotProps) {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (isCooking) {
      const bubbleInterval = setInterval(() => {
        setBubbles((prev) => [
          ...prev.slice(-8),
          {
            id: Date.now(),
            x: 20 + Math.random() * 60,
            size: 8 + Math.random() * 16,
          },
        ]);
      }, 200);

      const sparkleInterval = setInterval(() => {
        setSparkles((prev) => [
          ...prev.slice(-6),
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
          },
        ]);
      }, 300);

      const timeout = setTimeout(() => {
        clearInterval(bubbleInterval);
        clearInterval(sparkleInterval);
        onCookingComplete?.();
      }, 3500);

      return () => {
        clearInterval(bubbleInterval);
        clearInterval(sparkleInterval);
        clearTimeout(timeout);
      };
    } else {
      setBubbles([]);
      setSparkles([]);
    }
  }, [isCooking, onCookingComplete]);

  return (
    <div className="relative w-72 h-80 mx-auto">
      {/* Glow effect behind pot */}
      <motion.div
        animate={isCooking ? {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        } : { scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-violet-500/40 via-cyan-400/30 to-transparent rounded-full blur-3xl"
      />

      {/* Sparkles when cooking */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute text-2xl"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main pot container */}
      <motion.div
        animate={isCooking ? { rotate: [-1, 1, -1] } : { rotate: 0 }}
        transition={{ duration: 0.2, repeat: isCooking ? Infinity : 0 }}
        className="relative h-full"
      >
        {/* Steam/magic particles */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-20">
          <AnimatePresence>
            {isCooking && [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: -60,
                  x: [0, (i - 1) * 20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                className="absolute bottom-0 left-1/2 w-8 h-8 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${
                    i === 0 ? 'rgba(139,92,246,0.4)' :
                    i === 1 ? 'rgba(6,182,212,0.4)' :
                    'rgba(244,114,182,0.4)'
                  } 0%, transparent 70%)`,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pot SVG */}
        <svg
          viewBox="0 0 200 180"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3))' }}
        >
          {/* Pot body gradient */}
          <defs>
            <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="potHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="rimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          {/* Pot body */}
          <ellipse cx="100" cy="140" rx="70" ry="30" fill="url(#potGradient)" />
          <path
            d="M 30 80 L 30 140 Q 30 170 100 170 Q 170 170 170 140 L 170 80"
            fill="url(#potGradient)"
          />

          {/* Pot highlight */}
          <path
            d="M 35 85 L 35 135 Q 35 145 50 150"
            fill="none"
            stroke="url(#potHighlight)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Pot rim */}
          <ellipse cx="100" cy="80" rx="75" ry="20" fill="url(#rimGradient)" />
          <ellipse cx="100" cy="80" rx="65" ry="15" fill="url(#liquidGradient)" />

          {/* Handles */}
          <ellipse cx="12" cy="100" rx="12" ry="20" fill="url(#potGradient)" />
          <ellipse cx="188" cy="100" rx="12" ry="20" fill="url(#potGradient)" />

          {/* Bubbles in liquid */}
          <AnimatePresence>
            {bubbles.map((bubble) => (
              <motion.circle
                key={bubble.id}
                cx={30 + (bubble.x / 100) * 140}
                cy={90}
                r={bubble.size / 2}
                fill="rgba(255,255,255,0.6)"
                initial={{ cy: 90, opacity: 0.8 }}
                animate={{ cy: 50, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            ))}
          </AnimatePresence>
        </svg>

        {/* Emojis floating in pot */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 w-32">
          <AnimatePresence>
            {emojis.map((emoji, index) => (
              <motion.div
                key={`${emoji}-${index}`}
                initial={{ scale: 0, y: -30, rotate: -180 }}
                animate={{
                  scale: 1,
                  y: isCooking ? [0, -8, 0] : 0,
                  rotate: isCooking ? [0, 10, -10, 0] : 0,
                }}
                exit={{ scale: 0, y: 30, opacity: 0 }}
                transition={{
                  scale: { type: "spring", bounce: 0.5 },
                  y: { duration: 0.6, repeat: isCooking ? Infinity : 0 },
                  rotate: { duration: 0.8, repeat: isCooking ? Infinity : 0 },
                }}
                className="text-4xl drop-shadow-lg"
              >
                {emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Cooking progress indicator */}
      {isCooking && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3.5, ease: "linear" }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400 rounded-full origin-left"
        />
      )}
    </div>
  );
}
