import Image from "next/image";
import Reveal from "./Reveal";
import LeadForm from "./LeadForm";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-plum-950 py-9 sm:py-16 lg:py-20">
      <Image quality={90} src="/images/clinic/waiting-area.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-plum-950 via-plum-950/95 to-plum-700/85" />
      <div className="absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-lilac-500/30 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="text-center lg:text-left">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Take the Next Step Towards{" "}
            <span className="bg-linear-to-r from-lilac-300 to-lilac-400 bg-clip-text text-transparent">Better Movement?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
            Whether you&apos;re dealing with persistent knee pain, back pain, or shoulder pain, the first step is
            understanding what&apos;s causing it.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {site.phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4 text-lilac-300" />
                {p.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-2xl shadow-black/40 sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-plum-950 sm:text-2xl">Book Your Consultation</h3>
            <LeadForm id="final-form" source="footer-cta" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
