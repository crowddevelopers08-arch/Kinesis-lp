import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./Icons";

const conditions = [
  {
    title: "Knee Pain",
    text: "Care for knee pain, stiffness and movement-related discomfort affecting everyday activities.",
    img: "/images/conditions/knee-pain.jpg",
    alt: "Person holding a painful knee",
  },
  {
    title: "Back Pain",
    text: "Assessment and personalised care for persistent or recurring back pain affecting daily movement.",
    img: "/images/conditions/back-pain.jpg",
    alt: "Person with lower back pain",
  },
  {
    title: "Shoulder Pain",
    text: "Care for shoulder pain, stiffness and restricted movement during everyday activities.",
    img: "/images/conditions/shoulder-pain.jpg",
    alt: "Doctor examining a patient's shoulder",
  },
];

export default function Conditions() {
  return (
    <section className="relative bg-white py-9 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Knee · Back · Shoulder" title="Specialised Care for Pain and Movement-Related Conditions" />

        <div className="mt-6 sm:mt-10 lg:mt-12 grid gap-4 md:grid-cols-3 lg:gap-7">
          {conditions.map(({ title, text, img, alt }, i) => (
            <Reveal key={title} delay={i * 110}>
              <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-plum-950/[0.06] bg-linear-to-b from-lilac-50 to-white transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-plum-700/15">
                <div className="absolute inset-0 bg-linear-to-br from-plum-700 to-plum-950 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative aspect-5/4 overflow-hidden">
                  <Image quality={90} src={img} alt={alt} fill sizes="(min-width:1280px) 400px, (min-width:768px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-sm font-bold text-plum-700 shadow-md backdrop-blur">
                    0{i + 1}
                  </span>
                </div>
                <div className="relative p-5 sm:p-8">
                  <h3 className="text-2xl font-bold text-plum-950 transition group-hover:text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-mauve-600 transition group-hover:text-white/75">{text}</p>
                  <a
                    href="#book"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-plum-700 transition group-hover:text-lilac-300"
                  >
                    Book Your Consultation
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-6 sm:mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-plum-950 px-6 py-7 text-center sm:px-10 md:flex-row md:text-left">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              Understand your pain.{" "}
              <span className="text-lilac-300">Find the right path to better movement.</span>
            </p>
            <a
              href="#book"
              className="shrink-0 rounded-full bg-lilac-400 px-6 py-3.5 text-sm font-semibold text-plum-950 transition hover:bg-lilac-300"
            >
              Book Your Consultation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
