"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "99.99%", label: "Uptime Sistem", desc: "Infrastruktur cloud tangguh" },
  { value: "15 Menit", label: "Onboarding", desc: "Sangat mudah dipelajari" },
  { value: "24/7", label: "Dukungan Teknis", desc: "Selalu siap mendampingi" }
] as const;

const coreValues = [
  { icon: "bolt", title: "Sederhana & Powerful", desc: "Teknologi canggih yang dikemas dengan antarmuka yang sangat ringkas." },
  { icon: "security", title: "Keamanan Maksimal", desc: "Enkripsi data harian memastikan operasional bisnis Anda aman." }
] as const;

export default function About() {
  return (
    <section className="py-xxl px-margin-mobile md:px-margin-desktop bg-[#08132a] relative overflow-hidden border-b border-outline-variant/10" id="about">
      {/* Visual background details */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none studio-grid" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto grid md:grid-cols-12 gap-xxl items-center relative z-10">
        
        {/* Left Column: Description, Core Values, and Stats (Colspan 7) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 space-y-xl text-left"
        >
          <div>
            <span className="font-label-md text-primary-fixed tracking-[0.25em] uppercase block mb-md">[ profil studio ]</span>
            <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">Tentang Prigel Labs Limited</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed mt-md">
              Prigel Labs Limited adalah perusahaan pengembang aplikasi inovatif yang berfokus pada digitalisasi UMKM. Kami percaya bahwa teknologi seharusnya mempermudah, bukan mempersulit. Oleh karena itu, kami membangun ekosistem solusi digital yang intuitif namun berkinerja tinggi untuk operasional bisnis harian Anda.
            </p>
          </div>

          {/* Futuristic Core Values */}
          <div className="grid sm:grid-cols-2 gap-lg">
            {coreValues.map((value, i) => (
              <div key={i} className="p-md bg-surface-container rounded-xl border border-outline-variant/20 flex gap-sm items-start">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed/10 flex items-center justify-center text-primary-fixed shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-md">{value.icon}</span>
                </div>
                <div className="space-y-xs">
                  <h4 className="font-bold text-primary text-body-md">{value.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* High-Tech Metric Counters */}
          <div className="pt-lg border-t border-outline-variant/10 grid grid-cols-3 gap-md">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-xs">
                <p className="font-label-md text-primary-fixed font-bold text-lg md:text-xl tracking-tight">{stat.value}</p>
                <div className="space-y-0.5">
                  <p className="font-bold text-primary text-xs uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[10px] text-on-surface-variant leading-tight">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

        {/* Right Column: Cybernetic HUD Viewscreen Image (Colspan 5) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-5 relative aspect-[4/3] sm:aspect-video md:aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden border border-outline-variant/30 group bg-[#0d1b3e]"
        >
          {/* Cybernetic HUD Overlay details */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary-fixed/40 rounded-tl z-20 group-hover:border-primary-fixed transition-colors" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary-fixed/40 rounded-tr z-20 group-hover:border-primary-fixed transition-colors" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary-fixed/40 rounded-bl z-20 group-hover:border-primary-fixed transition-colors" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary-fixed/40 rounded-br z-20 group-hover:border-primary-fixed transition-colors" />
          
          {/* Scanning line indicator */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary-fixed/60 to-transparent shadow-[0_0_10px_rgba(100,255,218,0.8)] z-20 animate-scan pointer-events-none" />

          {/* Transparent color tint overlay */}
          <div className="absolute inset-0 bg-primary-fixed/10 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
          
          <motion.img 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8 }}
            alt="Workspace Prigel Labs" 
            className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC14q9mEcdYHuuIGOnz7Ax2UZgMbM6FJf9QDipsc0VICTJawgO1UwuAN5RlSoo5ecHrXhRY0_aB3M8RprL54YqYLnKpJaSFT5ngxXrDFSxVOS4fUWcQEfW2WUCtFAySkJlKncKCXc2NZPUXiTpwBkKOdL_MoEvsY1dCe-4Wo2qWqyZQzmW8UoQqKU6BdUKA89_mu9Chr08uNRBEBdJL4oM0SaiXk0Q8SL_I0A3_U3SkDOc5N43pyL5B2-_DQvadCayd0bYujkoVIi-8" 
          />
        </motion.div>

      </div>
    </section>
  );
}
