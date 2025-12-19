"use client";

import { motion } from "framer-motion";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  selectedEmojis: string[];
  disabled?: boolean;
}

const EMOJIS = [
  // Animals
  "🦁", "🐻", "🦊", "🐰", "🦄", "🐲", "🦋", "🐝",
  // Nature & Magic
  "🌈", "⭐", "🌙", "☀️", "🌸", "✨", "💫", "🔮",
  // Objects
  "👑", "💎", "🏰", "🚀", "⚔️", "🪄", "📚", "🎨",
  // Food
  "🍎", "🍪", "🍰", "🍭", "🧁", "🍫", "🍓", "🍌",
];

export function EmojiPicker({ onSelect, selectedEmojis, disabled }: EmojiPickerProps) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {EMOJIS.map((emoji, index) => {
        const isSelected = selectedEmojis.includes(emoji);

        return (
          <motion.button
            key={emoji}
            onClick={() => !disabled && !isSelected && onSelect(emoji)}
            disabled={disabled || isSelected}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02, type: "spring", bounce: 0.4 }}
            whileHover={!disabled && !isSelected ? { scale: 1.25, rotate: [-5, 5, 0] } : {}}
            whileTap={!disabled && !isSelected ? { scale: 0.9 } : {}}
            className={`
              aspect-square flex items-center justify-center text-3xl rounded-xl
              transition-all duration-200
              ${isSelected
                ? "bg-violet-100 opacity-40 cursor-not-allowed ring-2 ring-violet-300"
                : disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-50 cursor-pointer active:bg-violet-100"
              }
            `}
          >
            {emoji}
          </motion.button>
        );
      })}
    </div>
  );
}
