"use client";

import { motion } from "framer-motion";

const featuresDefault = [
  { icon: "point_of_sale", title: "Manajemen Penjualan", desc: "Catat transaksi dengan cepat dan akurat dalam satu sistem yang mudah digunakan." },
  { icon: "analytics", title: "Laporan Real-time", desc: "Pantau performa bisnis kapan saja dengan data penjualan yang otomatis diperbarui." },
  { icon: "devices", title: "Multi Device", desc: "Dapat digunakan di berbagai perangkat untuk fleksibilitas operasional bisnis." },
  { icon: "inventory_2", title: "Manajemen Produk", desc: "Kelola stok, kategori, dan harga produk dengan lebih praktis." },
  { icon: "ads_click", title: "Mudah Digunakan", desc: "Interface modern dan sederhana sehingga mudah dipahami oleh semua pengguna." },
  { icon: "shield_with_heart", title: "Aman & Stabil", desc: "Data bisnis tersimpan dengan aman dan sistem berjalan stabil untuk mendukung operasional harian." }
];

export default function Products({ content }: { content?: any }) {
  const activeFeatures = content?.features || featuresDefault;

  return (
    <section className="py-xxl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="products">
      
      {/* Scroll-spy entrance animation for the header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-lg md:gap-xl"
      >
        <div className="w-full">
          <span className="font-label-md text-primary-fixed tracking-[0.2em] uppercase block mb-md">{content?.subtitle || "Produk Pertama"}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary leading-[1.2] pr-0 lg:pr-8">{content?.title || "POS Universal: Satu Aplikasi Kasir untuk Semua Jenis Usaha"}</h2>
        </div>
        <p className="text-on-surface-variant w-full text-left leading-relaxed text-body-sm">
          {content?.desc || "POS Universal adalah aplikasi Point of Sale modern yang dirancang untuk berbagai jenis UMKM — mulai dari toko retail, kafe, restoran, hingga usaha rumahan."}
        </p>
      </motion.div>

      {/* Scroll-spy spring entrance animation for each card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mt-xl">
        {activeFeatures.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.08 }}
            whileHover={{ y: -8, borderColor: "rgba(100, 255, 218, 0.4)", backgroundColor: "rgba(21, 31, 55, 0.8)", boxShadow: "0 10px 30px -10px rgba(100,255,218,0.15)" }}
            className="p-xl bg-surface-container/50 backdrop-blur rounded-xl border border-outline-variant/20 transition-colors duration-300"
          >
            <motion.span
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="material-symbols-outlined text-primary-fixed mb-md text-3xl inline-block origin-center"
            >
              {feature.icon}
            </motion.span>
            <h3 className="font-headline-md text-headline-md text-primary mb-md">{feature.title}</h3>
            <p className="text-on-surface-variant font-body-md">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Scroll-spy entrance animation for the action button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-xl text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(100, 255, 218, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-fixed text-on-primary-fixed px-xl py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-sm transition-all"
        >
          {content?.ctaText || "Mulai Gunakan POS Universal"}
        </motion.button>
      </motion.div>
    </section>
  );
}
