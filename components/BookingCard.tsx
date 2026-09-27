"use client";

import { useState } from "react";

type BookingCardProps = {
  currentPrice: number;
  previousPrice: number;
  nights: number;
  dates: string;
  initialGuests: number;
  minimumGuests: number;
  maximumGuests: number;
};

const BookingCard = ({
  currentPrice,
  previousPrice,
  nights,
  dates,
  initialGuests,
  minimumGuests,
  maximumGuests,
}: BookingCardProps) => {
  const [guestCount, setGuestCount] = useState(
    Math.min(maximumGuests, Math.max(minimumGuests, initialGuests)),
  );
  const formatPrice = (price: number) => `$${new Intl.NumberFormat("es-CL").format(price)} CLP`;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:static md:rounded-2xl md:border md:p-6 md:shadow-sm">
      <div className="mx-auto max-w-7xl md:max-w-none">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm text-neutral-500 line-through">{formatPrice(previousPrice)}</span>
          <span className="text-lg font-semibold text-neutral-900 underline underline-offset-2">
            {formatPrice(currentPrice)}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          Por {nights} noches · {dates}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-neutral-300 px-3 py-2 md:mt-5">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Huéspedes</p>
            <p aria-live="polite" className="text-xs text-neutral-600">
              {guestCount} {guestCount === 1 ? "huésped" : "huéspedes"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Quitar un huésped"
              disabled={guestCount <= minimumGuests}
              onClick={() => setGuestCount((count) => Math.max(minimumGuests, count - 1))}
              className="flex size-9 items-center justify-center rounded-full border border-neutral-400 text-lg text-neutral-800 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="min-w-4 text-center text-sm font-medium tabular-nums">{guestCount}</span>
            <button
              type="button"
              aria-label="Añadir un huésped"
              disabled={guestCount >= maximumGuests}
              onClick={() => setGuestCount((count) => Math.min(maximumGuests, count + 1))}
              className="flex size-9 items-center justify-center rounded-full border border-neutral-400 text-lg text-neutral-800 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 min-h-12 w-full rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-6 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 md:mt-5"
        >
          Reserva
        </button>
      </div>
    </aside>
  );
};

export default BookingCard;