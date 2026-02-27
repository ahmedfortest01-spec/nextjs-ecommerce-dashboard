export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 50,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring",
    price: 449.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 30,
  },
  {
    id: "3",
    name: "Running Shoes Ultra",
    description: "Lightweight running shoes with superior cushioning",
    price: 159.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 100,
  },
  {
    id: "4",
    name: "Designer Backpack",
    description: "Stylish and functional backpack for daily use",
    price: 89.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    stock: 75,
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 179.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    stock: 45,
  },
  {
    id: "6",
    name: "Fitness Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    price: 39.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    stock: 200,
  },
  {
    id: "7",
    name: "Minimalist Wallet",
    description: "Slim leather wallet with RFID protection",
    price: 59.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    stock: 80,
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 20-hour battery",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    stock: 60,
  },
  {
    id: "9",
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with thermal carafe",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
    stock: 40,
  },
  {
    id: "10",
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with touch control",
    price: 49.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    stock: 90,
  },
  {
    id: "11",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 69.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    stock: 120,
  },
  {
    id: "12",
    name: "Running Shorts",
    description: "Lightweight breathable running shorts",
    price: 34.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
    stock: 150,
  },
];

export const categories = [
  "All",
  "Electronics",
  "Sports",
  "Fashion",
  "Home",
];