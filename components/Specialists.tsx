import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./Icons";

const doctors = [
  {
    name: "Dr. (Maj.) P. Pradeep",
    quals: "MBBS, MD, FIPM, DIFM, AB-Regenerative Medicine",
    role: "Chief Consultant Pain and Sports Physician | Regenerative Medicine Specialist",
    bio: "Dr. (Maj.) P. Pradeep specialises in sports medicine, sports injury management and interventional pain management.",
    img: "/images/dr-pradeep.jpg",
  },
  {
    name: "Dr. K. Priyadharshini",
    quals: "MBBS, MD, FIPM, CCEPC",
    role: "Interventional Pain & Palliative Physician",
    bio: "Dr K. Priyadharshini specialises in interventional pain and palliative care.",
    img: "/images/dr-priyadharshini.jpg",
  },
];

export default function Specialists() {
  return (
    <section className="bg-white py-9 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Meet Our Specialists" intro="Consult with a specialist who understands pain, movement and recovery." />

        <div className="mx-auto mt-6 sm:mt-10 lg:mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
          {doctors.map((d, i) => (
            <Reveal key={d.name} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-4xl bg-mist p-2 ring-1 ring-plum-950/5 transition duration-500 hover:shadow-2xl hover:shadow-plum-700/15">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-linear-to-br from-lilac-200 via-lilac-100 to-white">
                  <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-plum-700/15 blur-2xl" />
                  <div className="relative aspect-square w-full">
                    <Image quality={90} src={d.img} alt={d.name} fill sizes="(min-width:768px) 480px, 90vw" className="object-cover mix-blend-multiply" />
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <span className="inline-block rounded-full bg-plum-950 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-lilac-200">
                    {d.quals}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-plum-950">{d.name}</h3>
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-plum-600">{d.role}</p>
                  <p className="mt-4 leading-relaxed text-mauve-600">{d.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-6 text-center sm:mt-10">
          <a
            href="#book"
            className="group inline-flex items-center gap-2 rounded-full bg-plum-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-plum-700/25 transition hover:-translate-y-0.5 hover:bg-plum-600"
          >
            Book Your Consultation
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
