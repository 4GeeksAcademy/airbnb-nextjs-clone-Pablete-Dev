type SearchBarProps = {
  label?: string;
  onSearch: () => void;
};

const SearchBar = ({ label = "Empieza la búsqueda", onSearch }: SearchBarProps) => {
  return (
    <button
      type="button"
      onClick={onSearch}
      aria-label={label}
      className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-neutral-200 bg-white px-5 text-left text-base font-medium text-neutral-800 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 shrink-0"
      >
        <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
        <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{label}</span>
    </button>
  );
};

export default SearchBar;