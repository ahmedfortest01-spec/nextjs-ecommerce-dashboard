import Link from "next/link";
import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-1"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
