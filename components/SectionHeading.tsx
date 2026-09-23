import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, intro, align = "center", dark = false }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
            dark
              ? "bg-white/10 text-lilac-300 ring-1 ring-white/15"
              : "bg-lilac-100 text-plum-700 ring-1 ring-lilac-200"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-lilac-400" : "bg-plum-700"}`} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`${eyebrow ? "mt-4 sm:mt-5" : ""} text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-plum-950"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-3 text-[15px] leading-relaxed sm:mt-5 sm:text-lg ${dark ? "text-white/70" : "text-mauve-600"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
