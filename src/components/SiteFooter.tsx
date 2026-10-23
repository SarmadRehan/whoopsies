import { bar, hours, phoneHref } from "@/data/bar";

import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 bg-night text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 sm:px-6 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <Logo className="w-20 shrink-0" />
          <div>
            <p className="font-display text-3xl text-cream">{bar.name}</p>
            <p className="font-display italic">{bar.tagline}</p>
          </div>
        </div>

        <div>
          <h2 className="font-type text-xs uppercase tracking-[0.3em] text-brass">Visit</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {bar.street}
            <br />
            {bar.city}, {bar.state} {bar.postalCode}
            <br />
            <a href={phoneHref(bar.phone)} className="hover:text-brass">
              {bar.phone}
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-type text-xs uppercase tracking-[0.3em] text-brass">Hours</h2>
          <p className="mt-3 text-sm">
            {hours.days}, {hours.time}
            <br />
            Walk-ins only
          </p>
          <p className="mt-3 flex gap-4 text-sm">
            <a href={bar.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
              Instagram
            </a>
            <a href={bar.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brass">
              Facebook
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-28 sm:px-6 md:pb-10">
        <p className="rounded-full bg-brass px-4 py-2.5 text-center font-type text-sm font-bold text-night">
          {bar.demoNotice}
        </p>
      </div>
    </footer>
  );
}
