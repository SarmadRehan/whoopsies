import { bar, hours, houseNotes, phoneHref } from "@/data/bar";

import { SectionHeading } from "./SectionHeading";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="bg-lamp border-t border-cream/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="visit-title"
          eyebrow="Visit"
          title="No Reservations, Come as You Are"
          intro={`On Moreland Avenue in ${bar.neighborhood}. Walk in any night between 5pm and midnight.`}
        />

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-cream/10 bg-booth lg:grid-cols-2">
          <div className="p-6 sm:p-10">
            <h3 className="font-display text-3xl">{bar.name}</h3>
            <address className="mt-3 text-lg not-italic leading-relaxed">
              {bar.street}
              <br />
              {bar.city}, {bar.state} {bar.postalCode}
            </address>

            <div className="mt-5 flex flex-col gap-2 font-bold">
              <a href={phoneHref(bar.phone)} className="w-fit hover:text-brass">
                {bar.phone}
              </a>
              <a
                href={bar.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-brass underline underline-offset-4 hover:text-cream"
              >
                Open in Google Maps
              </a>
            </div>

            <h4 className="mt-8 font-type text-xs uppercase tracking-[0.3em] text-parchment">Hours</h4>
            <dl className="mt-2 border-y border-cream/10">
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-bold">{hours.days}</dt>
                <dd className="font-type text-brass">{hours.time}</dd>
              </div>
            </dl>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {houseNotes.map((note) => (
                <li key={note.title} className="rounded-2xl border border-cream/10 p-4">
                  <p className="font-type text-xs font-bold uppercase tracking-[0.2em] text-brass">{note.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-parchment">{note.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <iframe
            title={`Map of ${bar.name} at ${bar.street}, ${bar.city}`}
            src={bar.mapEmbedUrl}
            className="h-80 w-full border-0 border-t border-cream/10 lg:h-full lg:min-h-[30rem] lg:border-t-0 lg:border-l"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
