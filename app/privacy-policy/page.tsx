import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Kinesis Pain Speciality Centre, Chennai",
  description: "How Kinesis Pain Speciality Centre collects, uses and protects your personal information.",
};

const EMAIL = "kinesispainfree@gmail.com";

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <p>
        Kinesis Pain Speciality Centre (&quot;Kinesis&quot;, &quot;we&quot;, &quot;us&quot;) values the privacy and security of your
        personal information. This policy explains what information we collect through this website, how it is used and
        the choices available to you.
      </p>
    ),
  },
  {
    id: "collect",
    title: "Information We Collect",
    body: (
      <>
        <p>When you submit an enquiry on this page, we collect:</p>
        <ul>
          <li>Your full name, phone number and email address</li>
          <li>The concern you select (for example knee pain, back pain, shoulder pain or other)</li>
          <li>Technical information such as IP address, browser type, pages visited and the advertisement or campaign that brought you to this page</li>
        </ul>
        <p>
          If you become a patient, we may also collect information such as date of birth, gender, address, medical records,
          health status, identity documents and payment details at our centre, as described in our main privacy policy.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How We Use Your Information",
    body: (
      <ul>
        <li>To contact you by phone, SMS, WhatsApp or email regarding your appointment enquiry</li>
        <li>To arrange and manage your consultation and care</li>
        <li>To share relevant information about our services, where you have not opted out</li>
        <li>To measure and improve the performance of our website and advertising</li>
        <li>To comply with applicable legal and regulatory requirements</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Advertising Technologies",
    body: (
      <p>
        This website may use cookies and similar technologies, including Google (Google Ads, Google Analytics, Google Tag
        Manager) and Meta (Facebook / Instagram) pixels, to understand how visitors use the page and to measure the
        effectiveness of our advertisements. You can block or delete cookies through your browser settings and manage ad
        preferences in your Google and Meta account settings.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    body: (
      <p>
        We do not sell your personal information. Information may be shared only with service providers who help us operate
        this website and manage enquiries (for example hosting, CRM or communication providers), who are required to keep
        it confidential, or where required by law. Aadhaar or other identity information, if collected at the centre, is not
        shared with third parties without your consent.
      </p>
    ),
  },
  {
    id: "storage",
    title: "Data Storage & Security",
    body: (
      <p>
        We take reasonable technical and organisational measures to protect your information. Information is retained for
        as long as required under applicable law or for the purpose for which it was collected.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your Rights",
    body: (
      <p>
        You may request access to, correction of or deletion of your personal information, and you may withdraw consent for
        its processing at any time, in line with applicable Indian law including the Digital Personal Data Protection Act,
        2023. Withdrawing consent may affect our ability to provide certain services.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <>
        <p>For any privacy-related questions or requests, please contact us:</p>
        <ul>
          <li>
            Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            Phone:{" "}
            {site.phones.map((p, i) => (
              <span key={p.href}>
                {i > 0 && " / "}
                <a href={p.href}>{p.label}</a>
              </span>
            ))}
          </li>
          <li>Address: {site.address}</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: <p>We may update this policy from time to time. Any changes will be posted on this page.</p>,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Header minimal />
      <main className="bg-mist pb-9 pt-20 sm:pb-20 sm:pt-32">
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-4xl bg-linear-to-br from-plum-700 to-plum-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lilac-300">{site.name}</p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-plum-950/5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-xl px-3 py-2 text-sm font-medium text-mauve-600 transition hover:bg-lilac-50 hover:text-plum-700">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-plum-950/5 sm:p-10 lg:p-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={`scroll-mt-28 ${i > 0 ? "mt-10 border-t border-plum-950/5 pt-10" : ""}`}>
                <h2 className="flex items-center gap-3 text-xl font-bold text-plum-950 sm:text-2xl">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-lilac-100 text-xs font-bold text-plum-700">{i + 1}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-mauve-600 [&_a]:font-medium [&_a]:text-plum-700 [&_a]:underline [&_a]:underline-offset-2 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-lilac-400 [&_ul]:space-y-2">
                  {s.body}
                </div>
              </section>
            ))}
            <div className="mt-6 text-center sm:mt-10">
              <Link href="/" className="inline-flex rounded-full bg-plum-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-plum-600">
                Back to Home
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
