import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";

type ListingCardProps = {
  listing: Listing;
  isFavorite?: boolean;
  onFavoriteChange?: (listingId: string, isFavorite: boolean) => void;
};

const ListingCard = ({
  listing,
  isFavorite = false,
  onFavoriteChange,
}: ListingCardProps) => {
  const formattedPrice = new Intl.NumberFormat("es-CL").format(listing.price);

  return (
    <article className="relative min-w-0">
      <Link
        href={`/rooms/${listing.id}`}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={listing.imageSrc}
            alt={listing.imageAlt}
            fill
            sizes="(max-width: 640px) 42vw, 240px"
            className="object-cover"
          />
          {listing.badge && (
            <span className="absolute top-3 left-3 max-w-[calc(100%-4.5rem)] rounded-xl bg-white/95 px-3 py-2 text-xs leading-4 font-semibold text-neutral-800 shadow-sm">
              {listing.badge}
            </span>
          )}
        </div>
        <div className="pt-2">
          <h3 className="line-clamp-2 text-sm leading-5 font-medium text-neutral-900">
            {listing.title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-neutral-600">
            <span className="font-medium text-neutral-900">
              ${formattedPrice} {listing.currency}
            </span>{" "}
            por {listing.nights} {listing.nights === 1 ? "noche" : "noches"}
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm leading-5 text-neutral-700">
            <span aria-hidden="true" className="text-xs">★</span>
            <span>{listing.rating.toFixed(1)}</span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-pressed={isFavorite}
        onClick={() => onFavoriteChange?.(listing.id, !isFavorite)}
        className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center text-3xl leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden="true" className={isFavorite ? "text-rose-500" : ""}>
          {isFavorite ? "♥" : "♡"}
        </span>
      </button>
    </article>
  );
};

export default ListingCard;