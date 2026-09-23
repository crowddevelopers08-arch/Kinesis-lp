import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./Icons";

const socialIcons = { YouTube: YouTubeIcon, Instagram: InstagramIcon, Facebook: FacebookIcon };

export default function Footer() {
  return (
    <footer className="bg-[#140b1a] pb-24 pt-10 text-white/70 md:pb-10 md:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 sm:gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block rounded-xl bg-white px-3 py-2">
              <Image quality={90} src="/images/logo.png" alt="Kinesis Pain Speciality Centre" width={318} height={80} className="h-10 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.address}</p>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac-300">Follow Us</p>
              <ul className="mt-3 flex gap-2.5">
                {site.socials.map(({ name, href }) => {
                  const Icon = socialIcons[name];
                  return (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Kinesis on ${name}`}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-lilac-400 hover:text-plum-950"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac-300">Call</p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="font-semibold text-white transition hover:text-lilac-300">{p.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac-300">Opening Hours</p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.hours.map((h) => (
                <li key={h.day}>
                  {h.day}: <span className="font-semibold text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t sm:mt-12 border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <Link href="/privacy-policy" className="transition hover:text-lilac-300">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
