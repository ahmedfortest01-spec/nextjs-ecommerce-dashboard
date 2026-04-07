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
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
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
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // User
  user: User | null;
  checkSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Products
      products: [],
      fetchProducts: async () => {
        try {
          const res = await fetch('/api/products');
          const data = await res.json();
          if (data.products) {
            set({ products: data.products.map((p: any) => ({ ...p, id: p._id })) });
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      addProduct: async (productData) => {
        try {
          const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
          });
          if (res.ok) {
            get().fetchProducts();
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error adding product:', error);
          return false;
        }
      },
      updateProduct: async (id, updatedProduct) => {
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
          });
          if (res.ok) {
            get().fetchProducts();
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error updating product:', error);
          return false;
        }
      },
      deleteProduct: async (id) => {
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            get().fetchProducts();
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error deleting product:', error);
          return false;
        }
      },

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
      checkSession: async () => {
        try {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              set({ user: data.user });
              return;
            }
          }
          set({ user: null });
        } catch (error) {
          set({ user: null });
        }
      },
      login: async (email, password) => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (res.ok && data.user) {
            set({ user: data.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
      register: async (name, email, password, role = 'user') => {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
          });
          const data = await res.json();
          if (res.ok && data.user) {
            set({ user: data.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Registration error:', error);
          return false;
        }
      },
      logout: async () => {
        try {
          await fetch('/api/auth/me', { method: 'DELETE' });
        } catch (error) {
          console.error('Logout error:', error);
        }
        set({ user: null, cart: [] });
      },

      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'ecommerce-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
