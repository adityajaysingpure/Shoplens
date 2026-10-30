interface Props {
  rate: number;
  max?: number;
}

export default function StarRating({ rate, max = 5 }: Props) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rate} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const fill = Math.min(Math.max(rate - i, 0), 1);
        return (
          <span key={i} className="relative text-gray-200 text-base leading-none">
            ★
            <span
              className="absolute inset-0 overflow-hidden text-amber-400"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}
