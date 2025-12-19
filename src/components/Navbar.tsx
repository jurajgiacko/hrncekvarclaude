"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagicButton } from "./MagicButton";

const NAV_LINKS = [
  { href: "/stories", label: "Rozprávky" },
  { href: "/pricing", label: "Cenník" },
  { href: "/about", label: "O nás" },
];

interface NavbarProps {
  onLoginClick?: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🍲</span>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              Hrnček Var!
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-violet-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLoginClick}
              className="text-slate-600 hover:text-violet-600 font-medium transition-colors"
            >
              Prihlásiť sa
            </button>
            <Link href="/cook">
              <MagicButton size="sm">Vyskúšať zadarmo</MagicButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-slate-600 hover:text-violet-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-slate-200" />
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLoginClick?.();
                  }}
                  className="block text-slate-600 hover:text-violet-600 font-medium transition-colors"
                >
                  Prihlásiť sa
                </button>
                <Link href="/cook" onClick={() => setIsMenuOpen(false)}>
                  <MagicButton size="sm" className="w-full">
                    Vyskúšať zadarmo
                  </MagicButton>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
