import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M8 5.1v13.8a1 1 0 0 0 1.5.9l10.8-6.9a1 1 0 0 0 0-1.7L9.5 4.2A1 1 0 0 0 8 5.1Z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const WalkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="13" cy="4" r="2" />
    <path d="m9 20 3-6 3 3v4M6 12l3-4 4 1 3 3 3 1M12 14l-1-5" />
  </svg>
);

export const StairsIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h5v-5h5v-5h5V6h3" />
  </svg>
);

export const RepeatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
);

export const ReachIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="5" r="2" />
    <path d="M9 7v7l-2 7M9 14l3 7M9 9l6-5M9 10l-4 2" />
  </svg>
);

/* Condition illustrations */
export const KneeIcon = (p: IconProps) => (
  <svg {...base} viewBox="0 0 48 48" strokeWidth={2.2} {...p}>
    <path d="M18 4v14c0 3 1 5 3 7l2 2" />
    <path d="M30 4v12c0 4-1 7-3 9" />
    <path d="M23 27c-2 2-3 4-3 7v10M27 25c2 3 3 5 3 9v10" />
    <circle cx="25" cy="25" r="4" className="fill-lilac-300/40" />
    <path d="M36 20c1.5 1.5 2 3.5 1.5 5.5M39 17c2.5 2.5 3.5 6.5 2.5 10" />
  </svg>
);

export const BackIcon = (p: IconProps) => (
  <svg {...base} viewBox="0 0 48 48" strokeWidth={2.2} {...p}>
    <path d="M24 4c-3 5 3 9 0 14s3 9 0 14-3 8 0 12" />
    {[10, 17, 24, 31, 38].map((y) => (
      <rect key={y} x="19.5" y={y - 1.8} width="9" height="3.6" rx="1.8" className="fill-lilac-300/40" />
    ))}
    <path d="M36 20c1.5 1.5 2 3.5 1.5 5.5M39 17c2.5 2.5 3.5 6.5 2.5 10" />
  </svg>
);

export const ShoulderIcon = (p: IconProps) => (
  <svg {...base} viewBox="0 0 48 48" strokeWidth={2.2} {...p}>
    <circle cx="16" cy="9" r="5" />
    <path d="M6 44V26c0-6 4-9 10-9s8 2 11 4l7 4" />
    <path d="M34 25l6-10" />
    <circle cx="26" cy="21" r="4" className="fill-lilac-300/40" />
    <path d="M26 44V30" />
  </svg>
);
