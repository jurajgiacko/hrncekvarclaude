"use client";

import Link from "next/link";
import { Instagram, Mail, Heart } from "lucide-react";

const FOOTER_LINKS = {
  product: [
    { href: "/cook", label: "Variť rozprávku" },
    { href: "/stories", label: "Rozprávky" },
    { href: "/pricing", label: "Cenník" },
  ],
  company: [
    { href: "/about", label: "O nás" },
    { href: "/contact", label: "Kontakt" },
  ],
  legal: [
    { href: "/privacy", label: "Ochrana súkromia" },
    { href: "/terms", label: "Podmienky používania" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍲</span>
              <span className="text-xl font-bold">Hrnček Var!</span>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              Magické rozprávky pre deti. Každá je jedinečná.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:ahoj@hrncevar.sk"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">
              Produkt
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">
              Spoločnosť
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">
              Právne
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Language selector & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            {[
              { code: "sk", flag: "🇸🇰", label: "Slovensky" },
              { code: "cs", flag: "🇨🇿", label: "Česky" },
              { code: "en", flag: "🇬🇧", label: "English" },
            ].map((lang) => (
              <button
                key={lang.code}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <span>{lang.flag}</span>
                <span className="hidden sm:inline">{lang.label}</span>
              </button>
            ))}
          </div>

          <p className="text-slate-500 text-sm flex items-center gap-1">
            © 2024 Hrnček Var! • Vytvorené s
            <Heart size={14} className="text-pink-500 fill-pink-500" />
            pre deti
          </p>
        </div>
      </div>
    </footer>
  );
}
