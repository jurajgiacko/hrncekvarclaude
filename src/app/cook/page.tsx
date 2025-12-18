"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MagicPot } from "@/components/MagicPot";
import { EmojiPicker } from "@/components/EmojiPicker";
import { StoryDisplay } from "@/components/StoryDisplay";
import { MagicButton } from "@/components/MagicButton";
import { FloatingEmojis } from "@/components/FloatingEmojis";
import { ArrowLeft, Trash2, Sparkles } from "lucide-react";

// Mock story generator (later will be replaced with AI)
const generateMockStory = (emojis: string[]): string => {
  const stories: Record<string, string> = {
    default: `Kedysi dávno, v krajine plnej zázrakov, žili traja kamaráti: ${emojis.join(", ")}.

Jedného slnečného dňa sa vydali na veľké dobrodružstvo. Prechádzali cez čarovný les, kde stromy šepkali tajomstvá a kvety spievali pesničky.

Zrazu našli trblietavú cestu, ktorá viedla k dúhovému zámku. Tam stretli múdru vílu, ktorá im povedala: "Vaše priateľstvo je najväčšia mágia na svete!"

A tak sa vrátili domov, šťastní a plní nových zážitkov. A ak nezomreli, žijú šťastne dodnes.

Koniec 🌟`,
  };

  return stories.default;
};

type AppState = "selecting" | "cooking" | "story";

export default function CookPage() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [appState, setAppState] = useState<AppState>("selecting");
  const [story, setStory] = useState<string>("");

  const handleSelectEmoji = useCallback((emoji: string) => {
    if (selectedEmojis.length < 3 && !selectedEmojis.includes(emoji)) {
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
    <main className="min-h-screen relative overflow-hidden py-8 px-4">
      <FloatingEmojis />

      {/* Header */}
      <header className="relative z-20 max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-amber-800 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="font-bold">Späť</span>
            </motion.button>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold rainbow-text">
            Hrnček Var!
          </h1>

          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Selecting state */}
          {appState === "selecting" && (
            <motion.div
              key="selecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
            >
              {/* Selected emojis display */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-amber-800 text-center mb-4">
                  Tvoje ingrediencie ({selectedEmojis.length}/3)
                </h2>

                <div className="flex justify-center gap-4 min-h-[80px]">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className={`w-20 h-20 rounded-2xl border-4 border-dashed flex items-center justify-center ${
                        selectedEmojis[index]
                          ? "border-purple-400 bg-white/70"
                          : "border-amber-300 bg-white/30"
                      }`}
                      whileHover={selectedEmojis[index] ? { scale: 1.05 } : {}}
                    >
                      {selectedEmojis[index] ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="relative"
                        >
                          <span className="text-4xl">{selectedEmojis[index]}</span>
                          <motion.button
                            onClick={() => handleRemoveEmoji(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm shadow-lg"
                          >
                            ×
                          </motion.button>
                        </motion.div>
                      ) : (
                        <span className="text-amber-400 text-2xl">?</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pot preview */}
              <div className="mb-8">
                <MagicPot emojis={selectedEmojis} isCooking={false} />
              </div>

              {/* Cook button */}
              <div className="text-center mb-8">
                <MagicButton
                  onClick={handleCook}
                  disabled={selectedEmojis.length === 0}
                  variant="magic"
                  size="lg"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={24} />
                    {selectedEmojis.length === 0
                      ? "Vyber aspoň 1 emoji"
                      : "Variť rozprávku!"}
                    <Sparkles size={24} />
                  </span>
                </MagicButton>
              </div>

              {/* Emoji picker */}
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-center text-purple-600 mb-4">
                  Vyber ingrediencie do hrnčeka
                </h3>
                <EmojiPicker
                  onSelect={handleSelectEmoji}
                  disabled={selectedEmojis.length >= 3}
                />
              </div>
            </motion.div>
          )}

          {/* Cooking state */}
          {appState === "cooking" && (
            <motion.div
              key="cooking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center py-12"
            >
              <h2 className="text-3xl font-bold text-purple-600 mb-8">
                Varíme rozprávku...
              </h2>

              <MagicPot
                emojis={selectedEmojis}
                isCooking={true}
                onCookingComplete={handleCookingComplete}
              />

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 text-xl text-amber-700"
              >
                Miešame magické ingrediencie...
              </motion.p>
            </motion.div>
          )}

          {/* Story state */}
          {appState === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
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
