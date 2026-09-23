import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WalkIcon, ReachIcon, RepeatIcon, StairsIcon } from "./Icons";

const signs = [
  { text: "Pain while walking, standing or climbing stairs", Icon: WalkIcon },
  { text: "Shoulder pain or stiffness when lifting or reaching", Icon: ReachIcon },
  { text: "Pain that keeps returning despite rest or previous treatment", Icon: RepeatIcon },
  { text: "Reduced mobility or difficulty performing everyday activities", Icon: StairsIcon },
];

export default function PainCheck() {
  return (
    <section className="relative overflow-hidden bg-mist py-9 sm:py-16 lg:py-20">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-lilac-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile order: heading → photo card → symptom list. Desktop: text column left, photo right. */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <SectionHeading
              align="left"
              title="Is Pain Starting to Affect Your Everyday Life?"
              intro="Persistent pain can affect how you work, sleep, exercise and move through your day. If pain keeps returning or starts limiting your everyday activities, it may be time to seek a professional assessment."
            />
          </div>

          <Reveal delay={150} className="relative mx-auto w-full max-w-lg lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
            <div className="overflow-hidden rounded-4xl bg-plum-950 shadow-2xl shadow-plum-950/20">
              <div className="relative aspect-3/2">
                <Image quality={90} src="/images/msk-scanning.jpg" alt="Clinical assessment of knee pain at Kinesis" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <div>
                  <p className="text-lg font-bold leading-snug text-white sm:text-xl">
                    Persistent pain deserves proper assessment.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                    Understanding the cause of your pain is the first step towards determining an appropriate care plan.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-4xl border-2 border-dashed border-lilac-300 sm:-left-6 sm:-top-6" />
          </Reveal>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <Reveal delay={100}>
              <p className="text-sm lg:mt-10 font-semibold uppercase tracking-[0.14em] text-plum-700">
                You may benefit from an evaluation if you experience:
              </p>
            </Reveal>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {signs.map(({ text, Icon }, i) => (
                <Reveal as="li" key={text} delay={150 + i * 80}>
                  <div className="group flex h-full items-center gap-4 rounded-2xl border border-plum-950/5 bg-white p-4 sm:items-start sm:p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-lilac-300 hover:shadow-xl hover:shadow-plum-700/10">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lilac-100 text-plum-700 transition group-hover:bg-plum-700 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="pt-1 text-[15px] font-medium leading-snug text-plum-950">{text}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
