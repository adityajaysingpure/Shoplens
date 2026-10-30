"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black text-brand-600 tracking-tight">
            Shop<span className="text-slate-900">Lens</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            🛒 Cart
            {itemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
