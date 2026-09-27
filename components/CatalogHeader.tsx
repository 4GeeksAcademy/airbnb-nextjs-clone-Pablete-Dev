import Link from "next/link";
import SearchSummary from "@/components/SearchSummary";

type CatalogHeaderProps = {
  destination: string;
  dates: string;
  guests: string;
  onEditSearch: () => void;
  onOpenFilters: () => void;
};

const CatalogHeader = ({
  destination,
  dates,
  guests,
  onEditSearch,
  onOpenFilters,
}: CatalogHeaderProps) => {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 pt-5 sm:px-8 md:gap-6 md:pt-7">
      <Link
        href="/"
        aria-label="Volver al inicio"
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
          <path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div className="min-w-0 flex-1">
        <SearchSummary
          destination={destination}
          dates={dates}
          guests={guests}
          onEdit={onEditSearch}
        />
      </div>

      <button
        type="button"
        onClick={onOpenFilters}
        aria-label="Abrir filtros"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 md:size-12"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
          <path d="M4 7h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="9" cy="7" r="2" fill="white" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="15" cy="17" r="2" fill="white" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>
    </header>
  );
};

export default CatalogHeader;