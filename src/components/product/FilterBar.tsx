"use client";

/**
 * FilterBar — CLIENT COMPONENT
 *
 * URL-driven filters — updates searchParams via useRouter.
 * No local state needed; the URL IS the state.
 */

import { useFilters } from "@/hooks/useFilters";
import { SortOption } from "@/types";

interface Props {
  categories: string[];
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default",    label: "Default"       },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated"     },
];

export default function FilterBar({ categories }: Props) {
  const { category, sort, setCategory, setSort } = useFilters();

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
            category === "all"
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-white text-slate-600 border-gray-200 hover:border-brand-500 hover:text-brand-600"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors border ${
              category === cat
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white text-slate-600 border-gray-200 hover:border-brand-500 hover:text-brand-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="ml-auto">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
