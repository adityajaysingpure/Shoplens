# ShopLens — Next.js 14 Product Discovery App

A full-stack product discovery platform built with **Next.js 14 App Router**, TypeScript, and Tailwind CSS.

## Key Technical Features

| Feature | Implementation |
|---|---|
| **Server Components** | Product listing & detail pages — zero JS shipped for static content |
| **SSG + ISR** | All product pages pre-rendered at build time, re-validated every 60s |
| **URL-driven filters** | Category & sort state lives in `searchParams` — shareable, bookmark-able |
| **Zustand cart** | Persisted to `localStorage` via `zustand/middleware` persist |
| **Image optimization** | `next/image` with `fill`, `sizes`, `priority` on above-fold images |
| **Dynamic metadata** | `generateMetadata()` per product detail page for SEO |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Navbar + font
│   ├── page.tsx            # Home (Server Component, ISR)
│   ├── not-found.tsx       # 404 page
│   ├── products/[id]/
│   │   └── page.tsx        # Product detail (SSG + ISR + generateStaticParams)
│   └── cart/
│       └── page.tsx        # Cart (Client Component, Zustand)
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx      # Sticky navbar with cart badge
│   │   └── StarRating.tsx  # Fractional star rating
│   └── product/
│       ├── ProductCard.tsx       # Card with add-to-cart
│       ├── ProductGrid.tsx       # Client grid with filter/sort
│       ├── ProductGridSkeleton.tsx
│       ├── FilterBar.tsx         # URL-driven category + sort
│       └── AddToCartButton.tsx
├── hooks/
│   └── useFilters.ts       # URL searchParams ↔ router sync
├── lib/
│   ├── api.ts              # Server-side fetch helpers (SSG/ISR)
│   └── utils.ts            # formatPrice, sortProducts, cn, truncate
├── store/
│   └── cart.ts             # Zustand store with localStorage persist
└── types/
    └── index.ts            # Product, CartItem, SortOption
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** — App Router, Server/Client Components, SSG, ISR
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **Zustand** — Lightweight client state (cart), persisted to localStorage
- **Fake Store API** — Public REST API for demo products
