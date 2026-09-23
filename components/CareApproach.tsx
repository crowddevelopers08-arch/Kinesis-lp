"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./Icons";

type Pillar = { title: string; text: string; icon: ReactNode };

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
    {d}
  </svg>
);

const pillars: Pillar[] = [
  {
    title: "Specialist-Led Care",
    text: "Consult with experienced pain and sports medicine specialists.",
    icon: icon(<><circle cx="12" cy="7" r="4" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" /><path d="M12 14v4M10 16h4" /></>),
  },
  {
    title: "Personalised Treatment Planning",
    text: "Your treatment plan is based on your individual condition, symptoms and clinical assessment.",
    icon: icon(<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v2h6V3M9 11h6M9 15h4" /></>),
  },
  {
    title: "Multidisciplinary Approach",
    text: "Pain management, sports medicine and rehabilitation come together to support your care journey.",
    icon: icon(<><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0" /></>),
  },
  {
    title: "Advanced Treatment Options",
    text: "Access a range of interventional, regenerative, physical therapy and rehabilitation options where clinically appropriate.",
    icon: icon(<><path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5" /><path d="m9 11 4 4M5 19l-3 3" /></>),
  },
  {
    title: "Patient-Centred Care",
    text: "Understand your condition, treatment options and recommended next steps before beginning your care.",
    icon: icon(<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />),
  },
];

const LINE_MS = 1800;
const STEP_MS = LINE_MS / (pillars.length - 1);

export default function CareApproach() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        timer = setTimeout(() => setSettled(true), LINE_MS + 400);
        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-mist py-9 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Care That Puts Your Comfort First"
          intro="At Kinesis, pain management goes beyond treating a symptom. Your care begins with understanding your condition, your concerns and how pain is affecting your movement and everyday life."
        />

        <Reveal className="mt-6 sm:mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white px-5 py-6 shadow-xl sm:py-10 shadow-plum-950/5 ring-1 ring-plum-950/5 sm:px-10 lg:px-12 lg:py-14">
            <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lilac-200/60 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-lilac-200/50 blur-3xl" />

            <ol ref={listRef} className="relative grid gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-6">
              {/* Connector track + animated fill: vertical on mobile, horizontal on desktop */}
              <span aria-hidden className="absolute bottom-28 left-8 top-10 w-px bg-lilac-200 lg:hidden">
                <span
                  className="absolute inset-0 origin-top bg-linear-to-b from-lilac-400 via-plum-600 to-lilac-400 transition-transform ease-out"
                  style={{ transform: `scaleY(${active ? 1 : 0})`, transitionDuration: `${LINE_MS}ms` }}
                />
              </span>
              <span aria-hidden className="absolute left-[10%] right-[10%] top-8 hidden h-0.5 rounded-full bg-lilac-200 lg:block">
                <span
                  className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-lilac-400 via-plum-600 to-lilac-400 transition-transform ease-out"
                  style={{ transform: `scaleX(${active ? 1 : 0})`, transitionDuration: `${LINE_MS}ms` }}
                />
              </span>

              {/* Glowing pulse that keeps travelling along the line once it is drawn */}
              {settled && (
                <>
                  <span aria-hidden className="absolute top-8 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 animate-travel-x rounded-full bg-plum-600 shadow-[0_0_12px_4px_rgba(211,103,255,0.55)] lg:block" />
                  <span aria-hidden className="absolute left-8 h-2.5 w-2.5 -translate-x-1/2 animate-travel-y rounded-full bg-plum-600 shadow-[0_0_12px_4px_rgba(211,103,255,0.55)] lg:hidden" />
                </>
              )}

              {pillars.map((p, i) => {
                const at = i * STEP_MS;
                return (
                  <li key={p.title} className="relative">
                    <div className="group flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                      <span
                        className={`relative block shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          active ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                        style={{ transitionDelay: `${at}ms` }}
                      >
                        {settled && (
                          <span
                            aria-hidden
                            className="absolute inset-0 animate-pulse-ring rounded-full bg-lilac-300/60"
                            style={{ animationDelay: `${i * 440}ms` }}
                          />
                        )}
                        <span
                          className={`relative grid h-16 w-16 place-items-center rounded-full bg-white text-plum-700 shadow-lg shadow-plum-700/15 ring-4 ring-lilac-100 transition-colors duration-300 group-hover:bg-plum-700 group-hover:text-white ${
                            settled ? "animate-bob" : ""
                          }`}
                          style={{ animationDelay: `${i * 300}ms` }}
                        >
                          <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">{p.icon}</span>
                        </span>
                        <span
                          className={`absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-lilac-400 text-[11px] font-bold text-plum-950 ring-2 ring-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                          }`}
                          style={{ transitionDelay: `${at + 280}ms` }}
                        >
                          {i + 1}
                        </span>
                      </span>
                      <div
                        className={`pt-1 transition-all duration-700 ease-out lg:mt-6 lg:pt-0 ${
                          active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                        style={{ transitionDelay: `${at + 150}ms` }}
                      >
                        <h3 className="text-lg font-bold leading-snug text-plum-950">{p.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-mauve-600">{p.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="relative mt-6 flex justify-center sm:mt-8 lg:mt-12">
              <a
                href="#book"
                className="group inline-flex items-center gap-2 rounded-full bg-plum-700 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-plum-700/25 transition hover:-translate-y-0.5 hover:bg-plum-600"
              >
                Book Your Consultation
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
