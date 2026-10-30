export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="h-52 bg-gray-100" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-4/5" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-gray-100 rounded w-1/4" />
              <div className="h-7 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
