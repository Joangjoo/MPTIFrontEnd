import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconShoppingCartPlus, IconTag } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { products } from '../../data/ProductsData'; 
const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return (
            <div className="py-10 px-4 md:px-8 lg:px-16">
                <Link to="/products" className="inline-flex items-center text-orange-500 hover:text-orange-700 transition-colors duration-300 mb-4">
                    <IconArrowLeft className="mr-2" size={20} /> Kembali ke Katalog
                </Link>
                <div className="text-center text-gray-600 py-20">
                    ID Produk tidak valid atau tidak ditemukan di URL.
                </div>
            </div>
        );
    }
    const productId = parseInt(id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="py-10 px-4 md:px-8 lg:px-16">
                <Link to="/products" className="inline-flex items-center text-orange-500 hover:text-orange-700 transition-colors duration-300 mb-4">
                    <IconArrowLeft className="mr-2" size={20} /> Kembali ke Katalog
                </Link>
                <div className="text-center text-gray-600 py-20">
                    Produk tidak ditemukan.
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        // Di sini Anda akan menambahkan logika untuk menambahkan produk ke keranjang
        console.log(`Produk "${product.name}" ditambahkan ke keranjang.`);
        // Misalnya, panggil fungsi dari context/state global
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-10 px-4 md:px-8 lg:px-16 bg-white"
        >
            <Link to="/products" className="inline-flex items-center text-orange-500 hover:text-orange-700 transition-colors duration-300 mb-8">
                <IconArrowLeft className="mr-2" size={20} /> Kembali ke Katalog
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gambar Produk */}
                <div className="rounded-lg overflow-hidden shadow-md">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
                </div>

                {/* Detail Produk */}
                <div>
                    <h1 className="text-3xl font-bold text-black mb-4">{product.name}</h1>
                    <div className="flex items-center mb-3">
                        <IconTag className="text-gray-500 mr-2" size={16} />
                        <span className="text-gray-700 text-sm">{product.category}</span>
                    </div>
                    <p className="text-orange-600 text-2xl font-semibold mb-6">{product.price}</p>
                    <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                    {product.details && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Detail Produk</h4>
                            <ul className="list-disc list-inside text-gray-600 mb-6">
                                {product.details.split(', ').map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center gap-2"
                    >
                        <IconShoppingCartPlus size={20} /> Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetailPage;