"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface DroppablePotProps {
  emojis: string[];
  isOver?: boolean;
  isCooking: boolean;
  onCookingComplete?: () => void;
}

export function DroppablePot({ emojis, isOver, isCooking, onCookingComplete }: DroppablePotProps) {
  const { setNodeRef } = useDroppable({ id: "pot" });
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  // Generate bubbles when cooking
  useEffect(() => {
    if (isCooking) {
      const bubbleInterval = setInterval(() => {
        setBubbles((prev) => [
          ...prev.slice(-10),
          { id: Date.now(), x: 20 + Math.random() * 60, size: 6 + Math.random() * 12 },
        ]);
      }, 150);

      const timeout = setTimeout(() => {
        clearInterval(bubbleInterval);
        onCookingComplete?.();
      }, 3500);

      return () => {
        clearInterval(bubbleInterval);
        clearTimeout(timeout);
      };
    }
    setBubbles([]);
  }, [isCooking, onCookingComplete]);

  // Create particle effect when emoji is dropped
  const createDropParticles = (emoji: string) => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 30 + Math.random() * 20,
      emoji: ["✨", "⭐", "💫"][Math.floor(Math.random() * 3)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => !newParticles.includes(p))), 1000);
  };

  useEffect(() => {
    if (emojis.length > 0) {
      createDropParticles(emojis[emojis.length - 1]);
    }
  }, [emojis.length]);

  return (
    <div ref={setNodeRef} className="relative w-80 h-96 mx-auto">
      {/* Drop zone indicator */}
      <AnimatePresence>
        {isOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-full bg-violet-400/20 border-4 border-dashed border-violet-400 z-0"
          />
        )}
      </AnimatePresence>

      {/* Glow effect */}
      <motion.div
        animate={{
          scale: isOver ? 1.3 : isCooking ? [1, 1.2, 1] : 1,
          opacity: isOver ? 0.6 : isCooking ? [0.3, 0.5, 0.3] : 0.2,
        }}
        transition={{ duration: isCooking ? 1.5 : 0.3, repeat: isCooking ? Infinity : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-violet-500/40 via-cyan-400/30 to-transparent rounded-full blur-3xl"
      />

      {/* Particle effects */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: `${p.x}%`, y: `${p.y}%` }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: `${p.y - 30}%`,
              x: `${p.x + (Math.random() - 0.5) * 20}%`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-2xl pointer-events-none"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main pot */}
      <motion.div
        animate={isCooking ? { rotate: [-1, 1, -1] } : isOver ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.2, repeat: isCooking ? Infinity : 0 }}
        className="relative h-full"
      >
        {/* Steam when cooking */}
        <AnimatePresence>
          {isCooking && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: (i - 1.5) * 15 }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    y: -80,
                    x: (i - 1.5) * 25,
                    scale: [0.5, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute bottom-0 left-1/2 w-10 h-10 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${
                      ["rgba(139,92,246,0.5)", "rgba(6,182,212,0.5)", "rgba(244,114,182,0.5)", "rgba(251,191,36,0.5)"][i]
                    } 0%, transparent 70%)`,
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* SVG Pot */}
        <svg
          viewBox="0 0 240 220"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: `drop-shadow(0 25px 50px rgba(139, 92, 246, ${isOver ? 0.5 : 0.3}))` }}
        >
          <defs>
            <linearGradient id="dropPotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="dropLiquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isOver ? "#a78bfa" : "#22d3ee"} />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="dropRimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Liquid wave pattern */}
            <pattern id="wavePattern" x="0" y="0" width="40" height="10" patternUnits="userSpaceOnUse">
              <motion.path
                d="M0 5 Q10 0 20 5 T40 5"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                animate={{ x: [0, -40] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </pattern>
          </defs>

          {/* Pot body */}
          <ellipse cx="120" cy="180" rx="85" ry="35" fill="url(#dropPotGradient)" />
          <path
            d="M 35 100 L 35 180 Q 35 215 120 215 Q 205 215 205 180 L 205 100"
            fill="url(#dropPotGradient)"
          />

          {/* Pot highlight */}
          <path
            d="M 45 110 L 45 165 Q 45 175 65 185"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Rim */}
          <ellipse cx="120" cy="100" rx="92" ry="28" fill="url(#dropRimGradient)" />

          {/* Liquid surface */}
          <ellipse
            cx="120"
            cy="100"
            rx="78"
            ry="20"
            fill="url(#dropLiquidGradient)"
            className={isOver ? "animate-pulse" : ""}
          />

          {/* Wave overlay on liquid */}
          <ellipse cx="120" cy="100" rx="78" ry="20" fill="url(#wavePattern)" opacity="0.5" />

          {/* Handles */}
          <ellipse cx="15" cy="130" rx="15" ry="28" fill="url(#dropPotGradient)" />
          <ellipse cx="225" cy="130" rx="15" ry="28" fill="url(#dropPotGradient)" />

          {/* Bubbles */}
          <AnimatePresence>
            {bubbles.map((bubble) => (
              <motion.circle
                key={bubble.id}
                cx={35 + (bubble.x / 100) * 170}
                cy={105}
                r={bubble.size / 2}
                fill="rgba(255,255,255,0.7)"
                initial={{ cy: 105, opacity: 0.8, scale: 1 }}
                animate={{ cy: 60, opacity: 0, scale: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            ))}
          </AnimatePresence>
        </svg>

        {/* Emojis in pot */}
        <div className="absolute top-[85px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
          <AnimatePresence>
            {emojis.map((emoji, index) => (
              <motion.div
                key={`${emoji}-${index}`}
                initial={{ scale: 0, y: -60, rotate: -180 }}
                animate={{
                  scale: 1,
                  y: isCooking ? [0, -10, 0] : 0,
                  rotate: isCooking ? [0, 15, -15, 0] : 0,
                }}
                exit={{ scale: 0, y: 40, opacity: 0 }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  y: { duration: 0.5, repeat: isCooking ? Infinity : 0 },
                  rotate: { duration: 0.7, repeat: isCooking ? Infinity : 0 },
                }}
                className="text-4xl drop-shadow-lg"
              >
                {emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Drop hint */}
        {emojis.length === 0 && !isCooking && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-[75px] left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <span className="text-3xl">👇</span>
            <p className="text-violet-600/60 text-sm font-medium mt-1">Hoď sem emoji!</p>
          </motion.div>
        )}
      </motion.div>

      {/* Progress bar when cooking */}
      {isCooking && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3.5, ease: "linear" }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400 rounded-full origin-left shadow-lg"
        />
      )}
    </div>
  );
}
