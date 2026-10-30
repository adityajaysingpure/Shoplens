"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, truncate } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import StarRating from "@/components/ui/StarRating";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const items   = useCartStore((s) => s.items);
  const inCart  = items.some((i) => i.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-52 bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1 capitalize">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h2 className="text-sm font-semibold text-slate-800 leading-snug mb-2 hover:text-brand-600 transition-colors line-clamp-2">
            {truncate(product.title, 60)}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rate={product.rating.rate} />
          <span className="text-xs text-slate-400">({product.rating.count})</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-black text-slate-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
              inCart
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-brand-600 text-white hover:bg-brand-700"
            }`}
            disabled={inCart}
          >
            {inCart ? "✓ Added" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
