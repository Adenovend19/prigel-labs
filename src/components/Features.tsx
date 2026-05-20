"use client";

import { motion } from "framer-motion";

const featuresDefault = [
  { title: "Fokus pada UMKM", desc: "Kami memahami tantangan bisnis UMKM dan membangun solusi yang relevan." },
  { title: "Teknologi Modern", desc: "Menggunakan teknologi terbaru untuk menghasilkan aplikasi yang cepat, aman, dan scalable." },
  { title: "User Friendly", desc: "Desain aplikasi dibuat sederhana agar mudah digunakan siapa saja." },
  { title: "Berkembang Bersama", desc: "Kami tidak hanya membuat aplikasi, tetapi juga membangun solusi jangka panjang untuk pertumbuhan bisnis." }
];

export default function Features({ content }: { content?: any }) {
  const activeList = content?.list || featuresDefault;

  return (
    <section className="py-xxl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        className="text-center mb-xxl"
      >
        <span className="font-label-md text-primary-fixed tracking-[0.3em] uppercase">{content?.subtitle || "Keunggulan"}</span>
        <h2 className="font-headline-lg text-headline-lg text-primary mt-sm">{content?.title || "Kenapa Prigel Labs Limited?"}</h2>
      </motion.div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg"
      >
        {activeList.map((item: any, i: number) => (
          <motion.div 
            key={i} 
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            whileHover={{ x: 5, backgroundColor: "rgba(21, 31, 55, 0.8)" }}
            className="space-y-md p-lg border-l-2 border-primary-fixed bg-surface-container/30 transition-colors cursor-default"
          >
            <h4 className="font-headline-md text-primary">{item.title}</h4>
            <p className="text-on-surface-variant">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
