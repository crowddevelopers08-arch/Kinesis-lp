"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { PlayIcon, PlusIcon } from "./Icons";
import { CarouselArrows, CarouselDots } from "./CarouselControls";
import { useAutoCarousel } from "./useAutoCarousel";

type Video = { id: string; name: string; img: string };

const videos: Video[] = [
  { id: "6SsnpqkojjA", name: "Mrs. RajaLakshmi", img: "/images/testimonials/rajalakshmi.jpg" },
  { id: "VBFxwZTQclY", name: "Mr. Sahil Aslan", img: "/images/testimonials/shail-aslan.jpg" },
  { id: "ZPWcKAt1gkU", name: "Mrs. Ponnarasi", img: "/images/testimonials/ponnarasi.jpg" },
  { id: "fVhfvxVRGEE", name: "Mrs. Uma", img: "/images/testimonials/uma.jpg" },
  { id: "sDWbyEnidLE", name: "Mrs. Tamilarasi", img: "/images/testimonials/tamilarasi.jpg" },
  { id: "zHdfFwTQgyk", name: "Mrs. Sowmiya", img: "/images/testimonials/sowmiya.jpg" },
];

export default function PatientStories() {
  const [active, setActive] = useState<Video | null>(null);
  const { trackRef, current, goTo, step, touchHandlers } = useAutoCarousel(videos.length, { hold: active !== null });

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="bg-white py-9 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title="Patient Stories" align="left" />
          <CarouselArrows onStep={step} label="patient stories" />
        </div>

        <div {...touchHandlers} className="mt-6 sm:mt-10">
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient stories"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((v) => (
              <div
                key={v.id}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"
              >
                <button
                  type="button"
                  onClick={() => setActive(v)}
                  aria-label={`Play patient story — ${v.name}`}
                  className="group relative mx-auto block aspect-9/16 w-full max-w-[300px] overflow-hidden rounded-3xl bg-plum-950 shadow-lg shadow-plum-950/10 ring-1 ring-plum-950/5 transition duration-500 hover:shadow-2xl hover:shadow-plum-700/25 sm:max-w-none"
                >
                  <Image src={v.img} alt={v.name} fill quality={90} sizes="(min-width:1024px) 300px, (min-width:640px) 33vw, 300px" className="object-cover object-center" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-lilac-400 group-hover:text-plum-950">
                    <PlayIcon className="ml-0.5 h-7 w-7" />
                  </span>
                </button>
              </div>
            ))}
          </div>

          <CarouselDots count={videos.length} current={current} onGoTo={goTo} onStep={step} labels={videos.map((v) => v.name)} />
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Patient story — ${active.name}`}
          className="fixed inset-0 z-[100] grid place-items-center bg-plum-950/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="relative aspect-9/16 h-[88vh] max-h-[1000px] max-w-full overflow-hidden rounded-3xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&vq=hd1080`}
              title={`Patient story — ${active.name}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-plum-950 shadow-lg transition hover:bg-lilac-200"
          >
            <PlusIcon className="h-5 w-5 rotate-45" />
          </button>
        </div>
      )}
    </section>
  );
}
