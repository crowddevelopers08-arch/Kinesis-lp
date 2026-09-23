"use client";

import { useState, type ReactNode } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/lib/site";
import { PlusIcon, PinIcon, PhoneIcon, ClockIcon, ArrowIcon } from "./Icons";

type FaqEntry = { q: string; a: ReactNode };

const faqs: FaqEntry[] = [
  {
    q: "When should I consult a pain specialist?",
    a: "Consider consulting a pain specialist when pain persists, keeps returning, affects your movement or daily activities, or does not improve with the measures you have already tried. An assessment can help determine the possible cause and appropriate next steps.",
  },
  {
    q: "Can knee, back or shoulder pain be treated without surgery?",
    a: "Some musculoskeletal conditions may be managed with non-surgical or minimally invasive approaches. The appropriate treatment depends on the underlying condition, your medical history and clinical assessment.",
  },
  {
    q: "What happens during my first consultation?",
    a: "Your doctor may discuss your symptoms, medical history, duration of pain, previous treatments and movement limitations. Depending on your condition, further clinical evaluation or investigations may be recommended.",
  },
  {
    q: "Do I need to bring my previous medical reports?",
    a: "If available, bring previous scans, investigation reports, prescriptions and details of treatments you have already received. These can help your doctor understand your medical history.",
  },
  {
    q: "Does Kinesis provide physiotherapy and rehabilitation?",
    a: "Yes. Kinesis provides physical therapy and rehabilitation services designed around the patient's condition, mobility and functional goals.",
  },
  {
    q: "Can I book an appointment for an elderly family member?",
    a: "Yes. You can submit an enquiry on behalf of a family member. When contacted by our team, share the patient's age, primary concern and relevant medical history.",
  },
  {
    q: "Where is Kinesis Pain Speciality Centre located in Chennai?",
    a: (
      <>
        Kinesis Pain Speciality Centre is located at:
        <br />
        <span className="font-medium text-plum-950">{site.address}</span>
        <br />
        Call:{" "}
        {site.phones.map((p, i) => (
          <span key={p.href}>
            {i > 0 && " / "}
            <a href={p.href} className="font-medium text-plum-700 underline-offset-2 hover:underline">{p.label}</a>
          </span>
        ))}
        <br />
        Opening Hours: {site.hours[0].day}, {site.hours[0].time}
        <br />
        {site.hours[1].day}: {site.hours[1].time}
      </>
    ),
  },
];

type ItemProps = { f: FaqEntry; open: boolean; onToggle: () => void; i: number };

function Item({ f, open, onToggle, i }: ItemProps) {
  return (
    <div className={`rounded-2xl border transition-colors duration-300 ${open ? "border-lilac-300 bg-white shadow-xl shadow-plum-700/10" : "border-plum-950/[0.07] bg-white/60 hover:bg-white"}`}>
      <h3>
        <button
          type="button"
          id={`faq-q-${i}`}
          aria-expanded={open}
          aria-controls={`faq-a-${i}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
        >
          <span className="text-base font-semibold leading-snug text-plum-950 sm:text-[17px]">{f.q}</span>
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${open ? "rotate-45 bg-plum-700 text-white" : "bg-lilac-100 text-plum-700"}`}>
            <PlusIcon className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={`faq-a-${i}`}
        role="region"
        aria-labelledby={`faq-q-${i}`}
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 text-[15px] leading-relaxed text-mauve-600 sm:px-6">{f.a}</div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-white py-9 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Frequently Asked Questions" />

        <div className="mt-6 sm:mt-10 lg:mt-12 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <Item f={f} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              </Reveal>
            ))}
          </div>

          {/* Location card */}
          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] bg-plum-950 text-white shadow-2xl shadow-plum-950/25">
              <div className="relative h-60 sm:h-72">
                <iframe
                  src={site.mapEmbed}
                  title="Kinesis Pain Speciality Centre on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full grayscale-[35%]"
                />
              </div>
              <div className="space-y-5 p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-lilac-300"><PinIcon className="h-5 w-5" /></span>
                  <p className="text-[15px] leading-relaxed text-white/85">{site.address}</p>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-lilac-300"><PhoneIcon className="h-5 w-5" /></span>
                  <div className="flex flex-col text-[15px] font-semibold">
                    {site.phones.map((p) => (
                      <a key={p.href} href={p.href} className="hover:text-lilac-300">{p.label}</a>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-lilac-300"><ClockIcon className="h-5 w-5" /></span>
                  <dl className="text-[15px]">
                    {site.hours.map((h) => (
                      <div key={h.day} className="flex flex-wrap gap-x-2">
                        <dt className="text-white/60">{h.day}:</dt>
                        <dd className="font-semibold">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-lilac-400 px-5 py-3.5 text-sm font-semibold text-plum-950 transition hover:bg-lilac-300"
                >
                  Get Directions
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
