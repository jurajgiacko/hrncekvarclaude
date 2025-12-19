"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagicButton } from "@/components/MagicButton";
import { Sparkles, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// Mock reviews
const REVIEWS = [
  {
    name: "Martina K.",
    location: "Bratislava",
    text: "Syn je nadšený! Každý večer chce novú rozprávku a vždy je prekvapený, čo hrnček uvarí.",
    avatar: "👩",
    rating: 5,
  },
  {
    name: "Petr N.",
    location: "Praha",
    text: "Konečně něco, co děti baví a zároveň rozvíjí jejich fantazii. Doporučuji!",
    avatar: "👨",
    rating: 5,
  },
  {
    name: "Jana M.",
    location: "Košice",
    text: "Dcérka si sama vyberá emoji a potom počúvame rozprávku spolu. Krásne rodinné chvíle.",
    avatar: "👩‍🦰",
    rating: 5,
  },
];

// Story themes
const THEMES = [
  { emoji: "😨", title: "Strach", desc: "Pomáha deťom prekonať obavy", color: "from-blue-400 to-blue-600" },
  { emoji: "💝", title: "Emócie", desc: "Učí rozpoznávať pocity", color: "from-pink-400 to-pink-600" },
  { emoji: "👨‍👩‍👧", title: "Rodina", desc: "Posilňuje rodinné väzby", color: "from-amber-400 to-amber-600" },
  { emoji: "🦄", title: "Byť iný", desc: "Prijatie odlišnosti", color: "from-purple-400 to-purple-600" },
  { emoji: "🤝", title: "Láskavosť", desc: "Učí empatii a pomoci", color: "from-green-400 to-green-600" },
  { emoji: "✨", title: "Mágia", desc: "Rozvíja fantáziu", color: "from-violet-400 to-violet-600" },
];

// FAQ items
const FAQ_ITEMS = [
  {
    q: "Ako Hrnček Var! funguje?",
    a: "Dieťa si vyberie až 3 emoji, ktoré hodia do hrnčeka. Naša AI potom vytvorí jedinečnú rozprávku práve z týchto ingrediencií. Každá rozprávka je iná!",
  },
  {
    q: "Pre aký vek je aplikácia vhodná?",
    a: "Hrnček Var! je navrhnutý pre deti od 3 do 10 rokov. Rozprávky sa automaticky prispôsobujú veku dieťaťa.",
  },
  {
    q: "Je to bezpečné pre deti?",
    a: "Áno! Všetok obsah je generovaný s prísnymi bezpečnostnými pravidlami. Žiadne nevhodné témy, žiadne reklamy, žiadne zbieranie údajov o deťoch.",
  },
  {
    q: "Môžem používať aplikáciu offline?",
    a: "Generovanie nových rozprávok vyžaduje pripojenie na internet. Uložené rozprávky si však môžete prehrávať aj offline.",
  },
  {
    q: "Koľko to stojí?",
    a: "Prvé 3 rozprávky sú úplne zadarmo! Potom si môžete vybrať z našich plánov - od 4,99€/mesiac za neobmedzené rozprávky.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-gradient-hero">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16 max-w-6xl mx-auto">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            Prvé 3 rozprávky zadarmo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-tight"
          >
            Premeň čas pred
            <span className="gradient-text"> obrazovkou </span>
            na rozprávky
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 mb-8"
          >
            Vyber 3 emoji ingrediencie a náš čarovný hrnček ti uvarí
            jedinečnú rozprávku. Každá je iná, každá je magická.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/cook">
              <MagicButton size="lg">
                <span className="flex items-center gap-2">
                  <Sparkles size={20} />
                  Začať variť
                </span>
              </MagicButton>
            </Link>
            <Link href="/stories">
              <MagicButton size="lg" variant="ghost">
                Pozrieť rozprávky
              </MagicButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right - 3D Pot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-violet-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl scale-150" />
          <motion.svg
            viewBox="0 0 300 280"
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 30px 60px rgba(139, 92, 246, 0.4))' }}
          >
            <defs>
              <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="rimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <ellipse cx="150" cy="220" rx="100" ry="40" fill="url(#potGradient)" />
            <path d="M 50 120 L 50 220 Q 50 260 150 260 Q 250 260 250 220 L 250 120" fill="url(#potGradient)" />
            <path d="M 60 130 L 60 200 Q 60 210 80 220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="150" cy="120" rx="110" ry="30" fill="url(#rimGradient)" />
            <ellipse cx="150" cy="120" rx="95" ry="22" fill="url(#liquidGradient)" />
            <ellipse cx="20" cy="150" rx="18" ry="30" fill="url(#potGradient)" />
            <ellipse cx="280" cy="150" rx="18" ry="30" fill="url(#potGradient)" />
            <g className="animate-float">
              <text x="110" y="100" fontSize="32">🦄</text>
              <text x="150" y="90" fontSize="28">✨</text>
              <text x="175" y="105" fontSize="30">🌈</text>
            </g>
          </motion.svg>
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Čo hovoria rodičia
            </h2>
            <p className="text-slate-600">Tisíce rodín už varí rozprávky s nami</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{review.avatar}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{review.name}</p>
                    <p className="text-sm text-slate-500">{review.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array(review.rating).fill(0).map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600">&ldquo;{review.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Rozprávky s posolstvom
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Každá rozprávka nesie dôležité životné ponaučenie. Vyber si tému, ktorá je pre tvoje dieťa aktuálna.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {THEMES.map((theme, i) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${theme.color} rounded-2xl p-6 text-white text-center cursor-pointer shadow-lg`}
              >
                <span className="text-5xl mb-3 block">{theme.emoji}</span>
                <h3 className="font-bold text-lg mb-1">{theme.title}</h3>
                <p className="text-white/80 text-sm">{theme.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Ako to funguje?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "🎨", title: "Vyber emoji", desc: "Zvol si až 3 magické ingrediencie pre svoju rozprávku" },
              { step: "2", icon: "🍲", title: "Hoď do hrnčeka", desc: "Náš čarovný hrnček uvarí jedinečný príbeh" },
              { step: "3", icon: "📖", title: "Počúvaj & čítaj", desc: "Rozprávku si prečítaj alebo vypočuj v SK, CZ alebo EN" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-block mb-4">
                  <span className="text-6xl">{item.icon}</span>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Časté otázky
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-slate-800">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={20} className="text-violet-500" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-5"
                  >
                    <p className="text-slate-600">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
        >
          <span className="text-6xl mb-4 block">🍲</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pripravený uvariť rozprávku?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Prvé 3 rozprávky sú úplne zadarmo. Žiadna kreditná karta.
          </p>
          <Link href="/cook">
            <button className="bg-white text-violet-600 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-violet-50 transition-colors shadow-lg">
              Vyskúšať zadarmo
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
