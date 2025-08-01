// HomeView.tsx
import React from "react";
// Hapus import Navbar karena sudah di-render di App.tsx
// import { Navbar } from "../common/components/Navbar"; 
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ProductHighlight from "./components/ProductHighlight";
import { InfiniteMovingCardsDemo } from "./components/TestimonialSection";
import ReviewAction from "./components/ReviewAction";
import FooterSection from "../common/components/FooterSection";
import WhatsappButton from "./components/WhatsappButton";
import { type User } from "../login/components/LoginForm";

interface HomeViewProps {
  currentUser: User | null;
}

const HomeView: React.FC<HomeViewProps> = () => { 
  return (
    <div className="font-Montserrat">
      
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