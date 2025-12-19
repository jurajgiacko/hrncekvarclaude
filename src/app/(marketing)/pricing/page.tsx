"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagicButton } from "@/components/MagicButton";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const PLANS = [
  {
    name: "Zadarmo",
    price: "0",
    period: "",
    description: "Vyskúšaj si to",
    icon: Sparkles,
    color: "from-slate-400 to-slate-500",
    features: [
      "3 rozprávky zadarmo",
      "Všetky emoji ingrediencie",
      "Text rozprávky",
      "Slovenčina",
    ],
    limitations: [
      "Bez audio prehrávania",
      "Bez uloženia rozprávok",
    ],
    cta: "Vyskúšať zadarmo",
    href: "/cook",
    popular: false,
  },
  {
    name: "Rozprávkový",
    price: "4.99",
    period: "/mesiac",
    description: "Pre malých rozprávkarov",
    icon: Zap,
    color: "from-violet-500 to-purple-600",
    features: [
      "Neobmedzené rozprávky",
      "Všetky emoji ingrediencie",
      "Audio prehrávanie",
      "SK, CZ, EN jazyky",
      "Uloženie rozprávok",
      "Bez reklám",
    ],
    limitations: [],
    cta: "Začať teraz",
    href: "/cook",
    popular: true,
  },
  {
    name: "Rodinný",
    price: "7.99",
    period: "/mesiac",
    description: "Pre celú rodinu",
    icon: Crown,
    color: "from-amber-400 to-orange-500",
    features: [
      "Všetko z Rozprávkového",
      "Až 5 detských profilov",
      "Prispôsobenie veku",
      "Štatistiky a história",
      "Prioritná podpora",
      "Rodinné zdieľanie",
    ],
    limitations: [],
    cta: "Vybrať rodinnný",
    href: "/cook",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Môžem zrušiť kedykoľvek?",
    a: "Áno! Žiadne záväzky, žiadne poplatky za zrušenie. Môžeš zrušiť kedykoľvek priamo v nastaveniach účtu.",
  },
  {
    q: "Čo sa stane po skončení trial obdobia?",
    a: "Po 3 bezplatných rozprávkach si môžeš vybrať platený plán, alebo pokračovať len s prečítaním existujúcich rozprávok.",
  },
  {
    q: "Aké platobné metódy prijímate?",
    a: "Prijímame všetky bežné platobné karty (Visa, Mastercard, American Express) a Apple Pay / Google Pay.",
  },
  {
    q: "Je to bezpečné pre deti?",
    a: "Absolútne! Všetok obsah je generovaný s prísnymi bezpečnostnými pravidlami. Žiadne nevhodné témy, žiadne reklamy.",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-gradient-hero min-h-screen">
      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6"
          >
            Jednoduchý
            <span className="gradient-text"> cenník</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600"
          >
            Začni zadarmo, upgraduj keď budeš chcieť viac
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative glass rounded-3xl p-6 ${
                  plan.popular ? "ring-2 ring-violet-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Najpopulárnejší
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.color} rounded-2xl p-4 text-white text-center mb-6`}>
                  <plan.icon className="mx-auto mb-2" size={32} />
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-white/80 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}€</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-slate-700">
                      <Check size={18} className="text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-center gap-2 text-slate-400">
                      <span className="w-[18px] h-[2px] bg-slate-300 flex-shrink-0" />
                      {limitation}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.href}>
                  <MagicButton
                    className="w-full"
                    variant={plan.popular ? "primary" : "ghost"}
                  >
                    {plan.cta}
                  </MagicButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Money back guarantee */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center glass rounded-3xl p-8"
        >
          <span className="text-5xl mb-4 block">🛡️</span>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            30-dňová garancia vrátenia peňazí
          </h2>
          <p className="text-slate-600">
            Ak nebudeš spokojný, vrátime ti peniaze. Bez otázok, bez problémov.
            Chceme, aby si bol šťastný!
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
            Otázky k cenníku
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
