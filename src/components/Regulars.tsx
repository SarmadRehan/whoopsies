import Image from "next/image";

import { currentMenu, regulars, regularsImage, type Dish } from "@/data/bar";

import { SectionHeading } from "./SectionHeading";

export function Regulars() {
  return (
    <section id="regulars" aria-labelledby="regulars-title" className="border-t border-snow/10 bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="regulars-title"
          eyebrow="Every night"
          title="The Regulars"
          intro="The specials change nightly. These are always around."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <figure>
            <div className="grain relative aspect-square overflow-hidden rounded-3xl border border-snow/10">
              <Image
                src={regularsImage.src}
                alt={regularsImage.alt}
                fill
                sizes="(min-width: 1024px) 34rem, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center font-type text-xs uppercase tracking-[0.2em] text-mist">
              {regularsImage.caption}
            </figcaption>
          </figure>

          <ul className="divide-y divide-snow/10 border-y border-snow/10">
            {regulars.map((item) => (
              <li key={item.title} className="py-7">
                <h3 className="font-display text-3xl">{item.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-mist">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 rounded-3xl border border-cobalt/40 bg-navy p-6 sm:p-10">
          <h3 className="text-center font-display text-3xl sm:text-4xl">On the Menu Now</h3>
          <p className="mx-auto mt-3 max-w-xl text-center text-mist">
            Cold and hot plates to go with the nightly specials. The list rotates, so ask what&apos;s on.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
            <DishList title="Cold" dishes={currentMenu.cold} />
            <DishList title="Hot" dishes={currentMenu.hot} />
          </div>
          <p className="mt-8 text-center font-type text-xs text-mist">From their menu board on Instagram, August 2026.</p>
        </div>
      </div>
    </section>
  );
}

function DishList({ title, dishes }: { title: string; dishes: Dish[] }) {
  return (
    <section aria-label={`${title} dishes`}>
      <h4 className="deco-rule font-type text-sm font-bold uppercase tracking-[0.3em]">
        <span className="shrink-0">{title}</span>
      </h4>
      <ul className="mt-4 divide-y divide-snow/10">
        {dishes.map((dish) => (
          <li key={dish.name} className="py-4">
            <p className="font-display text-2xl">{dish.name}</p>
            <p className="mt-1 leading-relaxed text-mist">{dish.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
