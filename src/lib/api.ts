import { Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetch all products — used by the listing page (SSG + ISR).
 * revalidate: 60 seconds for Incremental Static Regeneration.
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/**
 * Fetch products by category — used for filtered listing.
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
  return res.json();
}

/**
 * Fetch a single product — used for SSG product detail pages.
 * revalidate: 60 for ISR.
 */
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}

/**
 * Fetch all categories — used for generateStaticParams.
 */
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

/**
 * Generate static params for all product detail pages.
 * Called at build time by Next.js generateStaticParams().
 */
export async function getAllProductIds(): Promise<{ id: string }[]> {
  const products = await getProducts();
  return products.map((p) => ({ id: String(p.id) }));
}
