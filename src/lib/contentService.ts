import fs from "fs";
import path from "path";

// Path to local content JSON
const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "content.json");

export interface SiteContent {
  hero: {
    systemStatus: string;
    title: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    footerText: string;
  };
  about: {
    subtitle: string;
    title: string;
    desc: string;
    coreValues: Array<{ icon: string; title: string; desc: string }>;
    stats: Array<{ value: string; label: string; desc: string }>;
  };
  products: {
    subtitle: string;
    title: string;
    desc: string;
    ctaText: string;
    features: Array<{ icon: string; title: string; desc: string }>;
  };
  features: {
    subtitle: string;
    title: string;
    list: Array<{ title: string; desc: string }>;
  };
  testimonials: {
    subtitle: string;
    title: string;
    list: Array<{
      quote: string;
      name: string;
      role: string;
      company: string;
      initials: string;
      gradient: string;
    }>;
  };
  vision: {
    subtitle: string;
    title: string;
    desc: string;
    items: Array<{
      icon: string;
      title: string;
      desc: string;
      status: string;
      statusColor: string;
      gradient: string;
    }>;
  };
  cta: {
    label: string;
    title: string;
    desc: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  contact: {
    subtitle: string;
    title: string;
    desc: string;
    email: string;
    phone: string;
    address: string;
    whatsappText: string;
  };
  footer: {
    brandDesc: string;
    copyright: string;
  };
}

// Default fallback content just in case
const fallbackContent: SiteContent = {
  hero: {
    systemStatus: "Sistem Online",
    title: "Teknologi Modern untuk Membantu UMKM Bertumbuh Lebih Cepat",
    desc: "Prigel Labs Studio mengembangkan ekosistem aplikasi digital untuk membantu UMKM mengelola bisnis dengan lebih mudah, efisien, dan terintegrasi.",
    ctaPrimary: "Coba POS Universal",
    ctaSecondary: "Hubungi Kami",
    footerText: "[ Inisialisasi Modul ]: Sistem kasir modern & solusi bisnis digital."
  },
  about: {
    subtitle: "[ profil studio ]",
    title: "Tentang Prigel Labs Limited",
    desc: "Prigel Labs Limited adalah perusahaan pengembang aplikasi inovatif yang berfokus pada digitalisasi UMKM. Kami percaya bahwa teknologi seharusnya mempermudah, bukan mempersulit. Oleh karena itu, kami membangun ekosistem solusi digital yang intuitif namun berkinerja tinggi untuk operasional bisnis harian Anda.",
    coreValues: [
      { icon: "bolt", title: "Sederhana & Powerful", desc: "Teknologi canggih yang dikemas dengan antarmuka yang sangat ringkas." },
      { icon: "security", title: "Keamanan Maksimal", desc: "Enkripsi data harian memastikan operasional bisnis Anda aman." }
    ],
    stats: [
      { value: "99.99%", label: "Uptime Sistem", desc: "Infrastruktur cloud tangguh" },
      { value: "15 Menit", label: "Onboarding", desc: "Sangat mudah dipelajari" },
      { value: "24/7", label: "Dukungan Teknis", desc: "Selalu siap mendampingi" }
    ]
  },
  products: {
    subtitle: "Produk Pertama",
    title: "POS Universal: Satu Aplikasi Kasir untuk Semua Jenis Usaha",
    desc: "POS Universal adalah aplikasi Point of Sale modern yang dirancang untuk berbagai jenis UMKM — mulai dari toko retail, kafe, restoran, hingga usaha rumahan.",
    ctaText: "Mulai Gunakan POS Universal",
    features: [
      { icon: "point_of_sale", title: "Manajemen Penjualan", desc: "Catat transaksi dengan cepat dan akurat dalam satu sistem yang mudah digunakan." },
      { icon: "analytics", title: "Laporan Real-time", desc: "Pantau performa bisnis kapan saja dengan data penjualan yang otomatis diperbarui." },
      { icon: "devices", title: "Multi Device", desc: "Dapat digunakan di berbagai perangkat untuk fleksibilitas operasional bisnis." },
      { icon: "inventory_2", title: "Manajemen Produk", desc: "Kelola stok, kategori, dan harga produk dengan lebih praktis." },
      { icon: "ads_click", title: "Mudah Digunakan", desc: "Interface modern dan sederhana sehingga mudah dipahami oleh semua pengguna." },
      { icon: "shield_with_heart", title: "Aman & Stabil", desc: "Data bisnis tersimpan dengan aman dan sistem berjalan stabil untuk mendukung operasional harian." }
    ]
  },
  features: {
    subtitle: "Keunggulan",
    title: "Kenapa Prigel Labs Limited?",
    list: [
      { title: "Fokus pada UMKM", desc: "Kami memahami tantangan bisnis UMKM dan membangun solusi yang relevan." },
      { title: "Teknologi Modern", desc: "Menggunakan teknologi terbaru untuk menghasilkan aplikasi yang cepat, aman, dan scalable." },
      { title: "User Friendly", desc: "Desain aplikasi dibuat sederhana agar mudah digunakan siapa saja." },
      { title: "Berkembang Bersama", desc: "Kami tidak hanya membuat aplikasi, tetapi juga membangun solusi jangka panjang untuk pertumbuhan bisnis." }
    ]
  },
  testimonials: {
    subtitle: "Testimoni",
    title: "Dipercaya untuk Mendukung Bisnis Modern",
    list: [
      {
        quote: "POS Universal membantu operasional toko retail kami menjadi jauh lebih cepat dan terstruktur. Laporan harian tersaji instan tanpa pusing rekap manual.",
        name: "Aditya Pratama",
        role: "Owner",
        company: "Lumina Cafe & Bistro",
        initials: "AP",
        gradient: "from-[#00f0ff] to-[#b52bff]"
      },
      {
        quote: "Sistem kasirnya sangat intuitif dan mudah dipelajari oleh karyawan baru hanya dalam waktu 15 menit. Integrasi multi-cabang berjalan mulus tanpa hambatan.",
        name: "Siti Rahma",
        role: "Operational Manager",
        company: "Glow & Co Cosmetics",
        initials: "SR",
        gradient: "from-[#ff0055] to-[#b52bff]"
      },
      {
        quote: "Pelayanan dukungan pelanggan dari tim Prigel Labs sangat responsif. Solusi digital ini benar-benar mempercepat proses digitalisasi bisnis kami.",
        name: "Budi Santoso",
        role: "Founder",
        company: "Sentosa Furniture",
        initials: "BS",
        gradient: "from-[#00f0ff] to-[#00ff88]"
      }
    ]
  },
  vision: {
    subtitle: "[ peta ekosistem ]",
    title: "Membangun Ekosistem Aplikasi Digital untuk UMKM",
    desc: "POS Universal adalah langkah awal kami. Prigel Labs berkomitmen penuh untuk terus berinovasi dan mengembangkan berbagai modul aplikasi terintegrasi guna mendigitalisasi usaha Anda secara menyeluruh.",
    items: [
      {
        icon: "point_of_sale",
        title: "Manajemen Operasional",
        desc: "Automasi pencatatan stok barang, manajemen karyawan, dan kelola aktivitas cabang secara real-time.",
        status: "STABLE",
        statusColor: "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/10",
        gradient: "from-[#00f0ff] to-[#b52bff]"
      },
      {
        icon: "account_balance_wallet",
        title: "Keuangan & Akuntansi",
        desc: "Pencatatan kas masuk dan keluar secara otomatis, laporan laba rugi instan, serta rekonsiliasi bank.",
        status: "STABLE",
        statusColor: "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/10",
        gradient: "from-[#00f0ff] to-[#00ff88]"
      },
      {
        icon: "query_stats",
        title: "Analitik Bisnis & AI",
        desc: "Rekomendasi stok otomatis berbasis kecerdasan buatan (AI) serta prediksi tren penjualan bulanan.",
        status: "BETA",
        statusColor: "text-[#00f0ff] border-[#00f0ff]/30 bg-[#00f0ff]/10",
        gradient: "from-[#ff0055] to-[#b52bff]"
      },
      {
        icon: "contactless",
        title: "E-Payment & FinTech",
        desc: "Integrasi sistem QRIS, e-wallet, paylater, dan berbagai kartu debit/kredit tanpa perantara rumit.",
        status: "ROADMAP",
        statusColor: "text-[#b52bff] border-[#b52bff]/30 bg-[#b52bff]/10",
        gradient: "from-[#ffaa00] to-[#ff0055]"
      }
    ]
  },
  cta: {
    label: "Akselerasi Bisnis",
    title: "Siap Membawa Bisnis Anda ke Level Berikutnya?",
    desc: "Gunakan teknologi yang membantu bisnis berkembang lebih efisien dan modern bersama Prigel Labs Limited.",
    primaryBtn: "Mulai Sekarang",
    secondaryBtn: "Konsultasi Gratis"
  },
  contact: {
    subtitle: "[ Hubungi Tim Kami ]",
    title: "Mari Berdiskusi Lebih Lanjut",
    desc: "Tim spesialis kami siap membantu Anda menemukan solusi digital yang tepat untuk meningkatkan efisiensi dan profitabilitas bisnis Anda.",
    email: "hello@prigellabs.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Inovasi Digital No. 88\nJakarta Selatan, Indonesia 12345",
    whatsappText: "Halo Tim Prigel Labs, saya tertarik dengan POS Universal dan butuh konsultasi."
  },
  footer: {
    brandDesc: "Prigel Labs Limited adalah pelopor teknologi ekosistem digital untuk memajukan skala bisnis UMKM di Indonesia.",
    copyright: "Prigel Labs Limited. Semua Hak Dilindungi."
  }
};

/**
 * Reads content from either Cloud (Firebase) or Local JSON File.
 */
export async function getContent(): Promise<SiteContent> {
  const firebaseDbUrl = process.env.NEXT_PUBLIC_FIREBASE_DB_URL || process.env.FIREBASE_DB_URL;
  
  if (firebaseDbUrl) {
    try {
      const url = `${firebaseDbUrl.replace(/\/$/, "")}/content.json`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const cloudContent = await res.json();
        if (cloudContent && typeof cloudContent === "object" && cloudContent.hero) {
          return { ...fallbackContent, ...cloudContent } as SiteContent;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch content from Firebase, falling back to local file:", e);
    }
  }

  // Fallback to local file read
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileData = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
      const parsedData = JSON.parse(fileData);
      return { ...fallbackContent, ...parsedData } as SiteContent;
    }
  } catch (e) {
    console.error("Failed to read local content file:", e);
  }

  return fallbackContent;
}

/**
 * Saves content to either Cloud (Firebase) or Local JSON File.
 */
export async function saveContent(content: SiteContent): Promise<boolean> {
  const firebaseDbUrl = process.env.NEXT_PUBLIC_FIREBASE_DB_URL || process.env.FIREBASE_DB_URL;

  if (firebaseDbUrl) {
    try {
      const url = `${firebaseDbUrl.replace(/\/$/, "")}/content.json`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.error("Failed to save content to Firebase:", e);
      return false;
    }
  }

  // Save to local file
  try {
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("Failed to save content to local file:", e);
    return false;
  }
}
