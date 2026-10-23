"use client";

import { createContext, useCallback, useContext, useRef } from "react";

import { bar, hours, phoneHref } from "@/data/bar";

import { Logo } from "./Logo";

const OrderDialogContext = createContext<(() => void) | null>(null);

/** Renders the single "online ordering coming soon" dialog shared by every order button. */
export function OrderDialogProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => dialogRef.current?.showModal(), []);
  const close = () => dialogRef.current?.close();

  return (
    <OrderDialogContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="order-dialog-title"
        aria-describedby="order-dialog-description"
        className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border border-cobalt/40 bg-ink p-0 text-snow shadow-2xl backdrop:bg-navy/80 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          // Clicks on the backdrop land on the <dialog> itself, not its content.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="h-2 bg-cobalt" />
        <div className="p-8 text-center">
          <Logo className="mx-auto w-24" />
          <p className="mt-6 inline-block rounded-full border border-sky/50 px-4 py-1 font-type text-xs uppercase tracking-[0.25em] text-sky">
            Coming soon
          </p>
          <h2 id="order-dialog-title" className="mt-3 font-display text-4xl">
            Order Takeout Online
          </h2>
          <p id="order-dialog-description" className="mt-4 leading-relaxed text-mist">
            Online ordering isn&apos;t live yet. For now, give us a call or come on in. We&apos;re open{" "}
            {hours.days.toLowerCase()}, {hours.time}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={phoneHref(bar.phone)}
              className="rounded-full bg-cobalt px-6 py-3 font-bold text-white transition-colors hover:bg-cobalt-dark"
            >
              Call {bar.phone}
            </a>
            <button
              type="button"
              autoFocus
              onClick={close}
              className="rounded-full border border-snow/25 px-6 py-3 font-bold transition-colors hover:border-snow"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </OrderDialogContext.Provider>
  );
}

type OrderButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function OrderButton({ className, children }: OrderButtonProps) {
  const openDialog = useContext(OrderDialogContext);
  if (!openDialog) throw new Error("OrderButton must be rendered inside OrderDialogProvider");

  return (
    <button type="button" aria-haspopup="dialog" className={className} onClick={openDialog}>
      {children}
    </button>
  );
}
