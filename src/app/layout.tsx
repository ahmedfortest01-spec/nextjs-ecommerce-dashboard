import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopHub - E-Commerce Dashboard",
  description: "A modern e-commerce platform with full authentication and dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 ShopHub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
