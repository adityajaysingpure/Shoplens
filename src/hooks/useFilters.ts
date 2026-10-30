"use client";

/**
 * useFilters — URL-driven filter and sort state.
 *
 * Reads `category` and `sort` from URL searchParams so filters
 * are shareable and bookmark-able without any client-side state library.
 *
 * Usage:
 *   const { category, sort, setCategory, setSort } = useFilters();
 */

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SortOption } from "@/types";

export function useFilters() {
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "all";
  const sort     = (searchParams.get("sort") ?? "default") as SortOption;

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all" || value === "default") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const setCategory = useCallback(
    (value: string) => setParam("category", value),
    [setParam]
  );

  const setSort = useCallback(
    (value: SortOption) => setParam("sort", value),
    [setParam]
  );

  return { category, sort, setCategory, setSort };
}
