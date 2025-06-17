import React from "react"; 
import {Navbar,} from "../common/components/Navbar";
import HeroSection from "./components/HeroSection";
import FooterSection from "../common/components/FooterSection";
import WhatsappButton from "../home/components/WhatsappButton";
import AboutSection from "./components/AboutSection";
import JourneySection from "./components/JourneySection";
import VisiMisiSection from "./components/VisiMisiSection";

const AboutView: React.FC = () => {

    return (
        <div>
            <Navbar className="mt-6"/> 
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