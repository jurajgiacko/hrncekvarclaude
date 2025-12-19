"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Chrome } from "lucide-react";
import { MagicButton } from "./MagicButton";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement auth
    console.log("Auth:", mode, email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white text-center">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <span className="text-5xl mb-2 block">🍲</span>
                <h2 className="text-2xl font-bold">
                  {mode === "login" ? "Vitaj späť!" : "Vytvor si účet"}
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {mode === "login"
                    ? "Prihláš sa a pokračuj vo varení"
                    : "Prvé 3 rozprávky máš zadarmo"}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Social login */}
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700">
                    <Chrome size={20} className="text-[#4285F4]" />
                    Pokračovať s Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    Pokračovať s Facebook
                  </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">alebo</span>
                  </div>
                </div>

                {/* Email form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tvoj@email.sk"
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <MagicButton className="w-full" size="lg">
                    {mode === "login" ? "Poslať prihlasovací link" : "Vytvoriť účet"}
                  </MagicButton>
                </form>

                {/* Switch mode */}
                <p className="text-center text-slate-500 text-sm mt-6">
                  {mode === "login" ? (
                    <>
                      Nemáš účet?{" "}
                      <button
                        onClick={() => setMode("signup")}
                        className="text-violet-600 hover:underline font-medium"
                      >
                        Zaregistruj sa
                      </button>
                    </>
                  ) : (
                    <>
                      Už máš účet?{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="text-violet-600 hover:underline font-medium"
                      >
                        Prihláš sa
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
