'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Search, Filter, X } from 'lucide-react';

export default function ShopPage() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-2">Browse our collection of products</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Price Range (Desktop + Mobile) */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredProducts.length} products
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setPriceRange([0, 1000]);
              }}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
