"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagicButton } from "@/components/MagicButton";
import { Play, Clock, Sparkles } from "lucide-react";

const SAMPLE_STORIES = [
  {
    id: 1,
    title: "Odvážny lev a stratená korunka",
    emojis: ["🦁", "👑", "🏰"],
    excerpt: "Kedysi dávno v krajine Leviánii žil mladý lev menom Leo, ktorý sníval o tom, že sa stane kráľom...",
    duration: "4 min",
    theme: "Odvaha",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    title: "Jednorožec a dúhový most",
    emojis: ["🦄", "🌈", "✨"],
    excerpt: "V čarovnom lese za siedmimi horami žil malý jednorožec Hviezdička, ktorý ešte nevedel robiť dúhy...",
    duration: "5 min",
    theme: "Byť iný",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "Medvedík a tajomstvo lesa",
    emojis: ["🐻", "🌲", "🍯"],
    excerpt: "Malý medvedík Bruno sa jedného dňa stratil v hlbokom lese. Nebál sa však, pretože vedel...",
    duration: "3 min",
    theme: "Strach",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 4,
    title: "Princ a čarovná kniha",
    emojis: ["🤴", "📚", "🪄"],
    excerpt: "V kráľovstve Múdrosti žil mladý princ Filip, ktorý miloval knihy viac ako čokoľvek iné...",
    duration: "6 min",
    theme: "Vzdelanie",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 5,
    title: "Líška a svetlušky",
    emojis: ["🦊", "✨", "🌙"],
    excerpt: "Líška Eliška sa bála tmy. Každú noc sa chúlila do svojej nory a čakala na ráno...",
    duration: "4 min",
    theme: "Strach",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 6,
    title: "Robot s veľkým srdcom",
    emojis: ["🤖", "❤️", "🌟"],
    excerpt: "V meste budúcnosti žil malý robot R-123, ktorý bol iný ako ostatní roboti...",
    duration: "5 min",
    theme: "Emócie",
    color: "from-slate-400 to-slate-600",
  },
];

export default function StoriesPage() {
  return (
    <main className="bg-gradient-hero min-h-screen">
      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6"
          >
            Ochutnaj naše
            <span className="gradient-text"> rozprávky</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 mb-8"
          >
            Tu sú ukážky rozprávok, ktoré náš hrnček uvaril. Každá je jedinečná!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/cook">
              <MagicButton size="lg">
                <span className="flex items-center gap-2">
                  <Sparkles size={20} />
                  Uvariť vlastnú
                </span>
              </MagicButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_STORIES.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer"
              >
                {/* Gradient header */}
                <div className={`bg-gradient-to-r ${story.color} p-6 relative`}>
                  <div className="flex justify-center gap-2 text-4xl mb-2">
                    {story.emojis.map((emoji, j) => (
                      <motion.span
                        key={j}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                  <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {story.theme}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500 text-sm">
                      <Clock size={14} />
                      {story.duration}
                    </span>
                    <button className="flex items-center gap-1 text-violet-600 font-medium text-sm hover:text-violet-700">
                      <Play size={14} className="fill-current" />
                      Prehrať
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center glass rounded-3xl p-12"
        >
          <span className="text-5xl mb-4 block">🍲</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
            Chceš vlastnú rozprávku?
          </h2>
          <p className="text-slate-600 mb-8">
            Vyber si emoji a nechaj náš hrnček uvariť príbeh len pre teba!
          </p>
          <Link href="/cook">
            <MagicButton size="lg">
              Začať variť
            </MagicButton>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
