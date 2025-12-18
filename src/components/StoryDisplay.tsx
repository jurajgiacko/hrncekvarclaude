"use client";

import { motion } from "framer-motion";
import { MagicButton } from "./MagicButton";
import { Volume2, VolumeX, RotateCcw, Languages } from "lucide-react";
import { useState } from "react";

interface StoryDisplayProps {
  story: string;
  emojis: string[];
  onNewStory: () => void;
}

const LANGUAGES = [
  { code: "sk", name: "Slovensky", flag: "🇸🇰" },
  { code: "cs", name: "Česky", flag: "🇨🇿" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export function StoryDisplay({ story, emojis, onNewStory }: StoryDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLang, setCurrentLang] = useState("sk");

  // Split story into paragraphs for animation
  const paragraphs = story.split("\n\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Story header with emojis */}
      <div className="text-center mb-6">
        <motion.div
          className="flex justify-center gap-2 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          {emojis.map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="text-5xl drop-shadow-lg"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
        <h2 className="text-2xl font-bold rainbow-text">Tvoja Rozprávka</h2>
      </div>

      {/* Language selector */}
      <div className="flex justify-center gap-2 mb-4">
        {LANGUAGES.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setCurrentLang(lang.code)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              currentLang === lang.code
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-white/50 text-amber-800 hover:bg-white/80"
            }`}
          >
            {lang.flag} {lang.name}
          </motion.button>
        ))}
      </div>

      {/* Story book container */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-amber-200"
        initial={{ rotateY: -90 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Story content */}
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="text-amber-900 leading-relaxed mb-4 text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Audio controls */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg"
          >
            {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isPlaying ? "Zastaviť" : "Prečítať"}
          </motion.button>
        </div>
      </motion.div>

      {/* New story button */}
      <div className="mt-8 text-center">
        <MagicButton onClick={onNewStory} variant="magic" size="lg">
          <span className="flex items-center gap-2">
            <RotateCcw size={24} />
            Uvariť novú rozprávku
          </span>
        </MagicButton>
      </div>
    </motion.div>
  );
}
