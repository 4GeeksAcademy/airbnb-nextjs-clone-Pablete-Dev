export type CatalogFilter = {
  id: string;
  label: string;
};

type FilterChipsProps = {
  filters: CatalogFilter[];
  selectedFilterIds: ReadonlySet<string>;
  onToggleFilter: (filterId: string) => void;
};

const FilterChips = ({ filters, selectedFilterIds, onToggleFilter }: FilterChipsProps) => {
  return (
    <nav
      aria-label="Filtros del catálogo"
      className="-mx-5 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8"
    >
      <ul className="flex w-max gap-3 py-2">
        {filters.map((filter) => {
          const isSelected = selectedFilterIds.has(filter.id);

          return (
            <li key={filter.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleFilter(filter.id)}
                className={`min-h-11 rounded-full border px-5 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
                  isSelected
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"
                }`}
              >
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FilterChips;