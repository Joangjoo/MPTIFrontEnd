import React from "react";

const FooterSection: React.FC = () => (
  <footer className="bg-gray-100 pt-6">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
      {/* Kiri: Kontak */}
      <div>
        <h3 className="font-bold text-lg mb-3">Hubungi Kami</h3>
        <div className="mb-2">
          <a
            href="#"
            className="text-blue-600 text-lg font-medium hover:underline"
          >
            Toko Utama
          </a>
        </div>
        <div className="text-gray-700 leading-relaxed">
          Jl. Lamongan x, jawa timur
          <br />
          878788
          <br />
          Telepon : xxxxxxxxxxxx,
          <br />
          xxxxxxxxxxxxxxxx
          <br />
          Email : trijaya@gmail.com
        </div>
      </div>
      {/* Kanan: Deskripsi */}
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2 uppercase">
            Temukan Koleksi Material Bangunan Terlengkap & Terpercaya di Toko
            Kami
          </h3>
          <p className="text-gray-700 text-base">
            Kami menyediakan berbagai macam material bangunan berkualitas tinggi
            untuk segala kebutuhan konstruksi Anda. Mulai dari semen, bata,
            besi, hingga cat dan perlengkapan lainnya, semua tersedia dengan
            harga bersaing dan pengiriman cepat. Bangun proyek impian Anda
            bersama kami.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 uppercase">
            Kami Menyediakan Semua yang Anda Butuhkan untuk Membangun
          </h3>
          <p className="text-gray-700 text-base">
            Dapatkan pengalaman belanja yang mudah, aman, dan nyaman. Platform
            kami dirancang agar Anda dapat menemukan produk dengan cepat,
            membaca spesifikasi lengkap, dan melakukan pembelian tanpa ribet.
            Kualitas terjamin, layanan terbaik.
          </p>
        </div>
      </div>
    </div>
    {/* Bar bawah biru */}
    <div className="bg-blue-600 py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-white text-sm gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-3 rounded-sm mr-1"></span>
          Indonesia
          <span className="mx-2">Privacy</span>
          <span className="hidden md:inline-block">|</span>
          <span className="ml-2">Terms and Conditions</span>
        </div>
        <div className="text-center md:text-right w-full md:w-auto mt-1 md:mt-0">
          &copy;2021 Tri Jaya Agung
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
