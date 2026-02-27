import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS E-Commerce Dashboard",
  description: "A modern e-commerce platform with dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2026 NextJS E-Commerce. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
