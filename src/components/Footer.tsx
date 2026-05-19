"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const linkVariants = {
    hover: {
      x: 6,
      color: "var(--color-primary-fixed)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } as const;

  const iconVariants = {
    hover: {
      rotate: 15,
      scale: 1.1,
      color: "var(--color-primary-fixed)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  } as const;

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 full-width py-xxl relative overflow-hidden">
      {/* Decorative Cyber Grid Overlay in Footer */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none studio-grid" />

      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
          <div className="col-span-1 md:col-span-2 space-y-md">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-sm cursor-pointer inline-flex"
            >
              <img
                alt="Logo Prigel Labs"
                className="h-8 w-8"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujznjUb-3rN4q3tYmP5SEQ-UXS_oKrzoioPQuAdL4c52zQR0r9ieCP9v-VklctFYYSOQt-mGK9b56wd8dejMHacoiJolUX8ggfnOyL9FOb3-rxTJqhCf0XiBxCrCTJuFhBaTPyg4rBzw85Reap57vw2qT_jI031CQPuzLTm0K5NyzhYKjCTj3RtHkhfOA3ggs1-HsROqh_IGL5Z2an5T6OcVxuVYiFAfVuEIlL9KJ2exRk1RoYa5a878_W3"
              />
              <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Prigel Labs Limited</span>
            </motion.div>
            <p className="font-body-md text-on-surface-variant w-1/2 leading-relaxed">
              Membangun solusi digital untuk UMKM Indonesia. Membantu bisnis tumbuh lebih cerdas dengan teknologi tepat guna.
            </p>
          </div>

          <div className="space-y-md">
            <h4 className="font-label-md text-sm font-bold text-primary-fixed tracking-widest uppercase mb-sm">[ navigasi ]</h4>
            <ul className="space-y-sm text-on-surface-variant font-body-md mt-8">
              <li>
                <Link href="#" passHref legacyBehavior>
                  <motion.a
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span className="text-primary-fixed/50 font-label-md text-[10px]">&gt;</span>
                    Beranda
                  </motion.a>
                </Link>
              </li>
              <li>
                <Link href="#about" passHref legacyBehavior>
                  <motion.a
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span className="text-primary-fixed/50 font-label-md text-[10px]">&gt;</span>
                    Tentang Kami
                  </motion.a>
                </Link>
              </li>
              <li>
                <Link href="#products" passHref legacyBehavior>
                  <motion.a
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span className="text-primary-fixed/50 font-label-md text-[10px]">&gt;</span>
                    Produk
                  </motion.a>
                </Link>
              </li>
              <li>
                <Link href="#contact" passHref legacyBehavior>
                  <motion.a
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span className="text-primary-fixed/50 font-label-md text-[10px]">&gt;</span>
                    Kontak
                  </motion.a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-md">
            <h4 className="font-label-md text-sm font-bold text-primary-fixed tracking-widest uppercase mb-sm">[ saluran hubung ]</h4>
            <ul className="space-y-sm text-on-surface-variant font-body-md mt-8">
              <li>
                <motion.a
                  href="mailto:contact@prigellabs.com"
                  variants={linkVariants}
                  whileHover="hover"
                  className="flex items-center gap-md cursor-pointer transition-colors"
                >
                  <motion.span variants={iconVariants} className="material-symbols-outlined text-sm bg-surface-container p-sm rounded-lg border border-outline-variant/30">mail</motion.span>
                  <span>Email</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://wa.me/#"
                  target="_blank"
                  variants={linkVariants}
                  whileHover="hover"
                  className="flex items-center gap-md cursor-pointer transition-colors"
                >
                  <motion.span variants={iconVariants} className="material-symbols-outlined text-sm bg-surface-container p-sm rounded-lg border border-outline-variant/30">chat</motion.span>
                  <span>WhatsApp</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://instagram.com/#"
                  target="_blank"
                  variants={linkVariants}
                  whileHover="hover"
                  className="flex items-center gap-md cursor-pointer transition-colors"
                >
                  <motion.span variants={iconVariants} className="material-symbols-outlined text-sm bg-surface-container p-sm rounded-lg border border-outline-variant/30">camera</motion.span>
                  <span>Instagram</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://linkedin.com/#"
                  target="_blank"
                  variants={linkVariants}
                  whileHover="hover"
                  className="flex items-center gap-md cursor-pointer transition-colors"
                >
                  <motion.span variants={iconVariants} className="material-symbols-outlined text-sm bg-surface-container p-sm rounded-lg border border-outline-variant/30">work</motion.span>
                  <span>LinkedIn</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-xl border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-md font-body-md text-on-surface-variant text-sm">
          <p>© 2026 Prigel Labs Limited. Membangun solusi digital untuk UMKM Indonesia.</p>
          <div className="flex gap-lg">
            <Link href="#" passHref legacyBehavior>
              <motion.a whileHover={{ color: "var(--color-primary-fixed)" }} className="cursor-pointer transition-colors">Kebijakan Privasi</motion.a>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <motion.a whileHover={{ color: "var(--color-primary-fixed)" }} className="cursor-pointer transition-colors">Ketentuan Layanan</motion.a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
