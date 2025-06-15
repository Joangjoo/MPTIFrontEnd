import React, {useState} from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle
} from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ProductHighlight from "./components/ProductHighlight";
import { InfiniteMovingCardsDemo } from "./components/TestimonialSection";
import ReviewAction from "./components/ReviewAction";
import FooterSection from "./components/FooterSection";
import WhatsappButton from "./components/WhatsappButton";
import { Link } from "react-router-dom";

const HomeView: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>
      <Navbar className="mt-6">
        {/* Desktop Navbar */}
        <NavBody className="px-10">
          <span className="text-blue-600 font-bold text-lg">TriJaya Agung</span>
          <NavItems
            items={[
              { name: "Beranda", link: "/" },
              { name: "Tentang Kami", link: "/about" },
              { name: "Produk", link: "#" },
            ]}
            className="ml-8"
          />
          <div className="ml-auto">
            <NavbarButton href="#" variant="text" className="font-bold text-black">
              Hubungi Kami
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navbar */}
        <MobileNav>
          <MobileNavHeader>
            <span className="text-blue-600 font-bold text-lg">TriJaya Agung</span>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen}>
            {[
              { name: "Beranda", link: "/" },
              { name: "Tentang Kami", link: "/about" },
              { name: "Produk", link: "#" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="w-full px-4 py-3 text-black dark:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <NavbarButton
              href="#"
              className="w-full mt-4 font-bold"
              variant="text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hubungi Kami
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <HeroSection />
      <StatsSection />
      <ProductHighlight />
      <InfiniteMovingCardsDemo />
      <ReviewAction />
      <FooterSection />
      <WhatsappButton />
    </div>
  );
};

export default HomeView;
