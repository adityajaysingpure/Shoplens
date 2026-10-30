"use client";

/**
 * ProductGrid — CLIENT COMPONENT
 *
 * Receives pre-fetched products from the Server Component.
 * Applies category filtering and sort purely on the client
 * from URL searchParams (no additional fetch needed).
 */

import { Product, SortOption } from "@/types";
import { sortProducts } from "@/lib/utils";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  selectedCategory: string;
  sort: SortOption;
}

export default function ProductGrid({ products, selectedCategory, sort }: Props) {
  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sorted = sortProducts(filtered, sort);

  if (sorted.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-lg font-medium">No products found for this filter.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">{sorted.length} products</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
