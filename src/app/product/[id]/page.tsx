'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { ArrowLeft, ShoppingCart, Check, Star } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/shop" className="text-blue-600 hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {product.category}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-500">(42 reviews)</span>
            </div>

            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <Check size={20} className="text-green-500" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Check size={20} className="text-green-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Check size={20} className="text-green-500" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Check size={20} className="text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl font-semibold transition-all ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {added ? (
                  <>
                    <Check size={24} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Stock Info */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-green-600">In Stock</span> - Ready to ship
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
