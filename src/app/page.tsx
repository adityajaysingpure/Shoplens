/**
 * Home page — SERVER COMPONENT
 *
 * Fetches all products on the server (SSG + ISR at 60s).
 * Passes data to the client ProductGrid which handles
 * URL-driven filtering and sorting without a round-trip.
 */

import { getProducts, getCategories } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import FilterBar from "@/components/product/FilterBar";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

// ISR — revalidate this page every 60 seconds
export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string };
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Discover Products
        </h1>
        <p className="text-slate-500 text-lg">
          Browse {products.length} items across {categories.length} categories.
        </p>
      </section>

      {/* Filter bar is a Client Component — needs interactivity */}
      <Suspense>
        <FilterBar categories={categories} />
      </Suspense>

      {/* Grid is a Client Component — reads searchParams for filtering */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid
          products={products}
          selectedCategory={searchParams.category ?? "all"}
          sort={(searchParams.sort as "price-asc" | "price-desc" | "rating") ?? "default"}
        />
      </Suspense>
    </div>
  );
}
