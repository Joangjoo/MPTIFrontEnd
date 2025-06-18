import React from "react";
import {
    Navbar
} from "../../common/components/Navbar";
import FooterSection from "../../common/components/FooterSection";
import WhatsappButton from "../../home/components/WhatsappButton";
import ProductHeroSection from "../components/ProductHeroSection";
import ProductCatalog from "../components/ProductCatalog";


const ProductView: React.FC = () => {
    return (
        <>
        <div className="font-Montserrat">
            <Navbar className="mt-6" />
            <ProductHeroSection />
            <ProductCatalog />
            <FooterSection />
            <WhatsappButton />
        </div>
        </>
    )
}

export default ProductView;