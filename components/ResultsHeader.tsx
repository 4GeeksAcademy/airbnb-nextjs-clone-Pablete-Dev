type ResultsHeaderProps = {
  destination: string;
  resultCount: number;
};

const ResultsHeader = ({ destination, resultCount }: ResultsHeaderProps) => {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <h1 className="text-xl leading-7 font-semibold text-neutral-900 sm:text-2xl">
        Alojamientos en {destination}
      </h1>
      <p className="text-sm text-neutral-600" aria-live="polite">
        {resultCount} {resultCount === 1 ? "alojamiento" : "alojamientos"}
      </p>
    </div>
  );
};

export default ResultsHeader;