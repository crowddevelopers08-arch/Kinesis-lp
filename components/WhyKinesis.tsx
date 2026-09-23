import Image from "next/image";
import Reveal from "./Reveal";
import { CheckIcon } from "./Icons";

const reasons = [
  "Dedicated focus on pain management and rehabilitation",
  "Patient-focused clinical assessment",
  "Individualised treatment planning",
  "Non-surgical and minimally invasive options where clinically appropriate",
  "Focus on mobility and physical function",
  "Physical therapy and rehabilitation support",
  "A range of treatment options under one roof",
];

export default function WhyKinesis() {
  return (
    <section className="relative overflow-hidden bg-mist py-9 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0 lg:px-8">
        {/* Mobile order: heading → photos → Why Choose list. Desktop: photos left, text right. */}
        <Reveal className="lg:col-start-2 lg:row-start-1 lg:self-end">
          <h2 className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-plum-950 sm:text-4xl lg:text-[2.75rem]">
            Specialised Pain Care <span className="text-plum-600">Built Around You</span>
          </h2>
          <p className="mt-3 text-[15px] sm:mt-5 sm:text-base lg:text-lg leading-relaxed text-mauve-600">
            Kinesis Pain Speciality Centre focuses on pain management, sports injury management and rehabilitation,
            with care planned around the individual&apos;s condition and needs.
          </p>
        </Reveal>

        {/* Image collage */}
        <Reveal className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-3/2 overflow-hidden rounded-4xl shadow-2xl shadow-plum-950/20">
              <Image quality={90} src="/images/clinic/reception.jpg" alt="Kinesis Pain Speciality Centre reception, Chennai" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-3/2 overflow-hidden rounded-3xl shadow-lg shadow-plum-950/15">
              <Image quality={90} src="/images/clinic/procedure-room.jpg" alt="Procedure room at Kinesis" fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-3/2 overflow-hidden rounded-3xl shadow-lg shadow-plum-950/15">
              <Image quality={90} src="/images/clinic/consultation-room.jpg" alt="Consultation room at Kinesis" fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-start-2 lg:row-start-2 lg:self-start">
          <div className="rounded-3xl bg-white p-5 lg:mt-9 shadow-xl shadow-plum-950/5 ring-1 ring-plum-950/5 sm:p-8">
            <h3 className="flex items-center gap-3 text-lg font-bold text-plum-950 sm:text-xl">
              <span className="h-6 w-1.5 rounded-full bg-linear-to-b from-lilac-400 to-plum-700" />
              Why Choose Kinesis?
            </h3>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2 sm:gap-x-6">
              {reasons.map((r, i) => (
                <li key={r} className={`flex items-start gap-3 ${i === reasons.length - 1 ? "sm:col-span-2" : ""}`}>
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-plum-700 text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-snug text-plum-950/85">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
