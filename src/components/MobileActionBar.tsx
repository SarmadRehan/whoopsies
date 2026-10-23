import { bar, phoneHref } from "@/data/bar";

/** Thumb-reachable call and directions buttons, shown on small screens only. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-cream/10 bg-night/95 p-3 backdrop-blur md:hidden">
      <a href={phoneHref(bar.phone)} className="rounded-full border border-cream/25 py-3 text-center font-bold">
        Call
      </a>
      <a
        href={bar.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-brass py-3 text-center font-bold text-night"
      >
        Directions
      </a>
    </div>
  );
}
