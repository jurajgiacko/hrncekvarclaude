"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FLOATING_EMOJIS = ["✨", "⭐", "🌟", "💫", "🌈", "🦄", "🎈", "🍭", "🌸", "🦋"];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  duration: number;
  delay: number;
}

export function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const initialEmojis = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
      x: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setEmojis(initialEmojis);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute text-3xl opacity-40"
          style={{ left: `${emoji.x}%` }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: emoji.duration,
            repeat: Infinity,
            delay: emoji.delay,
            ease: "linear",
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}
    </div>
  );
}
