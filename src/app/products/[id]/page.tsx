/**
 * Product Detail Page — SERVER COMPONENT
 *
 * - generateStaticParams(): pre-renders all product pages at build time (SSG)
 * - revalidate = 60: ISR — pages regenerate in background every 60s
 * - AddToCartButton is a Client Component (needs onClick, Zustand)
 */

import { getProduct, getAllProductIds } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";
import StarRating from "@/components/ui/StarRating";

export const revalidate = 60;

// Pre-generate all product detail pages at build time
export async function generateStaticParams() {
  return getAllProductIds();
}

// Dynamic metadata per product
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    return {
      title: `${product.title} — ShopLens`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Product not found — ShopLens" };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let product;
  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/?category=${encodeURIComponent(product.category)}`}
          className="hover:text-brand-600 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center shadow-sm border border-gray-100">
          <div className="relative w-full aspect-square max-w-sm">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3 capitalize">
            {product.category}
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-5">
            <StarRating rate={product.rating.rate} />
            <span className="text-sm text-slate-500">
              {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-black text-slate-900 mb-6">
            {formatPrice(product.price)}
            <span className="text-sm font-normal text-slate-400 ml-2">
              (${product.price.toFixed(2)})
            </span>
          </p>

          <p className="text-slate-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
