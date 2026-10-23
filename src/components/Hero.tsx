import Image from "next/image";

import { bar, heroImage, hoursSummary } from "@/data/bar";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-lamp relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div className="text-center lg:text-left">
          <p className="font-type text-xs uppercase tracking-[0.3em] text-brass sm:text-sm">
            {bar.neighborhood} · Atlanta
          </p>
          <h1 id="hero-title" className="mt-5 font-display text-6xl leading-none sm:text-8xl">
            {bar.name}
          </h1>
          <p className="mt-4 font-display text-2xl text-parchment italic sm:text-3xl">{bar.tagline}</p>

          <p className="mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-brass/40 px-5 py-2.5 font-type text-sm text-cream lg:mx-0">
            <span aria-hidden="true" className="hidden size-2 shrink-0 rounded-full bg-brass shadow-[0_0_10px_2px] shadow-brass/60 sm:block" />
            {hoursSummary}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#tonight"
              className="w-full rounded-full bg-brass px-7 py-3.5 text-center text-lg font-bold text-night transition-colors hover:bg-cream sm:w-auto"
            >
              See tonight&apos;s menu
            </a>
            <a
              href="#visit"
              className="w-full rounded-full border border-cream/30 px-7 py-3.5 text-center text-lg font-bold transition-colors hover:border-cream sm:w-auto"
            >
              Find the bar
            </a>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-t-full border border-brass/40 p-2">
            <div className="relative h-full w-full overflow-hidden rounded-t-full">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-4 text-center font-type text-xs uppercase tracking-[0.2em] text-parchment">
            {heroImage.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
