"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { bar, exampleSpecials, slots, type Special, type SlotId } from "@/data/bar";
import { clearMenu, loadMenu, saveMenu, type SavedMenu } from "@/lib/tonightStorage";

import { UpdateMenuDialog } from "./UpdateMenuDialog";

const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: bar.timeZone });
const clock = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: bar.timeZone });

export function TonightsMenu() {
  const [saved, setSaved] = useState<SavedMenu | null>(null);
  // Empty on the server render; filled in after mount so the static HTML never carries a stale day.
  const [day, setDay] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setSaved(loadMenu());
    setDay(weekday.format(new Date()));
  }, []);

  const specials: Record<SlotId, Special> = saved?.specials ?? exampleSpecials;
  const isExample = saved === null;

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
    <section id="tonight" aria-labelledby="tonight-title" className="border-t border-cream/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-brass/40 p-1.5">
          <div className="rounded-[1.6rem] border border-brass/20 bg-booth px-4 py-12 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-2xl text-center">
              <p className="deco-rule font-type text-xs uppercase tracking-[0.3em] sm:text-sm">
                <span className="shrink-0">{day ? `${day} night` : "Tonight"}</span>
              </p>
              <h2 id="tonight-title" className="mt-4 font-display text-5xl sm:text-6xl">
                Tonight&apos;s Menu
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-parchment">
                The menu changes every night: one protein, one sandwich, one dessert and a drink of the
                day, from 5pm.
              </p>
              <p aria-live="polite" className="mt-5 font-type text-sm">
                {isExample ? (
                  <span className="rounded-full border border-ember/50 px-3 py-1 text-ember">Example menu</span>
                ) : (
                  <span className="rounded-full border border-brass/50 px-3 py-1 text-brass">
                    Updated {clock.format(saved.updatedAt)} ET
                  </span>
                )}
              </p>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {slots.map((slot) => {
                const special = specials[slot.id];
                return (
                  <li key={slot.id} className="flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-night">
                    <div className="grain relative aspect-[4/3]">
                      <Image
                        src={slot.photo.src}
                        alt={slot.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 92vw"
                        className="object-cover"
                      />
                      {!isExample && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-night/80 px-2.5 py-1 font-type text-[0.7rem] text-parchment">
                          Photo from a past night
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-type text-xs font-bold uppercase tracking-[0.2em] text-brass">{slot.label}</h3>
                        {isExample && (
                          <span className="shrink-0 rounded-full bg-ember/15 px-2 py-0.5 font-type text-[0.7rem] font-bold uppercase tracking-wider text-ember">
                            Example
                          </span>
                        )}
                      </div>
                      <p className="mt-3 font-display text-3xl leading-tight break-words">{special.name}</p>
                      {special.detail && <p className="mt-2 leading-relaxed break-words text-parchment">{special.detail}</p>}
                      <p className="mt-auto border-t border-cream/10 pt-4 text-sm text-parchment/80 italic">{slot.rule}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="max-w-md text-parchment">
                <span className="font-bold text-cream">The team updates this in a minute from a phone.</span> Try it
                yourself:
              </p>
              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={openEditor}
                  className="rounded-full bg-brass px-7 py-3.5 text-lg font-bold text-night transition-colors hover:bg-cream"
                >
                  Update tonight&apos;s menu
                </button>
                {!isExample && (
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-cream/25 px-7 py-3.5 text-lg font-bold transition-colors hover:border-cream"
                  >
                    Back to the example
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateMenuDialog formKey={formKey} dialogRef={dialogRef} current={specials} onPublish={publish} />
    </section>
  );
}
