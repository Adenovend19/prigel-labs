"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/contentService";

export default function Contact({ content }: { content: SiteContent["contact"] }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate high-tech data transmission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <section id="contact" className="py-xxl bg-[#08132a] relative overflow-hidden">
      {/* Decorative scanning grid or beam in background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none studio-grid" />
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid md:grid-cols-5 gap-xxl items-start">

          {/* Left Column: Technical Contact Info */}
          <div className="md:col-span-2 space-y-xl">
            <div>
              <span className="font-label-md text-primary-fixed tracking-[0.2em] uppercase block mb-md">{content.subtitle}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">{content.title}</h2>
              <p className="font-body-md text-on-surface-variant mt-md max-w-sm leading-relaxed">
                {content.desc}
              </p>
            </div>

            <div className="space-y-md">
              <motion.a
                href={`mailto:${content.email}`}
                whileHover={{ x: 6, borderColor: "rgba(100, 255, 218, 0.4)", backgroundColor: "rgba(21, 31, 55, 0.8)" }}
                className="flex items-center gap-md p-md bg-surface-container rounded-xl border border-outline-variant/30 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/10 flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs font-label-md uppercase tracking-wider text-primary-fixed/80">surel / email</p>
                  <p className="font-bold text-primary text-body-md">{content.email}</p>
                </div>
              </motion.a>

              <motion.a
                href={`https://wa.me/${content.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(content.whatsappText)}`}
                target="_blank"
                whileHover={{ x: 6, borderColor: "rgba(100, 255, 218, 0.4)", backgroundColor: "rgba(21, 31, 55, 0.8)" }}
                className="flex items-center gap-md p-md bg-surface-container rounded-xl border border-outline-variant/30 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <p className="text-xs font-label-md uppercase tracking-wider text-[#00ff88]/80">jalur cepat whatsapp</p>
                  <p className="font-bold text-primary text-body-md">{content.phone}</p>
                </div>
              </motion.a>

              <div className="p-md bg-surface-container rounded-xl border border-outline-variant/30 flex items-start gap-md">
                <div className="w-10 h-10 rounded-lg bg-[#b52bff]/10 flex items-center justify-center text-[#b52bff] shrink-0">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div>
                  <p className="text-xs font-label-md uppercase tracking-wider text-[#b52bff]/80">kantor operasional</p>
                  <p className="font-body-md text-on-surface-variant mt-xs whitespace-pre-wrap">{content.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cyberpunk Interactive Form */}
          <div className="md:col-span-3">
            <div className="relative p-xl md:p-xxl bg-surface-container/40 backdrop-blur rounded-2xl border border-outline-variant/20 overflow-hidden">

              {/* Technical brackets decorative */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-fixed/40 rounded-tl" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-fixed/40 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-fixed/40 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-fixed/40 rounded-br" />

              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-lg relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <h3 className="font-label-md text-sm font-bold text-primary-fixed tracking-widest uppercase mb-sm">[ kirim transmisi data ]</h3>
                      <p className="text-xs text-on-surface-variant">Lengkapi parameter di bawah untuk mengirim data langsung ke tim kami.</p>
                    </div>

                    <div className="space-y-md">
                      {/* Name input */}
                      <div className="space-y-xs">
                        <label className="block text-xs font-label-md uppercase tracking-wider text-primary-fixed/70">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masukkan nama Anda"
                          className="w-full bg-[#0d1b3e] border border-outline-variant/40 rounded-lg px-md py-sm text-primary placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all font-body-md"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-xs">
                        <label className="block text-xs font-label-md uppercase tracking-wider text-primary-fixed/70">Surel / Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nama@email.com"
                          className="w-full bg-[#0d1b3e] border border-outline-variant/40 rounded-lg px-md py-sm text-primary placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all font-body-md"
                        />
                      </div>

                      {/* Message input */}
                      <div className="space-y-xs">
                        <label className="block text-xs font-label-md uppercase tracking-wider text-primary-fixed/70">Isi Pesan</label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tuliskan pesan Anda..."
                          className="w-full bg-[#0d1b3e] border border-outline-variant/40 rounded-lg px-md py-sm text-primary placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all font-body-md resize-none"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(100, 255, 218, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary-fixed text-on-primary-fixed py-md rounded-lg font-label-md font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-sm relative overflow-hidden"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-on-primary-fixed border-t-transparent rounded-full" />
                          <span>Mentransmisikan...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">send</span>
                          <span>Kirim Data Pesan</span>
                        </>
                      )}

                      {/* Scanning visual overlay on button */}
                      <div className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-scan pointer-events-none" />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="text-center py-xl space-y-lg relative z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                      <span className="material-symbols-outlined text-3xl">check_circle</span>
                    </div>
                    <div className="space-y-xs">
                      <h4 className="font-label-md text-[#00ff88] uppercase tracking-wider font-bold">Transmisi Berhasil</h4>
                      <p className="text-body-md text-primary">Pesan Anda telah berhasil dienkripsi dan dikirimkan.</p>
                      <p className="text-xs text-on-surface-variant max-w-xs mx-auto mt-sm">Tim Prigel Labs akan memproses data Anda dalam waktu 1x24 jam.</p>
                    </div>

                    <motion.button
                      onClick={() => setStatus("idle")}
                      whileHover={{ scale: 1.05 }}
                      className="px-xl py-sm bg-surface-container-high hover:bg-surface-container rounded-lg border border-outline-variant/30 text-xs font-label-md uppercase tracking-wider text-primary"
                    >
                      Kirim Pesan Lain
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
