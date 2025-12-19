"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

interface DraggableEmojiProps {
  id: string;
  emoji: string;
  disabled?: boolean;
  isSelected?: boolean;
}

export function DraggableEmoji({ id, emoji, disabled, isSelected }: DraggableEmojiProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: disabled || isSelected,
    data: { emoji },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isSelected ? 0.3 : 1,
        scale: isDragging ? 1.2 : 1,
      }}
      whileHover={!disabled && !isSelected ? { scale: 1.15 } : {}}
      className={`
        relative select-none touch-none
        ${isDragging ? "z-50" : "z-10"}
        ${disabled || isSelected ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"}
      `}
    >
      {/* Glow effect when dragging */}
      {isDragging && (
        <div className="absolute inset-0 bg-violet-400/50 rounded-full blur-xl scale-150" />
      )}

      <div
        className={`
          relative text-4xl sm:text-5xl p-2 rounded-2xl transition-all duration-200
          ${isDragging
            ? "bg-white shadow-2xl ring-4 ring-violet-400/50"
            : isSelected
              ? "bg-violet-100"
              : "hover:bg-white/80 hover:shadow-lg"
          }
        `}
      >
        {emoji}

        {/* Selected checkmark */}
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
