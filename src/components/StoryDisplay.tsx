"use client";

import { motion } from "framer-motion";
import { MagicButton } from "./MagicButton";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useState } from "react";

interface StoryDisplayProps {
  story: string;
  emojis: string[];
  onNewStory: () => void;
}

const LANGUAGES = [
  { code: "sk", name: "SK", flag: "🇸🇰" },
  { code: "cs", name: "CZ", flag: "🇨🇿" },
  { code: "en", name: "EN", flag: "🇬🇧" },
];

export function StoryDisplay({ story, emojis, onNewStory }: StoryDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLang, setCurrentLang] = useState("sk");

  const paragraphs = story.split("\n\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Header with emojis and controls */}
      <div className="flex items-center justify-between mb-6">
        {/* Emojis */}
        <motion.div
          className="flex gap-2"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          {emojis.map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              className="text-4xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Language selector */}
        <div className="flex gap-1 bg-white/80 rounded-full p-1 shadow-sm">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLang(lang.code)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${currentLang === lang.code
                  ? "bg-violet-500 text-white shadow-md"
                  : "text-slate-600 hover:bg-violet-50"
                }
              `}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </div>

      {/* Story card */}
      <motion.div
        className="glass rounded-3xl p-6 sm:p-8 shadow-xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        {/* Story content */}
        <div className="space-y-4 mb-6">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="text-slate-700 leading-relaxed text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Audio control */}
        <div className="flex justify-center">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
              ${isPlaying
                ? "bg-rose-100 text-rose-600"
                : "bg-violet-100 text-violet-600 hover:bg-violet-200"
              }
            `}
          >
            {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isPlaying ? "Zastaviť" : "Prečítať nahlas"}
          </motion.button>
        </div>
      </motion.div>

      {/* New story button */}
      <div className="mt-6 text-center">
        <MagicButton onClick={onNewStory} variant="secondary" size="lg">
          <span className="flex items-center gap-2">
            <RotateCcw size={20} />
            Nová rozprávka
          </span>
        </MagicButton>
      </div>
    </motion.div>
  );
}
