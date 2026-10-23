import { slots, specialLimits, type Special, type SlotId } from "@/data/bar";

/**
 * The demo editor keeps tonight's menu in the visitor's own browser only. A real site would
 * save it to a small backend instead, so every guest sees what the team posted.
 */
const STORAGE_KEY = "whoopsies-demo-tonight-v1";

export type SavedMenu = { specials: Record<SlotId, Special>; updatedAt: number };

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Normalizes untrusted input (form fields or stored JSON) into a menu, or null if a name is missing. */
export function toSpecials(input: Partial<Record<SlotId, { name?: unknown; detail?: unknown }>>) {
  const specials = {} as Record<SlotId, Special>;
  for (const slot of slots) {
    const name = clean(input[slot.id]?.name, specialLimits.name);
    if (!name) return null;
    const detail = clean(input[slot.id]?.detail, specialLimits.detail);
    specials[slot.id] = detail ? { name, detail } : { name };
  }
  return specials;
}

export function loadMenu(): SavedMenu | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { specials, updatedAt } = parsed as { specials?: unknown; updatedAt?: unknown };
    if (typeof updatedAt !== "number" || typeof specials !== "object" || specials === null) return null;
    const menu = toSpecials(specials as Record<SlotId, { name?: unknown; detail?: unknown }>);
    return menu ? { specials: menu, updatedAt } : null;
  } catch {
    // Storage can be blocked (private mode, disabled cookies) or hold junk; fall back to the example.
    return null;
  }
}

export function saveMenu(menu: SavedMenu): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
  } catch {
    // Not fatal: the update still shows until the page is reloaded.
  }
}

export function clearMenu(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored, or storage blocked; either way the example is back on screen.
  }
}
