"use client";

import { motion } from "framer-motion";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  gradient: string;
}

const testimonials: TestimonialItem[] = [
  {
    quote: "POS Universal membantu operasional toko retail kami menjadi jauh lebih cepat dan terstruktur. Laporan harian tersaji instan tanpa pusing rekap manual.",
    name: "Aditya Pratama",
    role: "Owner",
    company: "Lumina Cafe & Bistro",
    initials: "AP",
    gradient: "from-[#00f0ff] to-[#b52bff]",
  },
  {
    quote: "Sistem kasirnya sangat intuitif dan mudah dipelajari oleh karyawan baru hanya dalam waktu 15 menit. Integrasi multi-cabang berjalan mulus tanpa hambatan.",
    name: "Siti Rahma",
    role: "Operational Manager",
    company: "Glow & Co Cosmetics",
    initials: "SR",
    gradient: "from-[#ff0055] to-[#b52bff]",
  },
  {
    quote: "Pelayanan dukungan pelanggan dari tim Prigel Labs sangat responsif. Solusi digital ini benar-benar mempercepat proses digitalisasi bisnis kami.",
    name: "Budi Santoso",
    role: "Founder",
    company: "Sentosa Furniture",
    initials: "BS",
    gradient: "from-[#00f0ff] to-[#00ff88]",
  }
];

export default function Testimonials({ content }: { content?: any }) {
  const activeSubtitle = content?.subtitle || "Testimoni";
  const activeTitle = content?.title || "Dipercaya untuk Mendukung Bisnis Modern";
  const activeList = content?.list || testimonials;

  return (
    <section className="py-xxl bg-[#08132a] relative overflow-hidden" id="testimonials">
      {/* Decorative ambient background glow */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-xxl"
        >
          <span className="font-label-md text-primary-fixed tracking-[0.2em] uppercase block mb-md">{activeSubtitle}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">
            {activeTitle}
          </h2>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-3 gap-xl"
        >
          {activeList.map((item: any, i: number) => (
            <motion.div 
              key={i} 
              variants={{ 
                hidden: { opacity: 0, scale: 0.95, y: 30 }, 
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } 
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(100, 255, 218, 0.15)", 
                borderColor: "rgba(100, 255, 218, 0.4)",
                backgroundColor: "rgba(21, 31, 55, 0.9)"
              }}
              className="p-xl bg-surface-container rounded-2xl border border-outline-variant/30 relative transition-all duration-300 flex flex-col justify-between"
            >
              {/* Giant quote sign inside */}
              <span className="material-symbols-outlined text-primary-fixed/5 absolute top-6 right-6 text-7xl select-none pointer-events-none">format_quote</span>
              
              <div className="space-y-lg relative z-10">
                {/* Rating stars */}
                <div className="flex gap-1 text-primary-fixed">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="material-symbols-outlined text-md fill-current">star</span>
                  ))}
                </div>
                
                <p className="font-body-md text-on-surface-variant leading-relaxed min-h-[100px]">
                  “{item.quote}”
                </p>
              </div>

              {/* User Profil */}
              <div className="flex items-center gap-md border-t border-outline-variant/10 pt-lg mt-xl relative z-10">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center font-bold text-white shadow-lg`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-body-md">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant">{item.role} • <span className="text-primary-fixed/80">{item.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
