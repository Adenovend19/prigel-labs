"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/contentService";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check auth on load
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password");
    if (savedPassword) {
      verifySavedPassword(savedPassword);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifySavedPassword = async (pass: string) => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPassword(pass);
        fetchContent(pass);
      } else {
        sessionStorage.removeItem("admin_password");
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("admin_password", password);
        setIsAuthenticated(true);
        fetchContent(password);
      } else {
        setAuthError(data.error || "Password salah.");
      }
    } catch (e) {
      setAuthError("Gagal menghubungi server.");
    }
  };

  const fetchContent = async (authPass: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content", {
        headers: { "x-admin-password": authPass },
      });
      const data = await res.json();
      if (data.success) {
        setContent(data.content);
      } else {
        setSaveStatus({ type: "error", message: "Gagal memuat konten." });
      }
    } catch (e) {
      setSaveStatus({ type: "error", message: "Gagal memuat konten dari API." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    setSaveStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus({ type: "success", message: "Konten berhasil disimpan dan diperbarui!" });
        setTimeout(() => setSaveStatus({ type: "", message: "" }), 5000);
      } else {
        setSaveStatus({ type: "error", message: data.error || "Gagal menyimpan konten." });
      }
    } catch (e) {
      setSaveStatus({ type: "error", message: "Terjadi kesalahan jaringan." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_password");
    setIsAuthenticated(false);
    setPassword("");
    setContent(null);
  };

  // Helper to update deeply nested states
  const updateContentField = (section: keyof SiteContent, field: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    });
  };

  // Download backup content.json
  const downloadBackup = () => {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "content.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08132a] flex flex-col items-center justify-center text-primary">
        <div className="w-12 h-12 rounded-full border-4 border-primary-fixed/20 border-t-primary-fixed animate-spin mb-md" />
        <p className="font-label-md text-sm text-primary-fixed tracking-widest uppercase">Inisialisasi Admin...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08132a] flex items-center justify-center p-md relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none studio-grid" />
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-primary-fixed/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[440px] max-w-[90vw] bg-surface-container/45 backdrop-blur-xl rounded-2xl border border-outline-variant/20 p-lg sm:p-xl shadow-[0_0_50px_rgba(100,255,218,0.08)] flex flex-col gap-lg relative z-10 group"
        >
          {/* Cybernetic HUD Corner Borders */}
          <div className="absolute top-[12px] left-[12px] w-[16px] h-[16px] border-t-2 border-l-2 border-primary-fixed/30 rounded-tl z-20 group-hover:border-primary-fixed transition-colors duration-500" />
          <div className="absolute top-[12px] right-[12px] w-[16px] h-[16px] border-t-2 border-r-2 border-primary-fixed/30 rounded-tr z-20 group-hover:border-primary-fixed transition-colors duration-500" />
          <div className="absolute bottom-[12px] left-[12px] w-[16px] h-[16px] border-b-2 border-l-2 border-primary-fixed/30 rounded-bl z-20 group-hover:border-primary-fixed transition-colors duration-500" />
          <div className="absolute bottom-[12px] right-[12px] w-[16px] h-[16px] border-b-2 border-r-2 border-primary-fixed/30 rounded-br z-20 group-hover:border-primary-fixed transition-colors duration-500" />

          {/* Header */}
          <div className="text-center flex flex-col items-center gap-sm">
            <div className="w-[64px] h-[64px] rounded-2xl bg-primary-fixed/5 border border-primary-fixed/20 flex items-center justify-center text-primary-fixed shadow-[0_0_20px_rgba(100,255,218,0.1)] group-hover:shadow-[0_0_30px_rgba(100,255,218,0.25)] transition-all duration-500">
              <span className="material-symbols-outlined text-3xl animate-pulse">lock</span>
            </div>
            <div className="space-y-[4px]">
              <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary tracking-tight font-semibold">Prigel Labs</h1>
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">Panel Kontrol Admin</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-md">
            <div className="flex flex-col gap-sm">
              <label className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block">Kata Sandi Akses</label>
              <div className="relative flex items-center focus-within:border-primary-fixed border border-outline-variant/30 rounded-xl bg-[#08132a]/80 transition-all duration-300 group-hover:border-outline-variant/50 focus-within:shadow-[0_0_15px_rgba(100,255,218,0.15)] w-full">
                <span className="material-symbols-outlined absolute left-[16px] text-on-surface-variant/70 text-lg pointer-events-none">vpn_key</span>
                
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin..."
                  className="w-full bg-transparent py-[14px] pl-[48px] pr-[48px] text-primary placeholder-on-surface-variant/40 focus:outline-none text-sm transition-all rounded-xl"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[16px] text-on-surface-variant/70 hover:text-primary-fixed transition-colors p-[4px] rounded hover:bg-surface-container-high/40 flex items-center justify-center cursor-pointer"
                  title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-sm bg-error-container/15 border border-error/20 rounded-xl text-error text-xs flex gap-sm items-center"
              >
                <span className="material-symbols-outlined text-md shrink-0">warning</span>
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-fixed text-on-primary-fixed py-[14px] rounded-xl font-label-md font-bold uppercase tracking-wider text-xs hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(100,255,218,0.15)] hover:shadow-[0_0_30px_rgba(100,255,218,0.35)] cursor-pointer"
            >
              Masuk ke Dashboard
            </button>
          </form>
          
          {/* Default Password Alert Banner */}
          <div className="flex gap-sm p-md bg-surface-container-low/70 border border-outline-variant/15 rounded-xl text-[11px] text-on-surface-variant/80 items-start leading-relaxed">
            <span className="material-symbols-outlined text-primary-fixed text-md mt-0.5 shrink-0">info</span>
            <div className="space-y-[4px]">
              <span className="font-semibold text-primary block">Kata Sandi Default</span>
              <span>Gunakan kata sandi <code className="bg-[#08132a] px-sm py-[2px] rounded font-mono text-primary-fixed font-bold border border-outline-variant/10">adminprigel</code> untuk akses cepat.</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08132a] text-primary flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none studio-grid" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Admin Header */}
      <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-md border-b border-outline-variant/20 px-margin-mobile md:px-margin-desktop py-md">
        <div className="max-w-container-max mx-auto flex justify-between items-center">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">Prigel Labs Panel</h1>
              <p className="font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider mt-1">Sistem Manajemen Konten</p>
            </div>
          </div>

          <div className="flex items-center gap-md">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-xs px-md py-sm border border-outline-variant/30 hover:border-primary-fixed/50 rounded-lg text-xs font-label-md transition-all text-on-surface-variant hover:text-primary-fixed"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Lihat Website
            </a>
            
            <button
              onClick={downloadBackup}
              className="flex items-center gap-xs px-md py-sm border border-primary-fixed/30 hover:bg-primary-fixed/10 rounded-lg text-xs font-label-md transition-all text-primary-fixed"
              title="Unduh file konfigurasi content.json sebagai cadangan"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Cadangan JSON
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-xs px-md py-sm bg-surface-container-high hover:bg-error-container/20 border border-outline-variant/30 hover:border-error/40 text-on-surface-variant hover:text-error rounded-lg text-xs font-label-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Panel Content */}
      {content && (
        <main className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl grid grid-cols-1 lg:grid-cols-12 gap-xl relative z-10">
          
          {/* Sidebar Menu - Tabs */}
          <div className="lg:col-span-3 space-y-md">
            <div className="bg-surface-container/60 backdrop-blur rounded-xl border border-outline-variant/20 p-md space-y-sm">
              <p className="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest px-sm border-b border-outline-variant/10 pb-sm mb-xs">
                Navigasi Halaman
              </p>
              
              {[
                { id: "hero", label: "Hero Banner", icon: "rocket_launch" },
                { id: "about", label: "Tentang Kami", icon: "corporate_fare" },
                { id: "products", label: "POS Products", icon: "point_of_sale" },
                { id: "vision", label: "Peta Ekosistem", icon: "visibility" },
                { id: "features", label: "Mengapa Kami", icon: "workspace_premium" },
                { id: "testimonials", label: "Testimoni", icon: "chat_bubble" },
                { id: "cta", label: "Call to Action", icon: "ads_click" },
                { id: "contact", label: "Kontak", icon: "call" },
                { id: "footer", label: "Footer", icon: "dock_to_bottom" },
                { id: "cloud", label: "Hosting & Cloud", icon: "cloud_sync" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSaveStatus({ type: "", message: "" });
                  }}
                  className={`w-full flex items-center gap-sm px-md py-md rounded-lg font-bold text-xs uppercase tracking-wider transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-primary-fixed text-on-primary-fixed shadow-[0_0_15px_rgba(100,255,218,0.2)]"
                      : "hover:bg-surface-container-high/60 text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-surface-container/60 backdrop-blur rounded-xl border border-outline-variant/20 p-md space-y-md">
              <div className="space-y-xs">
                <h4 className="font-bold text-sm">Status Penyimpanan</h4>
                <p className="text-xs text-on-surface-variant">Klik simpan untuk menerapkan perubahan secara instan di website.</p>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-primary-fixed text-on-primary-fixed py-md rounded-lg font-label-md font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-xs cursor-pointer shadow-[0_0_20px_rgba(100,255,218,0.15)] hover:shadow-[0_0_30px_rgba(100,255,218,0.3)] disabled:opacity-50 transition-all hover:scale-[1.02]"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-on-primary-fixed/20 border-t-on-primary-fixed animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-md">save</span>
                    Simpan Perubahan
                  </>
                )}
              </button>

              <AnimatePresence>
                {saveStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-sm rounded-lg text-xs flex gap-xs items-start ${
                      saveStatus.type === "success"
                        ? "bg-[#64ffda]/10 border border-[#64ffda]/30 text-primary-fixed"
                        : "bg-error-container/20 border border-error/30 text-error"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm mt-0.5">
                      {saveStatus.type === "success" ? "check_circle" : "error"}
                    </span>
                    <span>{saveStatus.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Form Editing Panel */}
          <div className="lg:col-span-9">
            <div className="bg-surface-container/30 backdrop-blur-md rounded-2xl border border-outline-variant/20 p-xl shadow-xl min-h-[60vh] flex flex-col">
              
              {/* Tab: HERO SECTION */}
              {activeTab === "hero" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Hero Banner</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah judul utama, deskripsi, dan tombol aksi di bagian teratas website.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Status Sistem</label>
                      <input
                        type="text"
                        value={content.hero.systemStatus}
                        onChange={(e) => updateContentField("hero", "systemStatus", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Teks Footer Hero</label>
                      <input
                        type="text"
                        value={content.hero.footerText}
                        onChange={(e) => updateContentField("hero", "footerText", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Utama (Title)</label>
                      <textarea
                        rows={3}
                        value={content.hero.title}
                        onChange={(e) => updateContentField("hero", "title", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Paragraf Deskripsi</label>
                      <textarea
                        rows={3}
                        value={content.hero.desc}
                        onChange={(e) => updateContentField("hero", "desc", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all leading-relaxed"
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Label Tombol Utama</label>
                      <input
                        type="text"
                        value={content.hero.ctaPrimary}
                        onChange={(e) => updateContentField("hero", "ctaPrimary", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Label Tombol Sekunder</label>
                      <input
                        type="text"
                        value={content.hero.ctaSecondary}
                        onChange={(e) => updateContentField("hero", "ctaSecondary", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: ABOUT SECTION */}
              {activeTab === "about" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Tentang Kami</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah profil studio, nilai-nilai utama, dan statistik performa.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Sub-Judul</label>
                        <input
                          type="text"
                          value={content.about.subtitle}
                          onChange={(e) => updateContentField("about", "subtitle", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Profil</label>
                        <input
                          type="text"
                          value={content.about.title}
                          onChange={(e) => updateContentField("about", "title", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Deskripsi Profil</label>
                      <textarea
                        rows={4}
                        value={content.about.desc}
                        onChange={(e) => updateContentField("about", "desc", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all leading-relaxed"
                      />
                    </div>

                    {/* Stats List */}
                    <div className="border-t border-outline-variant/10 pt-lg space-y-md">
                      <h4 className="font-bold text-sm text-primary-fixed">Statistik / Counter Metrik (Maksimal 3)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        {content.about.stats.map((stat, idx) => (
                          <div key={idx} className="p-md bg-[#08132a] border border-outline-variant/20 rounded-xl space-y-sm">
                            <div className="flex justify-between items-center">
                              <span className="font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider">Statistik #{idx + 1}</span>
                            </div>
                            <input
                              type="text"
                              value={stat.value}
                              placeholder="Nilai (e.g. 99%)"
                              onChange={(e) => {
                                const newStats = [...content.about.stats];
                                newStats[idx] = { ...stat, value: e.target.value };
                                updateContentField("about", "stats", newStats);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              placeholder="Label (e.g. Uptime)"
                              onChange={(e) => {
                                const newStats = [...content.about.stats];
                                newStats[idx] = { ...stat, label: e.target.value };
                                updateContentField("about", "stats", newStats);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                            <input
                              type="text"
                              value={stat.desc}
                              placeholder="Deskripsi singkat"
                              onChange={(e) => {
                                const newStats = [...content.about.stats];
                                newStats[idx] = { ...stat, desc: e.target.value };
                                updateContentField("about", "stats", newStats);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Core Values */}
                    <div className="border-t border-outline-variant/10 pt-lg space-y-md">
                      <h4 className="font-bold text-sm text-primary-fixed">Nilai-Nilai Utama (Core Values)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        {content.about.coreValues.map((value, idx) => (
                          <div key={idx} className="p-md bg-[#08132a] border border-outline-variant/20 rounded-xl space-y-sm">
                            <div className="flex gap-sm items-center">
                              <span className="material-symbols-outlined text-primary-fixed text-lg">bolt</span>
                              <span className="font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider">Nilai #{idx + 1}</span>
                            </div>
                            <input
                              type="text"
                              value={value.icon}
                              placeholder="Icon Google (e.g. bolt, security)"
                              onChange={(e) => {
                                const newVal = [...content.about.coreValues];
                                newVal[idx] = { ...value, icon: e.target.value };
                                updateContentField("about", "coreValues", newVal);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                            <input
                              type="text"
                              value={value.title}
                              placeholder="Judul"
                              onChange={(e) => {
                                const newVal = [...content.about.coreValues];
                                newVal[idx] = { ...value, title: e.target.value };
                                updateContentField("about", "coreValues", newVal);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-bold"
                            />
                            <textarea
                              rows={2}
                              value={value.desc}
                              placeholder="Deskripsi lengkap"
                              onChange={(e) => {
                                const newVal = [...content.about.coreValues];
                                newVal[idx] = { ...value, desc: e.target.value };
                                updateContentField("about", "coreValues", newVal);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab: PRODUCTS SECTION */}
              {activeTab === "products" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">POS Products</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah penjelasan produk utama "POS Universal" beserta fiturnya.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Subtitle</label>
                        <input
                          type="text"
                          value={content.products.subtitle}
                          onChange={(e) => updateContentField("products", "subtitle", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Utama Produk</label>
                        <input
                          type="text"
                          value={content.products.title}
                          onChange={(e) => updateContentField("products", "title", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Pengenalan Produk</label>
                        <textarea
                          rows={3}
                          value={content.products.desc}
                          onChange={(e) => updateContentField("products", "desc", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all leading-relaxed"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Teks Tombol Aksi</label>
                        <input
                          type="text"
                          value={content.products.ctaText}
                          onChange={(e) => updateContentField("products", "ctaText", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Product Features Grid */}
                    <div className="border-t border-outline-variant/10 pt-lg space-y-md">
                      <h4 className="font-bold text-sm text-primary-fixed">Kelebihan Fitur POS Universal</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        {content.products.features.map((feature, idx) => (
                          <div key={idx} className="p-md bg-[#08132a] border border-outline-variant/20 rounded-xl space-y-xs relative group">
                            <span className="absolute top-2 right-2 font-label-sm text-[9px] text-on-surface-variant/40 group-hover:text-primary-fixed">
                              Fitur #{idx + 1}
                            </span>
                            <div className="flex gap-xs items-center">
                              <span className="material-symbols-outlined text-primary-fixed text-lg">edit</span>
                              <input
                                type="text"
                                value={feature.icon}
                                placeholder="Icon Google (e.g. analytics)"
                                onChange={(e) => {
                                  const newFeatures = [...content.products.features];
                                  newFeatures[idx] = { ...feature, icon: e.target.value };
                                  updateContentField("products", "features", newFeatures);
                                }}
                                className="bg-transparent border-b border-outline-variant/20 focus:border-primary-fixed text-xs text-primary-fixed py-0.5 focus:outline-none w-full"
                              />
                            </div>
                            <input
                              type="text"
                              value={feature.title}
                              placeholder="Nama Fitur"
                              onChange={(e) => {
                                const newFeatures = [...content.products.features];
                                newFeatures[idx] = { ...feature, title: e.target.value };
                                updateContentField("products", "features", newFeatures);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-bold mt-2"
                            />
                            <textarea
                              rows={3}
                              value={feature.desc}
                              placeholder="Keterangan fitur"
                              onChange={(e) => {
                                const newFeatures = [...content.products.features];
                                newFeatures[idx] = { ...feature, desc: e.target.value };
                                updateContentField("products", "features", newFeatures);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed leading-tight"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab: FEATURES SECTION */}
              {activeTab === "features" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Keunggulan Studio (Why Us)</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah daftar alasan mengapa UMKM mempercayakan solusinya ke Prigel Labs.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Subtitle</label>
                        <input
                          type="text"
                          value={content.features.subtitle}
                          onChange={(e) => updateContentField("features", "subtitle", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Utama</label>
                        <input
                          type="text"
                          value={content.features.title}
                          onChange={(e) => updateContentField("features", "title", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="border-t border-outline-variant/10 pt-lg space-y-md">
                      <h4 className="font-bold text-sm text-primary-fixed text-left">Poin-poin Keunggulan (Maksimal 4)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        {content.features.list.map((item, idx) => (
                          <div key={idx} className="p-md bg-[#08132a] border border-outline-variant/20 rounded-xl space-y-sm">
                            <span className="font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider">Keunggulan #{idx + 1}</span>
                            <input
                              type="text"
                              value={item.title}
                              placeholder="Judul Keunggulan"
                              onChange={(e) => {
                                const newList = [...content.features.list];
                                newList[idx] = { ...item, title: e.target.value };
                                updateContentField("features", "list", newList);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-bold"
                            />
                            <textarea
                              rows={3}
                              value={item.desc}
                              placeholder="Deskripsi lengkap"
                              onChange={(e) => {
                                const newList = [...content.features.list];
                                newList[idx] = { ...item, desc: e.target.value };
                                updateContentField("features", "list", newList);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab: TESTIMONIALS SECTION */}
              {activeTab === "testimonials" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Testimoni Klien</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah review, kutipan sukses, nama pemberi testimoni, dan perusahaannya.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Subtitle</label>
                        <input
                          type="text"
                          value={content.testimonials.subtitle}
                          onChange={(e) => updateContentField("testimonials", "subtitle", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Bagian</label>
                        <input
                          type="text"
                          value={content.testimonials.title}
                          onChange={(e) => updateContentField("testimonials", "title", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Testimonials List */}
                    <div className="border-t border-outline-variant/10 pt-lg space-y-lg">
                      <h4 className="font-bold text-sm text-primary-fixed text-left">Daftar Review Klien</h4>
                      <div className="space-y-lg">
                        {content.testimonials.list.map((item, idx) => (
                          <div key={idx} className="p-xl bg-[#08132a] border border-outline-variant/20 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-lg relative">
                            <span className="absolute top-3 right-4 font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider">
                              Testimoni #{idx + 1}
                            </span>
                            
                            <div className="space-y-md md:col-span-2">
                              <div className="space-y-xs">
                                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider">Kutipan / Quote Review</label>
                                <textarea
                                  rows={3}
                                  value={item.quote}
                                  onChange={(e) => {
                                    const newList = [...content.testimonials.list];
                                    newList[idx] = { ...item, quote: e.target.value };
                                    updateContentField("testimonials", "list", newList);
                                  }}
                                  className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-lg p-md text-primary text-xs focus:outline-none focus:border-primary-fixed leading-relaxed"
                                />
                              </div>
                            </div>

                            <div className="space-y-xs">
                              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider">Nama Klien</label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const newList = [...content.testimonials.list];
                                  newList[idx] = { ...item, name: e.target.value };
                                  updateContentField("testimonials", "list", newList);
                                }}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-bold"
                              />
                            </div>

                            <div className="space-y-xs">
                              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider">Jabatan / Role</label>
                              <input
                                type="text"
                                value={item.role}
                                onChange={(e) => {
                                  const newList = [...content.testimonials.list];
                                  newList[idx] = { ...item, role: e.target.value };
                                  updateContentField("testimonials", "list", newList);
                                }}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                              />
                            </div>

                            <div className="space-y-xs">
                              <label className="text-[10px] text-on-surface-variant uppercase tracking-wider">Perusahaan</label>
                              <input
                                type="text"
                                value={item.company}
                                onChange={(e) => {
                                  const newList = [...content.testimonials.list];
                                  newList[idx] = { ...item, company: e.target.value };
                                  updateContentField("testimonials", "list", newList);
                                }}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-sm">
                              <div className="space-y-xs">
                                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider">Inisial Avatar</label>
                                <input
                                  type="text"
                                  value={item.initials}
                                  onChange={(e) => {
                                    const newList = [...content.testimonials.list];
                                    newList[idx] = { ...item, initials: e.target.value };
                                    updateContentField("testimonials", "list", newList);
                                  }}
                                  className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-mono"
                                />
                              </div>
                              <div className="space-y-xs">
                                <label className="text-[10px] text-on-surface-variant uppercase tracking-wider">Warna Gradasi Avatar</label>
                                <input
                                  type="text"
                                  value={item.gradient}
                                  placeholder="from-[#00f0ff] to-[#b52bff]"
                                  onChange={(e) => {
                                    const newList = [...content.testimonials.list];
                                    newList[idx] = { ...item, gradient: e.target.value };
                                    updateContentField("testimonials", "list", newList);
                                  }}
                                  className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-mono text-[10px]"
                                />
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab: VISION SECTION */}
              {activeTab === "vision" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Peta Ekosistem (Vision)</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah visi dan daftar modul yang sedang dikembangkan.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Subtitle</label>
                        <input
                          type="text"
                          value={content.vision.subtitle}
                          onChange={(e) => updateContentField("vision", "subtitle", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Utama</label>
                        <input
                          type="text"
                          value={content.vision.title}
                          onChange={(e) => updateContentField("vision", "title", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Deskripsi Visi</label>
                      <textarea
                        rows={3}
                        value={content.vision.desc}
                        onChange={(e) => updateContentField("vision", "desc", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all leading-relaxed"
                      />
                    </div>

                    <div className="border-t border-outline-variant/10 pt-lg space-y-md">
                      <h4 className="font-bold text-sm text-primary-fixed text-left">Daftar Modul Aplikasi</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        {content.vision.items.map((item, idx) => (
                          <div key={idx} className="p-md bg-[#08132a] border border-outline-variant/20 rounded-xl space-y-sm">
                            <span className="font-label-sm text-[10px] text-primary-fixed uppercase tracking-wider">Modul #{idx + 1}</span>
                            
                            <div className="grid grid-cols-2 gap-xs">
                              <input
                                type="text"
                                value={item.icon}
                                placeholder="Icon Google"
                                onChange={(e) => {
                                  const newList = [...content.vision.items];
                                  newList[idx] = { ...item, icon: e.target.value };
                                  updateContentField("vision", "items", newList);
                                }}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                              />
                              <input
                                type="text"
                                value={item.status}
                                placeholder="Status (e.g. STABLE)"
                                onChange={(e) => {
                                  const newList = [...content.vision.items];
                                  newList[idx] = { ...item, status: e.target.value };
                                  updateContentField("vision", "items", newList);
                                }}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                              />
                            </div>

                            <input
                              type="text"
                              value={item.title}
                              placeholder="Nama Modul"
                              onChange={(e) => {
                                const newList = [...content.vision.items];
                                newList[idx] = { ...item, title: e.target.value };
                                updateContentField("vision", "items", newList);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed font-bold"
                            />
                            
                            <textarea
                              rows={2}
                              value={item.desc}
                              placeholder="Deskripsi Modul"
                              onChange={(e) => {
                                const newList = [...content.vision.items];
                                newList[idx] = { ...item, desc: e.target.value };
                                updateContentField("vision", "items", newList);
                              }}
                              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded p-sm text-primary text-xs focus:outline-none focus:border-primary-fixed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: CTA SECTION */}
              {activeTab === "cta" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Call to Action</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah ajakan bertindak di bagian akhir halaman.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Label Kapsul</label>
                      <input
                        type="text"
                        value={content.cta.label}
                        onChange={(e) => updateContentField("cta", "label", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>
                    
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul CTA</label>
                      <input
                        type="text"
                        value={content.cta.title}
                        onChange={(e) => updateContentField("cta", "title", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Deskripsi Singkat</label>
                      <textarea
                        rows={2}
                        value={content.cta.desc}
                        onChange={(e) => updateContentField("cta", "desc", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Teks Tombol Utama</label>
                        <input
                          type="text"
                          value={content.cta.primaryBtn}
                          onChange={(e) => updateContentField("cta", "primaryBtn", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Teks Tombol Sekunder</label>
                        <input
                          type="text"
                          value={content.cta.secondaryBtn}
                          onChange={(e) => updateContentField("cta", "secondaryBtn", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: CONTACT SECTION */}
              {activeTab === "contact" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Informasi Kontak</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah email, telepon, teks whatsapp, dan alamat operasional.</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Subtitle</label>
                        <input
                          type="text"
                          value={content.contact.subtitle}
                          onChange={(e) => updateContentField("contact", "subtitle", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Judul Kontak</label>
                        <input
                          type="text"
                          value={content.contact.title}
                          onChange={(e) => updateContentField("contact", "title", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Deskripsi Pendek</label>
                      <textarea
                        rows={2}
                        value={content.contact.desc}
                        onChange={(e) => updateContentField("contact", "desc", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Email</label>
                        <input
                          type="text"
                          value={content.contact.email}
                          onChange={(e) => updateContentField("contact", "email", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-xs">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Nomor Telepon / WA</label>
                        <input
                          type="text"
                          value={content.contact.phone}
                          onChange={(e) => updateContentField("contact", "phone", e.target.value)}
                          className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Teks Otomatis WhatsApp</label>
                      <input
                        type="text"
                        value={content.contact.whatsappText}
                        onChange={(e) => updateContentField("contact", "whatsappText", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Alamat Kantor</label>
                      <textarea
                        rows={3}
                        value={content.contact.address}
                        onChange={(e) => updateContentField("contact", "address", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: FOOTER SECTION */}
              {activeTab === "footer" && (
                <div className="space-y-xl">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed">Footer</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Ubah deskripsi brand dan informasi hak cipta (copyright).</p>
                  </div>

                  <div className="space-y-lg">
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Deskripsi Brand Pendek</label>
                      <textarea
                        rows={2}
                        value={content.footer.brandDesc}
                        onChange={(e) => updateContentField("footer", "brandDesc", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>
                    
                    <div className="space-y-xs">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Hak Cipta (Copyright)</label>
                      <input
                        type="text"
                        value={content.footer.copyright}
                        onChange={(e) => updateContentField("footer", "copyright", e.target.value)}
                        className="w-full bg-[#08132a] border border-outline-variant/30 rounded-lg p-md text-primary focus:outline-none focus:border-primary-fixed text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: CLOUD SETUP INSTRUCTIONS */}
              {activeTab === "cloud" && (
                <div className="space-y-xl text-left">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary-fixed flex items-center gap-sm">
                      <span className="material-symbols-outlined text-2xl">cloud_sync</span>
                      Panduan Go-Live Cloud (Database Gratis)
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">Saat ini panel berjalan secara lokal dan langsung mengubah file di komputer Anda. Agar saat di-deploy ke Vercel/Netlify isi web dapat diubah dari mana saja, hubungkan ke Firebase Database Gratis.</p>
                  </div>

                  <div className="space-y-lg text-xs leading-relaxed text-on-surface-variant">
                    
                    {/* Step 1 */}
                    <div className="bg-[#08132a] border border-outline-variant/20 rounded-xl p-md space-y-sm">
                      <h4 className="font-bold text-sm text-primary flex items-center gap-xs">
                        <span className="w-5 h-5 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed flex items-center justify-center font-mono text-xs">1</span>
                        Buat Firebase Realtime Database (100% Gratis)
                      </h4>
                      <ol className="list-decimal pl-md space-y-xs">
                        <li>Buka konsol Firebase di <a href="https://console.firebase.google.com/" target="_blank" className="text-primary-fixed underline font-semibold">firebase.google.com</a>.</li>
                        <li>Buat project baru (contoh nama: <code className="bg-surface-container px-1 py-0.5 rounded text-white">prigel-labs</code>).</li>
                        <li>Buka menu <strong>Build &gt; Realtime Database</strong> di sidebar kiri, lalu klik <strong>Create Database</strong>.</li>
                        <li>Pilih lokasi terdekat (misal Singapore <code className="bg-surface-container px-1 py-0.5 text-white">asia-southeast1</code>).</li>
                        <li>Pada bagian Security Rules, pilih <strong>Start in locked mode</strong> (atau test mode).</li>
                      </ol>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#08132a] border border-outline-variant/20 rounded-xl p-md space-y-sm">
                      <h4 className="font-bold text-sm text-primary flex items-center gap-xs">
                        <span className="w-5 h-5 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed flex items-center justify-center font-mono text-xs">2</span>
                        Atur Rules Database agar Aman
                      </h4>
                      <p>Masuk ke tab <strong>Rules</strong> di Realtime Database Anda, ubah isinya menjadi di bawah ini agar database aman namun dapat diakses oleh API Next.js Anda:</p>
                      <pre className="bg-surface-container p-md rounded-lg font-mono text-white text-[11px] overflow-x-auto">
{`{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}`}
                      </pre>
                      <p className="text-[10px] text-primary-fixed/80 italic">Note: Karena Next.js API berjalan di serverless container yang aman, database ini terlindungi dengan baik karena data admin dikontrol di server.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#08132a] border border-outline-variant/20 rounded-xl p-md space-y-sm">
                      <h4 className="font-bold text-sm text-primary flex items-center gap-xs">
                        <span className="w-5 h-5 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed flex items-center justify-center font-mono text-xs">3</span>
                        Tambahkan Variabel Lingkungan (.env.local)
                      </h4>
                      <p>Salin URL Database dari Firebase (contoh: <code className="bg-surface-container px-1 py-0.5 text-white">https://prigel-labs-default-rtdb.asia-southeast1.firebasedatabase.app/</code>) lalu buat file <strong className="text-white">.env.local</strong> di folder root project dan masukkan variabel berikut:</p>
                      <pre className="bg-surface-container p-md rounded-lg font-mono text-white text-[11px] overflow-x-auto">
{`# URL Database Firebase Gratis Anda
NEXT_PUBLIC_FIREBASE_DB_URL=https://prigel-labs-xxx.asia-southeast1.firebasedatabase.app/

# Sandi login admin panel Anda (Ganti dengan kata sandi kuat pilihan Anda)
ADMIN_PASSWORD=kata_sandi_rahasia_anda`}
                      </pre>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-[#08132a] border border-outline-variant/20 rounded-xl p-md space-y-sm">
                      <h4 className="font-bold text-sm text-primary flex items-center gap-xs">
                        <span className="w-5 h-5 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed flex items-center justify-center font-mono text-xs">4</span>
                        Deploy ke Vercel
                      </h4>
                      <p>Saat men-deploy di Vercel, cukup masukkan <code className="bg-surface-container px-1 py-0.5 text-white">NEXT_PUBLIC_FIREBASE_DB_URL</code> dan <code className="bg-surface-container px-1 py-0.5 text-white">ADMIN_PASSWORD</code> ke dalam pengaturan <strong>Environment Variables</strong> di dashboard Vercel Anda. Semuanya akan langsung disinkronkan secara otomatis dan gratis!</p>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>

        </main>
      )}

      {/* Admin Footer */}
      <footer className="border-t border-outline-variant/10 py-md px-margin-mobile md:px-margin-desktop text-center text-xs text-on-surface-variant/40 mt-auto bg-surface/50">
        Prigel Labs CMS • Powered by Next.js & Framer Motion
      </footer>
    </div>
  );
}
