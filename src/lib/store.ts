import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface StoreState {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // User
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium wireless headphones with noise cancellation',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Advanced smartwatch with health monitoring',
  },
  {
    id: '3',
    name: 'Running Shoes Pro',
    price: 129.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: 'Lightweight running shoes with superior cushioning',
  },
  {
    id: '4',
    name: 'Laptop Stand Ergonomic',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    description: 'Adjustable laptop stand for better posture',
  },
  {
    id: '5',
    name: 'Cotton T-Shirt Pack',
    price: 39.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    description: 'Pack of 3 premium cotton t-shirts',
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    description: 'Ergonomic wireless mouse with precision tracking',
  },
  {
    id: '7',
    name: 'Denim Jacket',
    price: 89.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
    description: 'Classic denim jacket for all seasons',
  },
  {
    id: '8',
    name: 'Portable Charger 20000mAh',
    price: 45.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
    description: 'High-capacity portable charger with fast charging',
  },
];

const fakeUsers = [
  { name: 'Ahmed', email: 'test@ahmed.com', password: '123456' },
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Products
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // Cart
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),

      // User
      user: null,
      login: (email, password) => {
        const foundUser = fakeUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (foundUser) {
          set({ user: { name: foundUser.name, email: foundUser.email } });
          return true;
        }
        return false;
      },
      register: (name, email, password) => {
        fakeUsers.push({ name, email, password });
        set({ user: { name, email } });
        return true;
      },
      logout: () => set({ user: null, cart: [] }),

      // Orders
      orders: [
        {
          id: 'ORD-001',
          date: '2026-02-25',
          items: [
            { ...initialProducts[0], quantity: 2 },
            { ...initialProducts[2], quantity: 1 },
          ],
          total: 289.97,
          status: 'delivered',
        },
        {
          id: 'ORD-002',
          date: '2026-02-26',
          items: [{ ...initialProducts[1], quantity: 1 }],
          total: 299.99,
          status: 'shipped',
        },
        {
          id: 'ORD-003',
          date: '2026-02-27',
          items: [
            { ...initialProducts[4], quantity: 2 },
            { ...initialProducts[6], quantity: 1 },
          ],
          total: 169.97,
          status: 'processing',
        },
      ],
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'ecommerce-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
