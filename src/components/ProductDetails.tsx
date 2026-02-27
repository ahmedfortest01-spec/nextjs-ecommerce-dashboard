"use client";

import { Product } from "@/data/products";
import { useCartStore } from "@/context/CartContext";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQuantity = () => setQuantity((q) => Math.min(product.stock, q + 1));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
          {product.category}
        </span>
        
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600 flex items-center">
                <Check className="w-4 h-4 mr-1" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
            addedToCart
              ? "bg-green-600 text-white"
              : "bg-primary text-white hover:bg-primary/90"
          } disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {/* Product Features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Free Shipping</h4>
            <p className="text-sm text-gray-600">On orders over $50</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Easy Returns</h4>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
