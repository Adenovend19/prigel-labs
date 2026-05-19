"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "Beranda", href: "#home" },
  { id: "about", label: "Tentang Kami", href: "#about" },
  { id: "products", label: "Produk", href: "#products" },
  { id: "testimonials", label: "Testimoni", href: "#testimonials" },
  { id: "contact", label: "Kontak", href: "#contact" }
] as const;

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Bounding rect viewport proximity check (bottom-to-top)
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();

          if (item.id === "contact") {
            // Special check for footer: active if its top is in the viewport (lower 85% of screen)
            if (rect.top <= window.innerHeight * 0.85) {
              setActiveSection(item.id);
              break;
            }
          } else {
            // Normal check for other sections: active if top has scrolled past sticky header (220px)
            if (rect.top <= 220) {
              setActiveSection(item.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 top-0 sticky z-50 w-full"
    >
      <nav className="flex justify-between items-center w-full px-4 md:px-8 max-w-container-max mx-auto h-20 relative">

        {/* Responsive Logo & Brand */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
          }}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <svg className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64ffda" />
                <stop offset="100%" stopColor="#00b5ff" />
              </linearGradient>
              <filter id="logoGlowHeader" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" stroke="url(#logoGradHeader)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            <path d="M35 25 H55 C65 25 72 32 72 40 C72 48 65 55 55 55 H35 V75 M35 48 H53 C57 48 60 45 60 40 C60 35 57 32 53 32 H35 V48" stroke="url(#logoGradHeader)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#logoGlowHeader)" />
            <circle cx="50" cy="5" r="4" fill="#64ffda" />
            <circle cx="90" cy="28" r="3" fill="#00b5ff" />
            <circle cx="10" cy="72" r="3" fill="#64ffda" />
          </svg>
          {/* Brand Name: Short on mobile/tablet, full name only on desktop (>= md) */}
          <span className="font-headline-md text-base sm:text-lg md:text-headline-md font-bold text-primary tracking-tighter">
            Prigel Labs<span className="hidden md:inline"> Limited</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link key={item.id} href={item.href} passHref legacyBehavior>
                <a className={`relative font-body-md text-sm transition-colors py-2 cursor-pointer ${isActive ? "text-primary-fixed font-bold" : "text-on-surface-variant hover:text-primary"}`}>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-fixed"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </Link>
            );
          })}
        </div>

        {/* Actions & Hamburger Toggle */}
        <div className="flex items-center gap-md">
          {/* Action button: visible ONLY on desktop (>= md) to keep mobile & tablet fully clean */}
          <Link href="#cta" passHref legacyBehavior>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(100, 255, 218, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-block bg-primary-fixed text-on-primary-fixed px-lg py-sm rounded-lg font-label-md font-bold uppercase tracking-widest text-[12px] transition-all"
            >
              Mulai Sekarang
            </motion.button>
          </Link>

          {/* Premium Sci-Fi Hamburger Toggle Button (visible ONLY on < md) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-outline-variant/30 text-primary bg-surface-container/50 focus:outline-none relative z-50 transition-colors hover:bg-surface-container"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center relative">
              <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-[3px] translate-y-[-1px]" : ""}`} />
              <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-[3px] translate-y-[1px]" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-surface-container-lowest/95 backdrop-blur-lg border-b border-outline-variant/20 overflow-hidden w-full absolute left-0 right-0 z-40"
          >
            <div className="flex flex-col p-lg space-y-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link key={item.id} href={item.href} passHref legacyBehavior>
                    <a
                      onClick={() => setIsOpen(false)}
                      className={`font-body-md text-sm transition-colors py-sm px-md rounded-lg flex items-center justify-between cursor-pointer ${isActive ? "bg-primary-fixed/10 text-primary-fixed font-bold" : "text-on-surface-variant hover:text-primary"}`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="material-symbols-outlined text-sm text-primary-fixed">chevron_right</span>
                      )}
                    </a>
                  </Link>
                );
              })}

              <Link href="#cta" passHref legacyBehavior>
                <a
                  onClick={() => setIsOpen(false)}
                  className="bg-primary-fixed text-on-primary-fixed text-center py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-xs mt-sm block"
                >
                  Mulai Sekarang
                </a>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
