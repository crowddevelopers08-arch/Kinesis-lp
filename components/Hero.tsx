import Image from "next/image";
import LeadForm from "./LeadForm";
import { site } from "@/lib/site";
import { ArrowIcon, PhoneIcon, KneeIcon, BackIcon, ShoulderIcon } from "./Icons";

const chips = [
  { label: "Knee Pain", Icon: KneeIcon },
  { label: "Back Pain", Icon: BackIcon },
  { label: "Shoulder Pain", Icon: ShoulderIcon },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-plum-950 pb-8 pt-20 sm:pt-28 lg:pb-20 lg:pt-32">
      {/* Background photo + brand gradients */}
      <Image
        src="/images/pain-free.jpg"
        quality={90}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center] opacity-25 mix-blend-luminosity"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-plum-950 via-plum-950/95 to-plum-700/80" />
      <div className="absolute -left-40 top-20 -z-10 h-[480px] w-[480px] rounded-full bg-plum-600/40 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-lilac-500/25 blur-[120px]" />
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
            <path d="M28 0 56 16v32L28 64 0 48V16Zm0 64 28 16v32" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-lilac-300 backdrop-blur sm:text-[13px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lilac-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lilac-400" />
            </span>
            Kinesis Pain Speciality Centre, Chennai
          </span>

          <h1 className="mt-5 sm:mt-6 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.1rem]">
            Pain Shouldn&apos;t Decide{" "}
            <span className="bg-linear-to-r from-lilac-300 via-lilac-400 to-lilac-200 bg-clip-text text-transparent">
              How You Move
            </span>{" "}
            Through Life
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:mt-6 text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
            Get specialised care for knee pain, back pain, shoulder pain and other musculoskeletal conditions at
            Kinesis Pain Speciality Centre, Chennai.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#book"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lilac-400 px-7 py-4 text-base font-semibold text-plum-950 shadow-2xl shadow-lilac-500/30 transition hover:-translate-y-0.5 hover:bg-lilac-300"
            >
              Book Your Consultation
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={site.phones[0].href}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
            >
              <PhoneIcon className="h-5 w-5 text-lilac-300" />
              Talk to Our Care Team
            </a>
          </div>

          {/* <ul className="mt-5 sm:mt-10 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {chips.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] py-2 pl-2 pr-4 text-sm font-medium text-white/85 backdrop-blur"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-lilac-400/30 to-plum-600/40 text-lilac-200">
                  <Icon className="h-6 w-6" />
                </span>
                {label}
              </li>
            ))}
          </ul> */}

          <div className="mt-10 hidden items-center gap-4 lg:flex">
            <div className="flex -space-x-3">
              {["dr-pradeep", "dr-priyadharshini"].map((d) => (
                <Image quality={90} key={d} src={`/images/${d}.jpg`} alt="" width={96} height={96} className="h-12 w-12 rounded-full object-cover ring-2 ring-plum-950" />
              ))}
            </div>
            <p className="text-sm leading-snug text-white/65">
              Consult with a specialist who understands
              <br />
              <span className="font-semibold text-white">pain, movement and recovery.</span>
            </p>
          </div>
        </div>

        {/* Form card */}
        <div id="book" className="relative scroll-mt-28">
          <div className="absolute -inset-3 -z-10 rounded-4xl bg-linear-to-br from-lilac-400/40 via-plum-600/20 to-transparent blur-2xl" />
          <div className="rounded-[1.75rem] bg-white p-6 shadow-2xl shadow-black/40 ring-1 ring-white/20 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-plum-700 to-plum-600 text-white shadow-lg shadow-plum-700/30">
                <Image quality={90} src="/images/icon.png" alt="" width={40} height={40} className="h-8 w-8 rounded-md bg-white p-0.5" />
              </span>
              <div>
                <h2 className="text-xl font-bold leading-tight text-plum-950 sm:text-2xl">
                  Take the First Step Towards Better Movement
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-mauve-600">
                  Tell us about your concern. Our team will contact you to help arrange a consultation.
                </p>
              </div>
            </div>
            <LeadForm id="hero-form" source="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
