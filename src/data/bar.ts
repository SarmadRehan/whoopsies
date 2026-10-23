import type { StaticImageData } from "next/image";

import bluePlate from "@/assets/images/blue-plate-pork-chop.jpg";
import canadianClassic from "@/assets/images/canadian-classic.jpg";
import japaneseSlipper from "@/assets/images/japanese-slipper.jpg";
import pecanPie from "@/assets/images/pecan-pie.jpg";
import poboy from "@/assets/images/poboy.jpg";
import supperSpread from "@/assets/images/supper-spread.jpg";

// Every fact here comes from the verified table in the demo brief (checked 2026-10-23);
// the source is noted next to each one. Anything not in the brief is left out.
export const bar = {
  name: "Whoopsie's",
  // IG bio @whooopsies_place.
  tagline: "Classic dinners, classy drinks",
  description:
    "Whoopsie's is a dim, vintage supper bar in Reynoldstown, Atlanta: a rotating dinner menu, classic cocktails, and walk-ins only. Open every night, 5pm to midnight.",
  demoNotice: "Demo by Sarmad Rehan · not the official Whoopsie's website",
  // Eater Atlanta venue page and toast.app (Google Maps lists none).
  phone: "(404) 254-1279",
  // Google Maps and Michelin.
  street: "1 Moreland Ave SE, Ste C",
  city: "Atlanta",
  state: "GA",
  postalCode: "30316",
  neighborhood: "Reynoldstown",
  instagramUrl: "https://www.instagram.com/whooopsies_place/",
  // Three o's, as on their account.
  instagramHandle: "@whooopsies_place",
  facebookUrl: "https://www.facebook.com/p/Whoopsies-100090446559089/",
  // Address rather than the business name, so the embed doesn't show Google's star-rating card.
  mapEmbedUrl: "https://www.google.com/maps?q=1+Moreland+Ave+SE,+Atlanta,+GA+30316&output=embed",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Whoopsie's+1+Moreland+Ave+SE+Atlanta+GA+30316",
  // Their kitchen runs on Atlanta time, whatever the visitor's clock says.
  timeZone: "America/New_York",
} as const;

// IG bio ("Open 5pm–12mid Monday–Monday"), Michelin and Google Maps agree.
export const hours = { days: "Every night", time: "5pm – midnight" } as const;
export const hoursSummary = "Open every night 5pm–midnight · walk-ins only";

// IG bio: "come as you are, no reservations". Google Maps: dine-in and takeout, no delivery.
// Atlanta Magazine: thrift-store and vintage decor, dim lighting, about 40 seats.
export const houseNotes = [
  { title: "No reservations", text: "Come as you are. Every seat is first come, first served." },
  { title: "Dine in or take out", text: "Eat in or take supper home. No delivery." },
  { title: "About 40 seats", text: "Dim lights, vintage decor and thrift-store finds." },
];

export function phoneHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

export type Photo = { src: StaticImageData; alt: string; caption?: string };

// Photos come only from Whoopsie's own Instagram posts (most credit the photographer @post_neopet).
export const heroImage: Photo = {
  src: canadianClassic,
  alt: "A deep red cocktail in a stemmed coupe on a lamplit table, with a pressed fern beside it",
  caption: "The Canadian Classic, from their Instagram",
};

export const regularsImage: Photo = {
  src: supperSpread,
  alt: "A dark table spread from above: a cafeteria tray of pork terrine, pimento cheese, deviled egg and pickles, a po'boy, white wine and a slice of pie",
  caption: "Snack tray, top left",
};

export type SlotId = "protein" | "sandwich" | "dessert" | "drink";

export type Special = { name: string; detail?: string };

export type Slot = {
  id: SlotId;
  label: string;
  /** What's true of the slot every night, from the brief. */
  rule: string;
  photo: Photo;
};

export const slots: Slot[] = [
  {
    id: "protein",
    label: "Protein of the day",
    // Michelin Guide: a daily protein, prime rib on Fridays and Saturdays.
    rule: "One main plate a night. Prime rib on Fridays and Saturdays.",
    photo: {
      src: bluePlate,
      alt: "A turquoise cafeteria tray with a seared pork chop, succotash, squash casserole and a wedge of cornbread",
    },
  },
  {
    id: "sandwich",
    label: "Sandwich of the day",
    // Michelin Guide and a Google Maps visitor update: a sandwich of the day.
    rule: "A different sandwich every night.",
    photo: {
      src: poboy,
      alt: "A po'boy on a soft roll with lettuce and tomato, cut in half, with a deviled egg on the plate",
    },
  },
  {
    id: "dessert",
    label: "Dessert of the day",
    // Michelin Guide: one dessert a day, often pecan pie.
    rule: "One dessert a night, and it's often pecan pie.",
    photo: {
      src: pecanPie,
      alt: "A slice of pecan pie topped with whipped cream and shaved chocolate on a cream plate",
    },
  },
  {
    id: "drink",
    label: "Drink of the day",
    // The Infatuation and IG highlights: classic cocktails, a "drink of the day" on Instagram.
    rule: "A cocktail of the night, also posted on Instagram.",
    photo: {
      src: japaneseSlipper,
      alt: "A glowing green cocktail in a tall coupe on a dark wooden bar",
    },
  },
];

// Example specials, marked "example" on the page. Each matches its photo and is named in
// Whoopsie's own Instagram captions; the real list is whatever the team posts tonight.
export const exampleSpecials: Record<SlotId, Special> = {
  protein: { name: "Blue Plate pork chop", detail: "With succotash, squash casserole and cornbread." },
  sandwich: { name: "Po'boy" },
  dessert: { name: "Pecan pie", detail: "With whipped cream and shaved chocolate." },
  drink: { name: "Improved Japanese Slipper" },
};

export const specialLimits = { name: 48, detail: 110 } as const;

// Michelin Guide (snack tray, rotating cold and hot dishes); The Infatuation (classic cocktails);
// cocktail names from the dishes named on Google Maps.
export const regulars = [
  {
    title: "The snack tray",
    text: "Pimento cheese, chow chow, pickled vegetables and pork terrine, served on a cafeteria tray.",
  },
  {
    title: "Classic cocktails",
    text: "Classic cocktails, such as a Manhattan or a Cosmopolitan.",
  },
  {
    title: "Cold and hot dishes",
    text: "A short list of cold and hot plates alongside the nightly specials. It rotates, so ask what's on.",
  },
];
