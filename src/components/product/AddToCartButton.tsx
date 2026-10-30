"use client";

import { useCartStore } from "@/store/cart";
import { Product } from "@/types";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem  = useCartStore((s) => s.addItem);
  const items    = useCartStore((s) => s.items);
  const inCart   = items.some((i) => i.id === product.id);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addItem(product)}
        disabled={inCart}
        className={`flex-1 py-3 rounded-xl font-bold text-base transition-colors ${
          inCart
            ? "bg-green-100 text-green-700 cursor-default"
            : "bg-brand-600 text-white hover:bg-brand-700"
        }`}
      >
        {inCart ? "✓ Added to Cart" : "Add to Cart"}
      </button>
      {inCart && (
        <Link
          href="/cart"
          className="flex-1 py-3 rounded-xl font-bold text-base bg-slate-900 text-white text-center hover:bg-slate-800 transition-colors"
        >
          View Cart →
        </Link>
      )}
    </div>
  );
}
