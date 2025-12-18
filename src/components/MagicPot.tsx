"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MagicPotProps {
  emojis: string[];
  isCooking: boolean;
  onCookingComplete?: () => void;
}

export function MagicPot({ emojis, isCooking, onCookingComplete }: MagicPotProps) {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [steam, setSteam] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    if (isCooking) {
      // Generate bubbles
      const bubbleInterval = setInterval(() => {
        setBubbles((prev) => [
          ...prev.slice(-10),
          { id: Date.now(), x: Math.random() * 80 + 10, delay: Math.random() * 0.5 },
        ]);
      }, 300);

      // Generate steam
      const steamInterval = setInterval(() => {
        setSteam((prev) => [
          ...prev.slice(-5),
          { id: Date.now(), x: Math.random() * 60 + 20 },
        ]);
      }, 500);

      const timeout = setTimeout(() => {
        clearInterval(bubbleInterval);
        clearInterval(steamInterval);
        onCookingComplete?.();
      }, 4000);

      return () => {
        clearInterval(bubbleInterval);
        clearInterval(steamInterval);
        clearTimeout(timeout);
      };
    } else {
      setBubbles([]);
      setSteam([]);
    }
  }, [isCooking, onCookingComplete]);

  return (
    <div className="relative w-64 h-72 mx-auto">
      {/* Steam particles */}
      <AnimatePresence>
        {steam.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0.6, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -80, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 text-4xl"
            style={{ left: `${s.x}%` }}
          >
            ☁️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Pot */}
      <motion.div
        animate={isCooking ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
        transition={{ duration: 0.3, repeat: isCooking ? Infinity : 0 }}
        className="relative"
      >
        {/* Pot body */}
        <div className="relative">
          {/* Pot opening / liquid */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-32 bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 rounded-b-full overflow-hidden">
            {/* Bubbles inside pot */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0.8, y: 100, scale: 1 }}
                  animate={{ opacity: 0, y: -20, scale: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: bubble.delay }}
                  className="absolute text-2xl"
                  style={{ left: `${bubble.x}%` }}
                >
                  ✨
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Emojis in the pot */}
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <AnimatePresence>
                {emojis.map((emoji, index) => (
                  <motion.span
                    key={`${emoji}-${index}`}
                    initial={{ scale: 0, y: -50 }}
                    animate={{
                      scale: isCooking ? [1, 1.2, 1] : 1,
                      y: 0,
                      rotate: isCooking ? [0, 10, -10, 0] : 0
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: isCooking ? 0.5 : 0.3,
                      repeat: isCooking ? Infinity : 0
                    }}
                    className="text-4xl drop-shadow-lg"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Pot rim */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-52 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg shadow-lg" />

          {/* Pot body (copper) */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-36 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-b-[40%] shadow-xl" />

          {/* Pot handles */}
          <div className="absolute top-16 -left-2 w-8 h-6 bg-gradient-to-r from-amber-700 to-amber-600 rounded-l-full" />
          <div className="absolute top-16 -right-2 w-8 h-6 bg-gradient-to-l from-amber-700 to-amber-600 rounded-r-full" />

          {/* Magical glow when cooking */}
          {isCooking && (
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-44 bg-gradient-to-t from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-xl"
            />
          )}
        </div>
      </motion.div>

      {/* Fire under the pot */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="text-3xl"
          >
            🔥
          </motion.div>
        ))}
      </div>
    </div>
  );
}
