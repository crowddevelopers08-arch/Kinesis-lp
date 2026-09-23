"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { ArrowIcon, PlusIcon } from "./Icons";
import { CarouselArrows, CarouselDots } from "./CarouselControls";
import { useAutoCarousel } from "./useAutoCarousel";

type Photo = { src: string; title: string; alt: string };

// One photo per distinct area of the clinic — near-duplicate angles are left out.
const photos: Photo[] = [
  { src: "/images/clinic/reception.jpg", title: "Reception", alt: "Reception at Kinesis Pain Speciality Centre" },
  { src: "/images/clinic/waiting-area.jpg", title: "Waiting Area", alt: "Patient waiting area" },
  { src: "/images/clinic/consultation-room.jpg", title: "Consultation Room", alt: "Doctor's consultation room" },
  { src: "/images/clinic/ultrasound-scanner.jpg", title: "Ultrasound Room", alt: "Ultrasound scanning room" },
  { src: "/images/clinic/procedure-room.jpg", title: "Procedure Room", alt: "Procedure room" },
  { src: "/images/clinic/recovery-room.jpg", title: "Recovery Room", alt: "Recovery room" },
  { src: "/images/clinic/rehab-gym.jpg", title: "Rehabilitation Area", alt: "Rehabilitation exercise area" },
];

export default function ClinicGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const count = photos.length;
  const { trackRef, current, goTo, step, touchHandlers } = useAutoCarousel(count, { hold: lightbox !== null });

  // Lightbox keyboard controls
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const lightboxStep = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + count) % count)),
    [count]
  );
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxStep(1);
      if (e.key === "ArrowLeft") lightboxStep(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, lightboxStep]);

  const open = lightbox === null ? null : photos[lightbox];

  return (
    <section className="bg-mist py-9 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title="Clinic Photographs" align="left" />
          <CarouselArrows onStep={step} label="photos" />
        </div>

        <div
          {...touchHandlers}
          className="mt-6 sm:mt-10"
        >
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Clinic photographs"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((p, i) => (
              <figure
                key={p.src}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`View photo: ${p.alt}`}
                  className="group relative block aspect-3/2 w-full overflow-hidden rounded-3xl bg-white shadow-md shadow-plum-950/10 ring-1 ring-plum-950/5"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    quality={90}
                    sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="mt-3 flex items-center gap-2 px-1 text-[15px] font-semibold text-plum-950">
                  <span className="h-1.5 w-1.5 rounded-full bg-lilac-400" />
                  {p.title}
                </figcaption>
              </figure>
            ))}
          </div>

          <CarouselDots count={count} current={current} onGoTo={goTo} onStep={step} labels={photos.map((p) => p.title)} />
        </div>
      </div>

      {open && lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum-950/95 p-4 backdrop-blur-sm sm:p-10"
        >
          <div className="relative aspect-3/2 w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={open.src} alt={open.alt} fill quality={90} sizes="(min-width:1280px) 1152px, 100vw" className="rounded-2xl object-contain" />
          </div>
          <p className="mt-4 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/85 backdrop-blur">
            {open.title} · {lightbox + 1} / {count}
          </p>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxStep(-1); }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-plum-950 sm:left-6"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxStep(1); }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-plum-950 sm:right-6"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-plum-950 shadow-lg transition hover:bg-lilac-200"
          >
            <PlusIcon className="h-5 w-5 rotate-45" />
          </button>
        </div>
      )}
    </section>
  );
}
