import React, { useState, useMemo } from 'react';
import { motion, easeOut } from 'framer-motion';
import { IconSearch, IconAdjustmentsHorizontal, IconShoppingCartPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { products, categories } from '../../data/ProductsData'; 
interface ProductCardProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: string;
        image: string;
        category: string;
        details: string;
    };
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
        >
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-orange-500 text-lg font-bold mb-3">
                    {product.price}
                </p>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {product.description}
                </p>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <Link
                        to={`/product/${product.id}`}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg text-sm hover:bg-orange-600 transition-colors duration-300 text-center"
                    >
                        Lihat Detail
                    </Link>
                    <button
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-800 font-medium rounded-lg text-sm hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-1"
                        onClick={() => alert(`Menambahkan ${product.name} ke keranjang!`)}
                    >
                        <IconShoppingCartPlus size={18} /> Tambah
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ProductCatalog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const filteredProducts = useMemo(() => {
        let filtered = products; 

        if (selectedCategory !== 'Semua') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (searchTerm) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(
                product =>
                    product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                    product.description.toLowerCase().includes(lowercasedSearchTerm)
            );
        }

        return filtered;
    }, [selectedCategory, searchTerm]);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section className="bg-gradient-to-br from-[#FFFDF6] to-[#F5F7F8] py-16 px-4 md:px-10">
            <div className="max-w-7xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-black"
                >
                    Katalog <span className="text-orange-500">Produk</span>
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
                >
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative flex-grow w-full md:w-auto">
                            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full md:w-auto">
                            <IconAdjustmentsHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white text-black"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="Semua">Semua Kategori</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-600 text-lg col-span-full py-10"
                        >
                            Produk tidak ditemukan. Coba kata kunci atau filter lain.
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ProductCatalog;