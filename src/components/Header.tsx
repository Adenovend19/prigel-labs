"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { id: "home", label: "Beranda", href: "#home" },
  { id: "about", label: "Tentang Kami", href: "#about" },
  { id: "products", label: "Produk", href: "#products" },
  { id: "testimonials", label: "Testimoni", href: "#testimonials" },
  { id: "contact", label: "Kontak", href: "#contact" }
] as const;

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");

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
      className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 docked full-width top-0 sticky z-50"
    >
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-20">
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-sm cursor-pointer"
        >
          <img 
            alt="Logo Prigel Labs" 
            className="h-10 w-10 object-contain" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujznjUb-3rN4q3tYmP5SEQ-UXS_oKrzoioPQuAdL4c52zQR0r9ieCP9v-VklctFYYSOQt-mGK9b56wd8dejMHacoiJolUX8ggfnOyL9FOb3-rxTJqhCf0XiBxCrCTJuFhBaTPyg4rBzw85Reap57vw2qT_jI031CQPuzLTm0K5NyzhYKjCTj3RtHkhfOA3ggs1-HsROqh_IGL5Z2an5T6OcVxuVYiFAfVuEIlL9KJ2exRk1RoYa5a878_W3" 
          />
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tighter">Prigel Labs Limited</span>
        </motion.div>
        
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
        
        <div className="flex items-center gap-md">
          <Link href="#cta" passHref legacyBehavior>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(100, 255, 218, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-fixed text-on-primary-fixed px-lg py-sm rounded-lg font-label-md font-bold uppercase tracking-widest text-[12px] transition-all"
            >
              Mulai Sekarang
            </motion.button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
