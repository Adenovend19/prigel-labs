"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/contentService";

export default function Footer({ content }: { content: SiteContent["footer"] }) {
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
              <svg className="h-8 w-8 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#64ffda" />
                    <stop offset="100%" stopColor="#00b5ff" />
                  </linearGradient>
                  <filter id="logoGlowFooter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" stroke="url(#logoGradFooter)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                <path d="M35 25 H55 C65 25 72 32 72 40 C72 48 65 55 55 55 H35 V75 M35 48 H53 C57 48 60 45 60 40 C60 35 57 32 53 32 H35 V48" stroke="url(#logoGradFooter)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#logoGlowFooter)" />
                <circle cx="50" cy="5" r="4" fill="#64ffda" />
                <circle cx="90" cy="28" r="3" fill="#00b5ff" />
                <circle cx="10" cy="72" r="3" fill="#64ffda" />
              </svg>
              <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Prigel Labs Limited</span>
            </motion.div>
            <p className="font-body-md text-on-surface-variant w-full md:w-1/2 leading-relaxed">
              {content.brandDesc}
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
          <p>© {new Date().getFullYear()} {content.copyright}</p>
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
