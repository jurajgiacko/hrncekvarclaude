"use client";

import { motion } from "framer-motion";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  disabled?: boolean;
}

const EMOJI_CATEGORIES = {
  "Zvieratká": ["🐶", "🐱", "🦁", "🐻", "🐰", "🦊", "🐸", "🐵", "🦄", "🐲", "🦋", "🐝"],
  "Príroda": ["🌸", "🌈", "⭐", "🌙", "☀️", "🌺", "🍀", "🌻", "🌊", "❄️", "🔥", "💫"],
  "Jedlo": ["🍎", "🍪", "🍰", "🍭", "🍩", "🍕", "🍦", "🧁", "🍫", "🍓", "🥕", "🍌"],
  "Veci": ["👑", "💎", "🎈", "🎁", "🏰", "🚀", "⚔️", "🪄", "📚", "🎨", "🎭", "🎪"],
  "Emócie": ["❤️", "💖", "✨", "🌟", "💫", "🎉", "🥳", "😊", "🤗", "😍", "🥰", "💕"],
};

export function EmojiPicker({ onSelect, disabled }: EmojiPickerProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
        <div key={category} className="mb-4">
          <h3 className="text-lg font-bold text-amber-800 mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {emojis.map((emoji) => (
              <motion.button
                key={emoji}
                onClick={() => !disabled && onSelect(emoji)}
                disabled={disabled}
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                whileTap={{ scale: 0.9 }}
                className={`text-3xl p-2 rounded-xl bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow ${
                  disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white/80"
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
