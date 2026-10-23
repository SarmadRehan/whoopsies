"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { bar, exampleSpecials, slots, weeklyProteins, type Special, type SlotId } from "@/data/bar";
import { clearMenu, loadMenu, saveMenu, type SavedMenu } from "@/lib/tonightStorage";

import { UpdateMenuDialog } from "./UpdateMenuDialog";

const shortWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekdayInAtlanta = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: bar.timeZone });
const stamp = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: bar.timeZone,
});

/** Today's weekday in Atlanta (0 is Sunday), whatever the visitor's own clock says. */
function atlantaDayIndex(): number {
  return shortWeekdays.indexOf(weekdayInAtlanta.format(new Date()));
}

function sameDish(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function TonightsMenu() {
  const [saved, setSaved] = useState<SavedMenu | null>(null);
  // Unknown on the static render; set after mount so the HTML never carries a stale day.
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setSaved(loadMenu());
    setDayIndex(atlantaDayIndex());
  }, []);

  const tonight = dayIndex === null ? null : weeklyProteins[dayIndex];
  const specials: Record<SlotId, Special> | null =
    saved?.specials ?? (tonight ? { ...exampleSpecials, protein: tonight.protein } : null);
  const isDefault = saved === null;

  function openEditor() {
    // A fresh key resets the form to what's on screen each time it opens.
    setFormKey((key) => key + 1);
    dialogRef.current?.showModal();
  }

  function publish(next: Record<SlotId, Special>) {
    const menu = { specials: next, updatedAt: Date.now() };
    saveMenu(menu);
    setSaved(menu);
  }

  function reset() {
    clearMenu();
    setSaved(null);
  }

  return (
    <section id="tonight" aria-labelledby="tonight-title" className="border-t border-snow/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-cobalt/40 p-1.5">
          <div className="rounded-[1.6rem] border border-cobalt/20 bg-ink px-4 py-12 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-2xl text-center">
              <p className="deco-rule font-type text-xs uppercase tracking-[0.3em] sm:text-sm">
                <span className="shrink-0">{tonight ? `${tonight.day} night` : "Tonight"}</span>
              </p>
              <h2 id="tonight-title" className="mt-4 font-display text-5xl sm:text-6xl">
                Tonight&apos;s Menu
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-mist">
                The menu changes every night: one protein, one sandwich, one dessert and a drink of the
                day, from 5pm.
              </p>
              <p aria-live="polite" className="mt-5 font-type text-sm">
                {isDefault ? (
                  <span className="inline-block rounded-full border border-sky/50 px-3 py-1 text-sky">
                    Sandwich, dessert and drink are examples
                  </span>
                ) : (
                  <span className="rounded-full bg-cobalt px-3 py-1 font-bold text-white">
                    Updated {stamp.format(saved.updatedAt)} ET
                  </span>
                )}
              </p>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {slots.map((slot) => {
                const special = specials?.[slot.id];
                const tag = isDefault ? (slot.id === "protein" ? "Weekly menu" : "Example") : null;
                return (
                  <li key={slot.id} className="flex flex-col overflow-hidden rounded-3xl border border-snow/10 bg-navy">
                    <div className="grain relative aspect-[4/3]">
                      <Image
                        src={slot.photo.src}
                        alt={slot.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 92vw"
                        className="object-cover"
                      />
                      {special && !sameDish(special.name, slot.photo.pictured) && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-navy/85 px-2.5 py-1 font-type text-[0.7rem] text-mist">
                          Pictured: {slot.photo.pictured}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-type text-xs font-bold uppercase tracking-[0.2em] text-sky">{slot.label}</h3>
                        {tag && (
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 font-type text-[0.7rem] font-bold uppercase tracking-wider ${
                              slot.id === "protein" ? "bg-cobalt text-white" : "bg-sky/15 text-sky"
                            }`}
                          >
                            {tag}
                          </span>
                        )}
                      </div>
                      {special ? (
                        <>
                          <p className="mt-3 font-display text-3xl leading-tight break-words">{special.name}</p>
                          {special.detail && <p className="mt-2 leading-relaxed break-words text-mist">{special.detail}</p>}
                        </>
                      ) : (
                        <p aria-hidden="true" className="mt-3 h-9 w-3/4 animate-pulse rounded-lg bg-snow/10" />
                      )}
                      <p className="mt-auto border-t border-snow/10 pt-4 text-sm text-mist/80 italic">{slot.rule}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-3xl border border-snow/10 p-5 sm:p-6">
              <h3 className="font-type text-xs font-bold uppercase tracking-[0.2em] text-sky">The week&apos;s proteins</h3>
              <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {weeklyProteins.map((entry, index) => {
                  const isTonight = index === dayIndex;
                  return (
                    <li
                      key={entry.day}
                      aria-current={isTonight ? "date" : undefined}
                      className={`rounded-2xl px-3 py-2.5 ${isTonight ? "bg-cobalt text-white" : "bg-navy"}`}
                    >
                      <span className={`block font-type text-xs uppercase tracking-wider ${isTonight ? "text-white" : "text-mist"}`}>
                        {entry.day}
                        {isTonight && <span className="sr-only"> (tonight)</span>}
                      </span>
                      <span className="mt-0.5 block font-bold">{entry.protein.name}</span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-sm text-mist">From the weekly lineup on their Instagram.</p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="max-w-md text-mist">
                <span className="font-bold text-snow">The team updates this in a minute from a phone.</span> Try it
                yourself:
              </p>
              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={openEditor}
                  disabled={!specials}
                  className="rounded-full bg-cobalt px-7 py-3.5 text-lg font-bold text-white transition-colors hover:bg-cobalt-dark disabled:opacity-60"
                >
                  Update tonight&apos;s menu
                </button>
                {!isDefault && (
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-snow/25 px-7 py-3.5 text-lg font-bold transition-colors hover:border-snow"
                  >
                    Back to the default
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {specials && <UpdateMenuDialog formKey={formKey} dialogRef={dialogRef} current={specials} onPublish={publish} />}
    </section>
  );
}
