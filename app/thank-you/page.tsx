import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversionTracker from "@/components/ConversionTracker";
import { site } from "@/lib/site";
import { CheckIcon, PhoneIcon, ClockIcon, PinIcon, ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Thank You | Kinesis Pain Speciality Centre, Chennai",
  robots: { index: false, follow: false },
};

const steps = [
  { title: "We review your enquiry", text: "Our care team looks at the concern you shared with us." },
  { title: "We call you back", text: "A team member will contact you on the number you provided to help arrange a consultation." },
  { title: "Your consultation", text: "If available, bring previous scans, investigation reports, prescriptions and details of treatments you have already received." },
];

type ThankYouProps = { searchParams: Promise<{ concern?: string | string[] }> };

export default async function ThankYou({ searchParams }: ThankYouProps) {
  const raw = (await searchParams).concern;
  const concern = (Array.isArray(raw) ? raw[0] : raw)?.slice(0, 40) ?? "";

  return (
    <>
      <Header minimal />
      <ConversionTracker concern={concern} />
      <main className="relative isolate overflow-hidden bg-mist pb-9 pt-20 sm:pb-20 sm:pt-32 lg:pb-28">
        <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-lilac-200/70 blur-[110px]" />

        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="relative mx-auto grid h-24 w-24 place-items-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-plum-600/30" />
            <span className="relative grid h-24 w-24 place-items-center rounded-full bg-linear-to-br from-plum-600 to-plum-950 text-white shadow-2xl shadow-plum-700/40">
              <CheckIcon className="h-11 w-11" />
            </span>
          </div>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-plum-950 sm:text-5xl">Thank You!</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mauve-600">
            We&apos;ve received your enquiry{concern ? <> for <span className="font-semibold text-plum-700">{concern}</span></> : null}.
            Our team will contact you shortly to help arrange your consultation at Kinesis Pain Speciality Centre.
          </p>
        </div>

        <div className="mx-auto mt-6 sm:mt-10 lg:mt-12 max-w-5xl px-4 sm:px-6">
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl bg-white p-7 shadow-xl shadow-plum-950/5 ring-1 ring-plum-950/5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lilac-100 text-sm font-bold text-plum-700">{i + 1}</span>
                <h2 className="mt-5 text-lg font-bold text-plum-950">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-mauve-600">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid overflow-hidden rounded-[1.75rem] bg-plum-950 text-white shadow-2xl shadow-plum-950/20 md:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-3/2 self-center">
              <Image quality={90} src="/images/clinic/reception.jpg" alt="Kinesis Pain Speciality Centre reception" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="space-y-5 p-7 sm:p-9">
              <p className="text-xl font-bold">Need to speak to us sooner?</p>
              <div className="flex gap-4">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-lilac-300" />
                <div className="flex flex-col font-semibold">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="hover:text-lilac-300">{p.label}</a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-white/80">
                <ClockIcon className="h-5 w-5 shrink-0 text-lilac-300" />
                <div>
                  {site.hours.map((h) => (
                    <p key={h.day}>{h.day}: <span className="font-semibold text-white">{h.time}</span></p>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-sm leading-relaxed text-white/80">
                <PinIcon className="h-5 w-5 shrink-0 text-lilac-300" />
                <p>{site.address}</p>
              </div>
              <Link href="/" className="group inline-flex items-center gap-2 rounded-full bg-lilac-400 px-6 py-3 text-sm font-semibold text-plum-950 transition hover:bg-lilac-300">
                Back to Home
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
