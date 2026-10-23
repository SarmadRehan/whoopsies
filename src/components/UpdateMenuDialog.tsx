"use client";

import { useState, type FormEvent, type RefObject } from "react";

import { slots, specialLimits, type Special, type SlotId } from "@/data/bar";
import { toSpecials } from "@/lib/tonightStorage";

type UpdateMenuDialogProps = {
  /** Changing it remounts the form, so it opens with what's currently on screen. */
  formKey: number;
  dialogRef: RefObject<HTMLDialogElement | null>;
  current: Record<SlotId, Special>;
  onPublish: (specials: Record<SlotId, Special>) => void;
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-snow/20 bg-navy px-3.5 py-3 text-base text-snow placeholder:text-mist/60 focus:border-sky focus:outline-none";

/** The phone-sized form the team would use to post tonight's menu (a mock for the demo). */
export function UpdateMenuDialog({ formKey, dialogRef, current, onPublish }: UpdateMenuDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const close = () => dialogRef.current?.close();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const specials = toSpecials(
      Object.fromEntries(
        slots.map((slot) => [slot.id, { name: data.get(`${slot.id}-name`), detail: data.get(`${slot.id}-detail`) }]),
      ),
    );
    if (!specials) {
      setError("Give every special a name before posting.");
      return;
    }
    setError(null);
    onPublish(specials);
    close();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="update-menu-title"
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto rounded-3xl border border-cobalt/40 bg-ink p-0 text-snow shadow-2xl backdrop:bg-navy/80 backdrop:backdrop-blur-sm"
      onClose={() => setError(null)}
      onClick={(event) => {
        // Clicks on the backdrop land on the <dialog> itself, not its content.
        if (event.target === event.currentTarget) close();
      }}
    >
      <form key={formKey} onSubmit={handleSubmit} noValidate className="p-5 sm:p-7">
        <p className="font-type text-xs font-bold uppercase tracking-[0.25em] text-sky">Staff view · demo</p>
        <h2 id="update-menu-title" className="mt-2 font-display text-3xl">
          Update tonight&apos;s menu
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          Type tonight&apos;s specials and post. In this demo the change shows only in your browser; nobody else
          sees it.
        </p>

        <div className="mt-6 space-y-5">
          {slots.map((slot) => (
            <fieldset key={slot.id} className="rounded-2xl border border-snow/10 p-4">
              <legend className="px-1 font-type text-xs font-bold uppercase tracking-[0.2em] text-sky">
                {slot.label}
              </legend>
              <label className="block text-sm font-bold" htmlFor={`${slot.id}-name`}>
                Name
              </label>
              <input
                id={`${slot.id}-name`}
                name={`${slot.id}-name`}
                defaultValue={current[slot.id].name}
                maxLength={specialLimits.name}
                required
                autoComplete="off"
                enterKeyHint="next"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "update-menu-error" : undefined}
                className={fieldClass}
              />
              <label className="mt-3 block text-sm font-bold" htmlFor={`${slot.id}-detail`}>
                Details <span className="font-normal text-mist">(optional)</span>
              </label>
              <textarea
                id={`${slot.id}-detail`}
                name={`${slot.id}-detail`}
                defaultValue={current[slot.id].detail ?? ""}
                maxLength={specialLimits.detail}
                rows={2}
                className={`${fieldClass} resize-none`}
              />
            </fieldset>
          ))}
        </div>

        {error && (
          <p id="update-menu-error" role="alert" className="mt-5 rounded-xl bg-sky/15 px-4 py-3 text-sm font-bold text-sky">
            {error}
          </p>
        )}

        <div className="sticky bottom-0 -mx-5 mt-6 flex gap-3 border-t border-snow/10 bg-ink px-5 pt-4 pb-1 sm:-mx-7 sm:px-7">
          <button
            type="button"
            onClick={close}
            className="flex-1 rounded-full border border-snow/25 py-3 font-bold transition-colors hover:border-snow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[2] rounded-full bg-cobalt py-3 font-bold text-white transition-colors hover:bg-cobalt-dark"
          >
            Post tonight&apos;s menu
          </button>
        </div>
      </form>
    </dialog>
  );
}
