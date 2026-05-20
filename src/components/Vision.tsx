"use client";

import { motion } from "framer-motion";

import { SiteContent } from "@/lib/contentService";

export default function Vision({ content }: { content: SiteContent["vision"] }) {
  return (
    <section id="vision" className="py-xxl bg-[#08132a] relative overflow-hidden border-y border-outline-variant/10">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-fixed/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none studio-grid" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-xxl"
        >
          <span className="font-label-md text-primary-fixed tracking-[0.25em] uppercase block mb-md">{content.subtitle}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary leading-tight mb-md">
            {content.title}
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            {content.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          {content.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(100, 255, 218, 0.15)",
                borderColor: "rgba(100, 255, 218, 0.4)",
                backgroundColor: "rgba(21, 31, 55, 0.8)"
              }}
              className="p-xl bg-surface-container rounded-2xl border border-outline-variant/20 relative transition-all duration-300 flex flex-col justify-between items-start text-left group overflow-hidden"
            >
              {/* Tech Brackets corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-fixed/20 rounded-tl group-hover:border-primary-fixed/60 transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-fixed/20 rounded-tr group-hover:border-primary-fixed/60 transition-colors" />

              <div className="w-full space-y-md">
                {/* Top header within card: Icon & Status */}
                <div className="flex justify-between items-center w-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.gradient} p-[1px] flex items-center justify-center`}>
                    <div className="w-full h-full rounded-xl bg-[#08132a] flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-label-md px-2 py-0.5 rounded border ${item.statusColor} font-bold tracking-wider`}>
                    {item.status}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-sm">
                  <h4 className="font-headline-md text-primary font-bold">{item.title}</h4>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* High-tech matrix decoration bar at the bottom */}
              <div className="w-full h-[2px] bg-outline-variant/10 rounded-full mt-xl relative overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${item.gradient} w-1/3 rounded-full`}
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: i * 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
