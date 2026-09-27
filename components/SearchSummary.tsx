type SearchSummaryProps = {
  destination: string;
  dates: string;
  guests: string;
  onEdit: () => void;
};

const SearchSummary = ({ destination, dates, guests, onEdit }: SearchSummaryProps) => {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex min-h-[3.75rem] w-full min-w-0 flex-col justify-center rounded-full border border-neutral-200 bg-white px-5 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:px-6"
    >
      <span className="truncate text-sm font-semibold text-neutral-900 sm:text-base">
        Alojamientos en {destination}
      </span>
      <span className="flex min-w-0 items-center gap-2 truncate text-xs text-neutral-600 sm:text-sm">
        <span className="truncate">{dates}</span>
        <span aria-hidden="true">·</span>
        <span className="truncate">{guests}</span>
      </span>
    </button>
  );
};

export default SearchSummary;