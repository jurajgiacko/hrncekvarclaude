"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { DraggableEmoji } from "@/components/DraggableEmoji";
import { DroppablePot } from "@/components/DroppablePot";
import { StoryDisplay } from "@/components/StoryDisplay";
import { MagicButton } from "@/components/MagicButton";
import { ArrowLeft, Sparkles, X, Trash2 } from "lucide-react";

const EMOJIS = [
  // Row 1 - Animals
  "🦁", "🐻", "🦊", "🐰", "🦄", "🐲", "🦋", "🐝",
  // Row 2 - Magic & Nature
  "🌈", "⭐", "🌙", "☀️", "🌸", "✨", "💫", "🔮",
  // Row 3 - Objects
  "👑", "💎", "🏰", "🚀", "⚔️", "🪄", "📚", "🎨",
  // Row 4 - Food
  "🍎", "🍪", "🍰", "🍭", "🧁", "🍫", "🍓", "🍌",
];

const generateMockStory = (emojis: string[]): string => {
  return `Kedysi dávno, v krajine plnej zázrakov, žili traja kamaráti: ${emojis.join(", ")}.

Jedného slnečného dňa sa vydali na veľké dobrodružstvo. Prechádzali cez čarovný les, kde stromy šepkali tajomstvá a kvety spievali pesničky.

Zrazu našli trblietavú cestu, ktorá viedla k dúhovému zámku. Tam stretli múdru vílu, ktorá im povedala: "Vaše priateľstvo je najväčšia mágia na svete!"

A tak sa vrátili domov, šťastní a plní nových zážitkov. A ak nezomreli, žijú šťastne dodnes.

Koniec ✨`;
};

type AppState = "selecting" | "cooking" | "story";

export default function CookPage() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [appState, setAppState] = useState<AppState>("selecting");
  const [story, setStory] = useState<string>("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOverPot, setIsOverPot] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: any) => {
    setIsOverPot(event.over?.id === "pot");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setIsOverPot(false);

    if (event.over?.id === "pot" && selectedEmojis.length < 3) {
      const emoji = event.active.data.current?.emoji;
      if (emoji && !selectedEmojis.includes(emoji)) {
        setSelectedEmojis((prev) => [...prev, emoji]);
      }
    }
  };

  const handleRemoveEmoji = useCallback((index: number) => {
    setSelectedEmojis((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedEmojis([]);
  }, []);

  const handleCook = useCallback(() => {
    if (selectedEmojis.length === 0) return;
    setAppState("cooking");
  }, [selectedEmojis]);

  const handleCookingComplete = useCallback(() => {
    const generatedStory = generateMockStory(selectedEmojis);
    setStory(generatedStory);
    setAppState("story");
  }, [selectedEmojis]);

  const handleNewStory = useCallback(() => {
    setSelectedEmojis([]);
    setStory("");
    setAppState("selecting");
  }, []);

  const activeEmoji = activeId ? EMOJIS.find((e) => e === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="min-h-screen bg-gradient-main flex flex-col">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Späť</span>
            </motion.button>
          </Link>

          <h1 className="text-2xl font-bold gradient-text">Hrnček Var!</h1>

          {selectedEmojis.length > 0 && appState === "selecting" ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearAll}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-500 transition-colors"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline text-sm">Vyčistiť</span>
            </motion.button>
          ) : (
            <div className="w-20" />
          )}
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* SELECTING STATE */}
            {appState === "selecting" && (
              <motion.div
                key="selecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30 }}
                className="w-full max-w-2xl flex flex-col items-center"
              >
                {/* Selected ingredients display */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-slate-500 text-sm">Ingrediencie:</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        layout
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                          transition-all duration-200
                          ${selectedEmojis[index]
                            ? "bg-white shadow-lg ring-2 ring-violet-200"
                            : "bg-white/30 border-2 border-dashed border-violet-300/50"
                          }
                        `}
                      >
                        {selectedEmojis[index] ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="relative"
                          >
                            {selectedEmojis[index]}
                            <motion.button
                              onClick={() => handleRemoveEmoji(index)}
                              whileHover={{ scale: 1.2 }}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md"
                            >
                              <X size={12} />
                            </motion.button>
                          </motion.div>
                        ) : (
                          <span className="text-violet-300 text-sm">{index + 1}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pot */}
                <DroppablePot
                  emojis={selectedEmojis}
                  isOver={isOverPot}
                  isCooking={false}
                />

                {/* Cook button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 mb-6"
                >
                  <MagicButton
                    onClick={handleCook}
                    disabled={selectedEmojis.length === 0}
                    size="lg"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={20} />
                      {selectedEmojis.length === 0
                        ? "Potiahni emoji do hrnčeka"
                        : `Uvariť rozprávku!`}
                    </span>
                  </MagicButton>
                </motion.div>

                {/* Emoji grid */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full glass rounded-3xl p-4 shadow-xl"
                >
                  <p className="text-center text-slate-500 text-sm mb-4">
                    ✨ Potiahni emoji do hrnčeka (max 3)
                  </p>
                  <div className="grid grid-cols-8 gap-1 sm:gap-2">
                    {EMOJIS.map((emoji) => (
                      <DraggableEmoji
                        key={emoji}
                        id={emoji}
                        emoji={emoji}
                        isSelected={selectedEmojis.includes(emoji)}
                        disabled={selectedEmojis.length >= 3 && !selectedEmojis.includes(emoji)}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* COOKING STATE */}
            {appState === "cooking" && (
              <motion.div
                key="cooking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <motion.h2
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl sm:text-3xl font-bold text-violet-600 mb-4"
                >
                  Varíme rozprávku...
                </motion.h2>

                <DroppablePot
                  emojis={selectedEmojis}
                  isCooking={true}
                  onCookingComplete={handleCookingComplete}
                />

                <motion.div
                  className="mt-8 flex gap-2 text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {["Miešame", "magické", "ingrediencie", "✨"].map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* STORY STATE */}
            {appState === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-2xl"
              >
                <StoryDisplay
                  story={story}
                  emojis={selectedEmojis}
                  onNewStory={handleNewStory}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drag Overlay - shows dragged item */}
        <DragOverlay>
          {activeEmoji && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.3, rotate: [0, -5, 5, 0] }}
              className="text-5xl drop-shadow-2xl cursor-grabbing"
            >
              {activeEmoji}
            </motion.div>
          )}
        </DragOverlay>
      </main>
    </DndContext>
  );
}
