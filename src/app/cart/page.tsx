"use client";

/**
 * Cart Page — CLIENT COMPONENT
 * Reads from Zustand store (persisted to localStorage).
 */

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Add some products to get started.</p>
        <Link
          href="/"
          className="inline-block bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Cart ({itemCount()} items)
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-semibold transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.id}`}
                className="text-sm font-semibold text-slate-800 hover:text-brand-600 line-clamp-2 transition-colors"
              >
                {item.title}
              </Link>
              <p className="text-brand-600 font-bold mt-1">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-slate-800">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-500 text-xl ml-2 transition-colors"
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-2 text-slate-600">
          <span>Subtotal ({itemCount()} items)</span>
          <span>{formatPrice(total())}</span>
        </div>
        <div className="flex justify-between items-center mb-6 text-slate-600">
          <span>Shipping</span>
          <span className="text-green-600 font-semibold">Free</span>
        </div>
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
          <span className="text-lg font-extrabold text-slate-900">Total</span>
          <span className="text-lg font-extrabold text-slate-900">
            {formatPrice(total())}
          </span>
        </div>
        <button className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold text-base hover:bg-brand-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
