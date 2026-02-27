import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductDetails } from "@/components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/shop" className="text-gray-500 hover:text-primary">
              Shop
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <ProductDetails product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-primary font-bold mt-1">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
