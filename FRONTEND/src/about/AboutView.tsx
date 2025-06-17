// src/views/AboutView.tsx
import React from "react"; // Hapus useState jika tidak ada state lain di AboutView
import {
    Navbar,
    // Hapus cartItemCount dari sini, karena ini bukan export dari Navbar
} from "../common/components/Navbar";
import HeroSection from "./components/HeroSection";
import FooterSection from "../common/components/FooterSection";
import WhatsappButton from "../home/components/WhatsappButton";
import AboutSection from "./components/AboutSection";
import JourneySection from "./components/JourneySection";
import VisiMisiSection from "./components/VisiMisiSection";
// Hapus import ShoppingCartIcon dari sini, karena ShoppingCartIcon akan digunakan di dalam Navbar
// import ShoppingCartIcon from "../produk/components/ShoppingCartIcon"; 

const AboutView: React.FC = () => {
    // Hapus state isMobileMenuOpen karena sudah dihandle di Navbar
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

    return (
        <div>
            <Navbar className="mt-6"/> {/* Navbar akan mengelola isinya sendiri */}
                {/* Konten NavBody, MobileNav, dll. di bawah ini AKAN DIPINDAHKAN
                    ke dalam KOMPONEN NAVBAR DI FILE Navbar.tsx.
                    Navbar tidak lagi menerima children melalui prop.
                    Sebaliknya, Navbar akan merender NavBody, MobileNav, dsb. secara internal.
                */}
            
            <HeroSection />
            <AboutSection />
            <JourneySection />
            <VisiMisiSection />
            <FooterSection />
            <WhatsappButton />
        </div>
    );
};

export default AboutView;