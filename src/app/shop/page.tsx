"use client";

import { useState, useMemo } from "react";
import { products as allProducts, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Filter, X } from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, priceRange]);

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="w-4 h-4 text-primary"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSelectedCategory("All");
          setPriceRange([0, 500]);
        }}
        className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
      >
        <X className="w-4 h-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filters */}
        {isFilterOpen && (
          <div className="lg:hidden bg-white p-4 rounded-lg shadow-md mb-4">
            <FilterPanel />
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-gray-600">
            Showing {filteredProducts.length} products
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 500]);
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
