import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-7xl font-black text-brand-600 mb-4">404</p>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Page not found</h2>
      <p className="text-slate-500 mb-8">
        The product or page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
