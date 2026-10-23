import { bar, phoneHref } from "@/data/bar";

import { OrderButton } from "./OrderDialog";

/** Thumb-reachable call, order and directions buttons, shown on small screens only. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1.3fr_1fr] gap-2 border-t text-sm min-[360px]:text-base border-snow/10 bg-navy/95 p-3 backdrop-blur md:hidden">
      <a href={phoneHref(bar.phone)} className="rounded-full border border-snow/25 py-3 text-center font-bold">
        Call
      </a>
      <OrderButton className="rounded-full bg-cobalt py-3 text-center font-bold text-white">Order Now</OrderButton>
      <a
        href={bar.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-snow/25 py-3 text-center font-bold"
      >
        Directions
      </a>
    </div>
  );
}
