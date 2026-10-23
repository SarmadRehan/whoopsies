import Image from "next/image";

import { regulars, regularsImage } from "@/data/bar";

import { SectionHeading } from "./SectionHeading";

export function Regulars() {
  return (
    <section id="regulars" aria-labelledby="regulars-title" className="border-t border-cream/10 bg-booth py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="regulars-title"
          eyebrow="Every night"
          title="The Regulars"
          intro="The specials change nightly. These are always around."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <figure>
            <div className="grain relative aspect-square overflow-hidden rounded-3xl border border-cream/10">
              <Image
                src={regularsImage.src}
                alt={regularsImage.alt}
                fill
                sizes="(min-width: 1024px) 34rem, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center font-type text-xs uppercase tracking-[0.2em] text-parchment">
              {regularsImage.caption}
            </figcaption>
          </figure>

          <ul className="divide-y divide-cream/10 border-y border-cream/10">
            {regulars.map((item) => (
              <li key={item.title} className="py-7">
                <h3 className="font-display text-3xl">{item.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-parchment">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
