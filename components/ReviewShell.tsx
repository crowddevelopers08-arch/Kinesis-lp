import type { ReactNode } from "react";
import Image from "next/image";

/** Full-screen brand background with a centred white card — shared by /review and /feedback. */
export default function ReviewShell({ children, divider = false }: { children: ReactNode; divider?: boolean }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-plum-700 px-4 py-10 sm:py-16">
      <div className="w-full max-w-[36rem] rounded-[1.75rem] bg-white px-6 py-9 text-center shadow-2xl shadow-plum-950/40 sm:rounded-[2rem] sm:px-10 sm:py-11">
        <Image
          src="/images/logo.png"
          alt="Kinesis Pain Speciality Centre"
          width={318}
          height={80}
          priority
          quality={90}
          className="mx-auto h-11 w-auto sm:h-12"
        />
        {divider && <div aria-hidden className="mx-auto mt-7 h-px w-16 bg-plum-950/15" />}
        {children}
      </div>
    </main>
  );
}
