import { bar } from "@/data/bar";

export function DemoBanner() {
  return (
    <p className="bg-brass px-4 py-2 text-center font-type text-sm font-bold text-night">{bar.demoNotice}</p>
  );
}
