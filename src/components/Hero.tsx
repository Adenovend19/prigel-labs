"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ content }: { content?: any }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Futuristic blur & scale reveal
  const futuristicReveal = {
    hidden: { filter: "blur(20px)", opacity: 0, scale: 1.05, y: 30 },
    visible: { 
      filter: "blur(0px)", 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  } as const;

  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop overflow-hidden bg-[#08132a]">
      {/* Continuously Moving Tech Grid */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(100, 255, 218, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        } as React.CSSProperties}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ ease: "linear", duration: 3, repeat: Infinity }}
      />
      
      {/* Vignette fade out for grid edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#08132a_80%)] pointer-events-none"></div>
      
      {/* Ambient Drifting Glowing Orbs */}
      <motion.div 
        animate={{ y: [0, -60, 0], x: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-[400px] h-[400px] bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />
      <motion.div 
        animate={{ y: [0, 80, 0], x: [0, -50, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-[10%] w-[500px] h-[500px] bg-[#b52bff]/5 rounded-full blur-[140px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* Falling Data Beams (Cyberpunk Rain effect) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: ["-100vh", "100vh"], opacity: [0, 1, 0] }}
          transition={{ 
            duration: 3 + Math.random() * 4, 
            repeat: Infinity, 
            ease: "linear", 
            delay: Math.random() * 5 
          }}
          className="absolute w-[2px] bg-gradient-to-b from-transparent via-primary-fixed to-transparent z-0 opacity-0"
          style={{ 
            left: `${15 + i * 18}%`, 
            height: `${100 + Math.random() * 200}px`,
            boxShadow: "0 0 10px rgba(100, 255, 218, 0.8)"
          } as React.CSSProperties}
        />
      ))}
      
      {/* Interactive Mouse Follower Glow with flicker */}
      <motion.div 
        className="hidden md:block absolute top-0 left-0 w-[400px] h-[400px] bg-primary-fixed/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
          opacity: [0.6, 1, 0.5, 0.9, 0.7],
        }}
        transition={{ 
          x: { type: "tween", ease: "linear", duration: 0.15 },
          y: { type: "tween", ease: "linear", duration: 0.15 },
          opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
      />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
          }
        }}
        className="relative z-10 max-w-5xl mx-auto space-y-lg"
      >
        <motion.div 
          variants={{
            hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
            visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: "circOut" } }
          }}
          className="inline-block px-md py-xs rounded-full border border-primary-fixed/30 bg-primary-fixed/10 text-primary-fixed font-label-md text-label-md mb-md tracking-widest uppercase shadow-[0_0_20px_rgba(100,255,218,0.2)] backdrop-blur-sm"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed animate-pulse mr-2"></span>
          {content?.systemStatus || "Sistem Online"}
        </motion.div>
        
        <motion.h1 
          variants={futuristicReveal}
          className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-[1.1] tracking-tighter glow-cyan"
        >
          {content?.title || "Teknologi Modern untuk Membantu UMKM Bertumbuh Lebih Cepat"}
        </motion.h1>
        
        <motion.p 
          variants={futuristicReveal}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed"
        >
          {content?.desc || "Prigel Labs Studio mengembangkan ekosistem aplikasi digital untuk membantu UMKM mengelola bisnis dengan lebih mudah, efisien, dan terintegrasi."}
        </motion.p>
        
        <motion.div 
          variants={futuristicReveal}
          className="flex flex-col sm:flex-row gap-md justify-center pt-xl relative"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(100, 255, 218, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-fixed text-on-primary-fixed px-xl py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-sm relative overflow-hidden group"
          >
            {/* Cyberpunk Glitch scanning line on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-[scan_1.5s_ease-in-out_infinite]"></div>
            <span className="relative z-10">{content?.ctaPrimary || "Coba POS Universal"}</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 255, 218, 0.1)", borderColor: "rgba(100, 255, 218, 0.8)", textShadow: "0 0 8px rgba(100,255,218,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="border border-outline-variant text-primary px-xl py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-sm transition-all"
          >
            {content?.ctaSecondary || "Hubungi Kami"}
          </motion.button>
        </motion.div>
        
        <motion.div 
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.6 } }}
          transition={{ delay: 1.2 }}
          className="pt-xl"
        >
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant max-w-2xl mx-auto border-t border-outline-variant/30 pt-md">
            {content?.footerText || "[ Inisialisasi Modul ]: Sistem kasir modern & solusi bisnis digital."}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
