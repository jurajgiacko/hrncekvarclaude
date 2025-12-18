"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagicButton } from "@/components/MagicButton";
import { FloatingEmojis } from "@/components/FloatingEmojis";
import { Sparkles, Book, Wand2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <FloatingEmojis />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
        {/* Animated Pot Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="text-8xl md:text-9xl mb-6"
        >
          🍲
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4"
        >
          <span className="rainbow-text">Hrnček Var!</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-amber-800 text-center max-w-lg mb-8"
        >
          Hoď emoji do hrnčeka a uvar si vlastnú magickú rozprávku!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <Link href="/cook">
            <MagicButton variant="magic" size="lg">
              <span className="flex items-center gap-2">
                <Wand2 size={24} />
                Začať variť!
                <Sparkles size={24} />
              </span>
            </MagicButton>
          </Link>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4"
        >
          {[
            {
              icon: "🎨",
              title: "Vyber emoji",
              desc: "Zvol si až 3 magické emoji ingrediencie",
            },
            {
              icon: "🍲",
              title: "Uvar rozprávku",
              desc: "Hrnček uvarí jedinečný príbeh len pre teba",
            },
            {
              icon: "📖",
              title: "Počúvaj & čítaj",
              desc: "Rozprávku si prečítaj alebo vypočuj",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border-2 border-white/50"
            >
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">{feature.title}</h3>
              <p className="text-amber-700">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Demo section */}
      <section className="py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8">
            Ako to funguje?
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            {[
              { emoji: "🦁", step: "1", text: "Vyber leva" },
              { emoji: "➕", step: "", text: "" },
              { emoji: "👑", step: "2", text: "Pridaj korunu" },
              { emoji: "➕", step: "", text: "" },
              { emoji: "🏰", step: "3", text: "A hrad" },
              { emoji: "➡️", step: "", text: "" },
              { emoji: "📖", step: "✨", text: "Máš rozprávku!" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl">{item.emoji}</span>
                {item.text && (
                  <span className="text-sm text-amber-700 mt-2">{item.text}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/30"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4">
            Pripravený na dobrodružstvo?
          </h2>
          <p className="text-amber-700 mb-6">
            Každá rozprávka je jedinečná - rovnako ako ty!
          </p>
          <Link href="/cook">
            <MagicButton variant="magic" size="lg">
              <span className="flex items-center gap-2">
                <Book size={24} />
                Uvariť rozprávku
              </span>
            </MagicButton>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-amber-700 relative z-10">
        <p>Hrnček Var! - Magické rozprávky pre deti</p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="text-2xl">🇸🇰</span>
          <span className="text-2xl">🇨🇿</span>
          <span className="text-2xl">🇬🇧</span>
        </div>
      </footer>
    </main>
  );
}
