import { bar } from "@/data/bar";

const links = [
  { href: bar.instagramUrl, label: "Instagram", handle: bar.instagramHandle, note: "The drink of the day goes up here." },
  { href: bar.facebookUrl, label: "Facebook", handle: bar.name, note: "News and new menu items." },
];

export function Follow() {
  return (
    <section id="follow" aria-labelledby="follow-title" className="border-t border-cream/10 bg-booth py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="deco-rule font-type text-xs uppercase tracking-[0.3em] sm:text-sm">
          <span className="shrink-0">Follow along</span>
        </p>
        <h2 id="follow-title" className="mt-4 font-display text-4xl sm:text-5xl">
          See What&apos;s Pouring
        </h2>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.label} className="min-w-0">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-3xl border border-cream/15 p-7 text-left transition-colors hover:border-brass"
              >
                <span className="font-type text-xs font-bold uppercase tracking-[0.25em] text-brass">{link.label}</span>
                <span className="mt-2 block font-display text-2xl break-words group-hover:text-brass sm:text-3xl">{link.handle}</span>
                <span className="mt-2 block text-parchment">{link.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
