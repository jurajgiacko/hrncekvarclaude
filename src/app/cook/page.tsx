"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MagicPot } from "@/components/MagicPot";
import { EmojiPicker } from "@/components/EmojiPicker";
import { StoryDisplay } from "@/components/StoryDisplay";
import { MagicButton } from "@/components/MagicButton";
import { ArrowLeft, Sparkles, X } from "lucide-react";

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

  const handleSelectEmoji = useCallback((emoji: string) => {
    if (selectedEmojis.length < 3) {
      setSelectedEmojis((prev) => [...prev, emoji]);
    }
  }, [selectedEmojis]);

  const handleRemoveEmoji = useCallback((index: number) => {
    setSelectedEmojis((prev) => prev.filter((_, i) => i !== index));
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

  return (
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

        <div className="w-16" />
      </header>

      {/* Main content - fills remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {/* SELECTING STATE */}
          {appState === "selecting" && (
            <motion.div
              key="selecting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-lg flex flex-col items-center gap-6"
            >
              {/* Selected ingredients */}
              <div className="flex items-center gap-3">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    layout
                    className={`
                      w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center
                      ${selectedEmojis[index]
                        ? "bg-white shadow-lg"
                        : "bg-white/50 border-2 border-dashed border-violet-300"
                      }
                    `}
                  >
                    {selectedEmojis[index] ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="relative"
                      >
                        <span className="text-3xl sm:text-4xl">{selectedEmojis[index]}</span>
                        <motion.button
                          onClick={() => handleRemoveEmoji(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md"
                        >
                          <X size={14} />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <span className="text-violet-300 text-xl font-bold">{index + 1}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pot */}
              <MagicPot emojis={selectedEmojis} isCooking={false} />

              {/* Cook button */}
              <MagicButton
                onClick={handleCook}
                disabled={selectedEmojis.length === 0}
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={20} />
                  {selectedEmojis.length === 0
                    ? "Vyber ingrediencie"
                    : `Uvariť rozprávku!`}
                </span>
              </MagicButton>

              {/* Emoji picker */}
              <div className="w-full glass rounded-3xl p-4 shadow-xl">
                <p className="text-center text-slate-500 text-sm mb-3">
                  Vyber až 3 ingrediencie
                </p>
                <EmojiPicker
                  onSelect={handleSelectEmoji}
                  selectedEmojis={selectedEmojis}
                  disabled={selectedEmojis.length >= 3}
                />
              </div>
            </motion.div>
          )}

          {/* COOKING STATE */}
          {appState === "cooking" && (
            <motion.div
              key="cooking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.h2
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl sm:text-3xl font-bold text-violet-600"
              >
                Varíme rozprávku...
              </motion.h2>

              <MagicPot
                emojis={selectedEmojis}
                isCooking={true}
                onCookingComplete={handleCookingComplete}
              />

              <div className="flex gap-2">
                {["Miešame", "ingrediencie", "✨"].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-slate-500"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
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
    </main>
  );
}
