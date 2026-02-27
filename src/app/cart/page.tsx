'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, addOrder } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: total,
      status: 'pending' as const,
    };
    
    addOrder(newOrder);
    clearCart();
    alert('Order placed successfully! Thank you for your purchase.');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items yet</p>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <span>Start Shopping</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="text-blue-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear the cart?')) {
                  clearCart();
                }
              }}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500">
                  Free shipping on orders over $50
                </p>
              )}
              <hr />
              <div className="flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/shop"
              className="block text-center mt-4 text-blue-600 hover:text-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
