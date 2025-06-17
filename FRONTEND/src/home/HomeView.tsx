import React from "react";
import {
  Navbar
} from "../common/components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ProductHighlight from "./components/ProductHighlight";
import { InfiniteMovingCardsDemo } from "./components/TestimonialSection";
import ReviewAction from "./components/ReviewAction";
import FooterSection from "../common/components/FooterSection";
import WhatsappButton from "./components/WhatsappButton";


const HomeView: React.FC = () => {
  return (
    <div>
      <Navbar className="mt-6"/>
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
