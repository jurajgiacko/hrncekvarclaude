"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagicButton } from "@/components/MagicButton";
import { Mail, Instagram, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-gradient-hero min-h-screen">
      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl mb-6 block"
          >
            🍲
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6"
          >
            Príbeh za
            <span className="gradient-text"> Hrnčekom</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600"
          >
            Ako sa zrodil nápad na čarovný hrnček, ktorý varí rozprávky
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-12"
          >
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-xl leading-relaxed mb-6">
                Všetko to začalo jedným večerom, keď som svojmu synovi chcel prečítať rozprávku na dobrú noc.
                &ldquo;Ocko, ale ja chcem rozprávku o <strong>drakovi</strong>, ktorý má <strong>korunu</strong> a býva v <strong>lese</strong>!&rdquo; povedal.
              </p>

              <p className="mb-6">
                A tak som začal vymýšľať. Ale po piatej takejto žiadosti za týždeň mi došla fantázia.
                Pritom som videl, ako mu v očiach svietia hviezdy, keď počúva príbeh, ktorý je &ldquo;jeho&rdquo;.
              </p>

              <div className="bg-violet-50 rounded-2xl p-6 my-8 border-l-4 border-violet-500">
                <p className="text-violet-800 font-medium italic mb-0">
                  &ldquo;Čo keby existoval hrnček, do ktorého hodíš ingrediencie - a on ti uvarí rozprávku?&rdquo;
                </p>
              </div>

              <p className="mb-6">
                Tak vznikol <strong>Hrnček Var!</strong> - aplikácia, ktorá premení čas pred obrazovkou na kvalitný rodinný čas.
                Dieťa si vyberie emoji, ktoré ho zaujímajú, a náš AI hrnček uvarí jedinečnú rozprávku práve pre neho.
              </p>

              <p className="mb-6">
                Každá rozprávka je iná. Každá má posolstvo. A každá je špeciálna, pretože ju &ldquo;uvaril&rdquo; práve tvoje dieťa.
              </p>

              <p className="text-xl font-medium text-slate-800">
                Veríme, že najlepšie rozprávky sú tie, ktoré vzniknú spolu. ✨
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-800 text-center mb-12"
          >
            Naše hodnoty
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Bezpečnosť",
                desc: "Žiadny nevhodný obsah, žiadne reklamy, žiadne zbieranie dát o deťoch. Bezpečnosť je priorita.",
              },
              {
                icon: "💡",
                title: "Kreativita",
                desc: "Podporujeme fantáziu a kreativitu detí. Každá rozprávka je jedinečná a inšpiruje k vlastnému premýšľaniu.",
              },
              {
                icon: "👨‍👩‍👧",
                title: "Rodina",
                desc: "Vytvárame príležitosti na spoločné chvíle. Rozprávky sú najlepšie, keď ich zdieľame.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <span className="text-5xl mb-4 block">{value.icon}</span>
                <h3 className="font-bold text-xl text-slate-800 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Ozvite sa nám
            </h2>
            <p className="text-slate-600 mb-8">
              Máte otázky, nápady alebo spätnú väzbu? Radi od vás počujeme!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ahoj@hrncevar.sk"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors font-medium"
              >
                <Mail size={20} />
                ahoj@hrncevar.sk
              </a>
              <a
                href="https://instagram.com/hrncevar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:opacity-90 transition-opacity font-medium"
              >
                <Instagram size={20} />
                @hrncevar
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="flex items-center justify-center gap-2 text-slate-600 mb-6">
            Vytvorené s <Heart size={18} className="text-pink-500 fill-pink-500" /> na Slovensku
          </p>
          <Link href="/cook">
            <MagicButton size="lg">
              <span className="flex items-center gap-2">
                <Sparkles size={20} />
                Vyskúšať Hrnček Var!
              </span>
            </MagicButton>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
