import Link from "next/link";

type PropertyHeaderProps = {
  title: string;
  propertyType: string;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  badge?: string;
};

const PropertyHeader = ({
  title,
  propertyType,
  location,
  guests,
  bedrooms,
  beds,
  bathrooms,
  rating,
  reviewCount,
  badge,
}: PropertyHeaderProps) => {
  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-3xl leading-9 font-semibold tracking-normal text-neutral-900 sm:text-4xl sm:leading-[1.15]">
          {title}
        </h1>
        <p className="text-base leading-6 text-neutral-600 sm:text-lg">
          {propertyType}: {location}
        </p>
        <p className="text-sm text-neutral-600 sm:text-base">
          {guests} huéspedes · {bedrooms} habitación{bedrooms === 1 ? "" : "es"} · {beds} cama
          {beds === 1 ? "" : "s"} · {bathrooms} baño{bathrooms === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 border-y border-neutral-200 py-5 text-center sm:gap-4">
        <div>
          <p className="text-xl font-semibold text-neutral-900">{rating.toFixed(2)}</p>
          <p aria-label="5 de 5 estrellas" className="text-sm tracking-normal text-neutral-900">
            ★★★★★
          </p>
        </div>
        <span aria-hidden="true" className="h-12 w-px bg-neutral-200" />
        <div className="flex items-center justify-center gap-1 text-sm leading-5 font-semibold text-neutral-900 sm:text-base">
          <span aria-hidden="true" className="text-lg">❧</span>
          <span>{badge ?? "Valorado por huéspedes"}</span>
          <span aria-hidden="true" className="text-lg">❧</span>
        </div>
        <span aria-hidden="true" className="h-12 w-px bg-neutral-200" />
        <Link
          href="#reviews"
          className="rounded px-1 text-sm font-semibold text-neutral-900 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:text-base"
        >
          <span className="block text-xl">{reviewCount}</span>
          Reseñas
        </Link>
      </div>
    </section>
  );
};

export default PropertyHeader;