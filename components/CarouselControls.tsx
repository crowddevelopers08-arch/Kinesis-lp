import { ArrowIcon } from "./Icons";

const navBtn =
  "grid h-11 w-11 place-items-center rounded-full bg-white text-plum-700 shadow-lg shadow-plum-950/10 ring-1 ring-plum-950/5 transition hover:bg-plum-700 hover:text-white";

/** Prev/next buttons, shown beside a section heading on sm+ screens. */
export function CarouselArrows({ onStep, label }: { onStep: (dir: 1 | -1) => void; label: string }) {
  return (
    <div className="hidden gap-2 sm:flex">
      <button type="button" onClick={() => onStep(-1)} aria-label={`Previous ${label}`} className={navBtn}>
        <ArrowIcon className="h-5 w-5 rotate-180" />
      </button>
      <button type="button" onClick={() => onStep(1)} aria-label={`Next ${label}`} className={navBtn}>
        <ArrowIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

/** Dots (all sizes) with prev/next buttons either side on mobile. */
export function CarouselDots({
  count,
  current,
  onGoTo,
  onStep,
  labels,
}: {
  count: number;
  current: number;
  onGoTo: (i: number) => void;
  onStep: (dir: 1 | -1) => void;
  labels: string[];
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6">
      <button type="button" onClick={() => onStep(-1)} aria-label="Previous" className={`${navBtn} sm:hidden`}>
        <ArrowIcon className="h-5 w-5 rotate-180" />
      </button>
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onGoTo(i)}
            aria-label={`Go to ${labels[i]}`}
            aria-current={current === i}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? "w-7 bg-plum-700" : "w-2 bg-plum-950/15 hover:bg-plum-950/30"
            }`}
          />
        ))}
      </div>
      <button type="button" onClick={() => onStep(1)} aria-label="Next" className={`${navBtn} sm:hidden`}>
        <ArrowIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
