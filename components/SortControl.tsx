export type PriceSortOrder = "asc" | "desc";

type SortControlProps = {
  value: PriceSortOrder;
  onChange: (order: PriceSortOrder) => void;
};

const SortControl = ({ value, onChange }: SortControlProps) => {
  return (
    <label className="flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-800 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-rose-600">
      <span>Ordenar</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as PriceSortOrder)}
        aria-label="Ordenar resultados por precio"
        className="max-w-36 appearance-none bg-transparent pr-1 font-semibold outline-none"
      >
        <option value="asc">Precio: menor primero</option>
        <option value="desc">Precio: mayor primero</option>
      </select>
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
        <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
};

export default SortControl;