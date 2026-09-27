type SectionHeaderProps = {
  title: string;
  onNext: () => void;
};

const SectionHeader = ({ title, onNext }: SectionHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <h2 className="max-w-[calc(100%-3.5rem)] text-xl leading-7 font-semibold text-neutral-900 sm:text-2xl sm:leading-8">
        {title}
      </h2>
      <button
        type="button"
        onClick={onNext}
        aria-label={`Ver más: ${title}`}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xl text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default SectionHeader;