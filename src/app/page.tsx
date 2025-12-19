"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagicButton } from "@/components/MagicButton";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="text-2xl font-bold gradient-text">Hrnček Var!</div>
        <div className="flex gap-2">
          {["🇸🇰", "🇨🇿", "🇬🇧"].map((flag) => (
            <button
              key={flag}
              className="text-xl hover:scale-110 transition-transform"
            >
              {flag}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-12">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-tight"
          >
            Uvar si
            <span className="gradient-text"> magickú </span>
            rozprávku
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 mb-8"
          >
            Vyber 3 emoji ingrediencie a náš čarovný hrnček ti uvarí
            jedinečnú rozprávku. Každá je iná!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/cook">
              <MagicButton size="lg">
                <span className="flex items-center gap-2">
                  <Sparkles size={24} />
                  Začať variť
                </span>
              </MagicButton>
            </Link>
          </motion.div>

          {/* Quick demo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="text-slate-400">Napríklad:</span>
            <div className="flex gap-2">
              {["🦁", "👑", "🏰"].map((emoji, i) => (
                <motion.span
                  key={emoji}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                  className="text-3xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <span className="text-slate-400">=</span>
            <span className="text-2xl">📖✨</span>
          </motion.div>
        </motion.div>

        {/* Right - 3D Pot illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          {/* Glow behind pot */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl scale-150" />

          {/* Pot SVG */}
          <motion.svg
            viewBox="0 0 300 280"
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 30px 60px rgba(139, 92, 246, 0.4))' }}
          >
            <defs>
              <linearGradient id="heroPotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="heroLiquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="heroRimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Pot body */}
            <ellipse cx="150" cy="220" rx="100" ry="40" fill="url(#heroPotGradient)" />
            <path
              d="M 50 120 L 50 220 Q 50 260 150 260 Q 250 260 250 220 L 250 120"
              fill="url(#heroPotGradient)"
            />

            {/* Highlight */}
            <path
              d="M 60 130 L 60 200 Q 60 210 80 220"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Rim */}
            <ellipse cx="150" cy="120" rx="110" ry="30" fill="url(#heroRimGradient)" />
            <ellipse cx="150" cy="120" rx="95" ry="22" fill="url(#heroLiquidGradient)" />

            {/* Handles */}
            <ellipse cx="20" cy="150" rx="18" ry="30" fill="url(#heroPotGradient)" />
            <ellipse cx="280" cy="150" rx="18" ry="30" fill="url(#heroPotGradient)" />

            {/* Floating emojis */}
            <g className="animate-float">
              <text x="110" y="100" fontSize="32">🦄</text>
              <text x="150" y="90" fontSize="28">✨</text>
              <text x="175" y="105" fontSize="30">🌈</text>
            </g>

            {/* Sparkles */}
            {[
              { x: 80, y: 60, delay: 0 },
              { x: 220, y: 70, delay: 0.3 },
              { x: 150, y: 40, delay: 0.6 },
            ].map((spark, i) => (
              <motion.text
                key={i}
                x={spark.x}
                y={spark.y}
                fontSize="20"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: spark.delay }}
              >
                ✨
              </motion.text>
            ))}
          </motion.svg>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🎨", title: "Vyber emoji", desc: "Zvol si až 3 ingrediencie" },
            { icon: "🍲", title: "Uvar príbeh", desc: "Hrnček vytvorí rozprávku" },
            { icon: "🔊", title: "Počúvaj", desc: "V SK, CZ alebo EN" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>Hrnček Var! - Magické rozprávky pre deti</p>
      </footer>
    </main>
  );
}
