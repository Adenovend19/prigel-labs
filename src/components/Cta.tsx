"use client";

import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section id="cta" className="relative py-[120px] px-margin-mobile md:px-margin-desktop text-center overflow-hidden bg-[#08132a]">
      {/* Animated Radar/Pulse Background */}
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-fixed/20 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen"
      />
      
      {/* Rotating Dashed Circles for High-Tech Vibe */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary-fixed/20 border-dashed pointer-events-none z-0"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-primary-fixed/10 border-dashed pointer-events-none z-0"
      />
      
      {/* Corner Targeting Brackets */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 border-t-2 border-l-2 border-primary-fixed/50 z-0"></div>
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-16 h-16 border-b-2 border-r-2 border-primary-fixed/50 z-0"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="relative z-10 max-w-4xl mx-auto space-y-xl"
      >
        <motion.div 
          variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
          className="inline-flex items-center gap-2 px-md py-xs rounded-full border border-primary-fixed/30 bg-primary-fixed/10 text-primary-fixed font-label-md text-label-md tracking-widest uppercase shadow-[0_0_20px_rgba(100,255,218,0.2)] backdrop-blur-sm"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
          Akselerasi Bisnis
        </motion.div>

        <motion.h2 
          variants={{ hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
          className="font-display-lg-mobile md:font-headline-lg text-display-lg-mobile md:text-headline-lg text-primary glow-cyan leading-tight"
        >
          Siap Membawa Bisnis Anda ke Level Berikutnya?
        </motion.h2>
        
        <motion.p 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          className="font-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          Gunakan teknologi yang membantu bisnis berkembang lebih efisien dan modern bersama Prigel Labs Limited.
        </motion.p>
        
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.5 } } }}
          className="flex flex-col sm:flex-row gap-md justify-center pt-lg"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(100, 255, 218, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="bg-primary-fixed text-on-primary-fixed px-xl py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group flex items-center justify-center gap-2"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-[scan_1.5s_ease-in-out_infinite]"></div>
            <span className="relative z-10">Mulai Sekarang</span>
            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 255, 218, 0.1)", borderColor: "rgba(100, 255, 218, 0.8)", textShadow: "0 0 8px rgba(100,255,218,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="border border-outline-variant text-primary px-xl py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">chat</span>
            Konsultasi Gratis
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
